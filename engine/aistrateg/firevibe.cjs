// engine/aistrateg/firevibe.cjs
// «AI STRATEG» — FireVibe + Claude Code workflow karusel (o'zbekcha, B1).
// Muqova 4-rasmdagidek (qora banner + 2 ikonka). Ranglar: qora + terrakota + krem.
// Har slayd dizayni biroz farq qiladi. Render 1080x1350 → PNG.

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const cfg = require('../../src/config');

const W = 1080, H = 1350;
const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace,'SF Mono',Menlo,Consolas,monospace";
const BRAND = 'AI STRATEG';
const TOTAL = 9;

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pg = (i) => `${String(i + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`;

const flame = (cls = '') => `<svg class="ico ${cls}" viewBox="0 0 64 64" fill="none"><path d="M38 6c2 12-6 15-11 22-4 6-3 13 2 16 1-5 3-8 6-10-1 7 4 9 4 15 0 6-5 11-11 11-8 0-15-6-15-16 0-13 14-18 12-33 5 2 9 8 9 14 3-3 5-8 4-19z" fill="#F3EFE8"/></svg>`;
const sparkIcon = (cls = '') => `<svg class="ico ${cls}" viewBox="0 0 64 64" fill="none">${Array.from({length:12},(_,k)=>{const a=(k/12)*Math.PI*2;const x1=32+Math.cos(a)*8,y1=32+Math.sin(a)*8,x2=32+Math.cos(a)*26,y2=32+Math.sin(a)*26;return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#F3EFE8" stroke-width="5" stroke-linecap="round"/>`;}).join('')}<circle cx="32" cy="32" r="7" fill="#F3EFE8"/></svg>`;
const sparkMark = `<svg class="spk" viewBox="0 0 24 24"><path d="M12 1l2.2 7.4L21.5 6l-5.1 5.6 6.6 3.4-7.6.5 2.3 7.4L12 17l-5.7 5.9 2.3-7.4L1 15l6.6-3.4L2.5 6l7.3 2.4z" fill="var(--accent)"/></svg>`;

const topbar = (i) => `<div class="top"><div class="brand">${sparkMark}<span>${esc(BRAND)}</span></div><span class="page">${pg(i)}</span></div>`;
const label = (t) => `<div class="lab">${esc(t)}</div>`;
const card = (html, cls = '') => `<div class="card ${cls}"><span class="cdot"></span><span class="ctext">${html}</span></div>`;

// ── slaydlar ──────────────────────────────────────────────
function cover() {
  return `<section class="slide dark cover">
    ${topbar(0)}
    <div class="cov-mid">
      <div class="icons">
        <div class="appic dark"><div class="ic-inner">${flame()}</div></div>
        <div class="plus">+</div>
        <div class="appic acc"><div class="ic-inner">${sparkIcon()}</div></div>
      </div>
      <h1 class="cov-title">ISHLAYDIGAN<br>DIZAYN<br><span class="acc">WORKFLOW</span></h1>
      <p class="cov-sub">AI ilovangiz nega sotilmayapti — va buni 3 qadamda qanday tuzatish.</p>
    </div>
    <div class="cov-foot"><span class="swipe">SURING <b>&rarr;</b></span></div>
  </section>`;
}

function s2() {
  return `<section class="slide light">
    ${topbar(1)}
    ${label('MUAMMO')}
    <h2 class="h">AI ilovangiz<br><span class="acc">sotilmayapti</span></h2>
    <p class="body">Kod ishlaydi. Mantiq joyida. Lekin interfeys «AI yasagandek» ko'rinadi. Odam atigi <strong>2 soniyada</strong> qaror qiladi — ishonsa bo'ladimi yoki yo'q.</p>
    ${card(`Bu — kod emas, <strong>dizayn</strong> muammosi.`)}
    ${footer(1)}
  </section>`;
}

function s3() {
  return `<section class="slide dark">
    ${topbar(2)}
    ${label('ASOSIY FIKR')}
    <h2 class="h">Dizayn — yangi<br><span class="acc">ustunlik</span></h2>
    <p class="body">Ilova qurish arzon va oson bo'ldi. Endi sizni raqobatchidan ajratadigan yagona narsa — dizayn. Bir yil oldin AI buni uddalay olmasdi. <strong>Endi uddalaydi.</strong></p>
    ${card(`Yaxshi dizayn = ishonch = <strong>to'lov</strong>.`)}
    ${footer(2)}
  </section>`;
}

function s4() {
  return `<section class="slide light">
    ${topbar(3)}
    ${label('STACK')}
    <h2 class="h">2 ta vosita,<br><span class="acc">2 ta ish</span></h2>
    <div class="tools">
      <div class="tool"><div class="tic dark">${flame()}</div><b>FireVibe</b><span>Dizayn kuchi — ko'rinish va his</span></div>
      <div class="tool"><div class="tic acc">${sparkIcon()}</div><b>Claude Code</b><span>Qurish kuchi — mantiq va funksiya</span></div>
    </div>
    ${card(`Dizayndan boshlaysiz, <strong>qurish bilan</strong> tugatasiz.`)}
    ${footer(3)}
  </section>`;
}

function s5() {
  const items = [
    `To'liq ko'p ekranli ilova (bitta ekran emas)`,
    `Yaxlit dizayn tizimi — har ekran bir xil`,
    `AI rasmlar — hech narsa «placeholder» emas`,
    `Native kod: SwiftUI, Flutter, React Native`,
    `Chat orqali tahrir — hamma ekranda bir xil`,
  ].map(t => `<div class="frow"><span class="fchk">&#10003;</span>${esc(t)}</div>`).join('');
  return `<section class="slide dark">
    ${topbar(4)}
    ${label('FIREVIBE NIMA BERADI')}
    <h2 class="h">Bitta promptdan —<br><span class="acc">butun ilova</span></h2>
    <div class="flist">${items}</div>
    ${card(`~3 daqiqada. <strong>Bepul rejada</strong>, kartasiz.`)}
    ${footer(4)}
  </section>`;
}

function s6() {
  return `<section class="slide light">
    ${topbar(5)}
    <div class="step-head"><span class="stepn">01</span><h2 class="h step">FireVibe'da to'liq ilova <span class="acc">dizayn qil</span></h2></div>
    <p class="body">Ilovani «funksiyalar ro'yxati» sifatida emas, <strong>butun mahsulot</strong> sifatida tasvirlab bering.</p>
    <div class="pbox"><div class="pbox-h">${sparkMark2()} PROMPT MISOLI</div><div class="pbox-t">«TripGlide» — premium sayohat jurnaliga o'xshagan, lekin bevosita bron qilsa bo'ladigan ilova dizayn qil. Asosiy ekranlar + onboarding, qidiruv, saqlangan sayohatlar, profil.</div></div>
    ${footer(5)}
  </section>`;
}
function sparkMark2() { return `<svg style="width:22px;height:22px;vertical-align:-3px" viewBox="0 0 24 24"><path d="M12 1l2.2 7.4L21.5 6l-5.1 5.6 6.6 3.4-7.6.5 2.3 7.4L12 17l-5.7 5.9 2.3-7.4L1 15l6.6-3.4L2.5 6l7.3 2.4z" fill="#C4623B"/></svg>`; }

function s7() {
  return `<section class="slide dark">
    ${topbar(6)}
    <div class="step-head"><span class="stepn">02</span><h2 class="h step">Chat orqali <span class="acc">tahrirla</span></h2></div>
    <p class="body">Oddiy so'z bilan aytasiz — o'zgarish <strong>hamma ekranga birdan</strong> qo'llanadi.</p>
    <div class="quote">«Aksent rangni to'qroq terrakota qil. Karta oralig'ini zichlashtir. Bron tugmasini hamma ekranda bir xil qil.»</div>
    ${card(`Bir marta o'zgartir — <strong>hamma joyda bir xil</strong> qoladi.`)}
    ${footer(6)}
  </section>`;
}

function s8() {
  return `<section class="slide light">
    ${topbar(7)}
    <div class="step-head"><span class="stepn">03</span><h2 class="h step">Kodni Claude Code'ga <span class="acc">ber va ship qil</span></h2></div>
    <p class="body">Native kodni Claude Code'ga berasiz. Mantiq, ma'lumot, to'lov, akkauntlarni qurasiz. Keyin <strong>Xcode</strong> orqali chiqarasiz.</p>
    ${card(`Dizayn qilgan narsangiz — aynan <strong>ship qiladigan</strong> narsangiz.`)}
    ${footer(7)}
  </section>`;
}

function s9() {
  return `<section class="slide dark cta">
    ${topbar(8)}
    <div class="grow center">
      <div class="lab">XULOSA</div>
      <h2 class="h big">2026 — <span class="acc">tez harakat</span> qilganlar uchun</h2>
      <p class="body">Ilova qurish endi ustunlik emas. <strong>Dizayn — ustunlik.</strong> Erta boshlagan quruvchilar yutadi.</p>
      <div class="ctabox"><div class="cta-l">Izohga yozing:</div><div class="cta-k">«WORKFLOW»</div><div class="cta-u">&rarr; bosqichma-bosqich qo'llanmani yuboraman</div></div>
    </div>
    ${footer(8)}
  </section>`;
}

function footer(i) {
  return '';
}

const slides = [cover(), s2(), s3(), s4(), s5(), s6(), s7(), s8(), s9()];

function html() {
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{--bg:#ECE7DE; --ink:#1F1B16; --muted:#6E6A60; --accent:#C4623B; --line:#D8D2C6; --card:#F6F2EA;
    width:${W}px;height:${H}px;position:relative;overflow:hidden;background:var(--bg);color:var(--ink);
    font-family:${SANS};padding:74px 74px 90px;display:flex;flex-direction:column;}
  .slide.dark{--bg:#15120E; --ink:#F3EFE8; --muted:#8F887B; --accent:#D0703F; --line:#2C271F; --card:#211C16;}
  .slide.dark{background:radial-gradient(1100px 560px at 84% 0%,#241B12,#15120E 60%);}
  .slide>*{position:relative;z-index:1;}
  .acc{color:var(--accent);}
  strong{font-weight:800;color:var(--ink);}
  .grow{flex:1;display:flex;flex-direction:column;} .grow.center{justify-content:center;gap:2px;}

  .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:26px;}
  .brand{display:flex;align-items:center;gap:12px;font-weight:900;font-size:26px;letter-spacing:.14em;color:var(--accent);}
  .brand .spk{width:28px;height:28px;} .brand.sm{font-size:24px;} .brand.sm .spk{width:24px;height:24px;}
  .page,.fp{font-weight:600;font-size:26px;letter-spacing:.12em;color:var(--muted);}
  .lab{font-weight:800;font-size:24px;letter-spacing:.22em;text-transform:uppercase;color:var(--accent);margin-bottom:16px;}

  .h{font-family:${SERIF};font-weight:800;font-size:80px;line-height:1.03;margin:0;}
  .h.big{font-size:74px;} .h .acc{color:var(--accent);}
  .body{font-size:37px;line-height:1.42;color:var(--muted);margin:22px 0 30px;max-width:900px;}
  .body strong{color:var(--ink);font-weight:800;}

  /* card */
  .card{margin-top:auto;display:flex;align-items:center;gap:24px;background:var(--card);border-radius:26px;
    padding:36px 42px;box-shadow:0 22px 48px -30px rgba(0,0,0,.5);}
  .card .cdot{width:20px;height:20px;border-radius:50%;background:var(--accent);flex:0 0 auto;}
  .card .ctext{font-family:${SERIF};font-weight:800;font-size:42px;line-height:1.2;color:var(--ink);}

  /* cover */
  .cover{padding-top:70px;}
  .cov-mid{margin-top:auto;}
  .icons{display:flex;align-items:center;gap:36px;margin-bottom:52px;}
  .appic{width:150px;height:150px;border-radius:36px;display:flex;align-items:center;justify-content:center;box-shadow:0 26px 54px -26px rgba(0,0,0,.7);}
  .appic.dark{background:#1C1813;border:1px solid #342E25;} .appic.acc{background:var(--accent);}
  .ic-inner .ico{width:88px;height:88px;}
  .plus{font-size:66px;font-weight:300;color:#C9C2B4;}
  .cov-title{font-weight:900;font-size:92px;line-height:1.0;letter-spacing:-.01em;color:#F5F1EA;text-transform:uppercase;}
  .cov-title .acc{color:var(--accent);}
  .cov-sub{margin-top:30px;font-size:38px;line-height:1.36;color:#B7B0A2;max-width:760px;}
  .cov-foot{margin-top:40px;}
  .swipe{font-weight:800;font-size:30px;letter-spacing:.14em;color:var(--accent);}

  /* tools (s4) */
  .tools{margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:24px;}
  .tool{background:var(--card);border-radius:24px;padding:36px 30px;text-align:center;box-shadow:0 20px 44px -30px rgba(0,0,0,.45);}
  .tic{width:104px;height:104px;border-radius:26px;margin:0 auto 22px;display:flex;align-items:center;justify-content:center;}
  .tic.dark{background:#1C1813;} .tic.acc{background:var(--accent);} .tic .ico{width:60px;height:60px;}
  .tool b{display:block;font-family:${SERIF};font-weight:800;font-size:42px;color:var(--ink);}
  .tool span{display:block;margin-top:10px;font-size:28px;color:var(--muted);line-height:1.3;}

  /* feature list (s5) */
  .flist{margin-top:16px;display:flex;flex-direction:column;gap:16px;}
  .frow{display:flex;align-items:center;gap:22px;font-size:35px;color:var(--ink);background:var(--card);border-radius:18px;padding:24px 30px;}
  .fchk{flex:0 0 auto;width:44px;height:44px;border-radius:50%;background:var(--accent);color:#fff;font-size:26px;font-weight:800;display:flex;align-items:center;justify-content:center;}

  /* step head (s6-8) */
  .step-head{display:flex;align-items:flex-start;gap:28px;margin-bottom:6px;}
  .stepn{font-family:${SERIF};font-weight:800;font-size:96px;line-height:.86;color:var(--accent);flex:0 0 auto;}
  .h.step{font-size:60px;padding-top:12px;}

  /* prompt box (s6) */
  .pbox{margin-top:auto;background:#15120E;border-radius:24px;padding:34px 38px;}
  .slide.light .pbox{background:#1B1712;}
  .pbox-h{display:flex;align-items:center;gap:12px;font-weight:800;font-size:24px;letter-spacing:.16em;color:var(--accent);}
  .pbox-t{margin-top:20px;font-family:${MONO};font-size:30px;line-height:1.55;color:#ECE7DB;}

  /* quote (s7) */
  .quote{margin-top:8px;font-family:${SERIF};font-style:italic;font-weight:700;font-size:48px;line-height:1.28;
    color:var(--ink);border-left:6px solid var(--accent);padding:6px 0 6px 34px;}

  /* cta (s9) */
  .cta .h{margin-top:6px;}
  .ctabox{margin-top:38px;background:var(--card);border-radius:28px;padding:40px 46px;}
  .cta-l{font-size:32px;color:var(--muted);} .cta-k{font-family:${SERIF};font-weight:800;font-size:82px;color:var(--accent);margin:6px 0 10px;line-height:1;}
  .cta-u{font-weight:800;font-size:32px;color:var(--ink);}

  /* footer */
  .rule{margin-top:auto;height:1px;background:var(--line);}
  .footer{margin-top:26px;display:flex;align-items:center;justify-content:space-between;}
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
  render(process.argv[2] || path.join(__dirname, 'out'))
    .then(f => console.log('Rendered:\n' + f.join('\n')))
    .catch(e => { console.error(e); process.exit(1); });
}
module.exports = { render, html };
