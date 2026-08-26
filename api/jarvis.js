// POST /api/jarvis — вебхук Telegram. Единственная дверь в Jarvis.
//
// Задача этого файла — принять сообщение, проверить, что оно настоящее,
// и передать оркестратору. Здесь нет ни одной строчки про то, КАК думать —
// только про то, кого пускать и как отвечать.
//
// Три правила, без которых бот ломается в проде:
//   1. Всегда отвечаем Telegram кодом 200. Любой другой код = Telegram
//      будет слать это же сообщение снова и снова.
//   2. Проверяем секрет из заголовка. Иначе URL узнает кто угодно
//      и будет тратить ваши деньги на API.
//   3. Ловим дубли по update_id. Telegram повторяет доставку при таймауте.

const tg = require('../lib/jarvis/telegram');
const mem = require('../lib/jarvis/memory');
const orch = require('../lib/jarvis/orchestrator');
const { DEPARTMENTS } = require('../lib/jarvis/agents');
const { env, ALLOWED_IDS } = require('../lib/jarvis/config');

const HELP = `Я Jarvis — твой бизнес-ассистент. У меня четыре отдела:

📣 Маркетинг — идеи контента, хуки, реклама, привлечение
💰 Финансы — приход, расход, прибыль, где утекают деньги
⚙️ Операционка — задачи, процессы, команда, инструкции
🤝 Продажи — воронка, скрипты, возражения, закрытие сделок

Просто пиши обычными словами — я сам пойму, кто должен ответить.
Можно голосовым.

Примеры:
· потратил 300 тысяч на таргет
· клиент говорит дорого, что ответить
· придумай 5 идей для рилс
· что у меня по задачам

Команды:
/start — начать заново
/profil — что я знаю о твоём бизнесе
/reset — забыть историю разговора
/id — показать твой telegram id`;

// Принудительный выбор отдела: /marketing, /finance, /ops, /sales
const FORCED = { marketing: 'marketing', finance: 'finance', ops: 'ops', sales: 'sales' };

async function transcribe(fileId) {
  if (!process.env.OPENAI_API_KEY) return null;
  const url = await tg.getFileUrl(fileId);
  const audio = await fetch(url).then((r) => r.arrayBuffer());

  const form = new FormData();
  form.append('file', new Blob([audio], { type: 'audio/ogg' }), 'voice.oga');
  form.append('model', 'whisper-1');

  const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: form,
  });
  const data = await res.json();
  return data.text || null;
}

async function handleCommand(chatId, user, text) {
  const cmd = text.split(/[\s@]/)[0].toLowerCase();

  if (cmd === '/start') {
    await tg.sendMessage(chatId, `Салом, ${user.first_name || 'друг'}!\n\n${HELP}`);
    return true;
  }
  if (cmd === '/help') {
    await tg.sendMessage(chatId, HELP);
    return true;
  }
  if (cmd === '/id') {
    await tg.sendMessage(chatId, `Твой telegram id: ${user.id}\nДобавь его в JARVIS_ALLOWED_IDS, чтобы закрыть бота от чужих.`);
    return true;
  }
  if (cmd === '/profil' || cmd === '/profile') {
    const facts = await mem.loadFacts(user.id);
    const lines = Object.entries(facts).map(([k, v]) => `· ${k}: ${v}`);
    await tg.sendMessage(
      chatId,
      lines.length
        ? `Вот что я знаю о твоём бизнесе:\n${lines.join('\n')}`
        : 'Пока ничего не знаю. Расскажи, чем занимаешься — я запомню.',
    );
    return true;
  }
  if (cmd === '/reset') {
    await mem.saveMessage(user.id, 'user', '[история очищена]');
    await tg.sendMessage(chatId, 'Забыл предыдущий разговор. Факты о бизнесе оставил — их стирает только /forget.');
    return true;
  }
  return false;
}

module.exports = async (req, res) => {
  // GET — страница «жив ли бот». Открываешь в браузере и видишь ответ.
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.end(
      JSON.stringify({
        ok: true,
        service: 'jarvis',
        brain: Boolean(env.anthropicKey),
        telegram: Boolean(env.botToken),
        memory: mem.hasMemory(),
        secret: Boolean(env.webhookSecret),
        departments: Object.keys(DEPARTMENTS),
      }),
    );
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end('method not allowed');
  }

  // Подпись Telegram. Если секрет задан, но не совпал — это не Telegram.
  if (env.webhookSecret) {
    const got = req.headers['x-telegram-bot-api-secret-token'];
    if (got !== env.webhookSecret) {
      res.statusCode = 401;
      return res.end('unauthorized');
    }
  }

  const update = req.body || {};

  // Отвечаем Telegram сразу, ещё до тяжёлой работы? Нет —
  // на serverless функция засыпает после ответа. Поэтому работаем
  // синхронно, а от повторной доставки защищаемся дедупликацией.
  try {
    await processUpdate(update);
  } catch (e) {
    console.error('[jarvis] fatal:', e);
  }

  // Всегда 200: иначе Telegram зациклит доставку.
  res.statusCode = 200;
  return res.end('ok');
};

async function processUpdate(update) {
  const msg = update.message || update.edited_message;
  if (!msg || !msg.from || msg.from.is_bot) return;

  const chatId = msg.chat.id;
  const from = msg.from;

  // Дубль от Telegram — молча выходим.
  if (update.update_id && (await mem.isDuplicate(update.update_id))) {
    console.log('[jarvis] дубль update', update.update_id);
    return;
  }

  // Белый список. Пусто = пускаем всех (режим теста).
  if (ALLOWED_IDS.length && !ALLOWED_IDS.includes(String(from.id))) {
    await tg.sendMessage(chatId, `Доступ закрыт. Твой id: ${from.id} — передай его владельцу бота.`);
    return;
  }

  let text = (msg.text || msg.caption || '').trim();

  // Голосовое → текст.
  if (!text && (msg.voice || msg.audio)) {
    await tg.sendTyping(chatId);
    try {
      text = (await transcribe((msg.voice || msg.audio).file_id)) || '';
    } catch (e) {
      console.error('[jarvis] whisper:', e.message);
    }
    if (!text) {
      await tg.sendMessage(chatId, 'Не смог разобрать голосовое. Напиши, пожалуйста, текстом.');
      return;
    }
  }

  if (!text) {
    await tg.sendMessage(chatId, 'Пришли текст или голосовое — фото я пока не разбираю.');
    return;
  }

  if (text.startsWith('/') && (await handleCommand(chatId, from, text))) return;

  // /finance сколько я заработал → отдел выбран вручную
  let forcedDept = null;
  const m = text.match(/^\/(\w+)\s*/);
  if (m && FORCED[m[1]]) {
    forcedDept = FORCED[m[1]];
    text = text.slice(m[0].length).trim();
    if (!text) {
      await tg.sendMessage(chatId, `Отдел «${DEPARTMENTS[forcedDept].title}» слушает. Что нужно?`);
      return;
    }
  }

  // «Печатает…» держится 5 секунд, поэтому обновляем, пока думает модель.
  await tg.sendTyping(chatId);
  const keepTyping = setInterval(() => tg.sendTyping(chatId), 4500);

  try {
    const result = forcedDept
      ? await runForced(from, text, forcedDept)
      : await orch.handle(from, text);

    const d = DEPARTMENTS[result.dept] || DEPARTMENTS.general;
    await tg.sendMessage(chatId, `${d.emoji} ${d.title}\n\n${result.text}`);
  } finally {
    clearInterval(keepTyping);
  }
}

// Ручной выбор отдела идёт мимо маршрутизатора, но через ту же память.
async function runForced(from, text, dept) {
  const user = await mem.getUser(from);
  const [facts, history] = await Promise.all([
    mem.loadFacts(user.tg_id),
    mem.loadHistory(user.tg_id),
  ]);
  const result = await orch.runDepartment({
    dept,
    user,
    facts,
    history,
    text,
    deadline: Date.now() + 50000,
  });
  await Promise.all([
    mem.saveMessage(user.tg_id, 'user', text, dept),
    mem.saveMessage(user.tg_id, 'assistant', result.text, dept),
  ]).catch(() => {});
  return result;
}
