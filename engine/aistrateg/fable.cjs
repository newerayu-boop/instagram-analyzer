// engine/aistrateg/fable.cjs
// «AI STRATEG» — Claude Fable 5 karusel (o'zbekcha, B1).
// Qora + terrakota. Har slayd farqli, g'ayrioddiy elementlar, kuchli ilmoq.
// Footer: AI STRATEG (chap) / @kodiyusufbay (o'ng). CTA: izohga «+».

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

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pg = (i) => `${String(i + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`;
const sparkMark = (c = 'var(--accent)') => `<svg class="spk" viewBox="0 0 24 24"><path d="M12 1l2.2 7.4L21.5 6l-5.1 5.6 6.6 3.4-7.6.5 2.3 7.4L12 17l-5.7 5.9 2.3-7.4L1 15l6.6-3.4L2.5 6l7.3 2.4z" fill="${c}"/></svg>`;
const sparkBig = (c = '#F3EFE8') => `<svg viewBox="0 0 64 64" fill="none">${Array.from({length:12},(_,k)=>{const a=(k/12)*Math.PI*2;return `<line x1="${(32+Math.cos(a)*8).toFixed(1)}" y1="${(32+Math.sin(a)*8).toFixed(1)}" x2="${(32+Math.cos(a)*26).toFixed(1)}" y2="${(32+Math.sin(a)*26).toFixed(1)}" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`;}).join('')}<circle cx="32" cy="32" r="7" fill="${c}"/></svg>`;

const deco = (cls = '') => `<div class="bg-grid"></div><div class="glow ${cls}"></div>`;
const topbar = (kick, i) => `<div class="top"><div class="kick">${sparkMark()}${esc(kick)}</div><span class="page">${pg(i)}</span></div>`;
const footer = () => `<div class="rule"></div><div class="footer"><span class="fbrand">${sparkMark()}AI STRATEG</span><span class="fhandle">${esc(HANDLE)}</span></div>`;
const card = (html) => `<div class="card"><span class="cdot"></span><span class="ctext">${html}</span></div>`;

// ── slaydlar ──────────────────────────────────────────────
function cover() {
  return `<section class="slide dark cover">
    ${deco('tr')}
    <div class="top"><div class="kick">${sparkMark()}AI STRATEG</div><span class="page">${pg(0)}</span></div>
    <div class="cov-mid">
      <div class="core"><div class="core-ring r1"></div><div class="core-ring r2"></div><div class="core-c">${sparkBig()}</div></div>
      <div class="badge tier">OPUS'DAN YUQORI · ENG YANGI DARAJA</div>
      <h1 class="cov-title">CLAUDE<br><span class="acc">FABLE 5</span></h1>
      <p class="cov-sub">Anthropic'ning eng kuchli sun'iy intellekt modeli. Ko'pchilik u bilan nima qilishni bilmaydi.</p>
      <div class="gift">🎁 Oxirida — bepul bosqichma-bosqich qo'llanma</div>
    </div>
    <div class="cov-foot"><span class="swipe">SURING <b>&rarr;</b></span></div>
    ${footer()}
  </section>`;
}

function s2() {
  return `<section class="slide dark">
    ${deco('bl')}
    ${topbar('HAQIQIY MISOL', 1)}
    <h2 class="h">Stripe unga <span class="acc">50 million qator</span> kod berdi</h2>
    <div class="vs">
      <div class="vs-box old"><div class="vs-lab">Qo'lda</div><div class="vs-n">2 <span>oy</span></div><div class="vs-strike"></div></div>
      <div class="vs-arrow">&rarr;</div>
      <div class="vs-box new"><div class="vs-lab">Fable 5</div><div class="vs-n">1 <span>kun</span></div><div class="vs-badge">🔥</div></div>
    </div>
    ${card(`Bir jamoaning haftalik ishini <strong>bir kunda</strong> tugatdi.`)}
    ${footer()}
  </section>`;
}

function s3() {
  const tiers = [['Sonnet 5', 42, ''], ['Opus 4.8', 66, ''], ['Fable 5', 100, 'on']];
  const bars = tiers.map(([n, h, on]) => `<div class="tier-col"><div class="tier-bar ${on}" style="height:${h}%">${on ? '<span class="tier-tag">ENG YUQORI</span>' : ''}</div><span class="tier-name ${on}">${n}</span></div>`).join('');
  return `<section class="slide light">
    ${deco('tr')}
    ${topbar('FABLE 5 NIMA', 2)}
    <h2 class="h">Yangi <span class="acc">eng yuqori</span> daraja</h2>
    <p class="body">Fable 5 — Opus'dan ham baland, yangi darajadagi birinchi model. Xuddi shu kuch, lekin mustahkamroq himoya bilan.</p>
    <div class="tiers">${bars}</div>
    ${footer()}
  </section>`;
}

function s4() {
  const caps = [
    ['🧭', 'Rejalashtiradi', 'bosqichma-bosqich'],
    ['👥', 'Ishni bo\'ladi', 'yordamchilarga'],
    ['✅', 'O\'zini tekshiradi', 'sinov o\'tkazadi'],
    ['👁', 'Ko\'z bilan', 'natijani ko\'radi'],
  ].map(([e, t, s]) => `<div class="cap"><span class="cap-e">${e}</span><b>${t}</b><span>${s}</span></div>`).join('');
  return `<section class="slide dark">
    ${deco('tr')}
    ${topbar('ODDIY EMAS', 3)}
    <h2 class="h">Bu — oddiy suhbat emas,<br><span class="acc">o'zi ishlaydi</span></h2>
    <p class="body">Soatlab, hatto kunlab o'zi mustaqil ishlaydigan katta, ko'p bosqichli ishlar uchun qurilgan.</p>
    <div class="caps">${caps}</div>
    <div class="benchrow"><div class="bstat"><b>95%</b><span>dasturlashda</span></div><div class="bstat"><b>1 mln</b><span>so'z xotira</span></div><div class="bstat"><b>128 ming</b><span>uzun javob</span></div></div>
    ${footer()}
  </section>`;
}

function s5() {
  return `<section class="slide light">
    ${deco('bl')}
    ${topbar('QANDAY YOQILADI', 4)}
    <h2 class="h">3 xil yo'l bilan <span class="acc">yoqasiz</span></h2>
    <div class="ways">
      <div class="way"><span class="way-n">1</span><div><b>Claude saytida</b><span>ro'yxatdan «Fable 5»ni tanlang</span></div></div>
      <div class="way"><span class="way-n">2</span><div><b>Claude Code'da</b><span>modelni «Fable 5»ga almashtiring</span></div></div>
      <div class="way"><span class="way-n">3</span><div><b>Dasturchilar uchun</b><span>model nomi: «claude-fable-5»</span></div></div>
    </div>
    <div class="dropdown"><div class="dd-h">Model</div><div class="dd-item on">${sparkMark('#C4623B')} Fable 5 <span class="dd-check">✓</span></div><div class="dd-item">Opus 4.8</div><div class="dd-item">Sonnet 5</div></div>
    ${footer()}
  </section>`;
}

function s6() {
  return `<section class="slide dark">
    ${deco('tr')}
    ${topbar('QACHON ISHLATISH', 5)}
    <h2 class="h">Har kuni emas —<br><span class="acc">eng og'ir ish</span> uchun</h2>
    <div class="twocol">
      <div class="col yes"><div class="col-h">✓ QACHON</div><ul><li>Katta ko'chirish ishi</li><li>Ko'p bosqichli loyiha</li><li>Ulkan kodni qayta tuzish</li><li>Yuzlab hujjatni o'rganish</li></ul></div>
      <div class="col no"><div class="col-h">✗ QACHON EMAS</div><ul><li>Kichik yoki tez ish</li><li>Oddiy tahrir, suhbat</li><li>Tezlik kerak bo'lsa</li><li>Xavfsizlikka oid ish</li></ul></div>
    </div>
    <div class="pricebar"><span>Narxi: <strong>Opus'dan 2 barobar</strong></span><span class="pb-note">faqat eng og'ir ish uchun</span></div>
    ${footer()}
  </section>`;
}

function s7() {
  return `<section class="slide light">
    ${deco('bl')}
    ${topbar('ISH TARTIBI · 1-2', 6)}
    <h2 class="h">Avval <span class="acc">reja</span>, keyin Fable</h2>
    <div class="wf">
      <div class="wf-step"><span class="wf-n">01</span><div><b>Arzon model bilan reja tuzing</b><span>Opus yoki Sonnet rejani yozadi — bu arzonroq bo'ladi.</span></div></div>
      <div class="wf-step"><span class="wf-n">02</span><div><b>Rejani Fable'ga bering</b><span>Reja, kod, hujjat — hammasini birdaniga bering. U bir vaqtda ko'rsin.</span></div></div>
    </div>
    <div class="pbox"><div class="pbox-h">${sparkMark('#C4623B')} MASLAHAT</div><div class="pbox-t">Fable hammasini bir vaqtda ko'rganda eng yaxshi ishlaydi — ma'lumotni yo'l-yo'lakay qidirmaydi.</div></div>
    ${footer()}
  </section>`;
}

function s8() {
  return `<section class="slide dark">
    ${deco('tr')}
    ${topbar('ISH TARTIBI · 3-4', 7)}
    <h2 class="h">Tugagunicha <span class="acc">ishlashga</span> qo'ying</h2>
    <div class="wf">
      <div class="wf-step"><span class="wf-n">03</span><div><b>Aniq maqsad qo'ying</b><span>«Bo'ldi shekilli» emas — aniq shart bajarilguncha ishlasin.</span></div></div>
    </div>
    <div class="term"><div class="term-bar"><span class="md r"></span><span class="md y"></span><span class="md g"></span></div><div class="term-b"><span class="tg">MAQSAD:</span> barcha tekshiruvlar o'tsin va ilova xatosiz ishlasin</div></div>
    <div class="wf"><div class="wf-step"><span class="wf-n">04</span><div><b>Jarayonni emas — natijani tekshiring</b><span>Tayyor ishni oching: tekshiruvlar, o'zgarishlar, maqsadga mosligi.</span></div></div></div>
    ${footer()}
  </section>`;
}

function s9() {
  const items = [
    ['💾', 'Ma\'lumotni saqlab qo\'ying', 'takror yubormang — 90% arzon'],
    ['🎚', '«O\'ylash»ni kamaytiring', 'oddiy ishlarga past daraja'],
    ['🔁', 'Rad etsa — zaxira', 'avtomatik Opus\'ga o\'ting'],
  ].map(([e, t, s]) => `<div class="save"><span class="save-e">${e}</span><div><b>${t}</b><span>${s}</span></div></div>`).join('');
  return `<section class="slide light">
    ${deco('bl')}
    ${topbar('OCHIQ GAPLASHAMIZ', 8)}
    <h2 class="h">Xarajatni <span class="acc">kamaytiring</span> — 3 sozlama</h2>
    <div class="saves">${items}</div>
    <div class="warn"><span class="warn-i">⚠️</span><div><b>Ehtiyot bo'ling:</b> Fable ba'zan ko'proq rad etadi, bepul muddat qisqa, ma'lumot 30 kun saqlanadi.</div></div>
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
      <p class="body">Yoqish, ish tartibi, maqsad qo'yish, xarajatni kamaytirish va hech kim aytmaydigan sirlar — bitta hujjatda.</p>
      <div class="plusbox"><div class="pb-l">Izohga shunchaki yozing:</div><div class="pb-k">«+»</div><div class="pb-u">&rarr; to'liq hujjatni <strong>shaxsiyga</strong> yuboraman</div></div>
      <div class="follow">Obuna bo'ling — AI, Claude va real ishlaydigan tizimlar haqida</div>
    </div>
    ${footer()}
  </section>`;
}

const slides = [cover(), s2(), s3(), s4(), s5(), s6(), s7(), s8(), s9(), s10()];

function html() {
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{--bg:#ECE7DE; --ink:#1F1B16; --muted:#6E6A60; --accent:#C4623B; --line:#D8D2C6; --card:#F6F2EA;
    width:${W}px;height:${H}px;position:relative;overflow:hidden;background:var(--bg);color:var(--ink);
    font-family:${SANS};padding:64px 66px 76px;display:flex;flex-direction:column;}
  .slide.dark{--bg:#14110D; --ink:#F3EFE8; --muted:#8F887B; --accent:#D0703F; --line:#2C271F; --card:#211C16; background:#14110D;}
  .bg-grid,.glow{position:absolute;z-index:0;}
  .bg-grid{inset:0;background-image:radial-gradient(circle, rgba(0,0,0,.05) 1.6px, transparent 1.6px);background-size:36px 36px;opacity:.5;}
  .slide.dark .bg-grid{background-image:radial-gradient(circle, rgba(255,255,255,.05) 1.6px, transparent 1.6px);}
  .glow{width:760px;height:520px;border-radius:50%;filter:blur(10px);background:radial-gradient(closest-side, color-mix(in srgb,var(--accent) 26%, transparent), transparent 70%);opacity:.55;}
  .glow.tr{right:-160px;top:-160px;} .glow.bl{left:-200px;bottom:-160px;} .glow.c{left:50%;top:34%;transform:translateX(-50%);opacity:.42;}
  .slide>*{position:relative;z-index:1;}
  .acc{color:var(--accent);} strong{font-weight:800;color:var(--ink);}
  .grow{flex:1;display:flex;flex-direction:column;} .grow.center{justify-content:center;align-items:flex-start;gap:2px;}

  .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px;}
  .kick{display:flex;align-items:center;gap:12px;font-weight:800;font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);}
  .kick .spk,.fbrand .spk{width:26px;height:26px;}
  .page{font-weight:700;font-size:25px;letter-spacing:.1em;color:var(--muted);}

  .h{font-family:${SERIF};font-weight:800;font-size:74px;line-height:1.04;margin:0;}
  .h.big{font-size:72px;} .h .acc{color:var(--accent);}
  .body{font-size:35px;line-height:1.4;color:var(--muted);margin:18px 0 24px;max-width:900px;}
  .body strong{color:var(--ink);font-weight:800;}

  .card{margin-top:auto;display:flex;align-items:center;gap:22px;background:var(--card);border-radius:24px;padding:32px 38px;box-shadow:0 22px 48px -30px rgba(0,0,0,.5);}
  .card .cdot{width:18px;height:18px;border-radius:50%;background:var(--accent);flex:0 0 auto;}
  .card .ctext{font-family:${SERIF};font-weight:800;font-size:40px;line-height:1.18;color:var(--ink);}

  /* cover */
  .cover{padding-top:56px;}
  .cov-mid{margin-top:auto;}
  .core{position:relative;width:150px;height:150px;margin-bottom:40px;}
  .core-ring{position:absolute;inset:0;border-radius:50%;border:2px solid var(--accent);opacity:.4;}
  .core-ring.r2{inset:22px;opacity:.7;}
  .core-c{position:absolute;inset:44px;background:var(--accent);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 0 60px 6px color-mix(in srgb,var(--accent) 55%, transparent);}
  .core-c svg{width:44px;height:44px;}
  .badge.tier{display:inline-block;background:color-mix(in srgb,var(--accent) 18%, transparent);border:1px solid color-mix(in srgb,var(--accent) 50%, transparent);color:#EDD9C8;font-weight:800;font-size:22px;letter-spacing:.08em;padding:10px 22px;border-radius:30px;margin-bottom:22px;}
  .cov-title{font-weight:900;font-size:104px;line-height:.98;letter-spacing:-.01em;color:#F5F1EA;text-transform:uppercase;}
  .cov-title .acc{color:var(--accent);}
  .cov-sub{margin-top:24px;font-size:36px;line-height:1.32;color:#B7B0A2;max-width:780px;}
  .gift{margin-top:24px;display:inline-block;background:color-mix(in srgb,var(--accent) 16%, transparent);border:1px solid color-mix(in srgb,var(--accent) 50%, transparent);color:#EDD9C8;font-weight:700;font-size:28px;padding:14px 24px;border-radius:40px;}
  .cov-foot{margin-top:30px;} .swipe{font-weight:800;font-size:30px;letter-spacing:.12em;color:var(--accent);}

  /* s2 vs */
  .vs{margin-top:auto;margin-bottom:auto;display:flex;align-items:center;justify-content:center;gap:26px;}
  .vs-box{position:relative;flex:1;background:var(--card);border-radius:26px;padding:40px 24px;text-align:center;}
  .vs-box.new{background:var(--accent);}
  .vs-lab{font-weight:700;font-size:30px;color:var(--muted);} .vs-box.new .vs-lab{color:#f4ddce;}
  .vs-n{font-family:${SERIF};font-weight:800;font-size:110px;line-height:.95;color:var(--ink);} .vs-n span{font-size:44px;}
  .vs-box.new .vs-n{color:#fff;}
  .vs-strike{position:absolute;left:14%;right:14%;top:58%;height:6px;background:#c9503f;transform:rotate(-8deg);border-radius:4px;}
  .vs-arrow{font-size:56px;color:var(--accent);font-weight:300;}
  .vs-badge{position:absolute;top:-14px;right:-10px;font-size:44px;}

  /* s3 tiers */
  .tiers{margin-top:auto;display:flex;align-items:flex-end;justify-content:center;gap:40px;height:440px;padding-bottom:8px;}
  .tier-col{display:flex;flex-direction:column;align-items:center;gap:16px;justify-content:flex-end;height:100%;}
  .tier-bar{width:150px;background:#cfc8ba;border-radius:18px 18px 0 0;position:relative;}
  .slide.dark .tier-bar{background:#2f2a22;}
  .tier-bar.on{background:linear-gradient(180deg,var(--accent),#9a4a2b);}
  .tier-tag{position:absolute;top:-44px;left:50%;transform:translateX(-50%);background:var(--accent);color:#fff;font-weight:800;font-size:20px;padding:8px 16px;border-radius:20px;white-space:nowrap;}
  .tier-name{font-weight:700;font-size:30px;color:var(--muted);} .tier-name.on{color:var(--accent);font-weight:800;}

  /* s4 caps */
  .caps{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
  .cap{background:var(--card);border-radius:20px;padding:26px 28px;display:flex;flex-direction:column;gap:4px;}
  .cap-e{font-size:44px;} .cap b{font-size:34px;color:var(--ink);margin-top:6px;} .cap span{font-size:26px;color:var(--muted);}
  .benchrow{margin-top:auto;display:flex;gap:18px;}
  .bstat{flex:1;background:var(--card);border-radius:18px;padding:24px;text-align:center;}
  .bstat b{display:block;font-family:${SERIF};font-weight:800;font-size:54px;color:var(--accent);} .bstat span{font-size:25px;color:var(--muted);}

  /* s5 ways + dropdown */
  .ways{display:flex;flex-direction:column;gap:16px;}
  .way{display:flex;align-items:center;gap:22px;background:var(--card);border-radius:18px;padding:22px 28px;}
  .way-n{flex:0 0 auto;width:52px;height:52px;border-radius:50%;background:var(--accent);color:#fff;font-weight:800;font-size:28px;display:flex;align-items:center;justify-content:center;}
  .way b{font-size:34px;color:var(--ink);} .way span{display:block;font-size:26px;color:var(--muted);margin-top:2px;}
  .way code,.wf code{font-family:${MONO};background:rgba(196,98,59,.14);color:var(--accent);padding:1px 8px;border-radius:6px;font-size:24px;}
  .dropdown{margin-top:auto;background:#1B1712;border-radius:20px;padding:20px;max-width:520px;}
  .dd-h{font-size:22px;color:#8f887b;padding:6px 14px;}
  .dd-item{display:flex;align-items:center;gap:12px;font-size:30px;color:#cfc7b8;padding:16px 14px;border-radius:12px;}
  .dd-item.on{background:rgba(196,98,59,.16);color:#fff;font-weight:700;} .dd-item .spk{width:22px;height:22px;} .dd-check{margin-left:auto;color:var(--accent);font-weight:800;}

  /* s6 twocol */
  .twocol{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
  .col{background:var(--card);border-radius:22px;padding:28px 30px;}
  .col-h{font-weight:800;font-size:28px;letter-spacing:.06em;margin-bottom:14px;}
  .col.yes .col-h{color:#5AA95E;} .col.no .col-h{color:#c9503f;}
  .col ul{list-style:none;display:flex;flex-direction:column;gap:12px;}
  .col li{font-size:29px;color:var(--ink);padding-left:22px;position:relative;}
  .col li:before{content:'';position:absolute;left:0;top:14px;width:9px;height:9px;border-radius:50%;background:var(--accent);}
  .pricebar{margin-top:auto;display:flex;align-items:center;justify-content:space-between;background:var(--card);border-radius:20px;padding:26px 34px;font-size:30px;color:var(--muted);}
  .pricebar strong{color:var(--accent);} .pb-note strong{color:var(--ink);}

  /* s7-8 workflow */
  .wf{display:flex;flex-direction:column;gap:16px;margin-bottom:8px;}
  .wf-step{display:flex;align-items:flex-start;gap:24px;background:var(--card);border-radius:20px;padding:26px 30px;}
  .wf-n{font-family:${SERIF};font-weight:800;font-size:52px;line-height:.9;color:var(--accent);flex:0 0 auto;}
  .wf-step b{font-size:34px;color:var(--ink);} .wf-step span{display:block;font-size:27px;color:var(--muted);margin-top:6px;line-height:1.3;}
  .pbox{margin-top:auto;background:#1B1712;border-radius:22px;padding:30px 36px;}
  .slide.dark .pbox{background:#0f0d0a;border:1px solid #2a251d;}
  .pbox-h{display:flex;align-items:center;gap:12px;font-weight:800;font-size:23px;letter-spacing:.14em;color:var(--accent);}
  .pbox-t{margin-top:16px;font-size:30px;line-height:1.45;color:#ECE7DB;}
  .term{margin:14px 0;background:#0f0d0a;border:1px solid #2a251d;border-radius:18px;overflow:hidden;}
  .term-bar{display:flex;gap:10px;padding:16px 20px;background:#161310;} .md{width:16px;height:16px;border-radius:50%;} .md.r{background:#ED6A5E;} .md.y{background:#F5BF4F;} .md.g{background:#61C554;}
  .term-b{padding:24px 26px;font-family:${MONO};font-size:27px;line-height:1.5;color:#ECE7DB;} .term-b .tg{color:#7CC26B;}

  /* s9 saves + warn */
  .saves{display:flex;flex-direction:column;gap:14px;}
  .save{display:flex;align-items:center;gap:22px;background:var(--card);border-radius:18px;padding:22px 28px;}
  .save-e{font-size:40px;flex:0 0 auto;} .save b{font-size:32px;color:var(--ink);} .save span{display:block;font-size:26px;color:var(--muted);margin-top:2px;}
  .warn{margin-top:auto;display:flex;gap:18px;background:#f3e4dc;border-radius:20px;padding:28px 32px;}
  .slide.light .warn{background:#f3e4dc;} .warn-i{font-size:38px;flex:0 0 auto;}
  .warn b{color:#b0603f;} .warn div{font-size:29px;color:#5a4a41;line-height:1.34;}

  /* s10 cta */
  .cta .fire{font-size:70px;} .cta .h{margin-top:8px;}
  .plusbox{margin-top:30px;background:var(--card);border-radius:26px;padding:34px 40px;width:100%;}
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
  render(process.argv[2] || path.join(__dirname, 'fable-out'))
    .then(f => console.log('Rendered:\n' + f.join('\n')))
    .catch(e => { console.error(e); process.exit(1); });
}
module.exports = { render, html };
