// engine/vibecode/build.cjs
// «vibecoder_qiz» карусель — точный контент 5 слайдов пользователя,
// новый брендинг (vibe code / vibecoder_qiz), лёгкий редизайн, те же тёплые цвета.
// Рендер 1080x1350 → PNG через Playwright, затем отправка в Telegram-бот.

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const cfg = require('../../src/config');

const WIDTH = 1080, HEIGHT = 1350;
const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";
const WORDMARK = 'vibe code';
const HANDLE = 'vibecoder_qiz';

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (t = '') => esc(t)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\*(.+?)\*/g, '<em class="acc">$1</em>');

const TOTAL = 5;
const page = (i) => `${String(i + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`;

const dots = (i) => `<div class="dots">${
  Array.from({ length: TOTAL }, (_, k) => `<span class="dot ${k === i ? 'on' : ''}"></span>`).join('')
}</div>`;

// маленькая «искра» — фирменный элемент (новый акцент)
const spark = `<svg class="spk" viewBox="0 0 24 24" fill="none"><path d="M12 1l2.2 7.4L21.5 6l-5.1 5.6 6.6 3.4-7.6.5 2.3 7.4L12 17l-5.7 5.9 2.3-7.4L1 15l6.6-3.4L2.5 6l7.3 2.4z" fill="var(--accent)"/></svg>`;

// солнце-старберст для обложки
function sunburst() {
  const rays = Array.from({ length: 44 }, (_, i) => {
    const a = (i / 44) * Math.PI * 2;
    const r1 = 88, r2 = i % 2 ? 200 : 150;
    const w = 0.016;
    const x1 = 250 + Math.cos(a - w) * r1, y1 = 250 + Math.sin(a - w) * r1;
    const x2 = 250 + Math.cos(a) * r2, y2 = 250 + Math.sin(a) * r2;
    const x3 = 250 + Math.cos(a + w) * r1, y3 = 250 + Math.sin(a + w) * r1;
    return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)} L${x3.toFixed(1)} ${y3.toFixed(1)} Z" fill="var(--accent)"/>`;
  }).join('');
  return `<svg class="sun" viewBox="0 0 500 500" fill="none">${rays}<circle cx="250" cy="250" r="82" fill="var(--bg)"/><circle cx="250" cy="250" r="82" fill="none" stroke="var(--accent)" stroke-width="6"/></svg>`;
}

const kicker = (t) => `<div class="kicker"><span class="ktick"></span>${esc(t)}</div>`;

function footer(i, dark) {
  return `<div class="rule"></div>
  <div class="footer">
    <div class="fl">${spark}<span class="wm">${esc(WORDMARK)}</span></div>
    ${dots(i)}
    <div class="fr">${esc(HANDLE)}</div>
  </div>`;
}

// ── слайды ────────────────────────────────────────────────────────────
function cover(i) {
  return `<section class="slide light cover">
    <div class="topline"><span class="page">${page(i)}</span></div>
    <div class="sun-wrap">${sunburst()}</div>
    <div class="cover-body">
      ${kicker('CLAUDE · YASHIRIN FUNKSIYALAR')}
      <h1 class="cover-title">Odamlarning 90%i Claude'dan <span class="acc">noto'g'ri</span> foydalanadi</h1>
      <p class="cover-sub">Ehtimol, siz ham shulardan birisiz. Aslida u 24/7 ishlaydigan AI xodimga aylanishi mumkin.</p>
      <div class="swipe">VARAQLANG <span>→</span></div>
    </div>
    ${dots(i)}
  </section>`;
}

function listSlide(i) {
  const items = [
    { t: 'savol berdingiz', dim: false },
    { t: 'javob oldingiz', dim: false },
    { t: 'chatni yopdingiz', dim: true },
  ].map(it => `<div class="lcard ${it.dim ? 'dim' : ''}"><span class="ldot"></span><span class="ltext">${esc(it.t)}</span></div>`).join('');
  return `<section class="slide light">
    <div class="top">${kicker('SIZ ODATDA NIMA QILASIZ?')}<span class="page">${page(i)}</span></div>
    <h2 class="h">Siz odatda<br>shunday qilasiz:</h2>
    <div class="lcards">${items}</div>
    <div class="punch">Bu – xuddi Ferrarida birinchi tezlikda yurgandek.</div>
    ${footer(i)}
  </section>`;
}

function darkStory(i) {
  return `<section class="slide dark mid">
    <div class="top">${kicker('ENG MUHIMI')}<span class="page">${page(i)}</span></div>
    <div class="grow">
      <h2 class="h big">Claude ichida<br><span class="acc">17 ta yashirin</span><br>funksiya bor</h2>
      <p class="body">Ular sizga <strong>24/7 ishlaydigan AI xodim</strong> yasab beradi. Mana eng kuchli 4 tasi:</p>
    </div>
    ${footer(i, true)}
  </section>`;
}

function featureSlide(i, kick, titleHTML, body, cardHTML) {
  return `<section class="slide light">
    <div class="top">${kicker(kick)}<span class="page">${page(i)}</span></div>
    <div class="grow center">
      <h2 class="h">${titleHTML}</h2>
      <p class="body">${body}</p>
      <div class="hcard"><span class="hbar"></span><span class="hdot"></span><span class="htext">${cardHTML}</span></div>
    </div>
    ${footer(i)}
  </section>`;
}

const slides = [
  cover(0),
  listSlide(1),
  darkStory(2),
  featureSlide(3, 'FUNKSIYA 01 · PROJECTS',
    `Claude <span class="acc">biznesingizni</span><br>eslab qoladi`,
    `Hujjatlaringizni bir marta yuklaysiz — har suhbat tayyor ma'lumot bilan boshlanadi.`,
    `Har safar boshidan tushuntirish shart emas.`),
  featureSlide(4, 'FUNKSIYA 02 · MEMORY',
    `Claude <span class="acc">sizni taniydi</span>`,
    `Kimligingiz, biznesingiz va yozish uslubingiz — hammasi yodida.`,
    `Endi «men falonchiman, biznesim bunday...» deb tushuntirish shart emas.`),
];

function html() {
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700;1,800&family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{
    --bg:#E7E3DA; --ink:#23211C; --muted:#6F6B61; --accent:#C8613B;
    --card:#F7F4ED; --line:#D7D2C6;
    width:${WIDTH}px;height:${HEIGHT}px;position:relative;overflow:hidden;
    background:var(--bg);color:var(--ink);font-family:${SANS};
    padding:82px 78px 100px;display:flex;flex-direction:column;}
  .slide.dark{
    --bg:#2A251F; --ink:#EFE8DD; --muted:#A79E90; --accent:#D2703F;
    --card:#37312A; --line:#41392F;}
  .slide::after{content:'';position:absolute;inset:0;pointer-events:none;
    background:radial-gradient(880px 460px at 92% 4%, color-mix(in srgb,var(--accent) 12%, transparent), transparent 60%);}
  .slide>*{position:relative;z-index:1;}
  .mid{justify-content:flex-start;}
  .acc{color:var(--accent);font-style:normal;}
  strong{font-weight:800;color:var(--ink);}
  .grow{flex:1;display:flex;flex-direction:column;}
  .grow.center{justify-content:center;gap:6px;}

  .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:34px;}
  .topline{display:flex;justify-content:flex-start;}
  .kicker{display:flex;align-items:center;gap:16px;font-weight:800;font-size:26px;
    letter-spacing:.2em;text-transform:uppercase;color:var(--accent);}
  .ktick{width:30px;height:4px;border-radius:3px;background:var(--accent);}
  .page{font-weight:600;font-size:27px;letter-spacing:.14em;color:var(--muted);}

  /* cover */
  .cover{padding-top:64px;}
  .sun-wrap{position:absolute;right:-70px;top:-90px;width:560px;height:560px;z-index:0;}
  .sun{width:100%;height:100%;}
  .cover-body{margin-top:auto;}
  .cover .kicker{font-size:27px;margin-bottom:26px;}
  .cover-title{font-family:${SERIF};font-weight:800;font-size:112px;line-height:1.0;
    letter-spacing:-.02em;max-width:920px;}
  .cover-sub{margin-top:30px;font-size:39px;line-height:1.36;color:var(--muted);max-width:820px;}
  .swipe{margin-top:38px;font-weight:800;font-size:27px;letter-spacing:.16em;
    text-transform:uppercase;color:var(--accent);display:flex;align-items:center;gap:14px;}
  .swipe span{font-size:30px;}

  .h{font-family:${SERIF};font-weight:800;font-size:80px;line-height:1.05;margin:0;}
  .h.big{font-size:92px;line-height:1.06;}
  .h .acc{color:var(--accent);font-style:normal;}
  .body{font-size:40px;line-height:1.42;color:var(--muted);margin-top:26px;max-width:900px;}
  .body strong{color:var(--ink);font-weight:800;}
  .slide.dark .body strong{color:var(--ink);}

  .punch{margin-top:auto;font-family:${SERIF};font-style:italic;font-weight:700;
    font-size:62px;color:var(--accent);line-height:1.12;}

  /* list cards */
  .lcards{margin-top:44px;display:flex;flex-direction:column;gap:26px;}
  .lcard{display:flex;align-items:center;gap:26px;background:var(--card);
    border-radius:26px;padding:38px 42px;box-shadow:0 18px 40px -26px rgba(35,33,28,.45);}
  .lcard .ldot{width:22px;height:22px;border-radius:50%;background:var(--accent);flex:0 0 auto;}
  .lcard .ltext{font-size:44px;font-weight:500;color:var(--ink);}
  .lcard.dim{box-shadow:none;background:color-mix(in srgb,var(--card) 70%, var(--bg));}
  .lcard.dim .ldot{background:color-mix(in srgb,var(--accent) 34%, var(--bg));}
  .lcard.dim .ltext{color:var(--muted);}

  /* highlight card (features) */
  .hcard{margin-top:44px;display:flex;align-items:center;gap:26px;position:relative;
    background:var(--card);border-radius:26px;padding:40px 44px 40px 46px;
    box-shadow:0 20px 46px -28px rgba(35,33,28,.5);overflow:hidden;}
  .hcard .hbar{position:absolute;left:0;top:0;bottom:0;width:10px;background:var(--accent);}
  .hcard .hdot{width:22px;height:22px;border-radius:50%;background:var(--accent);flex:0 0 auto;margin-left:8px;}
  .hcard .htext{font-family:${SERIF};font-weight:800;font-size:44px;line-height:1.24;color:var(--ink);}

  /* footer */
  .rule{margin-top:auto;height:1px;background:var(--line);opacity:.8;}
  .footer{margin-top:30px;display:flex;align-items:center;justify-content:space-between;}
  .fl{display:flex;align-items:center;gap:14px;}
  .spk{width:34px;height:34px;}
  .wm{font-family:${SERIF};font-weight:800;font-size:37px;color:var(--ink);}
  .fr{font-weight:600;font-size:32px;color:var(--muted);}
  .dots{display:flex;gap:11px;}
  .cover>.dots{position:absolute;left:0;right:0;bottom:52px;justify-content:center;}
  .dot{width:12px;height:12px;border-radius:50%;background:var(--muted);opacity:.32;}
  .dot.on{background:var(--accent);opacity:1;width:30px;border-radius:6px;}
  </style></head><body>
  ${slides.join('\n')}
  </body></html>`;
}

async function render(outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || cfg.chromiumPath || undefined });
  const pg = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 2 });
  await pg.setContent(html(), { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts && document.fonts.ready);
  await pg.waitForTimeout(400);
  const secs = await pg.$$('.slide');
  const files = [];
  for (let i = 0; i < secs.length; i++) {
    const f = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    await secs[i].screenshot({ path: f });
    files.push(f);
  }
  await browser.close();
  return files;
}

if (require.main === module) {
  const outDir = process.argv[2] || path.join(__dirname, 'out');
  render(outDir).then(f => console.log('Rendered:\n' + f.join('\n')))
    .catch(e => { console.error(e); process.exit(1); });
}

module.exports = { render, html };
