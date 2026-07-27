// POST /api/tasks-inbox — вебхук Telegram-бота: идеи в инбокс дашборда.
//
// «Идея за 30 секунд»: личное сообщение боту — идея целиком; сообщение в
// отдельном чате идей (env IDEAS_CHAT_ID) — идея целиком; в любом другом
// чате — только по префиксу «идея: …» / «idea: …» / «#идея …».
// Разбор инбокса — раз в день на триаже (вкладка «Идеи» дашборда).
//
// Отвечаем всегда 200: на не-2xx Telegram повторяет доставку до упора.
// Если задан TG_WEBHOOK_SECRET, сверяем его с заголовком вебхука.

const SUPABASE_URL = 'https://hsqlrzydeokhwmddhtik.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzcWxyenlkZW9raHdtZGRodGlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxODMwODcsImV4cCI6MjA5ODc1OTA4N30.tn-yb7LbwIM7Et2h37qVdUuQLsi49yufdBB8tneHdjw';
const TIMEOUT_MS = 8000;

// «идея: …», «идея — …», «idea: …», «#идея …»
const PREFIX_RE = /^(?:#идея|идея|idea)\s*[:—–-]\s*/i;

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);
}

async function storeIdea(text, author) {
  const r = await withTimeout(fetch(SUPABASE_URL + '/rest/v1/dash_ideas', {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON,
      Authorization: 'Bearer ' + SUPABASE_ANON,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      text: text.slice(0, 2000),
      author: String(author || 'Telegram').slice(0, 100),
      source: 'telegram',
    }),
  }), TIMEOUT_MS);
  if (!r.ok) throw new Error('postgrest ' + r.status + ': ' + (await r.text()).slice(0, 300));
}

// Ответ в чат — не критичен, сбой только логируем
async function reply(msg, text) {
  const token = process.env.TASKS_BOT_TOKEN;
  if (!token) return;
  try {
    await withTimeout(fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: msg.chat.id,
        text,
        reply_parameters: { message_id: msg.message_id },
      }),
    }), TIMEOUT_MS);
  } catch (e) {
    console.error('inbox reply failed:', e && e.message);
  }
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const send = (obj) => { res.statusCode = 200; res.end(JSON.stringify(obj)); };

  if (req.method !== 'POST') return send({ ok: true, endpoint: 'tasks-inbox' });

  const secret = process.env.TG_WEBHOOK_SECRET;
  if (secret && req.headers['x-telegram-bot-api-secret-token'] !== secret) {
    return send({ ok: false, error: 'unauthorized' });
  }

  try {
    const upd = req.body || {};
    const msg = upd.message;
    const text = msg && typeof msg.text === 'string' ? msg.text.trim() : '';
    if (!msg || !text) return send({ ok: true, skipped: true });

    const isPrivate = msg.chat && msg.chat.type === 'private';
    const chatId = String((msg.chat && msg.chat.id) || '');
    const ideasChat = process.env.IDEAS_CHAT_ID ? String(process.env.IDEAS_CHAT_ID) : '';

    if (isPrivate && text.indexOf('/start') === 0) {
      await reply(msg, 'Пишите идеи обычным сообщением — я положу их в инбокс дашборда. Разбор — раз в день на триаже.');
      return send({ ok: true });
    }
    if (text.charAt(0) === '/') return send({ ok: true, skipped: true });

    let idea = '';
    if (isPrivate || (ideasChat && chatId === ideasChat)) {
      idea = text;
    } else {
      const m = text.match(PREFIX_RE);
      if (m) idea = text.slice(m[0].length).trim();
    }
    if (!idea) return send({ ok: true, skipped: true });

    const from = msg.from || {};
    const author = [from.first_name, from.last_name].filter(Boolean).join(' ') || from.username || 'Telegram';
    await storeIdea(idea, author);
    await reply(msg, '✅ Идея в инбоксе');
    return send({ ok: true });
  } catch (e) {
    console.error('tasks-inbox failed:', e && e.message);
    return send({ ok: false, error: 'store_failed' });
  }
};
