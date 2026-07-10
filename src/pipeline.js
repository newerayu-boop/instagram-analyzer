// src/pipeline.js — полный цикл для ОДНОГО твита:
//   ссылка → fetch → generate (перевод+слайды) → render (PNG) → Telegram на аппрув
//
// Использование:
//   node src/pipeline.js "https://x.com/OriSilver/status/2074089635177746707"

const fs = require('fs');
const path = require('path');
const cfg = require('./config');
const { fetchTweet } = require('./fetchTweet');
const { generate } = require('./generate');
const { render } = require('../engine/render/render');
const { sendApproval } = require('./telegram');

async function processTweet(tweetUrl, chatId) {
  console.log('1/4 · Читаю твит…');
  const tweet = await fetchTweet(tweetUrl);
  console.log(`     @${tweet.handle} | ❤ ${tweet.likes} | «${tweet.title || tweet.text.slice(0, 60)}»`);

  console.log('2/4 · Генерирую карусель + текст (Claude)…');
  const { carousel, caption } = await generate(tweet);

  console.log('3/4 · Рендерю слайды…');
  const postId = tweet.id;
  const outDir = path.join(__dirname, '..', 'engine', 'out', postId);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'carousel.json'), JSON.stringify({ carousel, caption, source: tweet.url }, null, 2));
  await render(carousel, outDir);

  console.log('4/4 · Отправляю в Telegram на подтверждение…');
  await sendApproval({
    chatId, postId,
    sourceUrl: tweet.url,
    author: `${tweet.author} (${tweet.handle})`,
    slidesDir: outDir,
    caption,
  });

  console.log('✅ Готово. Пост', postId, 'ждёт аппрува в Telegram.');
  return { postId, outDir, caption, source: tweet.url };
}

if (require.main === module) {
  const url = process.argv[2];
  if (!url) { console.error('usage: node src/pipeline.js <tweet-url>'); process.exit(1); }
  processTweet(url).catch(e => { console.error('ОШИБКА:', e.message); process.exit(1); });
}

module.exports = { processTweet };
