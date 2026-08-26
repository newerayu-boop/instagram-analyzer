// Инструменты Jarvis — «руки» ассистента.
//
// Модель сама текст писать умеет. Инструменты нужны для другого:
// записать в базу, посчитать по реальным цифрам, вспомнить факт.
// Каждый инструмент = описание (его читает модель) + функция (её выполняем мы).
//
// Правило описаний: пишите их как инструкцию стажёру. Модель выбирает
// инструмент ТОЛЬКО по описанию — плохое описание = инструмент не вызовется.

const mem = require('./memory');
const { CURRENCY, TIMEZONE } = require('./config');

const today = () =>
  new Date().toLocaleDateString('sv-SE', { timeZone: TIMEZONE }); // YYYY-MM-DD

const money = (n) => Number(n).toLocaleString('ru-RU');

// --- ОБЩИЕ (доступны всем отделам) ------------------------------------

const remember = {
  spec: {
    name: 'remember',
    description:
      'Запомнить факт о бизнесе клиента навсегда: ниша, город, средний чек, ' +
      'команда, конкуренты, цели, любые постоянные вводные. Вызывай сразу, ' +
      'как только клиент сообщил новый факт о своём бизнесе — не жди отдельной просьбы.',
    input_schema: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description: 'короткое имя факта: nisha, gorod, sredniy_chek, komanda, cel',
        },
        value: { type: 'string', description: 'сам факт, одной фразой' },
      },
      required: ['key', 'value'],
    },
  },
  async run(ctx, input) {
    const ok = await mem.saveFact(ctx.tgId, input.key, input.value);
    return ok ? `Запомнил: ${input.key} = ${input.value}` : 'Память выключена, не смог записать';
  },
};

// --- ОПЕРАЦИОНКА ------------------------------------------------------

const addTask = {
  spec: {
    name: 'add_task',
    description:
      'Создать задачу в списке дел клиента. Используй, когда в разговоре ' +
      'появилось действие, которое нужно не забыть сделать.',
    input_schema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'что сделать, глаголом' },
        assignee: { type: 'string', description: 'кто делает, если названо' },
        due_date: { type: 'string', description: 'срок в формате YYYY-MM-DD' },
        dept: {
          type: 'string',
          enum: ['marketing', 'finance', 'ops', 'sales'],
          description: 'к какому направлению относится',
        },
      },
      required: ['title'],
    },
  },
  async run(ctx, input) {
    const r = await mem.insert('jarvis_tasks', {
      tg_id: ctx.tgId,
      title: input.title,
      assignee: input.assignee || null,
      due_date: input.due_date || null,
      dept: input.dept || ctx.dept,
    });
    return r.ok ? `Задача #${r.data.id} создана: ${input.title}` : `Ошибка: ${r.error}`;
  },
};

const listTasks = {
  spec: {
    name: 'list_tasks',
    description: 'Показать открытые задачи клиента. Вызывай на вопросы «что у меня по делам», «что горит», «план на неделю».',
    input_schema: {
      type: 'object',
      properties: {
        dept: { type: 'string', enum: ['marketing', 'finance', 'ops', 'sales'] },
      },
    },
  },
  async run(ctx, input) {
    const r = await mem.select('jarvis_tasks', (q) => {
      let x = q.select('id, title, assignee, due_date, dept')
        .eq('tg_id', ctx.tgId)
        .eq('status', 'open')
        .order('due_date', { ascending: true, nullsFirst: false })
        .limit(50);
      if (input.dept) x = x.eq('dept', input.dept);
      return x;
    });
    if (!r.ok) return `Ошибка: ${r.error}`;
    if (!r.data.length) return 'Открытых задач нет.';
    return r.data
      .map((t) => `#${t.id} ${t.title}${t.due_date ? ` (до ${t.due_date})` : ''}${t.assignee ? ` — ${t.assignee}` : ''}`)
      .join('\n');
  },
};

const closeTask = {
  spec: {
    name: 'close_task',
    description: 'Закрыть задачу по её номеру, когда клиент сказал, что сделал.',
    input_schema: {
      type: 'object',
      properties: { id: { type: 'integer', description: 'номер задачи' } },
      required: ['id'],
    },
  },
  async run(ctx, input) {
    const r = await mem.update('jarvis_tasks', { id: input.id, tg_id: ctx.tgId }, { status: 'done' });
    if (!r.ok) return `Ошибка: ${r.error}`;
    return r.data.length ? `Задача #${input.id} закрыта.` : `Задача #${input.id} не найдена.`;
  },
};

// --- ФИНАНСЫ ----------------------------------------------------------

const logMoney = {
  spec: {
    name: 'log_money',
    description:
      'Записать приход или расход. Вызывай, когда клиент назвал сумму: ' +
      '«продал на 2 млн», «заплатил за рекламу 300 тысяч», «закупил товар».',
    input_schema: {
      type: 'object',
      properties: {
        kind: { type: 'string', enum: ['income', 'expense'], description: 'приход или расход' },
        amount: { type: 'number', description: 'сумма числом, без пробелов' },
        category: { type: 'string', description: 'реклама, аренда, товар, зарплата, продажа' },
        note: { type: 'string', description: 'пояснение' },
        happened_on: { type: 'string', description: 'дата YYYY-MM-DD, по умолчанию сегодня' },
      },
      required: ['kind', 'amount'],
    },
  },
  async run(ctx, input) {
    const r = await mem.insert('jarvis_money', {
      tg_id: ctx.tgId,
      kind: input.kind,
      amount: input.amount,
      currency: CURRENCY,
      category: input.category || null,
      note: input.note || null,
      happened_on: input.happened_on || today(),
    });
    if (!r.ok) return `Ошибка: ${r.error}`;
    const word = input.kind === 'income' ? 'Приход' : 'Расход';
    return `${word} записан: ${money(input.amount)} ${CURRENCY}${input.category ? ` (${input.category})` : ''}`;
  },
};

const moneyReport = {
  spec: {
    name: 'money_report',
    description:
      'Отчёт по деньгам за период: сколько пришло, сколько ушло, прибыль, ' +
      'расходы по категориям. Вызывай на «сколько я заработал», «где деньги», ' +
      '«отчёт за месяц». Никогда не выдумывай цифры — бери только отсюда.',
    input_schema: {
      type: 'object',
      properties: {
        from: { type: 'string', description: 'начало периода YYYY-MM-DD' },
        to: { type: 'string', description: 'конец периода YYYY-MM-DD' },
      },
    },
  },
  async run(ctx, input) {
    const to = input.to || today();
    const from = input.from || to.slice(0, 8) + '01';
    const r = await mem.select('jarvis_money', (q) =>
      q.select('kind, amount, category')
        .eq('tg_id', ctx.tgId)
        .gte('happened_on', from)
        .lte('happened_on', to)
        .limit(2000),
    );
    if (!r.ok) return `Ошибка: ${r.error}`;
    if (!r.data.length) return `За ${from}…${to} записей нет.`;

    let income = 0;
    let expense = 0;
    const byCat = {};
    for (const row of r.data) {
      const a = Number(row.amount) || 0;
      if (row.kind === 'income') income += a;
      else {
        expense += a;
        const c = row.category || 'без категории';
        byCat[c] = (byCat[c] || 0) + a;
      }
    }
    const cats = Object.entries(byCat)
      .sort((a, b) => b[1] - a[1])
      .map(([c, a]) => `  ${c}: ${money(a)}`)
      .join('\n');

    return [
      `Период ${from} … ${to}`,
      `Приход: ${money(income)} ${CURRENCY}`,
      `Расход: ${money(expense)} ${CURRENCY}`,
      `Прибыль: ${money(income - expense)} ${CURRENCY}`,
      cats ? `Расходы по статьям:\n${cats}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  },
};

// --- ПРОДАЖИ ----------------------------------------------------------

const addLead = {
  spec: {
    name: 'add_lead',
    description:
      'Добавить клиента (лид) в воронку продаж. Вызывай, когда упомянут ' +
      'новый потенциальный покупатель: имя, контакт, откуда пришёл.',
    input_schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        contact: { type: 'string', description: 'телефон, телеграм или инстаграм' },
        source: { type: 'string', description: 'instagram, сарафан, реклама, сайт' },
        amount: { type: 'number', description: 'ожидаемая сумма сделки' },
        note: { type: 'string' },
      },
      required: ['name'],
    },
  },
  async run(ctx, input) {
    const r = await mem.insert('jarvis_leads', {
      tg_id: ctx.tgId,
      name: input.name,
      contact: input.contact || null,
      source: input.source || null,
      amount: input.amount || null,
      note: input.note || null,
    });
    return r.ok ? `Лид #${r.data.id} добавлен: ${input.name}` : `Ошибка: ${r.error}`;
  },
};

const moveLead = {
  spec: {
    name: 'move_lead',
    description:
      'Передвинуть лид по воронке: new → contacted → offer → won/lost. ' +
      'Вызывай на «позвонил такому-то», «отправил КП», «купил», «отказался».',
    input_schema: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        status: { type: 'string', enum: ['new', 'contacted', 'offer', 'won', 'lost'] },
        amount: { type: 'number', description: 'финальная сумма, если сделка закрыта' },
        note: { type: 'string' },
      },
      required: ['id', 'status'],
    },
  },
  async run(ctx, input) {
    const patch = { status: input.status, updated_at: new Date().toISOString() };
    if (input.amount != null) patch.amount = input.amount;
    if (input.note) patch.note = input.note;
    const r = await mem.update('jarvis_leads', { id: input.id, tg_id: ctx.tgId }, patch);
    if (!r.ok) return `Ошибка: ${r.error}`;
    return r.data.length ? `Лид #${input.id} → ${input.status}` : `Лид #${input.id} не найден.`;
  },
};

const salesReport = {
  spec: {
    name: 'sales_report',
    description:
      'Состояние воронки: сколько лидов на каждом этапе, конверсия, сумма ' +
      'в работе. Вызывай на «что по продажам», «сколько клиентов», «конверсия».',
    input_schema: { type: 'object', properties: {} },
  },
  async run(ctx) {
    const r = await mem.select('jarvis_leads', (q) =>
      q.select('id, name, status, amount').eq('tg_id', ctx.tgId).limit(1000),
    );
    if (!r.ok) return `Ошибка: ${r.error}`;
    if (!r.data.length) return 'В воронке пусто.';

    const stages = { new: 0, contacted: 0, offer: 0, won: 0, lost: 0 };
    let inWork = 0;
    let wonSum = 0;
    for (const l of r.data) {
      stages[l.status] = (stages[l.status] || 0) + 1;
      if (l.status === 'won') wonSum += Number(l.amount) || 0;
      else if (l.status !== 'lost') inWork += Number(l.amount) || 0;
    }
    const closed = stages.won + stages.lost;
    const conv = closed ? Math.round((stages.won / closed) * 100) : 0;

    return [
      `Новые: ${stages.new}`,
      `В контакте: ${stages.contacted}`,
      `Отправлено КП: ${stages.offer}`,
      `Купили: ${stages.won}   Отказ: ${stages.lost}`,
      `Конверсия в оплату: ${conv}%`,
      `Сумма в работе: ${money(inWork)} ${CURRENCY}`,
      `Закрыто на сумму: ${money(wonSum)} ${CURRENCY}`,
    ].join('\n');
  },
};

const listLeads = {
  spec: {
    name: 'list_leads',
    description: 'Список лидов, можно отфильтровать по этапу воронки.',
    input_schema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['new', 'contacted', 'offer', 'won', 'lost'] },
      },
    },
  },
  async run(ctx, input) {
    const r = await mem.select('jarvis_leads', (q) => {
      let x = q.select('id, name, contact, status, amount, source')
        .eq('tg_id', ctx.tgId)
        .order('updated_at', { ascending: false })
        .limit(50);
      if (input.status) x = x.eq('status', input.status);
      return x;
    });
    if (!r.ok) return `Ошибка: ${r.error}`;
    if (!r.data.length) return 'Ничего не найдено.';
    return r.data
      .map((l) => `#${l.id} ${l.name} — ${l.status}${l.contact ? ` (${l.contact})` : ''}${l.amount ? ` · ${money(l.amount)}` : ''}`)
      .join('\n');
  },
};

// --- МАРКЕТИНГ --------------------------------------------------------

const saveIdea = {
  spec: {
    name: 'save_idea',
    description:
      'Сохранить идею контента в банк идей, чтобы клиент не забыл её снять. ' +
      'Вызывай для КАЖДОЙ идеи, которую сам предложил в ответе.',
    input_schema: {
      type: 'object',
      properties: {
        topic: { type: 'string', description: 'о чём ролик или пост' },
        hook: { type: 'string', description: 'первая фраза, которая цепляет' },
        format: { type: 'string', enum: ['reels', 'post', 'carousel', 'stories'] },
      },
      required: ['topic'],
    },
  },
  async run(ctx, input) {
    const r = await mem.insert('jarvis_ideas', {
      tg_id: ctx.tgId,
      topic: input.topic,
      hook: input.hook || null,
      format: input.format || 'reels',
    });
    return r.ok ? `Идея #${r.data.id} сохранена.` : `Ошибка: ${r.error}`;
  },
};

const listIdeas = {
  spec: {
    name: 'list_ideas',
    description: 'Показать банк идей контента. Вызывай на «что снимать», «идеи», «контент-план».',
    input_schema: {
      type: 'object',
      properties: { status: { type: 'string', enum: ['idea', 'shot', 'posted'] } },
    },
  },
  async run(ctx, input) {
    const r = await mem.select('jarvis_ideas', (q) => {
      let x = q.select('id, topic, hook, format, status')
        .eq('tg_id', ctx.tgId)
        .order('created_at', { ascending: false })
        .limit(40);
      if (input.status) x = x.eq('status', input.status);
      return x;
    });
    if (!r.ok) return `Ошибка: ${r.error}`;
    if (!r.data.length) return 'Банк идей пуст.';
    return r.data
      .map((i) => `#${i.id} [${i.format}] ${i.topic}${i.hook ? ` — «${i.hook}»` : ''}`)
      .join('\n');
  },
};

// --- сборка наборов по отделам ---------------------------------------
// У каждого отдела свой набор. Это не украшение: чем меньше инструментов
// видит модель, тем точнее она выбирает нужный.

const COMMON = [remember, addTask];

const BY_DEPT = {
  marketing: [...COMMON, saveIdea, listIdeas],
  finance: [...COMMON, logMoney, moneyReport],
  ops: [...COMMON, listTasks, closeTask],
  sales: [...COMMON, addLead, moveLead, listLeads, salesReport],
  general: [...COMMON, listTasks, moneyReport, salesReport, listIdeas],
};

function toolsFor(dept) {
  const set = BY_DEPT[dept] || BY_DEPT.general;
  return {
    specs: set.map((t) => t.spec),
    run: async (ctx, name, input) => {
      const tool = set.find((t) => t.spec.name === name);
      if (!tool) return `Неизвестный инструмент: ${name}`;
      try {
        return await tool.run(ctx, input || {});
      } catch (e) {
        // Ошибку возвращаем модели текстом — она объяснит её клиенту
        // человеческим языком, вместо того чтобы диалог оборвался.
        console.error(`[jarvis] tool ${name}:`, e.message);
        return `Инструмент ${name} не сработал: ${e.message}`;
      }
    },
  };
}

module.exports = { toolsFor, BY_DEPT };
