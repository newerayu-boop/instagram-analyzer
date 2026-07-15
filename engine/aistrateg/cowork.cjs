// engine/aistrateg/cowork.cjs
// «AI STRATEG» — Claude Cowork bilan bir kishilik kompaniya.
// QO'LDA CHIZILGAN BLOKNOT/STIKER mavzu: skotch, egilgan stiker, marker, qo'lda strelka. O'zbekcha B1.
// Footer: AI STRATEG / @kodiyusufbay. CTA: izohga «+».

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const cfg = require('../../src/config');

const W = 1080, H = 1350;
const SERIF = "'Fraunces', Georgia, serif";
const HAND = "'Kalam', 'Comic Sans MS', cursive";
const SANS = "'Inter', system-ui, sans-serif";
const HANDLE = '@kodiyusufbay';
const TOTAL = 10;

const pg = (i) => `${String(i + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`;
const spark = (c = 'var(--accent)') => `<svg class="spk" viewBox="0 0 24 24"><path d="M12 1l2.2 7.4L21.5 6l-5.1 5.6 6.6 3.4-7.6.5 2.3 7.4L12 17l-5.7 5.9 2.3-7.4L1 15l6.6-3.4L2.5 6l7.3 2.4z" fill="${c}"/></svg>`;
const deco = () => `<div class="paper"></div>`;
const topbar = (kick, i) => `<div class="top"><div class="kick">${spark()}${kick}</div><span class="page">${pg(i)}</span></div>`;
const footer = () => `<div class="rule"></div><div class="footer"><span class="fbrand">${spark()}AI STRATEG</span><span class="fhandle">${HANDLE}</span></div>`;
const tape = (cls = '') => `<span class="tape ${cls}"></span>`;
// hand-drawn arrow between two flow items
const harrow = () => `<svg class="harr" viewBox="0 0 60 40"><path d="M4 22 C 20 10, 34 30, 50 18" stroke="#C4623B" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M42 12 L52 17 L44 25" stroke="#C4623B" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const hunder = (c = '#C4623B') => `<svg class="hu" viewBox="0 0 300 16" preserveAspectRatio="none"><path d="M4 10 C 80 3, 150 15, 296 6" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`;

// cover hub-and-spoke (sketch)
function hub() {
  const sat = [
    [40, 40, 'Fayllar'], [40, 148, 'Uchrashuv'], [40, 256, 'Tadqiqot'],
    [710, 40, 'Kontent'], [710, 148, 'Hisobot'], [710, 256, 'Reja'],
  ];
  const cx = 450, cy = 175;
  let lines = '', boxes = '';
  sat.forEach(([x, y, t], i) => {
    const bx = x < cx ? x + 150 : x, by = y + 27;
    const anchorX = x < cx ? cx - 92 : cx + 92;
    const mx = (bx + anchorX) / 2, my = (by + cy) / 2 + (i % 2 ? 14 : -14);
    lines += `<path d="M${bx} ${by} Q ${mx} ${my}, ${anchorX} ${cy}" stroke="#B0A794" stroke-width="2.5" stroke-dasharray="2 9" stroke-linecap="round" fill="none"/>`;
    boxes += `<g transform="rotate(${i % 2 ? 1.5 : -1.5} ${x + 75} ${y + 27})"><rect x="${x}" y="${y}" width="150" height="54" rx="9" fill="#FFFDF5" stroke="#2A2620" stroke-width="2.5"/><text x="${x + 75}" y="${y + 35}" text-anchor="middle" font-family="${HAND}" font-size="27" font-weight="700" fill="#2A2620">${t}</text></g>`;
  });
  return `<svg viewBox="0 0 860 350" class="hubsvg">
    ${lines}
    ${boxes}
    <rect x="${cx - 94}" y="${cy - 58}" width="188" height="116" rx="16" fill="#2A2620" transform="rotate(-1.2 ${cx} ${cy})"/>
    <text x="${cx}" y="${cy - 8}" text-anchor="middle" font-family="${HAND}" font-size="30" font-weight="700" fill="#F4EFE2">CLAUDE</text>
    <text x="${cx}" y="${cy + 28}" text-anchor="middle" font-family="${HAND}" font-size="30" font-weight="700" fill="#E0794C">COWORK</text>
  </svg>`;
}

// ── slides ────────────────────────────────────────────────
function cover() {
  return `<section class="slide cover">
    ${deco()}
    <div class="top"><div class="kick">${spark()}AI STRATEG</div><span class="page">${pg(0)}</span></div>
    <div class="cov-mid">
      <div class="cov-art">${hub()}</div>
      <div class="badge">${tape()}SIZ + AI = KOMPANIYA</div>
      <h1 class="cov-title">BIR KISHILIK<br><span class="acc">KOMPANIYA<span class="uwrap">${hunder()}</span></span></h1>
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
    <h2 class="h">Ikkalasi <span class="mk">boshqa ish</span> qiladi</h2>
    <div class="ba">
      <div class="note rot-l">${tape()}<div class="note-lab old">CLAUDE CHAT</div><ul><li>Savolga javob</li><li>G'oya beradi</li><li>Siz nusxalaysiz</li></ul></div>
      <div class="note rot-r">${tape('blue')}<div class="note-lab new">CLAUDE COWORK</div><ul><li>Fayl yaratadi</li><li>Tahrir qiladi</li><li>O'zi saqlaydi</li></ul></div>
    </div>
    <div class="stripe">Chat javob beradi. Cowork esa <b>ishni o'zi bajaradi</b> va natijani joyiga qo'yadi.</div>
    </div>
    ${footer()}
  </section>`;
}

function s3() {
  const items = [
    ['📄', 'Hujjat o\'qiydi'], ['📁', 'Papka yaratadi'],
    ['✏️', 'Nomini almashtiradi'], ['📊', 'Jadval quradi'],
    ['📝', 'Hisobot yozadi'], ['❓', 'Avval savol beradi'],
  ].map(([e, t], i) => `<div class="cap ${i % 2 ? 'rot-r' : 'rot-l'}">${tape()}<span class="cap-e">${e}</span><b>${t}</b></div>`).join('');
  return `<section class="slide">
    ${deco()}
    ${topbar('COWORK NIMA QILADI', 2)}
    <div class="mid">
    <h2 class="h">U <span class="mk">ishni bajaradi</span></h2>
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
    <h2 class="h">Eski oqim vs <span class="mk">yangi oqim</span></h2>
    <div class="ba">
      <div class="note rot-l">${tape()}<div class="note-lab old">ESKI</div><ul><li>So'raysiz</li><li>Nusxa → joylash</li><li>Qo'lda saqlaysiz</li></ul></div>
      <div class="note rot-r">${tape('blue')}<div class="note-lab new">YANGI</div><ul><li>Maqsad berasiz</li><li>Cowork bajaradi</li><li>Siz tekshirasiz</li></ul></div>
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
  ].map(([n, t, d], i) => `<div class="way ${i % 2 ? 'rot-r' : 'rot-l'}"><span class="way-n">${n}</span><div><b>${t}</b><span>${d}</span></div></div>`).join('');
  return `<section class="slide">
    ${deco()}
    ${topbar('5 DAQIQADA BOSHLASH', 4)}
    <div class="mid">
    <h2 class="h">4 ta <span class="mk">oddiy qadam</span></h2>
    <div class="ways">${ways}</div>
    </div>
    ${footer()}
  </section>`;
}

function s6() {
  const folders = ['01 Inbox', '02 Research', '03 Content', '04 Sales', '05 Clients', '06 Operations', '07 Finance', '08 Templates', '09 Reports', '10 Archive'];
  const chips = folders.map((f, i) => `<div class="fold${i === 7 ? ' hot' : ''} ${i % 2 ? 'rot-r' : 'rot-l'}"><span class="ftab"></span>${f}</div>`).join('');
  return `<section class="slide">
    ${deco()}
    ${topbar('PAPKA TIZIMI', 5)}
    <div class="mid">
    <h2 class="h">Company OS — <span class="mk">tartib</span></h2>
    <div class="fold-grid">${chips}</div>
    <div class="stripe"><b>08 Templates</b> — eng muhim papka. <b>10 Archive</b> — o'chirmang, arxivlang.</div>
    </div>
    ${footer()}
  </section>`;
}

function s7() {
  const nodes = [
    ['Explore', 'papkani ko\'radi', 'hech narsa o\'zgarmaydi'],
    ['Plan', 'rejani taklif qiladi', 'sizdan so\'raydi'],
    ['Execute', 'rejani bajaradi', 'xulosa yozadi'],
  ].map(([t, d, d2], i) => `<div class="pnode ${i === 2 ? 'hot' : ''} ${i % 2 ? 'rot-r' : 'rot-l'}">${tape()}<b>${t}</b><span>${d}</span><span class="mut">${d2}</span></div>${i < 2 ? harrow() : ''}`).join('');
  return `<section class="slide">
    ${deco()}
    ${topbar('XAVFSIZ USUL', 6)}
    <div class="mid">
    <h2 class="h">Explore → Plan → <span class="mk">Execute</span></h2>
    <div class="pipe">${nodes}</div>
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
  ].map(([e, t, d], i) => `<div class="res ${i % 2 ? 'rot-r' : 'rot-l'}"><span class="res-e">${e}</span><div class="res-tx"><b>${t}</b><span>${d}</span></div></div>`).join('');
  return `<section class="slide">
    ${deco()}
    ${topbar('BIRINCHI 6 ISH', 7)}
    <div class="mid">
    <h2 class="h">Shularni <span class="mk">ishoning</span></h2>
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
    <h2 class="h">Erkinlik + <span class="mk">chegara</span></h2>
    <div class="ba">
      <div class="note rot-l">${tape('blue')}<div class="note-lab new">QOIDA BERING</div><ul><li>Fayl o'chirmang</li><li>Ustiga yozishdan so'rang</li><li>Har ishga xulosa</li></ul></div>
      <div class="note rot-r">${tape()}<div class="note-lab old">O'ZINGIZ HAL QILING</div><ul><li>Pul qarorlari</li><li>Yuridik masalalar</li><li>Yakuniy tasdiq</li></ul></div>
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
    <h2 class="h" style="text-align:center">Bitta odam — <span class="mk">butun jamoa</span></h2>
    <div class="plusbox">${tape()}${tape('blue')}
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
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,700&family=Kalam:wght@400;700&family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{--bg:#F4EFE2; --ink:#2A2620; --muted:#6f6a5b; --accent:#C4623B; --blue:#3E6DB5; --line:#CFC7B4; --card:#FFFDF5; --mkc:#FBE08A;
    width:${W}px;height:${H}px;position:relative;overflow:hidden;background:var(--bg);color:var(--ink);
    font-family:${SANS};padding:150px 66px 178px;display:flex;flex-direction:column;justify-content:center;}
  /* blueprint / graph paper */
  .paper{position:absolute;inset:0;z-index:0;
    background-image:linear-gradient(rgba(42,38,32,.05) 1.5px,transparent 1.5px),linear-gradient(90deg,rgba(42,38,32,.05) 1.5px,transparent 1.5px);
    background-size:48px 48px;}
  .slide>*{position:relative;z-index:1;}
  .acc{color:var(--accent);} b,strong{font-weight:800;color:var(--ink);}
  /* marker highlight */
  .mk{position:relative;white-space:nowrap;color:var(--ink);z-index:0;}
  .mk::before{content:"";position:absolute;left:-6px;right:-6px;top:14%;bottom:6%;background:var(--mkc);transform:rotate(-1deg);z-index:-1;border-radius:4px;}

  .top{position:absolute;top:60px;left:66px;right:66px;display:flex;justify-content:space-between;align-items:center;}
  .kick{display:flex;align-items:center;gap:12px;font-family:${HAND};font-weight:700;font-size:28px;letter-spacing:.02em;text-transform:uppercase;color:var(--accent);}
  .kick .spk,.fbrand .spk{width:26px;height:26px;}
  .page{font-family:${HAND};font-weight:700;font-size:27px;color:var(--muted);}

  .h{font-family:${SERIF};font-weight:900;font-size:70px;line-height:1.06;margin:0;}
  .h .mk{color:var(--ink);}

  /* cover */
  .cover{padding-top:52px;}
  .cov-mid{position:absolute;top:50%;left:66px;right:66px;transform:translateY(-50%);display:flex;flex-direction:column;}
  .cov-art{width:100%;margin-bottom:16px;}
  .hubsvg{width:100%;height:auto;display:block;}
  .badge{position:relative;align-self:flex-start;background:var(--card);border:2.5px dashed var(--accent);color:var(--accent);font-family:${HAND};font-weight:700;font-size:24px;letter-spacing:.03em;padding:10px 24px;border-radius:8px;margin-bottom:22px;transform:rotate(-1.5deg);}
  .cov-title{font-family:${SERIF};font-weight:900;font-size:90px;line-height:.98;letter-spacing:-.01em;color:var(--ink);text-transform:uppercase;}
  .cov-title .acc{color:var(--accent);position:relative;}
  .uwrap{position:absolute;left:0;right:0;bottom:-14px;height:16px;} .uwrap .hu{width:100%;height:16px;}
  .cov-sub{margin-top:34px;font-size:32px;line-height:1.34;color:var(--muted);max-width:860px;} .cov-sub b{color:var(--ink);}
  .gift{margin-top:22px;position:relative;align-self:flex-start;background:#FFF7DC;border:2px solid var(--ink);color:var(--ink);font-family:${HAND};font-weight:700;font-size:28px;padding:12px 26px;border-radius:8px;transform:rotate(1deg);}
  .swipe{margin-top:24px;font-family:${HAND};font-weight:700;font-size:34px;letter-spacing:.04em;color:var(--accent);}

  /* tape */
  .tape{position:absolute;top:-13px;left:50%;margin-left:-40px;width:80px;height:26px;background:rgba(224,180,90,.55);border:1px solid rgba(160,120,40,.25);transform:rotate(-4deg);box-shadow:0 1px 3px rgba(0,0,0,.08);}
  .tape.blue{background:rgba(120,150,200,.4);border-color:rgba(70,100,160,.25);transform:rotate(3deg);}

  /* sticky notes */
  .rot-l{transform:rotate(-1.3deg);} .rot-r{transform:rotate(1.3deg);}
  .note{position:relative;background:var(--card);border:2.5px solid var(--ink);border-radius:7px 16px 9px 14px;padding:30px 30px 26px;box-shadow:5px 6px 0 rgba(42,38,32,.13);}
  .note-lab{font-family:${HAND};font-weight:700;font-size:28px;margin-bottom:14px;} .note-lab.old{color:#c9503f;} .note-lab.new{color:var(--blue);}
  .ba{display:grid;grid-template-columns:1fr 1fr;gap:26px;}
  .note ul{list-style:none;display:flex;flex-direction:column;gap:12px;}
  .note li{font-size:29px;color:var(--ink);line-height:1.26;padding-left:30px;position:relative;}
  .note li::before{content:"✓";position:absolute;left:0;color:var(--accent);font-weight:800;}
  .stripe{background:var(--card);border:2.5px dashed var(--line);border-radius:10px;padding:24px 30px;font-size:29px;color:var(--muted);text-align:center;line-height:1.35;} .stripe b{color:var(--accent);}

  /* capability sticky grid */
  .cap-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
  .cap{position:relative;display:flex;align-items:center;gap:18px;background:var(--card);border:2.5px solid var(--ink);border-radius:8px 14px 9px 13px;padding:26px 26px;box-shadow:4px 5px 0 rgba(42,38,32,.12);}
  .cap-e{font-size:42px;flex:0 0 auto;} .cap b{font-size:30px;}

  /* ways */
  .ways{display:flex;flex-direction:column;gap:18px;}
  .way{display:flex;align-items:flex-start;gap:22px;background:var(--card);border:2.5px solid var(--ink);border-radius:8px 15px 8px 15px;padding:26px 28px;box-shadow:4px 5px 0 rgba(42,38,32,.12);}
  .way-n{flex:0 0 auto;width:60px;height:60px;border-radius:50%;background:var(--accent);color:#fff;font-family:${HAND};font-weight:700;font-size:36px;display:flex;align-items:center;justify-content:center;border:2.5px solid var(--ink);}
  .way div b{font-size:33px;color:var(--ink);} .way div span{display:block;font-size:26px;color:var(--muted);margin-top:4px;line-height:1.3;}

  /* folders */
  .fold-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .fold{position:relative;background:var(--card);border:2.5px solid var(--ink);border-radius:2px 10px 10px 10px;padding:22px 24px 22px 26px;font-family:${HAND};font-size:31px;font-weight:700;color:var(--ink);box-shadow:3px 4px 0 rgba(42,38,32,.1);}
  .fold .ftab{position:absolute;top:-13px;left:20px;width:64px;height:16px;background:var(--card);border:2.5px solid var(--ink);border-bottom:none;border-radius:6px 6px 0 0;}
  .fold.hot{background:#FFF3D6;border-color:var(--accent);color:var(--accent);} .fold.hot .ftab{border-color:var(--accent);background:#FFF3D6;}

  /* pipeline */
  .pipe{display:flex;align-items:center;justify-content:space-between;gap:2px;}
  .pnode{position:relative;flex:1;background:var(--card);border:2.5px solid var(--ink);border-radius:9px 13px 9px 13px;padding:30px 10px 24px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:5px;box-shadow:4px 5px 0 rgba(42,38,32,.12);}
  .pnode.hot{background:#FFF3D6;border-color:var(--accent);}
  .pnode b{font-family:${HAND};font-size:38px;font-weight:700;} .pnode span{font-size:22px;color:var(--muted);line-height:1.2;} .pnode .mut{font-size:19px;opacity:.85;}
  .harr{width:58px;height:40px;flex:0 0 auto;}

  /* results */
  .res-grid{display:flex;flex-direction:column;gap:14px;} .res-grid.two{display:grid;grid-template-columns:1fr 1fr;}
  .res{position:relative;display:flex;align-items:center;gap:16px;background:var(--card);border:2.5px solid var(--ink);border-radius:8px 13px 8px 13px;padding:22px 24px;box-shadow:3px 4px 0 rgba(42,38,32,.1);}
  .res-e{font-size:40px;flex:0 0 auto;} .res-tx b{font-size:29px;} .res-tx span{display:block;font-size:22px;color:var(--muted);margin-top:2px;line-height:1.24;}

  /* cta */
  .fire{font-size:96px;text-align:center;line-height:1;margin-bottom:2px;}
  .plusbox{position:relative;margin-top:30px;background:#FFF7DC;border:2.5px solid var(--ink);border-radius:10px 18px 10px 18px;padding:36px 40px;width:100%;text-align:center;box-shadow:6px 7px 0 rgba(42,38,32,.13);transform:rotate(-1deg);}
  .pb-l{font-family:${HAND};font-size:31px;color:var(--muted);} .pb-u{margin-top:10px;font-weight:700;font-size:33px;color:var(--ink);} .pb-u strong{color:var(--accent);font-size:42px;}
  .follow{margin-top:26px;font-family:${HAND};font-size:29px;color:var(--muted);text-align:center;}

  .rule{position:absolute;left:66px;right:66px;bottom:140px;height:0;border-top:3px dashed var(--line);}
  .footer{position:absolute;left:66px;right:66px;bottom:78px;display:flex;align-items:center;justify-content:space-between;}
  .mid{position:absolute;top:50%;left:66px;right:66px;transform:translateY(-50%);display:flex;flex-direction:column;gap:24px;}
  .mid>*{margin-top:0!important;margin-bottom:0!important;}
  .fbrand{display:flex;align-items:center;gap:10px;font-weight:900;font-size:28px;letter-spacing:.06em;color:var(--accent);}
  .fhandle{font-family:${HAND};font-weight:700;font-size:29px;color:var(--muted);}
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
