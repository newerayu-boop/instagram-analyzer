// engine/aistrateg/research.cjs
// «AI STRATEG» — Claude Code + NotebookLM + Obsidian: Tadqiqot mashinasi.
// Qora + tarmoq (node) mavzu, ko'p rangli vositalar. O'zbekcha B1.
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
const TOTAL = 10;

const pg = (i) => `${String(i + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`;
const spark = (c = 'var(--accent)') => `<svg class="spk" viewBox="0 0 24 24"><path d="M12 1l2.2 7.4L21.5 6l-5.1 5.6 6.6 3.4-7.6.5 2.3 7.4L12 17l-5.7 5.9 2.3-7.4L1 15l6.6-3.4L2.5 6l7.3 2.4z" fill="${c}"/></svg>`;
const deco = (cls = '') => `<div class="bg-grid"></div><div class="glow ${cls}"></div>`;
const topbar = (kick, i) => `<div class="top"><div class="kick">${spark()}${kick}</div><span class="page">${pg(i)}</span></div>`;
const footer = () => `<div class="rule"></div><div class="footer"><span class="fbrand">${spark()}AI STRATEG</span><span class="fhandle">${HANDLE}</span></div>`;

// SVG: 4 tool node-cluster with connecting lines (cover art)
function cluster() {
  return `<svg class="clus" viewBox="0 0 520 520" fill="none">
    <g stroke-width="2" opacity=".5">
      <line x1="150" y1="260" x2="300" y2="120" stroke="#E23B2E"/>
      <line x1="150" y1="260" x2="380" y2="240" stroke="#2BB3A3"/>
      <line x1="150" y1="260" x2="320" y2="400" stroke="#7C5CFF"/>
      <line x1="150" y1="260" x2="230" y2="300" stroke="#D0703F"/>
    </g>
    ${dots('#E23B2E',300,120)}${dots('#2BB3A3',380,240)}${dots('#7C5CFF',320,400)}${dots('#D0703F',150,260,true)}
    <g>
      <circle cx="150" cy="260" r="46" fill="#1B1712" stroke="#D0703F" stroke-width="3"/><text x="150" y="274" font-size="40" text-anchor="middle" fill="#D0703F" font-family="${MONO}">&gt;_</text>
      <circle cx="300" cy="120" r="30" fill="#1B1712" stroke="#E23B2E" stroke-width="3"/><path d="M291 108l20 12-20 12z" fill="#E23B2E"/>
      <circle cx="380" cy="240" r="30" fill="#1B1712" stroke="#2BB3A3" stroke-width="3"/><path d="M366 252c8-20 20-20 28 0" stroke="#2BB3A3" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M373 252c4-11 10-11 14 0" stroke="#2BB3A3" stroke-width="4" fill="none" stroke-linecap="round"/>
      <circle cx="320" cy="400" r="30" fill="#1B1712" stroke="#7C5CFF" stroke-width="3"/><path d="M312 388l16 6-4 18-14-8z" fill="#7C5CFF"/>
    </g>
  </svg>`;
}
function dots(c, cx, cy, big) {
  const n = big ? 90 : 46, R = big ? 120 : 74;
  let s = '';
  for (let k = 0; k < n; k++) {
    const a = (k * 2.399963), r = R * Math.sqrt((k + 1) / n);
    const x = (cx + Math.cos(a) * r).toFixed(1), y = (cy + Math.sin(a) * r).toFixed(1);
    const rad = (0.6 + ((k * 7) % 10) / 9 * 1.8).toFixed(1);
    s += `<circle cx="${x}" cy="${y}" r="${rad}" fill="${c}" opacity="${(0.25 + ((k * 3) % 10) / 12).toFixed(2)}"/>`;
  }
  return s;
}

// ── slides ────────────────────────────────────────────────
function cover() {
  return `<section class="slide dark cover">
    ${deco('tr')}
    <div class="top"><div class="kick">${spark()}AI STRATEG</div><span class="page">${pg(0)}</span></div>
    <div class="cov-art">${cluster()}</div>
    <div class="cov-mid">
      <div class="badge">4 VOSITA · BITTA TIZIM</div>
      <h1 class="cov-title">TADQIQOT<br><span class="acc">MASHINASI</span></h1>
      <p class="cov-sub">Claude Code + NotebookLM + Obsidian. Har safar ishlatganingizda <b>aqlliroq</b> bo'ladigan tizim.</p>
      <div class="gift">🎁 Oxirida — bepul bosqichma-bosqich qo'llanma</div>
      <div class="swipe">SURING <b>&rarr;</b></div>
    </div>
    ${footer()}
  </section>`;
}

function s2() {
  return `<section class="slide dark">
    ${deco('bl')}
    ${topbar('MUAMMO', 1)}
    <h2 class="h">Ko'pchilik tadqiqotni <span class="acc">qo'lda</span> qiladi</h2>
    <div class="ba">
      <div class="ba-box old">
        <div class="ba-lab old">❌ ESKI YO'L</div>
        <ul><li>10 ta oyna ochasiz</li><li>Video ko'rasiz, maqola o'qiysiz</li><li>Qayerdadir yozib qo'yasiz</li><li>Bir soatdan keyin — chalkash uyum</li></ul>
      </div>
      <div class="ba-box new">
        <div class="ba-lab new">✅ YANGI YO'L</div>
        <ul><li>Bitta buyruq yozasiz</li><li>Tizim o'zi qidiradi</li><li>O'zi tahlil qiladi</li><li>Tayyor natija va fayl olasiz</li></ul>
      </div>
    </div>
    <div class="stripe">Sozlash vaqti: <b>30 daqiqadan kam</b></div>
    ${footer()}
  </section>`;
}

function s3() {
  const tools = [
    ['#D0703F', '&gt;_', 'Claude Code', 'Bajaruvchi', 'Buyruqlarni bajaradi, fayllarni boshqaradi. Siz oddiy til bilan gapirasiz.'],
    ['#2BB3A3', '◠', 'NotebookLM', 'Tahlilchi', 'Manbalarni o\'qiydi, tahlil qiladi. Google hisobida ishlaydi — tokeningizni yemaydi.'],
    ['#7C5CFF', '◆', 'Obsidian', 'Xotira', 'Hamma natijani saqlaydi. Vaqt o\'tib, Claude sizni o\'rganadi.'],
    ['#E8B84B', '✦', 'Skill Creator', 'Moslashtirish', 'Yangi ko\'nikmani oddiy til bilan yaratasiz. Dasturlash shart emas.'],
  ].map(([c, ic, n, r, d]) => `<div class="tool"><span class="tool-ic" style="color:${c};border-color:${c}">${ic}</span><div class="tool-tx"><b>${n}</b> <span class="tool-role" style="color:${c}">${r}</span><span class="tool-d">${d}</span></div></div>`).join('');
  return `<section class="slide light">
    ${deco('tr')}
    ${topbar('TIZIM', 2)}
    <h2 class="h">To'rt vosita — <span class="acc">to'rt vazifa</span></h2>
    <div class="tools">${tools}</div>
    ${footer()}
  </section>`;
}

function s4() {
  const steps = [
    ['#D0703F', 'Buyruq', 'nimani izlashni aytasiz'],
    ['#E23B2E', '10 video', 'YouTube\'dan topadi'],
    ['#2BB3A3', 'Tahlil', 'NotebookLM ishlaydi'],
    ['#7C5CFF', 'Fayl', 'Obsidian\'ga saqlanadi'],
  ].map(([c, t, d], i) => `<div class="flow-node"><span class="fn-dot" style="background:${c}"></span><b>${t}</b><span>${d}</span></div>${i < 3 ? '<div class="flow-arr">→</div>' : ''}`).join('');
  return `<section class="slide dark">
    ${deco('tr')}
    ${topbar('QANDAY ISHLAYDI', 3)}
    <h2 class="h">Bitta buyruq — <span class="acc">to'liq zanjir</span></h2>
    <p class="body">Siz alohida qadamlarni bajarmaysiz. Tizim hammasini ketma-ket o'zi qiladi.</p>
    <div class="flow">${steps}</div>
    <div class="pill-row"><span class="pill">⏱ ~6 daqiqa</span><span class="pill">🧠 Google serverida</span><span class="pill">💾 avtomatik saqlanadi</span></div>
    ${footer()}
  </section>`;
}

function s5() {
  return `<section class="slide light">
    ${deco('bl')}
    ${topbar('SOZLASH · 1-3', 4)}
    <h2 class="h">Uch <span class="acc">oddiy</span> qadam</h2>
    <div class="ways">
      <div class="way"><span class="way-n">1</span><div><b>Skill Creator'ni o'rnating</b><span>Claude Code ichida <code>/plugin</code> yozing, «skill-creator»ni toping va o'rnating.</span></div></div>
      <div class="way"><span class="way-n">2</span><div><b>YouTube qidiruv ko'nikmasi</b><span>Oddiy til bilan tasvirlaysiz — tizim video ma'lumotlarini yig'adigan ko'nikma yaratadi.</span></div></div>
      <div class="way"><span class="way-n">3</span><div><b>NotebookLM'ni ulang</b><span>Terminalda o'rnatib, Google hisobingiz bilan kirasiz. Ulanish tayyor.</span></div></div>
    </div>
    ${footer()}
  </section>`;
}

function s6() {
  return `<section class="slide dark">
    ${deco('tr')}
    ${topbar('SOZLASH · 4-5', 5)}
    <h2 class="h">Hammasini <span class="acc">bitta buyruqqa</span></h2>
    <div class="ways dk">
      <div class="way"><span class="way-n">4</span><div><b>NotebookLM ko'nikmasi</b><span>Claude'ga NotebookLM'dan foydalanishni o'rgatasiz: manba qo'shish, tahlil, infografika.</span></div></div>
      <div class="way"><span class="way-n">5</span><div><b>Hammasini birlashtiring</b><span>YouTube + NotebookLM'ni bitta «zanjir» ko'nikmasiga yig'asiz.</span></div></div>
    </div>
    <div class="term"><div class="term-bar"><span class="md r"></span><span class="md y"></span><span class="md g"></span></div><div class="term-b"><span class="tg">/zanjir</span> 2026-yilgi AI agent tizimlarini o'rgan — 10 manba top, tahlil qil, infografika chiqar</div></div>
    ${footer()}
  </section>`;
}

function s7() {
  return `<section class="slide light">
    ${deco('bl')}
    ${topbar('NATIJA', 6)}
    <h2 class="h">Bitta buyruq — <span class="acc">3 natija</span></h2>
    <div class="res-grid">
      <div class="res"><span class="res-e">📊</span><div class="res-tx"><b>To'liq tahlil</b><span>qaysi narsa ko'tarilyapti, qayerda kelishmovchilik bor</span></div></div>
      <div class="res"><span class="res-e">🖼</span><div class="res-tx"><b>Infografika</b><span>butun manzarani bitta rasmda ko'rsatadi</span></div></div>
      <div class="res"><span class="res-e">🗂</span><div class="res-tx"><b>Markdown fayl</b><span>to'g'ridan-to'g'ri Obsidian'ga saqlanadi</span></div></div>
    </div>
    <div class="stripe light">Vaqtning ko'pi — <b>Google serverida</b>, sizning tokeningiz emas ⚡</div>
    ${footer()}
  </section>`;
}

function s8() {
  // rising compounding line chart
  const pts = [[0,300],[110,270],[220,225],[330,165],[440,95],[520,40]];
  const line = pts.map((p,i)=>`${i?'L':'M'}${p[0]} ${p[1]}`).join(' ');
  const area = `${line} L520 340 L0 340 Z`;
  return `<section class="slide dark">
    ${deco('tr')}
    ${topbar('ENG MUHIMI', 7)}
    <h2 class="h">Har safar <span class="acc">aqlliroq</span> bo'ladi</h2>
    <p class="body">Har bir fayl Obsidian'da qoladi. Claude ularni o'qiydi va sizni — qanday fikrlashingizni — o'rganadi.</p>
    <div class="chart">
      <svg viewBox="0 0 520 340" preserveAspectRatio="none" class="chart-svg">
        <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D0703F" stop-opacity=".5"/><stop offset="1" stop-color="#D0703F" stop-opacity="0"/></linearGradient></defs>
        <path d="${area}" fill="url(#g)"/><path d="${line}" fill="none" stroke="#D0703F" stroke-width="5" stroke-linecap="round"/>
      </svg>
      <div class="chart-x"><span>1-kun</span><span>1-hafta</span><span>1-oy</span><span>1-yil</span></div>
    </div>
    <div class="mini">Haftada bir marta <code>claude.md</code> faylini yangilang — u ish uslubingizni yodda saqlaydi.</div>
    ${footer()}
  </section>`;
}

function s9() {
  const chips = ['📄 PDF hujjatlar', '🌐 Veb-sahifalar', '🗃 O\'z fayllaringiz', '☁️ Google Drive'].map(c => `<span class="chip">${c}</span>`).join('');
  return `<section class="slide light">
    ${deco('bl')}
    ${topbar('SIR', 8)}
    <h2 class="h">YouTube — <span class="acc">shart emas</span></h2>
    <p class="body">Asosiysi — video emas, balki <b>zanjir tuzilishi</b>. Manbani istalganiga almashtiring:</p>
    <div class="chips">${chips}</div>
    <div class="stripe light">Manbani almashtiring — <b>tuzilma o'sha-o'sha qoladi</b> 🔁</div>
    ${footer()}
  </section>`;
}

function s10() {
  return `<section class="slide dark cta">
    ${deco('c')}
    ${topbar('OXIRIGACHA YETDINGIZ', 9)}
    <div class="grow center">
      <div class="fire">🔥</div>
      <h2 class="h big">To'liq qo'llanmani<br><span class="acc">bepul oling</span></h2>
      <p class="body">Skill Creator, YouTube, NotebookLM, Obsidian va bitta zanjir — hammasi bosqichma-bosqich, bitta hujjatda.</p>
      <div class="plusbox"><div class="pb-l">Izohga shunchaki yozing:</div><div class="pb-k">«+»</div><div class="pb-u">&rarr; to'liq qo'llanmani <strong>shaxsiyga</strong> yuboraman</div></div>
      <div class="follow">Obuna bo'ling — AI, Claude va real ishlaydigan tizimlar haqida</div>
    </div>
    ${footer()}
  </section>`;
}

const slides = [cover(), s2(), s3(), s4(), s5(), s6(), s7(), s8(), s9(), s10()];

function html() {
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,800&family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{--bg:#ECE7DE; --ink:#1F1B16; --muted:#6E6A60; --accent:#C4623B; --line:#D8D2C6; --card:#F6F2EA;
    width:${W}px;height:${H}px;position:relative;overflow:hidden;background:var(--bg);color:var(--ink);
    font-family:${SANS};padding:64px 66px 76px;display:flex;flex-direction:column;}
  .slide.dark{--bg:#100E0B; --ink:#F3EFE8; --muted:#8F887B; --accent:#D0703F; --line:#2C271F; --card:#1C1813; background:#100E0B;}
  .bg-grid,.glow{position:absolute;z-index:0;}
  .bg-grid{inset:0;background-image:radial-gradient(circle, rgba(0,0,0,.05) 1.6px, transparent 1.6px);background-size:36px 36px;opacity:.5;}
  .slide.dark .bg-grid{background-image:radial-gradient(circle, rgba(255,255,255,.05) 1.6px, transparent 1.6px);}
  .glow{width:760px;height:520px;border-radius:50%;filter:blur(10px);background:radial-gradient(closest-side, color-mix(in srgb,var(--accent) 26%, transparent), transparent 70%);opacity:.55;}
  .glow.tr{right:-160px;top:-160px;} .glow.bl{left:-200px;bottom:-160px;} .glow.c{left:50%;top:32%;transform:translateX(-50%);opacity:.42;}
  .slide>*{position:relative;z-index:1;}
  .acc{color:var(--accent);} b,strong{font-weight:800;color:var(--ink);}
  .grow{flex:1;display:flex;flex-direction:column;} .grow.center{justify-content:center;align-items:flex-start;gap:2px;}

  .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px;}
  .kick{display:flex;align-items:center;gap:12px;font-weight:800;font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);}
  .kick .spk,.fbrand .spk{width:26px;height:26px;}
  .page{font-weight:700;font-size:25px;letter-spacing:.1em;color:var(--muted);}

  .h{font-family:${SERIF};font-weight:800;font-size:70px;line-height:1.05;margin:0;}
  .h.big{font-size:72px;} .h .acc{color:var(--accent);}
  .body{font-size:33px;line-height:1.4;color:var(--muted);margin:16px 0 22px;max-width:900px;}
  .body b{color:var(--ink);font-weight:800;}

  /* cover */
  .cover{padding-top:52px;}
  .cov-art{position:absolute;right:-40px;top:70px;width:560px;height:560px;opacity:.96;z-index:1;}
  .clus{width:100%;height:100%;}
  .cov-mid{margin-top:auto;}
  .badge{display:inline-block;background:color-mix(in srgb,var(--accent) 16%, transparent);border:1px solid color-mix(in srgb,var(--accent) 50%, transparent);color:#EDD9C8;font-weight:800;font-size:22px;letter-spacing:.08em;padding:10px 22px;border-radius:30px;margin-bottom:20px;}
  .cov-title{font-weight:900;font-size:98px;line-height:.98;letter-spacing:-.01em;color:#F5F1EA;text-transform:uppercase;}
  .cov-title .acc{color:var(--accent);}
  .cov-sub{margin-top:22px;font-size:34px;line-height:1.32;color:#B7B0A2;max-width:820px;} .cov-sub b{color:#F3EFE8;}
  .gift{margin-top:22px;display:inline-block;background:color-mix(in srgb,var(--accent) 16%, transparent);border:1px solid color-mix(in srgb,var(--accent) 50%, transparent);color:#EDD9C8;font-weight:700;font-size:27px;padding:13px 24px;border-radius:40px;}
  .swipe{margin-top:24px;font-weight:800;font-size:30px;letter-spacing:.12em;color:var(--accent);}

  /* s2 before/after */
  .ba{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:8px;}
  .ba-box{background:var(--card);border-radius:22px;padding:28px 30px;}
  .ba-box.new{background:linear-gradient(160deg,#231a14,#1a1510);border:1px solid color-mix(in srgb,var(--accent) 40%,transparent);}
  .ba-lab{font-weight:800;font-size:25px;letter-spacing:.04em;margin-bottom:16px;} .ba-lab.old{color:#c9503f;} .ba-lab.new{color:#5AA95E;}
  .ba-box ul{list-style:none;display:flex;flex-direction:column;gap:13px;}
  .ba-box li{font-size:28px;color:var(--ink);line-height:1.28;padding-left:4px;}
  .stripe{margin-top:auto;background:var(--card);border-radius:18px;padding:24px 30px;font-size:30px;color:var(--muted);text-align:center;} .stripe b{color:var(--accent);}
  .stripe.light{background:#F1E9DF;}

  /* s3 tools */
  .tools{display:flex;flex-direction:column;gap:16px;margin-top:6px;}
  .tool{display:flex;align-items:flex-start;gap:22px;background:var(--card);border-radius:20px;padding:24px 28px;}
  .tool-ic{flex:0 0 auto;width:66px;height:66px;border:2.5px solid;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:34px;font-family:${MONO};}
  .tool-tx{display:flex;flex-direction:column;gap:2px;}
  .tool-tx b{font-size:33px;} .tool-role{font-weight:800;font-size:23px;letter-spacing:.04em;text-transform:uppercase;}
  .tool-d{font-size:25px;color:var(--muted);line-height:1.3;margin-top:4px;}

  /* s4 flow */
  .flow{display:flex;align-items:stretch;justify-content:space-between;gap:8px;margin:6px 0 6px;}
  .flow-node{flex:1;background:var(--card);border-radius:18px;padding:26px 12px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px;}
  .fn-dot{width:26px;height:26px;border-radius:50%;box-shadow:0 0 22px 2px currentColor;}
  .flow-node b{font-size:30px;} .flow-node span{font-size:22px;color:var(--muted);line-height:1.22;}
  .flow-arr{align-self:center;color:var(--accent);font-size:40px;font-weight:300;}
  .pill-row{margin-top:auto;display:flex;gap:14px;flex-wrap:wrap;justify-content:center;}
  .pill{background:var(--card);border-radius:30px;padding:16px 26px;font-size:26px;color:var(--ink);}

  /* ways */
  .ways{display:flex;flex-direction:column;gap:16px;margin-top:6px;}
  .way{display:flex;align-items:flex-start;gap:22px;background:var(--card);border-radius:18px;padding:24px 28px;}
  .way-n{flex:0 0 auto;width:56px;height:56px;border-radius:50%;background:var(--accent);color:#fff;font-weight:800;font-size:30px;display:flex;align-items:center;justify-content:center;}
  .way div b{font-size:33px;color:var(--ink);} .way div span{display:block;font-size:26px;color:var(--muted);margin-top:4px;line-height:1.3;}
  .way code{font-family:${MONO};background:rgba(196,98,59,.14);color:var(--accent);padding:1px 8px;border-radius:6px;font-size:23px;}

  /* terminal */
  .term{margin-top:auto;background:#0c0a08;border:1px solid #2a251d;border-radius:18px;overflow:hidden;}
  .term-bar{display:flex;gap:10px;padding:16px 20px;background:#151210;} .md{width:16px;height:16px;border-radius:50%;} .md.r{background:#ED6A5E;} .md.y{background:#F5BF4F;} .md.g{background:#61C554;}
  .term-b{padding:24px 26px;font-family:${MONO};font-size:26px;line-height:1.5;color:#ECE7DB;} .term-b .tg{color:#E29B6B;font-weight:700;}

  /* s7 results */
  .res-grid{display:flex;flex-direction:column;gap:14px;margin-top:6px;}
  .res{display:flex;align-items:center;gap:22px;background:var(--card);border-radius:18px;padding:24px 28px;}
  .res-e{font-size:44px;flex:0 0 auto;} .res-tx b{font-size:32px;} .res-tx span{display:block;font-size:25px;color:var(--muted);margin-top:2px;line-height:1.28;}

  /* s8 chart */
  .chart{margin-top:4px;background:var(--card);border-radius:20px;padding:26px 30px 18px;}
  .chart-svg{width:100%;height:300px;display:block;}
  .chart-x{display:flex;justify-content:space-between;margin-top:8px;font-size:24px;color:var(--muted);font-weight:600;}
  .mini{margin-top:auto;font-size:27px;color:var(--muted);line-height:1.4;} .mini code{font-family:${MONO};background:rgba(208,112,63,.16);color:var(--accent);padding:2px 9px;border-radius:6px;font-size:24px;}

  /* s9 chips */
  .chips{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:8px 0;}
  .chip{background:var(--card);border-radius:16px;padding:28px 26px;font-size:31px;font-weight:700;color:var(--ink);text-align:center;}

  /* s10 cta */
  .cta .fire{font-size:70px;} .cta .h{margin-top:8px;}
  .plusbox{margin-top:28px;background:var(--card);border-radius:26px;padding:34px 40px;width:100%;}
  .pb-l{font-size:30px;color:var(--muted);} .pb-k{font-family:${SERIF};font-weight:900;font-size:100px;color:var(--accent);line-height:1;margin:2px 0 6px;}
  .pb-u{font-weight:700;font-size:31px;color:var(--ink);} .pb-u strong{color:var(--accent);}
  .follow{margin-top:22px;font-size:27px;color:var(--muted);}

  .rule{margin-top:auto;height:1px;background:var(--line);}
  .footer{margin-top:22px;display:flex;align-items:center;justify-content:space-between;}
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
  render(process.argv[2] || path.join(__dirname, 'research-out'))
    .then(f => console.log('Rendered:\n' + f.join('\n')))
    .catch(e => { console.error(e); process.exit(1); });
}
module.exports = { render, html };
