// src/fetchTimeline.js
// Автосбор твитов из Twitter через Apify (реальный, живой контент).
// Умеет: тянуть по аккаунтам (from:handle) и по ключевым словам (поиск).
// Фильтрует ответы/ретвиты/служебные, сортирует по лайкам, отдаёт лучшие.

const cfg = require('./config');
const ACTOR = process.env.APIFY_TWEET_ACTOR || 'kaitoeasyapi~twitter-x-data-tweet-scraper-pay-per-result-cheapest';

async function runActor(input) {
  const url = `https://api.apify.com/v2/acts/${ACTOR}/run-sync-get-dataset-items?token=${cfg.apifyToken}`;
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!r.ok) throw new Error(`Apify HTTP ${r.status}: ${await r.text()}`);
  const items = await r.json();
  return Array.isArray(items) ? items : [];
}

function clean(items) {
  return items
    .filter(t => {
      const txt = t.text || t.fullText || '';
      if (!txt) return false;
      if (/KaitoEasyAPI|minimum charge|reminder:/i.test(txt)) return false; // служебные заглушки
      if (txt.trim().startsWith('@')) return false;                          // ответы
      if (t.isReply || t.isRetweet) return false;
      return true;
    })
    .map(t => ({
      id: t.id || (t.url || '').split('/').pop(),
      url: t.url || t.twitterUrl,
      author: t.author?.name || '',
      handle: '@' + (t.author?.userName || ''),
      likes: t.likeCount ?? 0,
      retweets: t.retweetCount ?? 0,
      views: t.viewCount ?? 0,
      createdAt: t.createdAt || t.created_at || '',
      text: (t.text || t.fullText || '').trim(),
      isArticle: !!(t.article || t.card?.article),
    }))
    .sort((a, b) => b.likes - a.likes);
}

// Топовые твиты с аккаунтов за последние дни
async function fromAccounts(handles, perAccount = 15) {
  const searchTerms = handles.map(h => `from:${String(h).replace(/^@/, '')}`);
  const items = await runActor({ searchTerms, maxItems: perAccount * handles.length, sort: 'Latest', tweetLanguage: 'en' });
  return clean(items);
}

// Поиск по ключевым словам (например, «AI tool for business»)
async function search(queries, maxItems = 30) {
  const items = await runActor({ searchTerms: queries, maxItems, sort: 'Top', tweetLanguage: 'en' });
  return clean(items);
}

module.exports = { fromAccounts, search, runActor };

if (require.main === module) {
  const handles = process.argv.slice(2);
  if (!handles.length) { console.error('usage: node src/fetchTimeline.js <handle> [handle...]'); process.exit(1); }
  fromAccounts(handles).then(list => {
    console.log(`Найдено ${list.length} содержательных твитов:\n`);
    list.slice(0, 12).forEach((t, i) =>
      console.log(`${i + 1}. ${t.handle} ❤${t.likes} — ${t.text.replace(/\n/g, ' ').slice(0, 120)}\n   ${t.url}\n`));
  }).catch(e => { console.error(e.message); process.exit(1); });
}
