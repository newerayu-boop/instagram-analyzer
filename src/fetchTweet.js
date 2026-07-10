// src/fetchTweet.js
// Читает публичный твит по ссылке/ID через embed-API Twitter (без логина, бесплатно).
// Возвращает { id, url, author, handle, likes, title, text, coverImg, isArticle }.
//
// Ограничение: для длинных X-статей отдаётся заголовок + первый абзац (preview).
// Полный текст статьи X прячет — для него нужен Apify (см. src/fetchTimeline.js).

function tweetIdFromUrl(input) {
  if (/^\d+$/.test(input)) return input;
  const m = String(input).match(/status\/(\d+)/) || String(input).match(/\/(\d{10,})/);
  return m ? m[1] : null;
}

function token(id) {
  return ((Number(id) / 1e15) * Math.PI).toString(36).replace(/(0+|\.)/g, '');
}

async function fetchTweet(input) {
  const id = tweetIdFromUrl(input);
  if (!id) throw new Error('Не удалось распознать ID твита из: ' + input);

  const url = `https://cdn.syndication.twimg.com/tweet-result?id=${id}&lang=en&token=${token(id)}`;
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!r.ok) throw new Error(`Twitter embed HTTP ${r.status} для твита ${id}`);
  const j = await r.json();

  const article = j.article || null;
  const media = (j.mediaDetails || []).map(m => m.media_url_https).filter(Boolean);

  return {
    id,
    url: `https://x.com/${j?.user?.screen_name}/status/${id}`,
    author: j?.user?.name || '',
    handle: '@' + (j?.user?.screen_name || ''),
    likes: j?.favorite_count || 0,
    title: article?.title || '',
    text: article?.preview_text || j?.text || '',
    coverImg: article?.cover_media?.media_info?.original_img_url || media[0] || null,
    isArticle: !!article,
    raw: j,
  };
}

module.exports = { fetchTweet, tweetIdFromUrl };
