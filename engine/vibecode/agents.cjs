// engine/vibecode/agents.cjs
// «vibecoder_qiz» — AI-agentlar karusel (9 slayd, hozircha 1-5).
// Dizayn/ranglar o'zgarmaydi. Rebrand:
//   footer wordmark: Claude → vibe code
//   footer handle:   AI Strategiya → vibecoder_qiz
// Render 1080x1350 → PNG (Playwright).

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const cfg = require('../../src/config');

const W = 1080, H = 1350;
const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";
const WORDMARK = 'vibe code';
const HANDLE = 'vibecoder_qiz';
const TOTAL = 9;

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pg = (i) => `${String(i + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`;
const dots = (i) => `<div class="dots">${Array.from({ length: TOTAL }, (_, k) => `<span class="dot ${k === i ? 'on' : ''}"></span>`).join('')}</div>`;
const kicker = (t) => `<div class="kicker">${t}</div>`;
const spark = `<svg class="spk" viewBox="0 0 24 24"><path d="M12 1l2.2 7.4L21.5 6l-5.1 5.6 6.6 3.4-7.6.5 2.3 7.4L12 17l-5.7 5.9 2.3-7.4L1 15l6.6-3.4L2.5 6l7.3 2.4z" fill="var(--accent)"/></svg>`;
const footer = (i) => `<div class="rule"></div>
  <div class="footer"><div class="fl">${spark}<span class="wm">${esc(WORDMARK)}</span></div>${dots(i)}<div class="fr">${esc(HANDLE)}</div></div>`;
const topbar = (k, i) => `<div class="top">${kicker(k)}<span class="page">${pg(i)}</span></div>`;
const hcard = (html) => `<div class="hcard"><span class="hdot"></span><span class="htext">${html}</span></div>`;

// robot line-art
function robot(cls) {
  return `<svg class="robot ${cls}" viewBox="0 0 320 370" fill="none">
    <line x1="150" y1="70" x2="150" y2="42"/><circle class="dot" cx="150" cy="35" r="9"/>
    <rect x="90" y="70" width="120" height="100" rx="24"/>
    <rect x="74" y="100" width="13" height="38" rx="6"/><rect x="213" y="100" width="13" height="38" rx="6"/>
    <circle cx="126" cy="116" r="16"/><circle class="dot" cx="126" cy="116" r="6"/>
    <circle cx="176" cy="116" r="16"/><circle cx="176" cy="116" r="5"/>
    <path d="M120 150 h60 M126 143 v16 M138 143 v16 M150 143 v16 M162 143 v16 M174 143 v16"/>
    <path d="M210 108 L272 88"/><circle cx="281" cy="85" r="11"/>
    <path d="M210 122 L300 142"/><circle class="dot" cx="308" cy="144" r="9"/>
    <rect x="100" y="200" width="100" height="92" rx="20"/>
    <rect x="120" y="216" width="60" height="40" rx="10"/><circle class="dot" cx="150" cy="236" r="8"/>
    <circle cx="130" cy="274" r="6"/><circle cx="150" cy="274" r="6"/><circle cx="170" cy="274" r="6"/>
    <path d="M100 216 L70 250"/><circle cx="64" cy="256" r="10"/>
    <path d="M200 216 L232 250"/><circle cx="238" cy="256" r="10"/>
  </svg>`;
}

// ── slaydlar ──────────────────────────────────────────────
function s1() {
  return `<section class="slide light cover">
    ${topbar('AI-AGENTLAR &middot; 2026', 0)}
    ${robot('r-cover')}
    <div class="cover-body">
      <h1 class="cover-title">Bitta AI emas —<br>AI'lar jamoasi<br><span class="acc">ishlasin</span></h1>
      <p class="cover-sub">AI-agent nima va nega u pul tejaydi? <strong>Hech narsa bilmasangiz ham</strong> — boshidan tushuntiramiz.</p>
      <div class="swipe"><span>&rarr;</span> oxirigacha suring</div>
    </div>
    ${footer(0)}
  </section>`;
}

function s2() {
  return `<section class="slide dark">
    ${topbar('ODDIY TILDA', 1)}
    ${robot('r-corner')}
    <div class="grow center">
      <h2 class="h">AI-agent —<br><span class="acc">o'zi ishlaydigan</span><br>yordamchi</h2>
      <p class="body">Oddiy AI savolga <strong>javob beradi.</strong> Agent esa vazifani <strong>o'zi bajaradi</strong>: o'qiydi, qidiradi, yozadi — sizsiz.</p>
      ${hcard(`Javob emas — natija beradi.`)}
    </div>
    ${footer(1)}
  </section>`;
}

function s3() {
  return `<section class="slide light">
    ${topbar('NEGA JAMOA', 2)}
    ${robot('r-corner')}
    <div class="grow center">
      <h2 class="h">Yolg'iz emas —<br><span class="acc">jamoa arzonroq</span></h2>
      <p class="body">Har ishning atigi <strong>10%i</strong> o'ylashni talab qiladi. Qolgan <strong>90%</strong> — oddiy o'qish va yozish.</p>
      ${hcard(`1 «aql» + bir nechta «qo'l».`)}
    </div>
    ${footer(2)}
  </section>`;
}

function s4() {
  const circles = ['1', '2', '3'].map(n => `<div class="dnode"><div class="dcirc">${n}</div><div class="dlabel">yordamchi</div></div>`).join('');
  const lines = Array.from({ length: 3 }, (_, i) => {
    const x = ((i + 0.5) / 3) * 100;
    return `<line x1="50" y1="0" x2="${x.toFixed(1)}" y2="100" stroke="var(--accent)" stroke-width="1.6" vector-effect="non-scaling-stroke"/>`;
  }).join('');
  const diagram = `<div class="diag">
    <div class="dtop"><b>DIREKTOR</b><span>o'ylaydi &middot; tekshiradi</span></div>
    <svg class="dlines" viewBox="0 0 100 100" preserveAspectRatio="none">${lines}</svg>
    <div class="dnodes">${circles}</div>
    <div class="dcap">oddiy ishni bir vaqtda bajaradi</div>
  </div>`;
  return `<section class="slide dark">
    ${topbar('QANDAY ISHLAYDI', 3)}
    <h2 class="h">Ish shunday<br><span class="acc">bo'linadi</span></h2>
    ${diagram}
    ${hcard(`Boshliq faqat qisqa hisobotni o'qiydi.`)}
    ${footer(3)}
  </section>`;
}

function s5() {
  const roles = [
    [`Boshliq — kuchli model`, `Reja tuzadi, ishni bo'ladi, natijani birlashtiradi va tekshiradi.`],
    [`Ishchi — o'rtacha model`, `Oddiy ishlar: o'qish, qidirish va yozish.`],
    [`Yordamchi — arzon model`, `Matnni saralaydi, kerakli joyni ajratib oladi.`],
  ].map(([t, s]) => `<div class="role"><span class="rdot"></span><div><b>${esc(t)}</b><span>${esc(s)}</span></div></div>`).join('');
  return `<section class="slide light">
    ${topbar('JAMOADA 3 TA ROL', 4)}
    ${robot('r-corner')}
    <h2 class="h">Kim nima qiladi</h2>
    <div class="roles">${roles}</div>
    ${hcard(`Arzon ishchilar — bir vaqtda ishlaydi.`)}
    ${footer(4)}
  </section>`;
}

const slides = [s1(), s2(), s3(), s4(), s5()];

function html() {
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{--bg:#E7E3DA; --ink:#23211C; --muted:#6F6B61; --accent:#C8613B; --line:#D7D2C6;
    --card:#F5F2EC; --illus:#CBC5B8;
    width:${W}px;height:${H}px;position:relative;overflow:hidden;background:var(--bg);color:var(--ink);
    font-family:${SANS};padding:82px 78px 100px;display:flex;flex-direction:column;}
  .slide.dark{--bg:#2A251F; --ink:#EFE8DD; --muted:#A79E90; --accent:#CE6B3E; --line:#41392F;
    --card:#37312A; --illus:#453B31;}
  .slide>*{position:relative;z-index:1;}
  .acc{color:var(--accent);font-style:normal;}
  strong{font-weight:800;color:var(--ink);}
  .grow{flex:1;display:flex;flex-direction:column;}
  .grow.center{justify-content:center;gap:4px;}

  .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:34px;}
  .kicker{font-weight:800;font-size:26px;letter-spacing:.24em;text-transform:uppercase;color:var(--accent);}
  .page{font-weight:600;font-size:27px;letter-spacing:.14em;color:var(--muted);}

  /* robot */
  .robot{position:absolute;stroke:var(--illus);fill:none;stroke-width:3.4;stroke-linecap:round;stroke-linejoin:round;z-index:0;}
  .robot .dot{fill:var(--accent);stroke:none;}
  .r-cover{right:34px;top:330px;width:520px;height:600px;}
  .r-corner{right:-30px;bottom:120px;width:340px;height:392px;opacity:.5;}

  /* cover */
  .cover-body{margin-top:auto;}
  .cover-title{font-family:${SERIF};font-weight:800;font-size:96px;line-height:1.0;letter-spacing:-.02em;max-width:760px;}
  .cover-title .acc{color:var(--accent);}
  .cover-sub{margin-top:28px;font-size:38px;line-height:1.35;color:var(--muted);max-width:760px;}
  .cover-sub strong{color:var(--ink);font-weight:800;}
  .swipe{margin-top:36px;font-weight:800;font-size:30px;color:var(--accent);display:flex;align-items:center;gap:14px;}

  .h{font-family:${SERIF};font-weight:800;font-size:82px;line-height:1.04;margin:0;}
  .h .acc{color:var(--accent);}
  .body{font-size:40px;line-height:1.4;color:var(--muted);margin-top:26px;max-width:880px;}
  .body strong{color:var(--ink);font-weight:800;}
  .slide.dark .body strong{color:var(--ink);}

  /* highlight card */
  .hcard{margin-top:44px;display:flex;align-items:center;gap:26px;background:var(--card);border-radius:28px;
    padding:40px 46px;box-shadow:0 22px 48px -30px rgba(20,16,12,.5);}
  .hcard .hdot{width:22px;height:22px;border-radius:50%;background:var(--accent);flex:0 0 auto;}
  .hcard .htext{font-family:${SERIF};font-weight:800;font-size:44px;line-height:1.22;color:var(--ink);}

  /* diagram (slide 4) */
  .diag{margin-top:36px;display:flex;flex-direction:column;align-items:center;}
  .dtop{background:var(--card);border-radius:20px;padding:22px 46px;text-align:center;z-index:2;}
  .dtop b{display:block;font-weight:800;font-size:38px;letter-spacing:.04em;color:var(--ink);}
  .dtop span{font-size:27px;color:var(--muted);}
  .dlines{width:66%;height:120px;margin-top:-2px;}
  .dnodes{display:flex;justify-content:space-between;width:78%;margin-top:-6px;}
  .dnode{display:flex;flex-direction:column;align-items:center;gap:14px;}
  .dcirc{width:118px;height:118px;border-radius:50%;border:3px solid var(--accent);color:var(--accent);
    font-family:${SERIF};font-weight:800;font-size:52px;display:flex;align-items:center;justify-content:center;background:var(--bg);}
  .dlabel{font-size:28px;color:var(--muted);}
  .dcap{margin-top:30px;font-size:34px;color:var(--ink);}

  /* roles (slide 5) */
  .roles{margin-top:16px;display:flex;flex-direction:column;}
  .role{display:flex;gap:24px;align-items:flex-start;padding:22px 0;border-bottom:1px solid var(--line);}
  .role:last-child{border-bottom:none;}
  .role .rdot{width:20px;height:20px;border-radius:50%;background:var(--accent);flex:0 0 auto;margin-top:12px;}
  .role b{display:block;font-family:${SERIF};font-weight:800;font-size:44px;color:var(--ink);line-height:1.1;}
  .role span{display:block;margin-top:6px;font-size:31px;color:var(--muted);line-height:1.3;}

  /* footer */
  .rule{margin-top:auto;height:1px;background:var(--line);}
  .footer{margin-top:30px;display:flex;align-items:center;justify-content:space-between;}
  .fl{display:flex;align-items:center;gap:14px;} .spk{width:34px;height:34px;}
  .wm{font-family:${SERIF};font-weight:800;font-size:37px;color:var(--ink);}
  .fr{font-weight:600;font-size:32px;color:var(--muted);}
  .dots{display:flex;gap:11px;}
  .dot{width:12px;height:12px;border-radius:50%;background:var(--muted);opacity:.32;}
  .dot.on{background:var(--accent);opacity:1;width:30px;border-radius:6px;}
  </style></head><body>
  ${slides.join('\n')}
  </body></html>`;
}

async function render(outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || cfg.chromiumPath || undefined });
  const p = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  await p.setContent(html(), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts && document.fonts.ready);
  await p.waitForTimeout(400);
  const secs = await p.$$('.slide');
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
  render(process.argv[2] || path.join(__dirname, 'agents-out'))
    .then(f => console.log('Rendered:\n' + f.join('\n')))
    .catch(e => { console.error(e); process.exit(1); });
}
module.exports = { render, html };
