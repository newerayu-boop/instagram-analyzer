// engine/aistrateg/cowork.cjs
// «AI STRATEG» — Claude Cowork bilan bir kishilik kompaniya. Line-art / blueprint mavzu. O'zbekcha B1.
// Footer: AI STRATEG / @kodiyusufbay. CTA: izohga «+».

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const cfg = require('../../src/config');

const W = 1080, H = 1350;
const SERIF = "'Fraunces', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace,'SF Mono',Menlo,Consolas,monospace";
const HANDLE = '@kodiyusufbay';
const TOTAL = 10;

const pg = (i) => `${String(i + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`;
const spark = (c = 'var(--accent)') => `<svg class="spk" viewBox="0 0 24 24"><path d="M12 1l2.2 7.4L21.5 6l-5.1 5.6 6.6 3.4-7.6.5 2.3 7.4L12 17l-5.7 5.9 2.3-7.4L1 15l6.6-3.4L2.5 6l7.3 2.4z" fill="${c}"/></svg>`;
const deco = () => `<div class="bg-grid"></div>`;
const topbar = (kick, i) => `<div class="top"><div class="kick">${spark()}${kick}</div><span class="page">${pg(i)}</span></div>`;
const footer = () => `<div class="rule"></div><div class="footer"><span class="fbrand">${spark()}AI STRATEG</span><span class="fhandle">${HANDLE}</span></div>`;

// cover hub-and-spoke line-art
function hub() {
  const sat = [
    [40, 40, 'Fayllar'], [40, 148, 'Uchrashuv'], [40, 256, 'Tadqiqot'],
    [710, 40, 'Kontent'], [710, 148, 'Hisobot'], [710, 256, 'Reja'],
  ];
  const cx = 450, cy = 175;
  let lines = '', boxes = '';
  sat.forEach(([x, y, t]) => {
    const bx = x < cx ? x + 150 : x, by = y + 27;
    const anchorX = x < cx ? cx - 92 : cx + 92;
    lines += `<path d="M${bx} ${by} L ${anchorX} ${cy}" stroke="#B9B0A0" stroke-width="2.5" stroke-dasharray="7 7" fill="none"/>`;
    boxes += `<g><rect x="${x}" y="${y}" width="150" height="54" rx="14" fill="#FBF8EF" stroke="#2A2620" stroke-width="2.5"/><text x="${x + 75}" y="${y + 34}" text-anchor="middle" font-family="${SANS}" font-size="24" font-weight="700" fill="#2A2620">${t}</text></g>`;
  });
  return `<svg viewBox="0 0 860 350" class="hubsvg">
    ${lines}
    ${boxes}
    <rect x="${cx - 92}" y="${cy - 56}" width="184" height="112" rx="20" fill="#2A2620"/>
    <text x="${cx}" y="${cy - 8}" text-anchor="middle" font-family="${SANS}" font-size="26" font-weight="800" fill="#F4EFE2" letter-spacing="1">CLAUDE</text>
    <text x="${cx}" y="${cy + 26}" text-anchor="middle" font-family="${SANS}" font-size="26" font-weight="800" fill="#E0794C" letter-spacing="1">COWORK</text>
  </svg>`;
}

// ── slides ────────────────────────────────────────────────
function cover() {
  return `<section class="slide cover">
    ${deco()}
    <div class="top"><div class="kick">${spark()}AI STRATEG</div><span class="page">${pg(0)}</span></div>
    <div class="cov-mid">
      <div class="cov-art">${hub()}</div>
      <div class="badge">SIZ + AI = KOMPANIYA</div>
      <h1 class="cov-title">BIR KISHILIK<br><span class="acc">KOMPANIYA</span></h1>
      <p class="cov-sub">Claude Chat — <b>o'ylash</b> uchun. Claude Cowork — <b>ish qilish</b> uchun: fayllarni o'zi yaratadi, tahrirlaydi va saqlaydi.</p>
      <div class="gift">🎁 Oxirida — bepul to'liq qo'llanma</div>
      <div class="swipe">SURING <b>&rarr;</b></div>
    </div>
    ${footer()}
  </section>`;
}

function s2() {
  return `<section class="slide">
    ${deco()}
    ${topbar('CHAT vs COWORK', 1)}
    <div class="mid">
    <h2 class="h">Ikkalasi <span class="acc">boshqa ish</span> qiladi</h2>
    <div class="ba">
      <div class="ba-box"><div class="ba-lab old">CLAUDE CHAT</div><ul><li>Savolga javob</li><li>G'oya beradi</li><li>Siz nusxalaysiz</li></ul></div>
      <div class="ba-box new"><div class="ba-lab new">CLAUDE COWORK</div><ul><li>Fayl yaratadi</li><li>Tahrir qiladi</li><li>O'zi saqlaydi</li></ul></div>
    </div>
    <div class="stripe">Chat javob beradi. Cowork esa <b>ishni o'zi bajaradi</b> va natijani joyiga qo'yadi.</div>
    </div>
    ${footer()}
  </section>`;
}

function s3() {
  const items = [
    ['📄', 'Hujjat o\'qiydi'], ['📁', 'Papka yaratadi'],
    ['✏️', 'Fayl nomini o\'zgartiradi'], ['📊', 'Jadval quradi'],
    ['📝', 'Hisobot yozadi'], ['❓', 'Avval savol beradi'],
  ].map(([e, t]) => `<div class="cap"><span class="cap-e">${e}</span><b>${t}</b></div>`).join('');
  return `<section class="slide">
    ${deco()}
    ${topbar('COWORK NIMA QILADI', 2)}
    <div class="mid">
    <h2 class="h">U <span class="acc">ishni bajaradi</span></h2>
    <div class="cap-grid">${items}</div>
    <div class="stripe">Eng muhimi: u nima qilishni aytmaydi — <b>o'zi qiladi</b> va natijani to'g'ri papkaga qo'yadi.</div>
    </div>
    ${footer()}
  </section>`;
}

function s4() {
  return `<section class="slide">
    ${deco()}
    ${topbar('FIKR O\'ZGARISHI', 3)}
    <div class="mid">
    <h2 class="h">Eski oqim vs <span class="acc">yangi oqim</span></h2>
    <div class="ba">
      <div class="ba-box"><div class="ba-lab old">ESKI</div><ul><li>So'raysiz</li><li>Nusxa → joylash</li><li>Qo'lda saqlaysiz</li></ul></div>
      <div class="ba-box new"><div class="ba-lab new">YANGI</div><ul><li>Maqsad berasiz</li><li>Cowork bajaradi</li><li>Siz tekshirasiz</li></ul></div>
    </div>
    <div class="stripe">Maqsad — sizni <b>arzon ishlardan</b> ozod qilish, tez yozish emas.</div>
    </div>
    ${footer()}
  </section>`;
}

function s5() {
  const ways = [
    ['1', 'Desktop o\'rnating', 'claude.com/download — brauzer emas, ilova kerak.'],
    ['2', 'Bitta papka yarating', 'Butun kompyuterni emas — bitta papkadan boshlang.'],
    ['3', 'Reference qo\'shing', 'Uslub, shablon, eski hisobotlar. Yaxshi kontekst — yaxshi natija.'],
    ['4', 'Bitta ish bering', 'Eng zerikarli ishdan boshlang: papkani tartiblash.'],
  ].map(([n, t, d]) => `<div class="way"><span class="way-n">${n}</span><div><b>${t}</b><span>${d}</span></div></div>`).join('');
  return `<section class="slide">
    ${deco()}
    ${topbar('5 DAQIQADA BOSHLASH', 4)}
    <div class="mid">
    <h2 class="h">4 ta <span class="acc">oddiy qadam</span></h2>
    <div class="ways">${ways}</div>
    </div>
    ${footer()}
  </section>`;
}

function s6() {
  const folders = ['01 Inbox', '02 Research', '03 Content', '04 Sales', '05 Clients', '06 Operations', '07 Finance', '08 Templates', '09 Reports', '10 Archive'];
  const chips = folders.map((f, i) => `<div class="fold${i === 7 ? ' hot' : ''}">📁 ${f}</div>`).join('');
  return `<section class="slide">
    ${deco()}
    ${topbar('PAPKA TIZIMI', 5)}
    <div class="mid">
    <h2 class="h">Company OS — <span class="acc">tartib</span></h2>
    <div class="fold-grid">${chips}</div>
    <div class="stripe"><b>08 Templates</b> — eng muhim papka. Shablonlar natijani bir xil qiladi. <b>10 Archive</b> — o'chirmang, arxivlang.</div>
    </div>
    ${footer()}
  </section>`;
}

function s7() {
  const steps = [
    ['Explore', 'papkani ko\'radi', 'hech narsa o\'zgarmaydi'],
    ['Plan', 'rejani taklif qiladi', 'sizdan so\'raydi'],
    ['Execute', 'rejani bajaradi', 'xulosa yozadi'],
  ].map(([t, d, d2], i) => `<div class="pnode"><b>${t}</b><span>${d}</span><span class="mut">${d2}</span></div>${i < 2 ? '<div class="flow-arr">→</div>' : ''}`).join('');
  return `<section class="slide">
    ${deco()}
    ${topbar('XAVFSIZ USUL', 6)}
    <div class="mid">
    <h2 class="h">Explore → Plan → <span class="acc">Execute</span></h2>
    <div class="pipe">${steps}</div>
    <div class="stripe">Katta ishga birdan tashlamang. Avval <b>ko'rsin, reja tuzsin, so'ng bajarsin</b>.</div>
    </div>
    ${footer()}
  </section>`;
}

function s8() {
  const jobs = [
    ['🗂️', 'Fayl tartibi', 'Chalkash papkani tozalaydi'],
    ['🗒️', 'Uchrashuv qaydi', 'Qaror, vazifa, muddat'],
    ['📅', 'Haftalik hisobot', 'Hafta yakuni bir joyda'],
    ['🔎', 'Tadqiqot brifi', 'Manbalarni qisqartiradi'],
    ['✍️', 'Kontent', 'G\'oyadan tayyor matn'],
    ['🌅', 'Kunlik brif', 'Ertalab 3 ustuvorlik'],
  ].map(([e, t, d]) => `<div class="res"><span class="res-e">${e}</span><div class="res-tx"><b>${t}</b><span>${d}</span></div></div>`).join('');
  return `<section class="slide">
    ${deco()}
    ${topbar('BIRINCHI 6 ISH', 7)}
    <div class="mid">
    <h2 class="h">Shularni <span class="acc">ishoning</span></h2>
    <div class="res-grid two">${jobs}</div>
    </div>
    ${footer()}
  </section>`;
}

function s9() {
  return `<section class="slide">
    ${deco()}
    ${topbar('QOIDA VA CHEGARA', 8)}
    <div class="mid">
    <h2 class="h">Erkinlik + <span class="acc">chegara</span></h2>
    <div class="ba">
      <div class="ba-box"><div class="ba-lab new">QOIDA BERING</div><ul><li>Fayl o'chirmang</li><li>Ustiga yozishdan so'rang</li><li>Har o'zgarishga xulosa</li></ul></div>
      <div class="ba-box"><div class="ba-lab old">O'ZINGIZ HAL QILING</div><ul><li>Pul qarorlari</li><li>Yuridik masalalar</li><li>Yakuniy tasdiqlash</li></ul></div>
    </div>
    <div class="stripe">Cowork — <b>ishlab chiqarish</b>. Siz — <b>qaror</b>. Ana shu to'g'ri bo'linish.</div>
    </div>
    ${footer()}
  </section>`;
}

function s10() {
  return `<section class="slide cta">
    ${deco()}
    ${topbar('OXIRIGACHA YETDINGIZ', 9)}
    <div class="mid">
    <div class="fire">🚀</div>
    <h2 class="h" style="text-align:center">Bitta odam — <span class="acc">butun jamoa</span></h2>
    <div class="plusbox">
      <div class="pb-l">To'liq qo'llanmani DM'da oling:</div>
      <div class="pb-u">Izohga <strong>«+»</strong> yozing — Company OS rejasini yuboramiz.</div>
    </div>
    <div class="follow">Saqlang, ulashing va ishga soling.</div>
    </div>
    ${footer()}
  </section>`;
}

const slides = [cover(), s2(), s3(), s4(), s5(), s6(), s7(), s8(), s9(), s10()];

function html() {
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,700&family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{--bg:#F4EFE2; --ink:#2A2620; --muted:#75705F; --accent:#C4623B; --line:#DED7C6; --card:#FBF8EF; --cardln:#E6DECB;
    width:${W}px;height:${H}px;position:relative;overflow:hidden;background:var(--bg);color:var(--ink);
    font-family:${SANS};padding:150px 66px 178px;display:flex;flex-direction:column;justify-content:center;}
  .bg-grid{position:absolute;inset:0;z-index:0;background-image:radial-gradient(circle, rgba(42,38,32,.06) 1.5px, transparent 1.5px);background-size:34px 34px;opacity:.7;}
  .slide>*{position:relative;z-index:1;}
  .acc{color:var(--accent);} b,strong{font-weight:800;color:var(--ink);}

  .top{position:absolute;top:60px;left:66px;right:66px;display:flex;justify-content:space-between;align-items:center;}
  .kick{display:flex;align-items:center;gap:12px;font-weight:800;font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);}
  .kick .spk,.fbrand .spk{width:26px;height:26px;}
  .page{font-weight:700;font-size:25px;letter-spacing:.1em;color:var(--muted);}

  .h{font-family:${SERIF};font-weight:900;font-size:70px;line-height:1.05;margin:0;}
  .h .acc{color:var(--accent);}
  .body{font-size:33px;line-height:1.4;color:var(--muted);margin:0;}
  .body b{color:var(--ink);font-weight:800;}

  /* cover */
  .cover{padding-top:52px;}
  .cov-mid{position:absolute;top:50%;left:66px;right:66px;transform:translateY(-50%);display:flex;flex-direction:column;}
  .cov-art{width:100%;margin-bottom:16px;}
  .hubsvg{width:100%;height:auto;display:block;}
  .badge{align-self:flex-start;background:color-mix(in srgb,var(--accent) 14%, transparent);border:1.5px solid color-mix(in srgb,var(--accent) 55%, transparent);color:var(--accent);font-weight:800;font-size:22px;letter-spacing:.08em;padding:10px 22px;border-radius:30px;margin-bottom:20px;}
  .cov-title{font-family:${SERIF};font-weight:900;font-size:90px;line-height:.98;letter-spacing:-.01em;color:var(--ink);text-transform:uppercase;}
  .cov-title .acc{color:var(--accent);}
  .cov-sub{margin-top:22px;font-size:32px;line-height:1.34;color:var(--muted);max-width:860px;} .cov-sub b{color:var(--ink);}
  .gift{margin-top:22px;align-self:flex-start;background:var(--card);border:1.5px solid var(--cardln);color:var(--ink);font-weight:700;font-size:27px;padding:13px 24px;border-radius:40px;}
  .swipe{margin-top:24px;font-weight:800;font-size:30px;letter-spacing:.12em;color:var(--accent);}

  /* before/after */
  .ba{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
  .ba-box{background:var(--card);border:1.5px solid var(--cardln);border-radius:22px;padding:28px 30px;}
  .ba-box.new{border-color:color-mix(in srgb,var(--accent) 50%,transparent);}
  .ba-lab{font-weight:800;font-size:24px;letter-spacing:.04em;margin-bottom:16px;} .ba-lab.old{color:#c9503f;} .ba-lab.new{color:#3E8E5C;}
  .ba-box ul{list-style:none;display:flex;flex-direction:column;gap:13px;}
  .ba-box li{font-size:29px;color:var(--ink);line-height:1.28;}
  .stripe{background:var(--card);border:1.5px solid var(--cardln);border-radius:18px;padding:24px 30px;font-size:29px;color:var(--muted);text-align:center;line-height:1.35;} .stripe b{color:var(--accent);}

  /* capability grid */
  .cap-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .cap{display:flex;align-items:center;gap:18px;background:var(--card);border:1.5px solid var(--cardln);border-radius:16px;padding:24px 26px;}
  .cap-e{font-size:40px;flex:0 0 auto;} .cap b{font-size:30px;}

  /* ways */
  .ways{display:flex;flex-direction:column;gap:16px;}
  .way{display:flex;align-items:flex-start;gap:22px;background:var(--card);border:1.5px solid var(--cardln);border-radius:18px;padding:26px 28px;}
  .way-n{flex:0 0 auto;width:56px;height:56px;border-radius:16px;background:var(--accent);color:#fff;font-weight:800;font-size:30px;display:flex;align-items:center;justify-content:center;}
  .way div b{font-size:33px;color:var(--ink);} .way div span{display:block;font-size:26px;color:var(--muted);margin-top:4px;line-height:1.3;}

  /* folders */
  .fold-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  .fold{background:var(--card);border:1.5px solid var(--cardln);border-radius:14px;padding:22px 24px;font-size:29px;font-weight:700;color:var(--ink);}
  .fold.hot{border-color:var(--accent);color:var(--accent);background:color-mix(in srgb,var(--accent) 8%,var(--card));}

  /* pipeline */
  .pipe{display:flex;align-items:stretch;justify-content:space-between;gap:8px;}
  .pnode{flex:1;background:var(--card);border:2px solid var(--ink);border-radius:18px;padding:28px 12px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px;}
  .pnode b{font-size:34px;font-family:${SERIF};font-weight:900;} .pnode span{font-size:23px;color:var(--muted);line-height:1.2;} .pnode .mut{font-size:20px;color:var(--muted);opacity:.8;}
  .flow-arr{align-self:center;color:var(--accent);font-size:40px;font-weight:300;}

  /* results */
  .res-grid{display:flex;flex-direction:column;gap:14px;} .res-grid.two{display:grid;grid-template-columns:1fr 1fr;}
  .res{display:flex;align-items:center;gap:18px;background:var(--card);border:1.5px solid var(--cardln);border-radius:16px;padding:22px 24px;}
  .res-e{font-size:38px;flex:0 0 auto;} .res-tx b{font-size:29px;} .res-tx span{display:block;font-size:22px;color:var(--muted);margin-top:2px;line-height:1.24;}

  /* cta */
  .fire{font-size:90px;text-align:center;line-height:1;margin-bottom:4px;}
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
  render(process.argv[2] || path.join(__dirname, 'cowork-out'))
    .then(f => console.log('Rendered:\n' + f.join('\n')))
    .catch(e => { console.error(e); process.exit(1); });
}
module.exports = { render, html };
