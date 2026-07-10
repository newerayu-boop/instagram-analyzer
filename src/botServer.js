// src/botServer.js — приём кнопок Telegram (✅/❌) и автопубликация в Instagram.
// Запускается 24/7 на хостинге. Long-polling (getUpdates), без вебхуков — проще в деплое.
//
// При ✅ берёт слайды поста, поднимает публичные URL (PUBLIC_BASE_URL/out/<postId>/slide-XX.png)
// и публикует карусель в Instagram. Пишет статус обратно в чат.

const fs = require('fs');
const path = require('path');
const cfg = require('./config');
const { tg } = require('./telegram');
const { publishCarousel } = require('./instagram');

function slidesPublicUrls(postId) {
  const dir = path.join(__dirname, '..', 'engine', 'out', postId);
  const files = fs.readdirSync(dir).filter(f => /^slide-\d+\.png$/.test(f)).sort();
  return files.map(f => `${cfg.publicBaseUrl.replace(/\/$/, '')}/out/${postId}/${f}`);
}

function captionFor(postId) {
  const p = path.join(__dirname, '..', 'engine', 'out', postId, 'carousel.json');
  return JSON.parse(fs.readFileSync(p, 'utf8')).caption || '';
}

async function handleCallback(cb) {
  const [action, postId] = String(cb.data || '').split(':');
  const chatId = cb.message?.chat?.id;
  await tg('answerCallbackQuery', { callback_query_id: cb.id });

  if (action === 'no') {
    await tg('sendMessage', { chat_id: chatId, text: `❌ Post ${postId} bekor qilindi.` });
    return;
  }
  if (action === 'ok') {
    await tg('sendMessage', { chat_id: chatId, text: `⏳ Instagramga chiqaryapman…` });
    try {
      const urls = slidesPublicUrls(postId);
      const mediaId = await publishCarousel(urls, captionFor(postId));
      await tg('sendMessage', { chat_id: chatId, text: `✅ Chop etildi! Instagram media id: ${mediaId}` });
    } catch (e) {
      await tg('sendMessage', { chat_id: chatId, text: `⚠️ Xato: ${e.message}` });
    }
  }
}

async function main() {
  console.log('Bot ishga tushdi (long-polling). Kutyapman…');
  let offset;
  // бесконечный цикл опроса
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
      console.error('poll error:', e.message);
      await new Promise(res => setTimeout(res, 3000));
    }
  }
}

if (require.main === module) main();
module.exports = { handleCallback };
