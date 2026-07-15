// engine/aistrateg/smart8x.cjs
// «AI STRATEG» — Claude'ni 8x aqlliroq qilish (Context Engineering). Anthropic usuli.
// Qora premium mavzu: 7 qatlam -> node -> 8x. O'zbekcha B1.
// Footer: AI STRATEG / @kodiyusufbay. CTA: izohga «+».

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const cfg = require('../../src/config');

const W = 1080, H = 1350;
const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace,'SF Mono',Menlo,Consolas,monospace";
const HANDLE = '@kodiyusufbay';
const TOTAL = 9;

const pg = (i) => `${String(i + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`;
const spark = (c = 'var(--accent)') => `<svg class="spk" viewBox="0 0 24 24"><path d="M12 1l2.2 7.4L21.5 6l-5.1 5.6 6.6 3.4-7.6.5 2.3 7.4L12 17l-5.7 5.9 2.3-7.4L1 15l6.6-3.4L2.5 6l7.3 2.4z" fill="${c}"/></svg>`;
const deco = (cls = '') => `<div class="bg-grid"></div><div class="glow ${cls}"></div>`;
const topbar = (kick, i) => `<div class="top"><div class="kick">${spark()}${kick}</div><span class="page">${pg(i)}</span></div>`;
const footer = () => `<div class="rule"></div><div class="footer"><span class="fbrand">${spark()}AI STRATEG</span><span class="fhandle">${HANDLE}</span></div>`;

// 7 layers of context colors (banner-style)
const LAYERS = [
  ['#E0794C', 'Xotira'],
  ['#5B8DEF', "Ko'rsatmalar"],
  ['#5FB56A', 'Misollar'],
  ['#9A79E0', 'Fayllar'],
  ['#E06BA6', 'Vositalar'],
  ['#E8B84B', 'Holat'],
  ['#3BC0AF', 'Tarix'],
];

// cover convergence art: 7 bars -> glowing Claude node
function conv() {
  const nodeX = 792, nodeY = 175;
  const ys = LAYERS.map((_, i) => 40 + i * 45);
  let lines = '', bars = '';
  LAYERS.forEach(([c], i) => {
    const y = ys[i];
    lines += `<path d="M250 ${y} C 430 ${y}, 560 ${nodeY}, ${nodeX - 44} ${nodeY}" stroke="${c}" stroke-width="3.2" fill="none" opacity=".6"/>`;
    bars += `<rect x="44" y="${y - 15}" width="206" height="30" rx="9" fill="#1a1712" stroke="${c}" stroke-width="2"/><circle cx="70" cy="${y}" r="6.5" fill="${c}"/>`;
  });
  return `<svg viewBox="0 0 900 350" class="conv">
    ${lines}
    ${bars}
    <circle cx="${nodeX}" cy="${nodeY}" r="60" fill="url(#ng)" opacity=".9"/>
    <circle cx="${nodeX}" cy="${nodeY}" r="44" fill="#160f0a" stroke="#E0794C" stroke-width="3"/>
    <g transform="translate(${nodeX - 21},${nodeY - 21}) scale(1.75)">${spark('#F0A362')}</g>
    <defs><radialGradient id="ng"><stop offset="0" stop-color="#E0794C" stop-opacity=".55"/><stop offset="1" stop-color="#E0794C" stop-opacity="0"/></radialGradient></defs>
  </svg>`;
}

// ── slides ────────────────────────────────────────────────
function cover() {
  return `<section class="slide dark cover">
    ${deco('tr')}
    <div class="top"><div class="kick">${spark()}AI STRATEG</div><span class="page">${pg(0)}</span></div>
    <div class="cov-mid">
      <div class="cov-art">${conv()}</div>
      <div class="badge">ANTHROPIC MUHANDISLARI USULI</div>
      <h1 class="cov-title">CLAUDE'NI<br><span class="acc">8× AQLLIROQ</span> QILING</h1>
      <p class="cov-sub">Model o'zgarmadi. Jamoa ham. Faqat Claude ishdan oldin <b>ko'radigan ma'lumot</b> o'zgardi.</p>
      <div class="gift">🎁 Oxirida — bepul to'liq qo'llanma</div>
      <div class="swipe">SURING <b>&rarr;</b></div>
    </div>
    ${footer()}
  </section>`;
}

function s2() {
  return `<section class="slide light">
    ${deco('tr')}
    ${topbar('MUAMMO', 1)}
    <div class="mid">
    <h2 class="h">Nega AI <span class="acc">yomon javob</span> beradi?</h2>
    <p class="body">Ko'pincha aybdor model emas. Aybdor — <b>yetishmayotgan kontekst</b>.</p>
    <div class="ba">
      <div class="ba-box"><div class="ba-lab old">KO'PCHILIK BERADI</div><ul><li>Bitta gap</li><li>Bitta so'rov</li><li>Boshqa hech narsa</li></ul></div>
      <div class="ba-box new"><div class="ba-lab new">CLAUDE'GA KERAK</div><ul><li>Xotira, qoidalar</li><li>Fayllar, misollar</li><li>Vositalar, holat</li></ul></div>
    </div>
    <div class="stripe light">Claude faqat <b>kontekst oynasidagi</b> narsani ko'radi. Tashqarisi — yo'qdek.</div>
    </div>
    ${footer()}
  </section>`;
}

function s3() {
  const items = LAYERS.map(([c, n], i) => {
    const d = ['O\'tgan sessiyalardan bilgani', 'Qoidalar va yozuv uslubi', 'Yaxshi natija qanday ko\'rinadi', 'Kod, hujjat, arxitektura', 'Qidiruv va funksiya natijasi', 'Vazifa hozir qayerda', 'Avval nima qilgani'][i];
    return `<div class="cx"><span class="cx-d" style="background:${c};box-shadow:0 0 18px 1px ${c}"></span><div><b>${n}</b><span>${d}</span></div></div>`;
  }).join('');
  return `<section class="slide dark">
    ${deco('bl')}
    ${topbar('KONTEKST NIMA', 2)}
    <div class="mid">
    <h2 class="h">Kontekst — <span class="acc">7 qismdan</span> iborat</h2>
    <div class="cx-grid">${items}</div>
    </div>
    ${footer()}
  </section>`;
}

function s4() {
  const steps = [
    ['So\'rov', 'foydalanuvchi'],
    ['Kontekst', '7 qism yig\'iladi'],
    ['Claude', 'qaror qiladi'],
    ['Vosita', 'ishga tushadi'],
    ['Natija', 'kontekstga qo\'shiladi'],
  ].map(([t, d], i) => `<div class="flow-node"><b>${t}</b><span>${d}</span></div>${i < 4 ? '<div class="flow-arr">→</div>' : ''}`).join('');
  return `<section class="slide light">
    ${deco('tr')}
    ${topbar('QANDAY ISHLAYDI', 3)}
    <div class="mid">
    <h2 class="h">Agent — bu <span class="acc">aylanma</span></h2>
    <div class="flow">${steps}</div>
    <div class="stripe light">Zaif agent 2-qadamda buziladi: kontekst to'liq emas → Claude taxmin qiladi → xato chiqadi. <b>Aylanma qayta boshlanadi.</b></div>
    </div>
    ${footer()}
  </section>`;
}

function s5() {
  const ways = [
    ['1', 'Global kontekst', 'Har sessiyada bor: kimligi, asosiy qoidalar, uslub, nimaga tegmaslik.'],
    ['2', 'Loyiha konteksti', 'Loyiha boshida: AGENTS.md, arxitektura, papkalar, test qoidalari.'],
    ['3', 'Vazifa konteksti', 'Shu ish uchun: joriy fayl, maqsad, oxirgi o\'zgarish, cheklovlar.'],
  ].map(([n, t, d]) => `<div class="way"><span class="way-n">${n}</span><div><b>${t}</b><span>${d}</span></div></div>`).join('');
  return `<section class="slide dark">
    ${deco('bl')}
    ${topbar('3 QATLAM', 4)}
    <div class="mid">
    <h2 class="h">Kontekstning <span class="acc">3 qatlami</span></h2>
    <div class="ways">${ways}</div>
    </div>
    ${footer()}
  </section>`;
}

function s6() {
  return `<section class="slide light">
    ${deco('tr')}
    ${topbar('ENG MUHIM FAYL', 5)}
    <div class="mid">
    <h2 class="h">AGENTS.md — <span class="acc">hammasini</span> o'zgartiradi</h2>
    <p class="body">Claude uni <b>har sessiya boshida</b> o'qiydi. Bir marta yozing — qayta tushuntirmaysiz.</p>
    <div class="term">
      <div class="term-bar"><span class="md r"></span><span class="md y"></span><span class="md g"></span></div>
      <div class="term-b"><span class="tg"># AGENTS.md</span><br><br><b>## Arxitektura</b><br>API — /api ichida. /legacy'ga tegmang.<br><br><b>## Qoidalar</b><br>axios yo'q, doim fetch. TypeScript + Tailwind.<br><br><b>## Tegmaslik</b><br>src/payments/ — inson tasdig'i kerak</div>
    </div>
    <div class="stripe light">Har qator — Claude <b>qaytarmaydigan bitta xato</b>.</div>
    </div>
    ${footer()}
  </section>`;
}

function s7() {
  const cards = [
    ['🗄️', 'Uzoq xotira', 'Barcha o\'tgan sessiyalardan o\'rganilgan bilim'],
    ['💬', 'Qisqa xotira', 'Shu suhbatda sodir bo\'lgan narsa'],
    ['🧠', 'Ishchi xotira', 'Hozir kontekst oynasidagi narsa'],
  ].map(([e, t, d]) => `<div class="res"><span class="res-e">${e}</span><div class="res-tx"><b>${t}</b><span>${d}</span></div></div>`).join('');
  return `<section class="slide dark">
    ${deco('bl')}
    ${topbar('XOTIRA', 6)}
    <div class="mid">
    <h2 class="h">Xotira — <span class="acc">sessiyalar orasida</span></h2>
    <div class="res-grid">${cards}</div>
    <div class="stripe">Amalda bu — <b>xotira fayli</b>: boshida o'qiladi, oxirida yangilanadi. Agent unutmaydi.</div>
    </div>
    ${footer()}
  </section>`;
}

function s8() {
  const sys = ['Filesystem', 'GitHub', 'Linear', 'Slack', 'Postgres', 'Google Drive', 'Sentry', 'Jira'];
  const chips = sys.map(s => `<div class="chip">${s}</div>`).join('');
  return `<section class="slide light">
    ${deco('tr')}
    ${topbar('MCP', 7)}
    <div class="mid">
    <h2 class="h">MCP — <span class="acc">hamma joydan</span> kontekst</h2>
    <p class="body">Claude tashqi tizimlardan ham ma'lumot oladi — har biriga alohida ulanish yozmasdan.</p>
    <div class="chips">${chips}</div>
    <div class="stripe light">U kodni emas — <b>tiket, Slack qarori, xato va bazani</b> ham ko'radi.</div>
    </div>
    ${footer()}
  </section>`;
}

function s9() {
  return `<section class="slide dark cta">
    ${deco('c')}
    ${topbar('NATIJA', 8)}
    <div class="mid">
    <div class="big8"><span class="acc">8×</span></div>
    <h2 class="h" style="text-align:center">Bir xil model.<br><span class="acc">Boshqa kontekst.</span></h2>
    <div class="plusbox">
      <div class="pb-l">To'liq qo'llanmani DM'da oling:</div>
      <div class="pb-u">Izohga <strong>«+»</strong> yozing — 3 kunlik rejani yuboramiz.</div>
    </div>
    <div class="follow">Saqlab qo'ying va keyin qayta o'qing.</div>
    </div>
    ${footer()}
  </section>`;
}

const slides = [cover(), s2(), s3(), s4(), s5(), s6(), s7(), s8(), s9()];

function html() {
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,800&family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{--bg:#ECE7DE; --ink:#1F1B16; --muted:#6E6A60; --accent:#C4623B; --line:#D8D2C6; --card:#F6F2EA;
    width:${W}px;height:${H}px;position:relative;overflow:hidden;background:var(--bg);color:var(--ink);
    font-family:${SANS};padding:150px 66px 178px;display:flex;flex-direction:column;justify-content:center;}
  .slide.dark{--bg:#0E0B08; --ink:#F3EFE8; --muted:#8F887B; --accent:#E0794C; --line:#2C271F; --card:#1A1510; background:#0E0B08;}
  .bg-grid,.glow{position:absolute;z-index:0;}
  .bg-grid{inset:0;background-image:radial-gradient(circle, rgba(0,0,0,.05) 1.6px, transparent 1.6px);background-size:36px 36px;opacity:.5;}
  .slide.dark .bg-grid{background-image:radial-gradient(circle, rgba(255,255,255,.05) 1.6px, transparent 1.6px);}
  .glow{width:760px;height:520px;border-radius:50%;filter:blur(10px);background:radial-gradient(closest-side, color-mix(in srgb,var(--accent) 26%, transparent), transparent 70%);opacity:.55;}
  .glow.tr{right:-160px;top:-160px;} .glow.bl{left:-200px;bottom:-160px;} .glow.c{left:50%;top:32%;transform:translateX(-50%);opacity:.42;}
  .slide>*{position:relative;z-index:1;}
  .acc{color:var(--accent);} b,strong{font-weight:800;color:var(--ink);}

  .top{position:absolute;top:60px;left:66px;right:66px;display:flex;justify-content:space-between;align-items:center;}
  .kick{display:flex;align-items:center;gap:12px;font-weight:800;font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);}
  .kick .spk,.fbrand .spk{width:26px;height:26px;}
  .page{font-weight:700;font-size:25px;letter-spacing:.1em;color:var(--muted);}

  .h{font-family:${SERIF};font-weight:800;font-size:70px;line-height:1.05;margin:0;}
  .h .acc{color:var(--accent);}
  .body{font-size:33px;line-height:1.4;color:var(--muted);margin:16px 0 22px;max-width:900px;}
  .body b{color:var(--ink);font-weight:800;}

  /* cover */
  .cover{padding-top:52px;}
  .cov-mid{position:absolute;top:50%;left:66px;right:66px;transform:translateY(-50%);display:flex;flex-direction:column;}
  .cov-art{width:100%;margin-bottom:14px;}
  .conv{width:100%;height:auto;display:block;}
  .badge{align-self:flex-start;background:color-mix(in srgb,var(--accent) 16%, transparent);border:1px solid color-mix(in srgb,var(--accent) 50%, transparent);color:#EDD9C8;font-weight:800;font-size:22px;letter-spacing:.08em;padding:10px 22px;border-radius:30px;margin-bottom:20px;}
  .cov-title{font-weight:900;font-size:86px;line-height:.98;letter-spacing:-.01em;color:#F5F1EA;text-transform:uppercase;}
  .cov-title .acc{color:var(--accent);}
  .cov-sub{margin-top:22px;font-size:33px;line-height:1.32;color:#B7B0A2;max-width:840px;} .cov-sub b{color:#F3EFE8;}
  .gift{margin-top:22px;align-self:flex-start;background:color-mix(in srgb,var(--accent) 16%, transparent);border:1px solid color-mix(in srgb,var(--accent) 50%, transparent);color:#EDD9C8;font-weight:700;font-size:27px;padding:13px 24px;border-radius:40px;}
  .swipe{margin-top:24px;font-weight:800;font-size:30px;letter-spacing:.12em;color:var(--accent);}

  /* before/after */
  .ba{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:8px;}
  .ba-box{background:var(--card);border-radius:22px;padding:28px 30px;}
  .ba-box.new{background:linear-gradient(160deg,#231a14,#1a1510);border:1px solid color-mix(in srgb,var(--accent) 40%,transparent);}
  .ba-lab{font-weight:800;font-size:25px;letter-spacing:.04em;margin-bottom:16px;} .ba-lab.old{color:#c9503f;} .ba-lab.new{color:#5AA95E;}
  .ba-box ul{list-style:none;display:flex;flex-direction:column;gap:13px;}
  .ba-box li{font-size:29px;color:var(--ink);line-height:1.28;}
  .stripe{margin-top:6px;background:var(--card);border-radius:18px;padding:24px 30px;font-size:29px;color:var(--muted);text-align:center;line-height:1.35;} .stripe b{color:var(--accent);}
  .stripe.light{background:#F1E9DF;}

  /* 7-part context grid */
  .cx-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:6px;}
  .cx{display:flex;align-items:center;gap:18px;background:var(--card);border-radius:16px;padding:22px 24px;}
  .cx:nth-child(7){grid-column:1 / -1;}
  .cx-d{flex:0 0 auto;width:20px;height:20px;border-radius:50%;}
  .cx b{font-size:31px;display:block;} .cx span{font-size:23px;color:var(--muted);line-height:1.24;}

  /* flow */
  .flow{display:flex;align-items:stretch;justify-content:space-between;gap:6px;margin:6px 0;}
  .flow-node{flex:1;background:var(--card);border-radius:18px;padding:26px 8px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px;}
  .flow-node b{font-size:28px;} .flow-node span{font-size:20px;color:var(--muted);line-height:1.2;}
  .flow-arr{align-self:center;color:var(--accent);font-size:34px;font-weight:300;}

  /* ways */
  .ways{display:flex;flex-direction:column;gap:16px;margin-top:6px;}
  .way{display:flex;align-items:flex-start;gap:22px;background:var(--card);border-radius:18px;padding:26px 28px;}
  .way-n{flex:0 0 auto;width:56px;height:56px;border-radius:50%;background:var(--accent);color:#fff;font-weight:800;font-size:30px;display:flex;align-items:center;justify-content:center;}
  .way div b{font-size:33px;color:var(--ink);} .way div span{display:block;font-size:26px;color:var(--muted);margin-top:4px;line-height:1.3;}

  /* terminal */
  .term{margin-top:2px;background:#0c0a08;border:1px solid #2a251d;border-radius:18px;overflow:hidden;}
  .term-bar{display:flex;gap:10px;padding:16px 20px;background:#151210;} .md{width:16px;height:16px;border-radius:50%;} .md.r{background:#ED6A5E;} .md.y{background:#F5BF4F;} .md.g{background:#61C554;}
  .term-b{padding:24px 26px;font-family:${MONO};font-size:27px;line-height:1.5;color:#ECE7DB;} .term-b .tg{color:#E29B6B;font-weight:700;} .term-b b{color:#F0A362;font-weight:700;}

  /* results */
  .res-grid{display:flex;flex-direction:column;gap:14px;margin-top:6px;}
  .res{display:flex;align-items:center;gap:22px;background:var(--card);border-radius:18px;padding:24px 28px;}
  .res-e{font-size:44px;flex:0 0 auto;} .res-tx b{font-size:32px;} .res-tx span{display:block;font-size:25px;color:var(--muted);margin-top:2px;line-height:1.28;}

  /* chips */
  .chips{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:6px 0;}
  .chip{background:var(--card);border-radius:16px;padding:26px 24px;font-size:31px;font-weight:700;color:var(--ink);text-align:center;}

  /* cta */
  .big8{font-family:${SERIF};font-weight:900;font-size:190px;line-height:1;text-align:center;margin-bottom:6px;}
  .plusbox{margin-top:28px;background:var(--card);border-radius:26px;padding:34px 40px;width:100%;text-align:center;}
  .pb-l{font-size:30px;color:var(--muted);} .pb-u{margin-top:10px;font-weight:700;font-size:33px;color:var(--ink);} .pb-u strong{color:var(--accent);font-size:40px;}
  .follow{margin-top:22px;font-size:27px;color:var(--muted);text-align:center;}

  .rule{position:absolute;left:66px;right:66px;bottom:140px;height:1px;background:var(--line);}
  .footer{position:absolute;left:66px;right:66px;bottom:78px;display:flex;align-items:center;justify-content:space-between;}
  .mid{position:absolute;top:50%;left:66px;right:66px;transform:translateY(-50%);display:flex;flex-direction:column;gap:20px;}
  .mid>*{margin-top:0!important;margin-bottom:0!important;}
  .fbrand{display:flex;align-items:center;gap:10px;font-weight:900;font-size:28px;letter-spacing:.1em;color:var(--accent);}
  .fhandle{font-weight:600;font-size:28px;color:var(--muted);}
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
  render(process.argv[2] || path.join(__dirname, 'smart8x-out'))
    .then(f => console.log('Rendered:\n' + f.join('\n')))
    .catch(e => { console.error(e); process.exit(1); });
}
module.exports = { render, html };
