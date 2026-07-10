// src/candidates.js — отправляет варианты-кандидаты в Telegram с кнопками
// ✅ Tasdiqlash · ⏳ Keyinroq · ❌ Rad etish. Триаж ДО полной сборки — экономит токены.
const cfg = require('./config');
const { tg } = require('./telegram');
const store = require('./store');

async function sendCandidates(list, chatId) {
  const chat = chatId || cfg.telegramAdminChatId;
  const cands = store.read('candidates.json', {});

  await tg('sendMessage', { chat_id: chat, text: `🗂 ${list.length} ta variant keldi — har birini baholang 👇` });

  for (const c of list) {
    cands[c.id] = { ...c, status: 'pending' };
    const text =
      `🅰 VARIANT\n👤 ${c.handle} · ❤️ ${c.likes}\n\n📌 ${c.idea || c.title || c.text}\n\n🔗 ${c.url}`;
    await tg('sendMessage', {
      chat_id: chat,
      text,
      disable_web_page_preview: false,
      reply_markup: { inline_keyboard: [[
        { text: '✅ Tasdiqlash', callback_data: `ap:${c.id}` },
        { text: '⏳ Keyinroq', callback_data: `lt:${c.id}` },
        { text: '❌ Rad etish', callback_data: `rj:${c.id}` },
      ]] },
    });
  }
  store.write('candidates.json', cands);
  return list.length;
}

module.exports = { sendCandidates };

if (require.main === module) {
  // тест: node src/candidates.js  — отправит демо-варианты
  const demo = [
    { id: 't1', handle: '@demo', likes: 100, idea: 'Demo variant 1', url: 'https://x.com' },
  ];
  sendCandidates(demo).then(() => console.log('sent')).catch(e => console.error(e.message));
}
