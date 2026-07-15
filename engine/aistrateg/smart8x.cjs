// engine/aistrateg/smart8x.cjs
// «AI STRATEG» — Claude'ni 8x aqlliroq qilish (Context Engineering).
// NEYRON/DATA-VIZ mavzu: yorug' tugunlar, ulangan chiziqlar, umurtqa-chiziq, katta xira raqamlar. Qora premium. O'zbekcha B1.
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
// persistent neural chrome: left spine + node + big faint number
const chrome = (big) => `<div class="spine"></div><div class="snode"></div><div class="bignum">${big}</div>`;

const LAYERS = [
  ['#E0794C', 'Xotira'], ['#5B8DEF', "Ko'rsatmalar"], ['#5FB56A', 'Misollar'],
  ['#9A79E0', 'Fayllar'], ['#E06BA6', 'Vositalar'], ['#E8B84B', 'Holat'], ['#3BC0AF', 'Tarix'],
];

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
    ${lines}${bars}
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
  return `<section class="slide dark">
    ${deco('tr')}${chrome('01')}
    ${topbar('MUAMMO', 1)}
    <div class="mid">
    <h2 class="h"><span class="hn"></span>Nega AI <span class="acc">yomon javob</span> beradi?</h2>
    <div class="ba">
      <div class="node"><div class="dot red"></div><div class="n-lab old">KO'PCHILIK BERADI</div><ul><li>Bitta gap</li><li>Bitta so'rov</li><li>Boshqa hech narsa</li></ul></div>
      <div class="conn">→</div>
      <div class="node hot"><div class="dot"></div><div class="n-lab new">CLAUDE'GA KERAK</div><ul><li>Xotira, qoidalar</li><li>Fayllar, misollar</li><li>Vositalar, holat</li></ul></div>
    </div>
    <div class="stripe">Claude faqat <b>kontekst oynasidagi</b> narsani ko'radi. Tashqarisi — yo'qdek.</div>
    </div>
    ${footer()}
  </section>`;
}

function s3() {
  const items = LAYERS.map(([c, n], i) => {
    const d = ['O\'tgan sessiyalardan bilgani', 'Qoidalar va yozuv uslubi', 'Yaxshi natija qanday ko\'rinadi', 'Kod, hujjat, arxitektura', 'Qidiruv va funksiya natijasi', 'Vazifa hozir qayerda', 'Avval nima qilgani'][i];
    return `<div class="cx"><span class="cx-d" style="background:${c};box-shadow:0 0 20px 2px ${c}"></span><div><b>${n}</b><span>${d}</span></div></div>`;
  }).join('');
  return `<section class="slide dark">
    ${deco('bl')}${chrome('7')}
    ${topbar('KONTEKST NIMA', 2)}
    <div class="mid">
    <h2 class="h"><span class="hn"></span>Kontekst — <span class="acc">7 qismdan</span> iborat</h2>
    <div class="cx-grid">${items}</div>
    </div>
    ${footer()}
  </section>`;
}

function s4() {
  const steps = [
    ['So\'rov', 'foydalanuvchi'], ['Kontekst', '7 qism yig\'iladi'], ['Claude', 'qaror qiladi'],
    ['Vosita', 'ishga tushadi'], ['Natija', 'kontekstga qo\'shiladi'],
  ].map(([t, d], i) => `<div class="fnode"><span class="fdot"></span><b>${t}</b><span>${d}</span></div>${i < 4 ? '<div class="wire-h"></div>' : ''}`).join('');
  return `<section class="slide dark">
    ${deco('tr')}${chrome('∞')}
    ${topbar('QANDAY ISHLAYDI', 3)}
    <div class="mid">
    <h2 class="h"><span class="hn"></span>Agent — bu <span class="acc">aylanma</span></h2>
    <div class="flow">${steps}</div>
    <div class="stripe">Zaif agent 2-qadamda buziladi: kontekst to'liq emas → Claude taxmin qiladi → xato chiqadi. <b>Aylanma qayta boshlanadi.</b></div>
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
    ${deco('bl')}${chrome('3')}
    ${topbar('3 QATLAM', 4)}
    <div class="mid">
    <h2 class="h"><span class="hn"></span>Kontekstning <span class="acc">3 qatlami</span></h2>
    <div class="ways wire">${ways}</div>
    </div>
    ${footer()}
  </section>`;
}

function s6() {
  return `<section class="slide dark">
    ${deco('tr')}${chrome('md')}
    ${topbar('ENG MUHIM FAYL', 5)}
    <div class="mid">
    <h2 class="h"><span class="hn"></span>AGENTS.md — <span class="acc">hammasini</span> o'zgartiradi</h2>
    <p class="body">Claude uni <b>har sessiya boshida</b> o'qiydi. Bir marta yozing — qayta tushuntirmaysiz.</p>
    <div class="term">
      <div class="term-bar"><span class="md r"></span><span class="md y"></span><span class="md g"></span></div>
      <div class="term-b"><span class="tg"># AGENTS.md</span><br><br><b>## Arxitektura</b><br>API — /api ichida. /legacy'ga tegmang.<br><br><b>## Qoidalar</b><br>axios yo'q, doim fetch. TypeScript + Tailwind.<br><br><b>## Tegmaslik</b><br>src/payments/ — inson tasdig'i kerak</div>
    </div>
    <div class="stripe">Har qator — Claude <b>qaytarmaydigan bitta xato</b>.</div>
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
    ${deco('bl')}${chrome('3')}
    ${topbar('XOTIRA', 6)}
    <div class="mid">
    <h2 class="h"><span class="hn"></span>Xotira — <span class="acc">sessiyalar orasida</span></h2>
    <div class="res-grid wire">${cards}</div>
    <div class="stripe">Amalda bu — <b>xotira fayli</b>: boshida o'qiladi, oxirida yangilanadi. Agent unutmaydi.</div>
    </div>
    ${footer()}
  </section>`;
}

function s8() {
  const sys = ['Filesystem', 'GitHub', 'Linear', 'Slack', 'Postgres', 'Google Drive', 'Sentry', 'Jira'];
  const chips = sys.map(s => `<div class="chip"><span class="chip-d"></span>${s}</div>`).join('');
  return `<section class="slide dark">
    ${deco('tr')}${chrome('MCP')}
    ${topbar('MCP', 7)}
    <div class="mid">
    <h2 class="h"><span class="hn"></span>MCP — <span class="acc">hamma joydan</span> kontekst</h2>
    <p class="body">Claude tashqi tizimlardan ham ma'lumot oladi — har biriga alohida ulanish yozmasdan.</p>
    <div class="chips">${chips}</div>
    <div class="stripe">U kodni emas — <b>tiket, Slack qarori, xato va bazani</b> ham ko'radi.</div>
    </div>
    ${footer()}
  </section>`;
}

function s9() {
  return `<section class="slide dark cta">
    ${deco('c')}${chrome('')}
    ${topbar('NATIJA', 8)}
    <div class="mid">
    <div class="big8"><span class="rays"></span><span class="acc">8×</span></div>
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
  .slide{--bg:#0B0906; --ink:#F3EFE8; --muted:#8F887B; --accent:#E0794C; --line:#241F18; --card:#161009;
    width:${W}px;height:${H}px;position:relative;overflow:hidden;background:#0B0906;color:var(--ink);
    font-family:${SANS};padding:150px 66px 178px;display:flex;flex-direction:column;justify-content:center;}
  .bg-grid,.glow{position:absolute;z-index:0;}
  .bg-grid{inset:0;background-image:radial-gradient(circle, rgba(255,255,255,.05) 1.6px, transparent 1.6px);background-size:38px 38px;opacity:.5;}
  .glow{width:820px;height:560px;border-radius:50%;filter:blur(12px);background:radial-gradient(closest-side, color-mix(in srgb,var(--accent) 24%, transparent), transparent 70%);opacity:.5;}
  .glow.tr{right:-180px;top:-180px;} .glow.bl{left:-220px;bottom:-180px;} .glow.c{left:50%;top:30%;transform:translateX(-50%);opacity:.4;}
  .slide>*{position:relative;z-index:1;}
  .acc{color:var(--accent);} b,strong{font-weight:800;color:var(--ink);}

  /* neural chrome */
  .spine{position:absolute;left:32px;top:150px;bottom:150px;width:2px;z-index:1;background:linear-gradient(180deg,transparent,rgba(224,121,76,.0) 8%,rgba(224,121,76,.45) 50%,rgba(224,121,76,0) 92%,transparent);}
  .snode{position:absolute;left:25px;top:50%;transform:translateY(-50%);width:16px;height:16px;border-radius:50%;background:var(--accent);box-shadow:0 0 24px 5px rgba(224,121,76,.7);z-index:2;}
  .bignum{position:absolute;right:44px;top:120px;font-family:${SERIF};font-weight:900;font-size:290px;line-height:.8;color:rgba(224,121,76,.07);z-index:0;letter-spacing:-.03em;}

  .top{position:absolute;top:60px;left:66px;right:66px;display:flex;justify-content:space-between;align-items:center;}
  .kick{display:flex;align-items:center;gap:12px;font-weight:800;font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);}
  .kick .spk,.fbrand .spk{width:26px;height:26px;}
  .page{font-weight:700;font-size:25px;letter-spacing:.1em;color:var(--muted);}

  .h{font-family:${SERIF};font-weight:800;font-size:66px;line-height:1.05;margin:0;position:relative;}
  .h .acc{color:var(--accent);}
  .hn{display:inline-block;width:18px;height:18px;border-radius:50%;background:var(--accent);box-shadow:0 0 20px 3px rgba(224,121,76,.6);margin-right:20px;vertical-align:middle;}
  .body{font-size:32px;line-height:1.4;color:var(--muted);margin:0;} .body b{color:var(--ink);font-weight:800;}

  /* cover */
  .cover{padding-top:52px;}
  .cov-mid{position:absolute;top:50%;left:66px;right:66px;transform:translateY(-50%);display:flex;flex-direction:column;}
  .cov-art{width:100%;margin-bottom:14px;} .conv{width:100%;height:auto;display:block;}
  .badge{align-self:flex-start;background:color-mix(in srgb,var(--accent) 16%, transparent);border:1px solid color-mix(in srgb,var(--accent) 50%, transparent);color:#EDD9C8;font-weight:800;font-size:22px;letter-spacing:.08em;padding:10px 22px;border-radius:30px;margin-bottom:20px;}
  .cov-title{font-weight:900;font-size:86px;line-height:.98;letter-spacing:-.01em;color:#F5F1EA;text-transform:uppercase;}
  .cov-title .acc{color:var(--accent);}
  .cov-sub{margin-top:22px;font-size:33px;line-height:1.32;color:#B7B0A2;max-width:840px;} .cov-sub b{color:#F3EFE8;}
  .gift{margin-top:22px;align-self:flex-start;background:color-mix(in srgb,var(--accent) 16%, transparent);border:1px solid color-mix(in srgb,var(--accent) 50%, transparent);color:#EDD9C8;font-weight:700;font-size:27px;padding:13px 24px;border-radius:40px;}
  .swipe{margin-top:24px;font-weight:800;font-size:30px;letter-spacing:.12em;color:var(--accent);}

  /* nodes (before/after) */
  .ba{display:flex;align-items:stretch;gap:16px;}
  .node{position:relative;flex:1;background:linear-gradient(160deg,rgba(255,255,255,.04),rgba(255,255,255,.01));border:1px solid rgba(224,121,76,.22);border-radius:20px;padding:30px 30px 26px;box-shadow:inset 0 0 40px rgba(224,121,76,.04);}
  .node.hot{border-color:rgba(224,121,76,.5);box-shadow:inset 0 0 50px rgba(224,121,76,.08),0 0 34px rgba(224,121,76,.12);}
  .node .dot{position:absolute;top:-8px;left:26px;width:16px;height:16px;border-radius:50%;background:var(--accent);box-shadow:0 0 18px 3px rgba(224,121,76,.6);} .node .dot.red{background:#E8584A;box-shadow:0 0 18px 3px rgba(232,88,74,.5);}
  .n-lab{font-weight:800;font-size:24px;letter-spacing:.04em;margin-bottom:14px;} .n-lab.old{color:#E8584A;} .n-lab.new{color:#5FB56A;}
  .node ul{list-style:none;display:flex;flex-direction:column;gap:12px;} .node li{font-size:28px;color:var(--ink);line-height:1.26;}
  .conn{align-self:center;color:var(--accent);font-size:40px;filter:drop-shadow(0 0 10px rgba(224,121,76,.5));}
  .stripe{background:rgba(255,255,255,.03);border:1px solid var(--line);border-radius:16px;padding:24px 30px;font-size:29px;color:var(--muted);text-align:center;line-height:1.35;} .stripe b{color:var(--accent);}

  /* 7-part node grid */
  .cx-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .cx:nth-child(7){grid-column:1 / -1;}
  .cx{display:flex;align-items:center;gap:18px;background:linear-gradient(160deg,rgba(255,255,255,.04),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:22px 24px;}
  .cx-d{flex:0 0 auto;width:18px;height:18px;border-radius:50%;}
  .cx b{font-size:30px;display:block;} .cx span{font-size:22px;color:var(--muted);line-height:1.24;}

  /* flow with wired nodes */
  .flow{display:flex;align-items:stretch;justify-content:space-between;gap:0;}
  .fnode{flex:1;background:linear-gradient(160deg,rgba(255,255,255,.045),rgba(255,255,255,.01));border:1px solid rgba(224,121,76,.2);border-radius:16px;padding:26px 6px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px;}
  .fdot{width:16px;height:16px;border-radius:50%;background:var(--accent);box-shadow:0 0 16px 2px rgba(224,121,76,.6);margin-bottom:4px;}
  .fnode b{font-size:27px;} .fnode span{font-size:19px;color:var(--muted);line-height:1.2;}
  .wire-h{flex:0 0 26px;align-self:center;height:2px;background:linear-gradient(90deg,rgba(224,121,76,.15),rgba(224,121,76,.7),rgba(224,121,76,.15));}

  /* ways wired vertically */
  .ways{display:flex;flex-direction:column;gap:18px;position:relative;}
  .ways.wire .way:not(:first-child)::before{content:"";position:absolute;left:28px;top:-18px;height:18px;width:2px;background:linear-gradient(180deg,rgba(224,121,76,.1),rgba(224,121,76,.6));}
  .way{position:relative;display:flex;align-items:flex-start;gap:22px;background:linear-gradient(160deg,rgba(255,255,255,.04),rgba(255,255,255,.01));border:1px solid rgba(224,121,76,.2);border-radius:18px;padding:26px 28px;}
  .way-n{flex:0 0 auto;width:56px;height:56px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#F0A362,#C4623B);color:#fff;font-weight:800;font-size:30px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 22px 3px rgba(224,121,76,.4);}
  .way div b{font-size:32px;color:var(--ink);} .way div span{display:block;font-size:25px;color:var(--muted);margin-top:4px;line-height:1.3;}

  /* terminal */
  .term{background:#08060455;border:1px solid rgba(224,121,76,.2);border-radius:18px;overflow:hidden;box-shadow:inset 0 0 50px rgba(224,121,76,.05);}
  .term-bar{display:flex;gap:10px;padding:16px 20px;background:rgba(255,255,255,.03);} .md{width:16px;height:16px;border-radius:50%;} .md.r{background:#ED6A5E;} .md.y{background:#F5BF4F;} .md.g{background:#61C554;}
  .term-b{padding:24px 26px;font-family:${MONO};font-size:27px;line-height:1.5;color:#ECE7DB;} .term-b .tg{color:#E29B6B;font-weight:700;} .term-b b{color:#F0A362;font-weight:700;}

  /* memory nodes wired */
  .res-grid{display:flex;flex-direction:column;gap:16px;position:relative;}
  .res-grid.wire .res:not(:first-child)::before{content:"";position:absolute;left:44px;top:-16px;height:16px;width:2px;background:linear-gradient(180deg,rgba(224,121,76,.1),rgba(224,121,76,.6));}
  .res{position:relative;display:flex;align-items:center;gap:22px;background:linear-gradient(160deg,rgba(255,255,255,.04),rgba(255,255,255,.01));border:1px solid rgba(224,121,76,.2);border-radius:18px;padding:24px 28px;}
  .res-e{font-size:44px;flex:0 0 auto;filter:drop-shadow(0 0 12px rgba(224,121,76,.35));} .res-tx b{font-size:31px;} .res-tx span{display:block;font-size:24px;color:var(--muted);margin-top:2px;line-height:1.28;}

  /* MCP constellation chips */
  .chips{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .chip{display:flex;align-items:center;gap:14px;background:linear-gradient(160deg,rgba(255,255,255,.045),rgba(255,255,255,.01));border:1px solid rgba(224,121,76,.22);border-radius:14px;padding:22px 24px;font-size:30px;font-weight:700;color:var(--ink);}
  .chip-d{width:12px;height:12px;border-radius:50%;background:var(--accent);box-shadow:0 0 14px 2px rgba(224,121,76,.6);flex:0 0 auto;}

  /* cta */
  .big8{position:relative;font-family:${SERIF};font-weight:900;font-size:210px;line-height:1;text-align:center;margin-bottom:6px;filter:drop-shadow(0 0 40px rgba(224,121,76,.35));}
  .big8 .rays{position:absolute;left:50%;top:50%;width:520px;height:520px;transform:translate(-50%,-50%);background:radial-gradient(closest-side,rgba(224,121,76,.22),transparent 68%);z-index:-1;}
  .plusbox{margin-top:28px;background:linear-gradient(160deg,rgba(255,255,255,.05),rgba(255,255,255,.01));border:1px solid rgba(224,121,76,.3);border-radius:26px;padding:34px 40px;width:100%;text-align:center;}
  .pb-l{font-size:30px;color:var(--muted);} .pb-u{margin-top:10px;font-weight:700;font-size:33px;color:var(--ink);} .pb-u strong{color:var(--accent);font-size:40px;}
  .follow{margin-top:22px;font-size:27px;color:var(--muted);text-align:center;}

  .rule{position:absolute;left:66px;right:66px;bottom:140px;height:1px;background:var(--line);}
  .footer{position:absolute;left:66px;right:66px;bottom:78px;display:flex;align-items:center;justify-content:space-between;}
  .mid{position:absolute;top:50%;left:66px;right:66px;transform:translateY(-50%);display:flex;flex-direction:column;gap:22px;}
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
