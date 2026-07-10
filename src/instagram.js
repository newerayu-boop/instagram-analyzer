// src/instagram.js — публикация карусели через Instagram Graph API
// Требует: IG_BUSINESS_ACCOUNT_ID, IG_ACCESS_TOKEN (долгоживущий), Business-аккаунт + FB Page.
// ВАЖНО: картинки должны быть доступны по ПУБЛИЧНЫМ https-URL (PUBLIC_BASE_URL).
//
// Поток Graph API:
//   1) для каждого слайда: POST /{ig-user}/media (image_url, is_carousel_item=true) → creation_id
//   2) POST /{ig-user}/media (media_type=CAROUSEL, children=[...]) → container_id
//   3) POST /{ig-user}/media_publish (creation_id=container_id) → media_id

const cfg = require('./config');
const GRAPH = 'https://graph.facebook.com/v21.0';

async function fb(pathname, params) {
  const body = new URLSearchParams({ ...params, access_token: cfg.ig.token });
  const r = await fetch(`${GRAPH}/${pathname}`, { method: 'POST', body });
  const j = await r.json();
  if (j.error) throw new Error('IG Graph error: ' + JSON.stringify(j.error));
  return j;
}

// imageUrls — массив публичных https-URL слайдов (по порядку)
async function publishCarousel(imageUrls, caption) {
  if (!cfg.ig.userId || !cfg.ig.token) throw new Error('IG_BUSINESS_ACCOUNT_ID / IG_ACCESS_TOKEN не заданы');
  if (!imageUrls.length) throw new Error('Нет изображений для публикации');

  // 1) контейнеры слайдов
  const children = [];
  for (const url of imageUrls) {
    const c = await fb(`${cfg.ig.userId}/media`, {
      image_url: url,
      is_carousel_item: 'true',
    });
    children.push(c.id);
  }

  // 2) контейнер карусели
  const container = await fb(`${cfg.ig.userId}/media`, {
    media_type: 'CAROUSEL',
    children: children.join(','),
    caption: caption || '',
  });

  // 3) публикация
  const published = await fb(`${cfg.ig.userId}/media_publish`, {
    creation_id: container.id,
  });
  return published.id; // ig media id
}

module.exports = { publishCarousel };
