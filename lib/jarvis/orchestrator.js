// ОРКЕСТРАТОР — сердце Jarvis.
//
// Он не отвечает клиенту сам. Он делает четыре вещи:
//   1. понимает, чей это вопрос (маршрутизация)
//   2. собирает контекст: кто клиент, о чём говорили, что знаем о бизнесе
//   3. запускает нужный отдел и крутит цикл «модель просит инструмент —
//      мы выполняем — отдаём результат обратно»
//   4. следит за временем, деньгами и ошибками
//
// Дирижёр не играет на инструментах. Он решает, кто вступает и когда.

const Anthropic = require('@anthropic-ai/sdk');
const mem = require('./memory');
const { toolsFor } = require('./tools');
const { systemFor, DEPARTMENTS } = require('./agents');
const { MODELS, EFFORT, MAX_TOOL_STEPS, TIME_BUDGET_MS, env } = require('./config');

let anthropic = null;
function claude() {
  if (!anthropic) {
    if (!env.anthropicKey) throw new Error('ANTHROPIC_API_KEY не задан');
    anthropic = new Anthropic({
      apiKey: env.anthropicKey,
      // Сеть иногда моргает. Три повтора с задержкой SDK сделает сам —
      // это дешевле, чем показать клиенту ошибку.
      maxRetries: 3,
      timeout: 45_000,
    });
  }
  return anthropic;
}

// ШАГ 1. МАРШРУТИЗАЦИЯ
//
// Сначала правила — они бесплатны и мгновенны, и ловят ~80% сообщений.
// Модель подключается только там, где правила молчат. Это и экономия,
// и стабильность: правило не может «придумать» несуществующий отдел.

// Ключевые слова отделов. Пишем корнями слов ("продаж" ловит и "продажи",
// и "продажник"), поэтому одного корня хватает на десяток форм.
const RULES = {
  finance: ['деньг', 'деньж', 'прибыл', 'расход', 'доход', 'потрат', 'заплат',
    'выручк', 'себестоим', 'марж', 'бюджет', 'касс', 'налог', 'убыт', 'окупа',
    'чек', 'млн', 'тысяч', 'сумм', 'финанс', 'pul', 'foyda', 'xarajat',
    'daromad', 'byudjet'],
  sales: ['продаж', 'продал', 'продат', 'клиент', 'покупател', 'лид', 'сделк',
    'возражени', 'дорого', 'скрипт', 'воронк', 'переговор', 'коммерческ',
    'закрыл', 'отказал', 'savdo', 'mijoz', 'sotdim'],
  marketing: ['маркетинг', 'реклам', 'контент', 'рилс', 'reels', 'пост',
    'сторис', 'блог', 'подписчик', 'охват', 'таргет', 'инстаграм', 'instagram',
    'тикток', 'бренд', 'хук', 'креатив', 'аудитори', 'kontent', 'reklama',
    'obuna'],
  ops: ['задач', 'процесс', 'сотрудник', 'команд', 'найм', 'делегир',
    'инструкц', 'регламент', 'склад', 'логистик', 'срок', 'дедлайн',
    'систем', 'операционк', 'vazifa', 'jarayon', 'xodim'],
};

// Собираем один регэксп на отдел. Хитрость в (?<!\p{L}) — «перед корнем
// не буква», то есть начало слова. Обычный \b здесь не работает:
// в JavaScript он не считает кириллицу буквой и не срабатывает вовсе.
const RULE_RE = Object.fromEntries(
  Object.entries(RULES).map(([dept, stems]) => [
    dept,
    new RegExp(`(?<!\\p{L})(${stems.join('|')})`, 'giu'),
  ]),
);

function routeByRules(text) {
  const scores = Object.entries(RULE_RE)
    .map(([dept, re]) => ({ dept, hits: (text.match(re) || []).length }))
    .filter((s) => s.hits > 0)
    .sort((a, b) => b.hits - a.hits);

  if (!scores.length) return null;
  // Если два отдела набрали поровну — правило не уверено, отдаём модели.
  if (scores.length > 1 && scores[0].hits === scores[1].hits) return null;
  return scores[0].dept;
}

const ROUTE_TOOL = {
  name: 'route',
  description: 'Определить, какой отдел должен ответить на сообщение предпринимателя.',
  input_schema: {
    type: 'object',
    properties: {
      dept: {
        type: 'string',
        enum: ['marketing', 'finance', 'ops', 'sales', 'general'],
        description:
          'marketing — привлечь внимание и заявки; finance — деньги, прибыль, расходы; ' +
          'ops — задачи, процессы, команда; sales — превратить интерес в оплату; ' +
          'general — всё остальное или сразу несколько тем',
      },
    },
    required: ['dept'],
    additionalProperties: false,
  },
  strict: true,
};

async function routeByModel(text) {
  try {
    const res = await claude().messages.create({
      model: MODELS.router,
      max_tokens: 256,
      system:
        'Ты маршрутизатор входящих сообщений в бизнес-ассистенте. ' +
        'Твоя единственная работа — выбрать отдел. Ничего не отвечай текстом.',
      tools: [ROUTE_TOOL],
      tool_choice: { type: 'tool', name: 'route' },
      messages: [{ role: 'user', content: text.slice(0, 2000) }],
    });
    const block = res.content.find((b) => b.type === 'tool_use');
    return block?.input?.dept || 'general';
  } catch (e) {
    // Маршрутизатор упал — это не повод падать всему боту.
    console.error('[jarvis] router:', e.message);
    return 'general';
  }
}

async function route(text) {
  return routeByRules(text) || (await routeByModel(text));
}

// ШАГ 2–3. ЗАПУСК ОТДЕЛА С ЦИКЛОМ ИНСТРУМЕНТОВ
//
// Модель может попросить инструмент, получить результат и попросить ещё
// один. Цикл крутится, пока она не скажет «я закончила» (end_turn),
// но не дольше MAX_TOOL_STEPS шагов и не дольше бюджета времени.

async function runDepartment({ dept, user, facts, history, text, deadline }) {
  const tools = toolsFor(dept);
  const ctx = { tgId: user.tg_id, dept };

  const messages = [...history, { role: 'user', content: text }];

  let steps = 0;
  const usage = { tokens_in: 0, tokens_out: 0, cached_in: 0 };

  while (true) {
    if (Date.now() > deadline) {
      return {
        text: 'Задача оказалась объёмной, я не успел досчитать. Задай вопрос поуже — отвечу точно.',
        steps,
        usage,
        dept,
      };
    }

    const res = await claude().messages.create({
      model: MODELS.main,
      max_tokens: 4000,
      thinking: { type: 'adaptive' },
      output_config: { effort: EFFORT },
      system: systemFor(dept, user, facts),
      tools: tools.specs,
      messages,
    });

    usage.tokens_in += res.usage?.input_tokens || 0;
    usage.tokens_out += res.usage?.output_tokens || 0;
    usage.cached_in += res.usage?.cache_read_input_tokens || 0;

    // Модель отказалась по соображениям безопасности — это не ошибка кода.
    if (res.stop_reason === 'refusal') {
      return { text: 'Не могу ответить на этот запрос. Давай вернёмся к бизнесу.', steps, usage, dept };
    }

    if (res.stop_reason !== 'tool_use') {
      const out = res.content
        .filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('\n')
        .trim();
      return { text: out || 'Не понял вопрос. Переформулируй, пожалуйста.', steps, usage, dept };
    }

    // Модель просит инструменты. Их может быть несколько за один раз —
    // выполняем все и возвращаем ОДНИМ сообщением, иначе модель
    // постепенно разучится просить их пачкой.
    steps += 1;
    if (steps > MAX_TOOL_STEPS) {
      return { text: 'Запутался в расчётах. Спроси, пожалуйста, конкретнее.', steps, usage, dept };
    }

    messages.push({ role: 'assistant', content: res.content });

    const calls = res.content.filter((b) => b.type === 'tool_use');
    const results = await Promise.all(
      calls.map(async (c) => ({
        type: 'tool_result',
        tool_use_id: c.id,
        content: String(await tools.run(ctx, c.name, c.input)),
      })),
    );
    messages.push({ role: 'user', content: results });
  }
}

// ШАГ 0–4. ПОЛНАЯ ЦЕПОЧКА ОБРАБОТКИ ОДНОГО СООБЩЕНИЯ
async function handle(tgUser, text) {
  const started = Date.now();
  const deadline = started + TIME_BUDGET_MS;

  const user = await mem.getUser(tgUser);

  if (await mem.overLimit(user.tg_id)) {
    return { text: 'На сегодня лимит запросов исчерпан. Напиши через час.', dept: 'general' };
  }

  // Контекст грузим параллельно — это две независимые поездки в базу.
  const [facts, history] = await Promise.all([
    mem.loadFacts(user.tg_id),
    mem.loadHistory(user.tg_id),
  ]);

  const dept = await route(text);

  let result;
  let error = null;
  try {
    result = await runDepartment({ dept, user, facts, history, text, deadline });
  } catch (e) {
    error = e.message;
    console.error('[jarvis] run:', e);
    result = { text: friendlyError(e), dept, steps: 0, usage: {} };
  }

  // Пишем историю и журнал, но не даём им уронить ответ:
  // если база отвалилась, клиент всё равно получит сообщение.
  Promise.all([
    mem.saveMessage(user.tg_id, 'user', text, dept),
    mem.saveMessage(user.tg_id, 'assistant', result.text, dept),
    mem.logRun({
      tg_id: user.tg_id,
      dept,
      model: MODELS.main,
      tokens_in: result.usage?.tokens_in || 0,
      tokens_out: result.usage?.tokens_out || 0,
      cached_in: result.usage?.cached_in || 0,
      tool_steps: result.steps || 0,
      duration_ms: Date.now() - started,
      ok: !error,
      error,
    }),
  ]).catch((e) => console.error('[jarvis] persist:', e.message));

  return result;
}

// Клиенту нельзя показывать стек ошибки. Ему нужно понимать,
// что делать дальше.
function friendlyError(e) {
  if (e instanceof Anthropic.RateLimitError) {
    return 'Слишком много запросов сразу. Подожди минуту и напиши ещё раз.';
  }
  if (e instanceof Anthropic.AuthenticationError) {
    return 'Ассистент не подключён к мозгу: проверь ключ ANTHROPIC_API_KEY.';
  }
  if (e instanceof Anthropic.APIConnectionError) {
    return 'Пропала связь с сервером. Повтори сообщение через минуту.';
  }
  return 'Что-то пошло не так на моей стороне. Повтори, пожалуйста.';
}

module.exports = { handle, route, routeByRules, runDepartment, DEPARTMENTS };
