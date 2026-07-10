// src/telegram.js — отправка карусели на подтверждение и приём кнопок
const fs = require('fs');
const path = require('path');
const cfg = require('./config');

const API = () => `https://api.telegram.org/bot${cfg.telegramToken}`;

async function tg(method, body) {
  const r = await fetch(`${API()}/${method}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  return r.json();
}

async function getUpdates(offset) {
  const r = await fetch(`${API()}/getUpdates${offset ? `?offset=${offset}` : ''}`);
  return r.json();
}

// Отправляет пакет на аппрув в порядке: источник → карусель → текст → кнопки
async function sendApproval({ chatId, postId, sourceUrl, author, slidesDir, caption }) {
  const chat = chatId || cfg.telegramAdminChatId;

  await tg('sendMessage', {
    chat_id: chat,
    text: `🆕 YANGI POST — tasdiqlashga\n\n📥 MANBA (haqiqiy tvit)\n👤 ${author}\n🔗 ${sourceUrl}`,
  });

  // альбом слайдов
  const files = fs.readdirSync(slidesDir).filter(f => f.endsWith('.png')).sort();
  const form = new FormData();
  form.append('chat_id', String(chat));
  const media = files.map((f, i) => ({
    type: 'photo',
    media: `attach://s${i}`,
    ...(i === 0 ? { caption: '🎨 KARUSEL' } : {}),
  }));
  form.append('media', JSON.stringify(media));
  files.forEach((f, i) => {
    const buf = fs.readFileSync(path.join(slidesDir, f));
    form.append(`s${i}`, new Blob([buf], { type: 'image/png' }), f);
  });
  await fetch(`${API()}/sendMediaGroup`, { method: 'POST', body: form });

  await tg('sendMessage', { chat_id: chat, text: `✍️ MATN\n\n${caption}` });

  // кнопки ✅ / ✏️ / ❌ — callback_data содержит postId
  await tg('sendMessage', {
    chat_id: chat,
    text: 'Tasdiqlaysizmi?',
    reply_markup: {
      inline_keyboard: [[
        { text: '✅ HA (Instagramga)', callback_data: `ok:${postId}` },
        { text: '❌ YO’Q', callback_data: `no:${postId}` },
      ]],
    },
  });
}

module.exports = { tg, getUpdates, sendApproval };
