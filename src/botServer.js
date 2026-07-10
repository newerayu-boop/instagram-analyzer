// src/botServer.js — long-poll бот: ловит кнопки ✅/⏳/❌ и ведёт очередь.
// Запускается, пока ноут открыт (наш сеанс). Обновляет data/queue.json и data/candidates.json.
//   ap = tasdiqlash (approved)  ⏳ lt = keyinroq (postponed)  ❌ rj = rad etish (rejected)
// Публикация в Instagram — отдельный шаг (после настройки Meta), тут только триаж.

const cfg = require('./config');
const { tg } = require('./telegram');
const store = require('./store');

const MAP = { ap: 'approved', lt: 'postponed', rj: 'rejected' };
const LABEL = { ap: '✅ Tasdiqlandi', lt: '⏳ Keyinga qoldirildi', rj: '❌ Rad etildi' };

async function handleCallback(cb) {
  const [action, id] = String(cb.data || '').split(':');
  const chatId = cb.message?.chat?.id, msgId = cb.message?.message_id;
  await tg('answerCallbackQuery', { callback_query_id: cb.id, text: LABEL[action] || 'OK' });
  const status = MAP[action];
  if (!status) return;

  // обновляем кандидата
  const cands = store.read('candidates.json', {});
  if (cands[id]) { cands[id].status = status; store.write('candidates.json', cands); }

  // обновляем очередь (id перемещается в нужный список)
  const q = store.read('queue.json', { approved: [], postponed: [], rejected: [] });
  for (const k of ['approved', 'postponed', 'rejected']) q[k] = (q[k] || []).filter(x => x !== id);
  q[status].push(id);
  store.write('queue.json', q);

  // убираем кнопки, дописываем решение
  const base = cb.message.text || '';
  await tg('editMessageText', { chat_id: chatId, message_id: msgId, text: `${base}\n\n— ${LABEL[action]}` });
  console.log(`[bot] ${id} → ${status}`);
}

async function main() {
  if (!cfg.telegramToken) { console.error('TELEGRAM_BOT_TOKEN yo‘q'); process.exit(1); }
  console.log('[bot] long-polling ishga tushdi…');
  let offset;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const r = await fetch(`https://api.telegram.org/bot${cfg.telegramToken}/getUpdates?timeout=30${offset ? `&offset=${offset}` : ''}`);
      const j = await r.json();
      for (const u of (j.result || [])) {
        offset = u.update_id + 1;
        if (u.callback_query) await handleCallback(u.callback_query);
      }
    } catch (e) {
      console.error('[bot] poll error:', e.message);
      await new Promise(res => setTimeout(res, 3000));
    }
  }
}

if (require.main === module) main();
module.exports = { handleCallback };
