// engine/aistrateg/solcode.cjs
// «AI STRATEG» — GPT-5.6 Sol'ni Claude Code ichida ishga tushirish. Terminal mavzu, yashil+to'q sariq.
// Sans display sarlavhalar (banner uslubi). O'zbekcha B1.
// Footer: AI STRATEG / @kodiyusufbay. CTA: izohga «+».

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const cfg = require('../../src/config');

const W = 1080, H = 1350;
const SANS = "'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace,'SF Mono',Menlo,Consolas,monospace";
const HANDLE = '@kodiyusufbay';
const GRN = '#1FA463';
const TOTAL = 10;

const pg = (i) => `${String(i + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`;
const spark = (c = 'var(--accent)') => `<svg class="spk" viewBox="0 0 24 24"><path d="M12 1l2.2 7.4L21.5 6l-5.1 5.6 6.6 3.4-7.6.5 2.3 7.4L12 17l-5.7 5.9 2.3-7.4L1 15l6.6-3.4L2.5 6l7.3 2.4z" fill="${c}"/></svg>`;
const deco = () => `<div class="bg-grid"></div>`;
const topbar = (kick, i) => `<div class="top"><div class="kick">${spark()}${kick}</div><span class="page">${pg(i)}</span></div>`;
const footer = () => `<div class="rule"></div><div class="footer"><span class="fbrand">${spark()}AI STRATEG</span><span class="fhandle">${HANDLE}</span></div>`;

function sunburst(c) {
  let r = '';
  for (let k = 0; k < 12; k++) {
    const a = k * 30 * Math.PI / 180;
    const x1 = (Math.cos(a) * 13).toFixed(1), y1 = (Math.sin(a) * 13).toFixed(1);
    const x2 = (Math.cos(a) * 38).toFixed(1), y2 = (Math.sin(a) * 38).toFixed(1);
    r += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`;
  }
  return r;
}

// cover art: two engines -> terminal -> tool chips
function rig() {
  const chips = [["yo'naltirish", 52], ['bir tizim', 118], ['kontekst', 184], ['vosita', 250]];
  let c = '';
  chips.forEach(([t, y]) => {
    c += `<path d="M566 160 C 616 160, 626 ${y}, 682 ${y}" stroke="#B9B0A0" stroke-width="2.5" stroke-dasharray="6 6" fill="none"/>`;
    c += `<rect x="682" y="${y - 26}" width="178" height="52" rx="14" fill="#FBF8EF" stroke="#2A2620" stroke-width="2"/><text x="771" y="${y + 8}" text-anchor="middle" font-family="${SANS}" font-size="23" font-weight="700" fill="#2A2620">${t}</text>`;
  });
  return `<svg viewBox="0 0 880 320" class="rigsvg">
    <circle cx="66" cy="82" r="42" fill="#FBF8EF" stroke="#2A2620" stroke-width="3"/>
    <text x="66" y="92" text-anchor="middle" font-family="${SANS}" font-size="25" font-weight="800" fill="#2A2620">GPT</text>
    <g transform="translate(66,238)">${sunburst('#E0794C')}</g>
    <path d="M116 82 H 256" stroke="#2A2620" stroke-width="3" marker-end="url(#ar)"/>
    <path d="M116 238 H 256" stroke="#2A2620" stroke-width="3" marker-end="url(#ar)"/>
    <rect x="268" y="66" width="300" height="188" rx="18" fill="#141210"/>
    <circle cx="298" cy="96" r="7" fill="#ED6A5E"/><circle cx="322" cy="96" r="7" fill="#F5BF4F"/><circle cx="346" cy="96" r="7" fill="#61C554"/>
    <text x="300" y="205" font-family="${MONO}" font-size="86" font-weight="800" fill="#3DDC84">&gt;_</text>
    ${c}
    <defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#2A2620"/></marker></defs>
  </svg>`;
}

const term = (title, lines) => `<div class="term">
  <div class="term-bar"><span class="md r"></span><span class="md y"></span><span class="md g"></span><span class="tt">${title}</span></div>
  <div class="term-b">${lines}</div>
</div>`;

// ── slides ────────────────────────────────────────────────
function cover() {
  return `<section class="slide cover">
    ${deco()}
    <div class="top"><div class="kick">${spark()}AI STRATEG</div><span class="page">${pg(0)}</span></div>
    <div class="cov-mid">
      <div class="cov-art">${rig()}</div>
      <div class="badge">BITTA TERMINAL · IKKI MODEL</div>
      <h1 class="cov-title"><span class="hl">GPT-5.6 SOL</span><br>CLAUDE CODE<br>ICHIDA</h1>
      <p class="cov-sub">Ikki eng kuchli AI endi bitta oynada. <b>Claude yozadi, Sol tekshiradi, siz jo'natasiz.</b></p>
      <div class="gift">🎁 Oxirida — barcha ishlaydigan buyruqlar</div>
      <div class="swipe">SURING <b>&rarr;</b></div>
    </div>
    ${footer()}
  </section>`;
}

function s2() {
  return `<section class="slide">
    ${deco()}
    ${topbar('MUAMMO', 1)}
    <div class="mid">
    <h2 class="h">Eski usul — <span class="acc">charchatadi</span></h2>
    <div class="ba">
      <div class="ba-box"><div class="ba-lab old">ESKI USUL</div><ul><li>Ikki terminal</li><li>Nusxa → joylash</li><li>Kontekst yo'qoladi</li></ul></div>
      <div class="ba-box new"><div class="ba-lab new">YANGI USUL</div><ul><li>Bitta terminal</li><li>Nusxasiz</li><li>Ikki model tekshiradi</li></ul></div>
    </div>
    <div class="stripe">So'ra → Nusxala → Joylashtir → Kontekstni yo'qot → Qaytadan. <b>Bu tugadi.</b></div>
    </div>
    ${footer()}
  </section>`;
}

function s3() {
  const steps = [
    ['Claude', 'kod yozadi'],
    ['Sol', 'tekshiradi'],
    ['Siz', "jo'natasiz"],
  ].map(([t, d], i) => `<div class="flow-node"><b>${t}</b><span>${d}</span></div>${i < 2 ? '<div class="flow-arr">→</div>' : ''}`).join('');
  return `<section class="slide">
    ${deco()}
    ${topbar('YECHIM', 2)}
    <div class="mid">
    <h2 class="h">Bitta oynada <span class="acc">ikki aql</span></h2>
    <div class="flow">${steps}</div>
    <div class="stripe">Ikki model — <b>ikki xil ko'z</b>. Biri yozadi, ikkinchisi xatolarni topadi. Nusxa-joylash yo'q.</div>
    </div>
    ${footer()}
  </section>`;
}

function s4() {
  return `<section class="slide">
    ${deco()}
    ${topbar('NIMA KERAK', 3)}
    <div class="mid">
    <h2 class="h">Boshlashdan oldin <span class="acc">2 narsa</span></h2>
    <div class="need">
      <div class="need-c"><div class="need-ic">✓</div><b>Claude Code</b><span>Kompyuteringizda o'rnatilgan bo'lsin.</span></div>
      <div class="need-c"><div class="need-ic">✓</div><b>ChatGPT Plus</b><span>Sol'ga kirish uchun Plus yoki yuqori tarif. Bepul ishlamaydi.</span></div>
    </div>
    <div class="stripe">Ikkalasi tayyor bo'lsa — 6 qadam va 10 daqiqa yetadi.</div>
    </div>
    ${footer()}
  </section>`;
}

function s5() {
  const ways = [
    ['1', 'Tekshiring', 'Claude Code bormi? Yo\'q bo\'lsa, bitta buyruq bilan o\'rnating.'],
    ['2', "Proxy o'rnating", 'Ikki modelni bog\'laydigan ko\'prik. Homebrew bilan bir qatorda.'],
    ['3', 'ChatGPT ulang', 'Brauzerdan kirasiz. API kalit kerak emas — obunangiz yetadi.'],
  ].map(([n, t, d]) => `<div class="way"><span class="way-n">${n}</span><div><b>${t}</b><span>${d}</span></div></div>`).join('');
  return `<section class="slide">
    ${deco()}
    ${topbar('SOZLASH · 1-3', 4)}
    <div class="mid">
    <h2 class="h">Birinchi <span class="acc">3 qadam</span></h2>
    <div class="ways">${ways}</div>
    </div>
    ${footer()}
  </section>`;
}

function s6() {
  const ways = [
    ['4', 'Proxy ishga tushiring', 'Birinchi terminal. Ochiq qoldiring — u kuzatib turadi.'],
    ['5', "Sol'ni oching", "Ikkinchi terminalda tayyor blokni qo'ying — Sol Claude Code ichida ochiladi."],
    ['6', 'Kuchni sozlang', "/effort high yozing. Qiyin ish uchun high, oddiyga medium."],
  ].map(([n, t, d]) => `<div class="way"><span class="way-n">${n}</span><div><b>${t}</b><span>${d}</span></div></div>`).join('');
  return `<section class="slide">
    ${deco()}
    ${topbar('SOZLASH · 4-6', 5)}
    <div class="mid">
    <h2 class="h">Keyingi <span class="acc">3 qadam</span></h2>
    <div class="ways">${ways}</div>
    </div>
    ${footer()}
  </section>`;
}

function s7() {
  return `<section class="slide">
    ${deco()}
    ${topbar('KUCH DARAJASI', 6)}
    <div class="mid">
    <h2 class="h">Qancha <span class="acc">o'ylasin?</span></h2>
    ${term('Claude Code', `<span class="cm">/effort</span> <span class="hl2">high</span><br><span class="dim">low · medium · <b>high</b> · xhigh · max</span>`)}
    <div class="stripe"><b>high</b>dan boshlang. <b>max</b> — juda ko'p sarflaydi, faqat kerak bo'lganda. Oddiy ishga <b>medium</b>.</div>
    </div>
    ${footer()}
  </section>`;
}

function s8() {
  const items = [
    ['💳', 'Ikki obuna', "Anthropic + ChatGPT. Ikki hisob, ikki limit."],
    ['🔌', "Norasmiy ko'prik", 'Proxy — mahalliy, norasmiy yo\'l. Sinov uchun yaxshi.'],
    ['🏢', 'Kompaniya uchun', "Ish uchun rasmiy OpenAI API orqali yuring."],
  ].map(([e, t, d]) => `<div class="res"><span class="res-e">${e}</span><div class="res-tx"><b>${t}</b><span>${d}</span></div></div>`).join('');
  return `<section class="slide">
    ${deco()}
    ${topbar('HALOL GAP', 7)}
    <div class="mid">
    <h2 class="h">Bilib <span class="acc">qo'ying</span></h2>
    <div class="res-grid">${items}</div>
    <div class="stripe">Claude Code o'zi hammasini uddalasa — bu <b>shart emas</b>. Sol — ikkinchi dvigatel.</div>
    </div>
    ${footer()}
  </section>`;
}

function s9() {
  return `<section class="slide">
    ${deco()}
    ${topbar('BONUS · PLUGIN', 8)}
    <div class="mid">
    <h2 class="h">Faqat <span class="acc">tekshiruvchi</span> kerakmi?</h2>
    ${term('Claude Code', `<span class="cm">/plugin</span> marketplace add codex<br><span class="cm">/plugin</span> install codex<br><span class="cm">/codex</span>:setup`)}
    <div class="stripe">Rasmiy plugin: Claude yozadi, Sol <b>tanqid qiladi</b>, siz jo'natasiz. Asosiy model o'zgarmaydi.</div>
    </div>
    ${footer()}
  </section>`;
}

function s10() {
  return `<section class="slide cta">
    ${deco()}
    ${topbar('OXIRIGACHA YETDINGIZ', 9)}
    <div class="mid">
    <div class="fire">⚡</div>
    <h2 class="h" style="text-align:center">Ikki labaratoriya —<br><span class="acc">bitta terminal</span></h2>
    <div class="plusbox">
      <div class="pb-l">Barcha ishlaydigan buyruqlarni DM'da oling:</div>
      <div class="pb-u">Izohga <strong>«+»</strong> yozing — Command Kit'ni yuboramiz.</div>
    </div>
    <div class="follow">Saqlang va keyingi 10 daqiqada sinab ko'ring.</div>
    </div>
    ${footer()}
  </section>`;
}

const slides = [cover(), s2(), s3(), s4(), s5(), s6(), s7(), s8(), s9(), s10()];

function html() {
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@600;700;800&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{--bg:#F1ECE0; --ink:#26221C; --muted:#726D5F; --accent:#C4623B; --grn:${GRN}; --line:#DDD5C6; --card:#FBF8EF; --cardln:#E6DECB;
    width:${W}px;height:${H}px;position:relative;overflow:hidden;background:var(--bg);color:var(--ink);
    font-family:${SANS};padding:150px 66px 178px;display:flex;flex-direction:column;justify-content:center;}
  .bg-grid{position:absolute;inset:0;z-index:0;background-image:radial-gradient(circle, rgba(38,34,28,.055) 1.5px, transparent 1.5px);background-size:34px 34px;opacity:.7;}
  .slide>*{position:relative;z-index:1;}
  .acc{color:var(--accent);} b,strong{font-weight:800;color:var(--ink);}

  .top{position:absolute;top:60px;left:66px;right:66px;display:flex;justify-content:space-between;align-items:center;}
  .kick{display:flex;align-items:center;gap:12px;font-weight:800;font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);}
  .kick .spk,.fbrand .spk{width:26px;height:26px;}
  .page{font-weight:700;font-size:25px;letter-spacing:.1em;color:var(--muted);}

  .h{font-weight:900;font-size:66px;line-height:1.04;margin:0;letter-spacing:-.01em;}
  .h .acc{color:var(--accent);}

  /* cover */
  .cover{padding-top:52px;}
  .cov-mid{position:absolute;top:50%;left:66px;right:66px;transform:translateY(-50%);display:flex;flex-direction:column;}
  .cov-art{width:100%;margin-bottom:18px;}
  .rigsvg{width:100%;height:auto;display:block;}
  .badge{align-self:flex-start;background:color-mix(in srgb,var(--accent) 14%, transparent);border:1.5px solid color-mix(in srgb,var(--accent) 55%, transparent);color:var(--accent);font-weight:800;font-size:22px;letter-spacing:.08em;padding:10px 22px;border-radius:30px;margin-bottom:20px;}
  .cov-title{font-weight:900;font-size:80px;line-height:1.0;letter-spacing:-.02em;color:var(--ink);text-transform:uppercase;}
  .cov-title .hl{background:#B9F0CE;color:#0F3D25;padding:2px 14px;border-radius:8px;box-decoration-break:clone;-webkit-box-decoration-break:clone;}
  .cov-sub{margin-top:22px;font-size:32px;line-height:1.34;color:var(--muted);max-width:860px;} .cov-sub b{color:var(--ink);}
  .gift{margin-top:22px;align-self:flex-start;background:var(--card);border:1.5px solid var(--cardln);color:var(--ink);font-weight:700;font-size:27px;padding:13px 24px;border-radius:40px;}
  .swipe{margin-top:24px;font-weight:800;font-size:30px;letter-spacing:.12em;color:var(--accent);}

  /* before/after */
  .ba{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
  .ba-box{background:var(--card);border:1.5px solid var(--cardln);border-radius:22px;padding:28px 30px;}
  .ba-box.new{border-color:color-mix(in srgb,var(--grn) 55%,transparent);}
  .ba-lab{font-weight:800;font-size:24px;letter-spacing:.04em;margin-bottom:16px;} .ba-lab.old{color:#c9503f;} .ba-lab.new{color:var(--grn);}
  .ba-box ul{list-style:none;display:flex;flex-direction:column;gap:13px;}
  .ba-box li{font-size:29px;color:var(--ink);line-height:1.28;}
  .stripe{background:var(--card);border:1.5px solid var(--cardln);border-radius:18px;padding:24px 30px;font-size:29px;color:var(--muted);text-align:center;line-height:1.35;} .stripe b{color:var(--accent);}

  /* flow */
  .flow{display:flex;align-items:stretch;justify-content:space-between;gap:10px;}
  .flow-node{flex:1;background:var(--card);border:1.5px solid var(--cardln);border-radius:18px;padding:34px 12px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px;}
  .flow-node b{font-size:38px;} .flow-node span{font-size:25px;color:var(--muted);line-height:1.2;}
  .flow-arr{align-self:center;color:var(--accent);font-size:44px;font-weight:300;}

  /* need */
  .need{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
  .need-c{background:var(--card);border:1.5px solid var(--cardln);border-radius:20px;padding:30px 30px;display:flex;flex-direction:column;gap:8px;}
  .need-ic{width:56px;height:56px;border-radius:16px;background:var(--grn);color:#fff;font-size:34px;font-weight:800;display:flex;align-items:center;justify-content:center;margin-bottom:6px;}
  .need-c b{font-size:34px;} .need-c span{font-size:25px;color:var(--muted);line-height:1.3;}

  /* ways */
  .ways{display:flex;flex-direction:column;gap:16px;}
  .way{display:flex;align-items:flex-start;gap:22px;background:var(--card);border:1.5px solid var(--cardln);border-radius:18px;padding:26px 28px;}
  .way-n{flex:0 0 auto;width:56px;height:56px;border-radius:16px;background:var(--accent);color:#fff;font-weight:800;font-size:30px;display:flex;align-items:center;justify-content:center;}
  .way div b{font-size:33px;color:var(--ink);} .way div span{display:block;font-size:26px;color:var(--muted);margin-top:4px;line-height:1.3;}

  /* terminal */
  .term{background:#100E0C;border-radius:18px;overflow:hidden;border:1px solid #2a251d;}
  .term-bar{display:flex;align-items:center;gap:10px;padding:18px 22px;background:#191512;} .md{width:16px;height:16px;border-radius:50%;} .md.r{background:#ED6A5E;} .md.y{background:#F5BF4F;} .md.g{background:#61C554;} .tt{margin-left:10px;font-family:${MONO};font-size:22px;color:#8b8578;}
  .term-b{padding:34px 30px;font-family:${MONO};font-size:38px;line-height:1.5;color:#ECE7DB;font-weight:700;}
  .term-b .cm{color:#3DDC84;} .term-b .hl2{background:#1FA463;color:#fff;padding:1px 12px;border-radius:6px;} .term-b .dim{font-size:26px;color:#8b8578;font-weight:600;} .term-b .dim b{color:#3DDC84;}

  /* results */
  .res-grid{display:flex;flex-direction:column;gap:14px;}
  .res{display:flex;align-items:center;gap:20px;background:var(--card);border:1.5px solid var(--cardln);border-radius:18px;padding:24px 28px;}
  .res-e{font-size:42px;flex:0 0 auto;} .res-tx b{font-size:31px;} .res-tx span{display:block;font-size:25px;color:var(--muted);margin-top:2px;line-height:1.28;}

  /* cta */
  .fire{font-size:86px;text-align:center;line-height:1;margin-bottom:4px;}
  .plusbox{margin-top:28px;background:var(--card);border:1.5px solid var(--cardln);border-radius:26px;padding:34px 40px;width:100%;text-align:center;}
  .pb-l{font-size:30px;color:var(--muted);} .pb-u{margin-top:10px;font-weight:700;font-size:33px;color:var(--ink);} .pb-u strong{color:var(--accent);font-size:40px;}
  .follow{margin-top:22px;font-size:27px;color:var(--muted);text-align:center;}

  .rule{position:absolute;left:66px;right:66px;bottom:140px;height:2px;background:var(--line);}
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
  render(process.argv[2] || path.join(__dirname, 'solcode-out'))
    .then(f => console.log('Rendered:\n' + f.join('\n')))
    .catch(e => { console.error(e); process.exit(1); });
}
module.exports = { render, html };
