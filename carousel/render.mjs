// carousel/render.mjs
// Рендерит карусель Instagram (1080x1350) в PNG-слайды.
// Использование:
//   NODE_PATH=/opt/node22/lib/node_modules node carousel/render.mjs <spec.json> [outDir]
//
// spec.json структура:
// {
//   "account": "mindset.daily",
//   "theme": {
//     "bg": "#F3EEE7", "fg": "#2B2B2B", "accent": "#C9765B",
//     "handle": "@mindset.daily",
//     "headingFont": "Georgia, 'Times New Roman', serif",
//     "bodyFont": "-apple-system, Segoe UI, Roboto, sans-serif"
//   },
//   "slides": [
//     { "type": "cover", "kicker": "5 признаков", "title": "Тихое выгорание", "subtitle": "которые легко пропустить" },
//     { "type": "point", "index": 1, "title": "Заголовок пункта", "body": "Текст пункта." },
//     { "type": "quote", "text": "Ты не ленивая. Ты уставшая." },
//     { "type": "cta", "title": "Сохрани, чтобы не потерять", "body": "Подпишись, чтобы не выгорать зря." }
//   ]
// }

import { readFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, basename } from 'path';
import { createRequire } from 'module';

// Находим playwright локально или в глобальных модулях (переносимо между средами)
async function loadChromium() {
  const pick = (m) => m?.chromium ?? m?.default?.chromium;
  // 1) require по глобальному пути (надёжнее всего в этой среде)
  const req = createRequire(import.meta.url);
  for (const p of ['playwright', '/opt/node22/lib/node_modules/playwright', '/opt/node22/lib/node_modules/playwright-core']) {
    try { const c = pick(req(p)); if (c) return c; } catch { /* дальше */ }
  }
  // 2) динамический import как запасной вариант
  for (const p of ['playwright', 'playwright-core']) {
    try { const c = pick(await import(p)); if (c) return c; } catch { /* дальше */ }
  }
  throw new Error('Не найден playwright. Установи: npm i -D playwright');
}
const chromium = await loadChromium();

const W = 1080, H = 1350;

const specPath = process.argv[2];
if (!specPath) {
  console.error('Укажи путь к spec.json: node carousel/render.mjs spec.json [outDir]');
  process.exit(1);
}
const spec = JSON.parse(readFileSync(specPath, 'utf8'));
const outDir = resolve(process.argv[3] || `carousel/output/${spec.account || 'post'}`);
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const t = {
  bg: '#F3EEE7', fg: '#2B2B2B', accent: '#C9765B',
  handle: '', headingFont: "Georgia, 'Times New Roman', serif",
  bodyFont: "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  ...(spec.theme || {}),
};

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function slideHTML(s, i, total) {
  const footer = t.handle
    ? `<div class="footer"><span>${esc(t.handle)}</span><span>${i + 1} / ${total}</span></div>`
    : `<div class="footer"><span></span><span>${i + 1} / ${total}</span></div>`;

  let inner = '';
  if (s.type === 'cover') {
    inner = `
      <div class="block">
        ${s.kicker ? `<div class="kicker">${esc(s.kicker)}</div>` : ''}
        <h1 class="cover-title">${esc(s.title)}</h1>
        ${s.subtitle ? `<div class="subtitle">${esc(s.subtitle)}</div>` : ''}
      </div>
      <div class="swipe">Листай →</div>`;
  } else if (s.type === 'point') {
    inner = `
      <div class="block">
        ${s.index != null ? `<div class="num">${esc(String(s.index).padStart(2, '0'))}</div>` : ''}
        <h2 class="point-title">${esc(s.title)}</h2>
        ${s.body ? `<p class="body">${esc(s.body)}</p>` : ''}
      </div>`;
  } else if (s.type === 'quote') {
    inner = `<div class="block center"><blockquote>${esc(s.text)}</blockquote></div>`;
  } else if (s.type === 'cta') {
    inner = `
      <div class="block center">
        <h2 class="cta-title">${esc(s.title)}</h2>
        ${s.body ? `<p class="body">${esc(s.body)}</p>` : ''}
        <div class="cta-btn">${esc(s.button || 'Подпишись')}</div>
      </div>`;
  } else {
    inner = `<div class="block"><p class="body">${esc(s.body || s.title || '')}</p></div>`;
  }

  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { margin:0; padding:0; box-sizing:border-box; }
    html,body { width:${W}px; height:${H}px; }
    .slide {
      width:${W}px; height:${H}px; background:${t.bg}; color:${t.fg};
      padding:110px 96px; display:flex; flex-direction:column;
      justify-content:space-between; position:relative; overflow:hidden;
      font-family:${t.bodyFont};
    }
    .accent-bar { position:absolute; top:0; left:0; width:100%; height:14px; background:${t.accent}; }
    .block { flex:1; display:flex; flex-direction:column; justify-content:center; }
    .block.center { align-items:flex-start; text-align:left; }
    .kicker { font-size:34px; font-weight:700; letter-spacing:3px; text-transform:uppercase;
      color:${t.accent}; margin-bottom:28px; }
    .cover-title { font-family:${t.headingFont}; font-size:104px; line-height:1.02; font-weight:800; }
    .subtitle { font-size:44px; margin-top:30px; opacity:.72; line-height:1.25; }
    .swipe { font-size:30px; font-weight:700; color:${t.accent}; }
    .num { font-family:${t.headingFont}; font-size:120px; font-weight:800; color:${t.accent}; opacity:.28; line-height:1; }
    .point-title { font-family:${t.headingFont}; font-size:70px; line-height:1.08; font-weight:800; margin-top:-30px; }
    .body { font-size:42px; line-height:1.42; margin-top:30px; opacity:.85; }
    blockquote { font-family:${t.headingFont}; font-size:78px; line-height:1.18; font-weight:800; }
    blockquote::before { content:'“'; color:${t.accent}; }
    blockquote::after { content:'”'; color:${t.accent}; }
    .cta-title { font-family:${t.headingFont}; font-size:76px; line-height:1.1; font-weight:800; }
    .cta-btn { margin-top:48px; display:inline-block; background:${t.accent}; color:${t.bg};
      font-size:40px; font-weight:800; padding:26px 54px; border-radius:60px; }
    .footer { display:flex; justify-content:space-between; font-size:28px; opacity:.55; font-weight:600; }
  </style></head><body>
    <div class="slide"><div class="accent-bar"></div>${inner}${footer}</div>
  </body></html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
const total = spec.slides.length;
const files = [];
for (let i = 0; i < total; i++) {
  await page.setContent(slideHTML(spec.slides[i], i, total), { waitUntil: 'networkidle' });
  const file = `${outDir}/slide-${String(i + 1).padStart(2, '0')}.png`;
  await page.screenshot({ path: file });
  files.push(file);
  console.log('✓', basename(file));
}
await browser.close();
console.log(`\nГотово: ${files.length} слайдов → ${outDir}`);
