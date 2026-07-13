// engine/aistrateg/firevibe.cjs  (v2 — boyitilgan, har slayd farqli)
// «AI STRATEG» — FireVibe + Claude Code workflow karusel (o'zbekcha, B1).
// Boy vizual: telefon-mokaplar, before/after, flow, ekran-stacklar, grid-fon, glow.
// Footer: chapda AI STRATEG, o'ngda @kodiyusufbay. CTA: izohga «+».

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

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pg = (i) => `${String(i + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`;

const flame = () => `<svg class="ico" viewBox="0 0 64 64" fill="none"><path d="M38 6c2 12-6 15-11 22-4 6-3 13 2 16 1-5 3-8 6-10-1 7 4 9 4 15 0 6-5 11-11 11-8 0-15-6-15-16 0-13 14-18 12-33 5 2 9 8 9 14 3-3 5-8 4-19z" fill="#F3EFE8"/></svg>`;
const sparkIcon = () => `<svg class="ico" viewBox="0 0 64 64" fill="none">${Array.from({length:12},(_,k)=>{const a=(k/12)*Math.PI*2;return `<line x1="${(32+Math.cos(a)*8).toFixed(1)}" y1="${(32+Math.sin(a)*8).toFixed(1)}" x2="${(32+Math.cos(a)*26).toFixed(1)}" y2="${(32+Math.sin(a)*26).toFixed(1)}" stroke="#F3EFE8" stroke-width="5" stroke-linecap="round"/>`;}).join('')}<circle cx="32" cy="32" r="7" fill="#F3EFE8"/></svg>`;
const sparkMark = (c = 'var(--accent)') => `<svg class="spk" viewBox="0 0 24 24"><path d="M12 1l2.2 7.4L21.5 6l-5.1 5.6 6.6 3.4-7.6.5 2.3 7.4L12 17l-5.7 5.9 2.3-7.4L1 15l6.6-3.4L2.5 6l7.3 2.4z" fill="${c}"/></svg>`;

const deco = (cls = '') => `<div class="bg-grid"></div><div class="glow ${cls}"></div>`;
const topbar = (kick, i) => `<div class="top"><div class="kick">${sparkMark()}${esc(kick)}</div><span class="page">${pg(i)}</span></div>`;
const footer = () => `<div class="rule"></div><div class="footer"><span class="fbrand">${sparkMark()}AI STRATEG</span><span class="fhandle">${esc(HANDLE)}</span></div>`;
const card = (html) => `<div class="card"><span class="cdot"></span><span class="ctext">${html}</span></div>`;

// mini app UI phone mockup
function phone(kind, tilt = 0, cls = '') {
  const inner = kind === 'good'
    ? `<div class="sc">
        <div class="s-hero good"><span class="s-badge">Mediterranean</span></div>
        <div class="s-b">
          <div class="s-title">Amalfi Coast</div>
          <div class="s-meta">7 tours · from $1,200 ★ 4.9</div>
          <div class="s-row"><div class="s-mini good"></div><div class="s-mini good"></div></div>
          <div class="s-btn">Explore tours</div>
        </div>
      </div>`
    : `<div class="sc">
        <div class="s-hero bland"></div>
        <div class="s-b">
          <div class="s-line w70"></div>
          <div class="s-line w45"></div>
          <div class="s-row"><div class="s-mini bland"></div><div class="s-mini bland"></div></div>
          <div class="s-line w60"></div>
        </div>
      </div>`;
  return `<div class="phone ${kind} ${cls}" style="transform:rotate(${tilt}deg)"><span class="notch"></span>${inner}</div>`;
}

// ── slaydlar ──────────────────────────────────────────────
function cover() {
  return `<section class="slide dark cover">
    ${deco('tr')}
    ${topbar('YANGI WORKFLOW', 0)}
    <div class="cov-mid">
      <div class="icons">
        <div class="appic dark">${flame()}</div><div class="plus">+</div><div class="appic acc">${sparkIcon()}</div>
      </div>
      <h1 class="cov-title">ISHLAYDIGAN<br>DIZAYN<br><span class="acc">WORKFLOW</span></h1>
      <p class="cov-sub">AI ilovangiz nega sotilmayapti — va buni 3 qadamda qanday tuzatish.</p>
      <div class="gift">🎁 Oxirida — bepul to'liq hujjat</div>
    </div>
    <div class="cov-foot"><span class="swipe">SURING <b>&rarr;</b></span></div>
    ${footer()}
  </section>`;
}

function s2() {
  return `<section class="slide dark">
    ${deco('bl')}
    ${topbar('MUAMMO', 1)}
    <div class="split">
      <div class="split-l">
        <h2 class="h">AI ilovangiz<br><span class="acc">sotilmayapti</span></h2>
        <p class="body">Kod ishlaydi, mantiq joyida. Lekin interfeys «AI yasagandek» ko'rinadi.</p>
        <div class="stat"><span class="stat-n">2 son.</span><span class="stat-l">odam shuncha vaqtda «ishonsa bo'ladimi?» deb qaror qiladi</span></div>
        <div class="chips-row"><span class="mchip">default shriftlar</span><span class="mchip">bir xil gradient</span><span class="mchip">noto'g'ri spacing</span><span class="mchip">mos kelmagan ikonka</span></div>
      </div>
      <div class="split-r">${phone('bland', 4)}<span class="tag bad">❌ AI slop</span></div>
    </div>
    ${card(`Bu — kod emas, <strong>dizayn</strong> muammosi.`)}
    ${footer()}
  </section>`;
}

function s3() {
  return `<section class="slide light">
    ${deco('tr')}
    ${topbar('FARQNI KO\'RING', 2)}
    <h2 class="h center">Bir xil ilova — <span class="acc">ikki xil</span> taassurot</h2>
    <div class="ba">
      <div class="ba-col"><span class="tag bad">❌ ODDIY AI</span>${phone('bland', -3)}<span class="ba-cap">bir xil shrift, kulrang qutilar</span></div>
      <div class="ba-arrow">&rarr;</div>
      <div class="ba-col"><span class="tag good">✓ FIREVIBE</span>${phone('good', 3)}<span class="ba-cap">o'ziga xos uslub, sayqallangan</span></div>
    </div>
    ${footer()}
  </section>`;
}

function s4() {
  return `<section class="slide dark">
    ${deco('tr')}
    ${topbar('STACK', 3)}
    <h2 class="h">2 ta vosita,<br><span class="acc">2 ta ish</span></h2>
    <div class="tools">
      <div class="tool"><div class="tic dark">${flame()}</div><b>FireVibe</b><span>Dizayn kuchi — ko'rinish va his</span></div>
      <div class="tool"><div class="tic acc">${sparkIcon()}</div><b>Claude Code</b><span>Qurish kuchi — mantiq va funksiya</span></div>
    </div>
    <div class="flow">
      <span class="fstep on">Dizayn</span><i>&rarr;</i><span class="fstep">Tahrir</span><i>&rarr;</i><span class="fstep">Qurish</span><i>&rarr;</i><span class="fstep acc">Ship</span>
    </div>
    ${footer()}
  </section>`;
}

function s5() {
  const items = [
    `To'liq ko'p ekranli ilova`, `Yaxlit dizayn tizimi`, `AI rasmlar — «placeholder» yo'q`,
    `Native kod: SwiftUI, Flutter…`, `Chat orqali bir xil tahrir`,
  ].map(t => `<div class="frow"><span class="fchk">&#10003;</span>${esc(t)}</div>`).join('');
  return `<section class="slide light">
    ${deco('bl')}
    ${topbar('FIREVIBE NIMA BERADI', 4)}
    <h2 class="h">Bitta promptdan —<br><span class="acc">butun ilova</span></h2>
    <div class="split">
      <div class="split-l">${items ? `<div class="flist">${items}</div>` : ''}</div>
      <div class="split-r stack">${phone('good', -5, 'ph-back')}${phone('good', 3, 'ph-front')}</div>
    </div>
    ${card(`~3 daqiqada. <strong>Bepul rejada</strong>, kartasiz.`)}
    ${footer()}
  </section>`;
}

function s6() {
  return `<section class="slide dark">
    ${deco('tr')}
    ${topbar('QADAM 01', 5)}
    <div class="step-head"><span class="stepn">01</span><h2 class="h step">Butun ilovani <span class="acc">dizayn qil</span></h2></div>
    <p class="body">Ilovani «funksiyalar ro'yxati» emas, <strong>butun mahsulot</strong> sifatida tasvirlab bering.</p>
    <div class="pbox"><div class="pbox-h">${sparkMark('#C4623B')} PROMPT MISOLI <span class="copy">nusxa ⧉</span></div><div class="pbox-t">«TripGlide» — premium sayohat jurnaliga o'xshagan, lekin bevosita bron qilsa bo'ladigan ilova dizayn qil. Asosiy ekranlar + onboarding, qidiruv, saqlangan sayohatlar, profil.</div></div>
    <div class="hint">↑ bitta prompt → <strong>butun ilova + native kod</strong></div>
    ${footer()}
  </section>`;
}

function s7() {
  const mini = (on) => `<div class="mini-screen ${on ? 'on' : ''}"><div class="ms-hero"></div><div class="ms-l"></div><div class="ms-l s"></div></div>`;
  return `<section class="slide light">
    ${deco('bl')}
    ${topbar('QADAM 02', 6)}
    <div class="step-head"><span class="stepn">02</span><h2 class="h step">Bir marta <span class="acc">tahrirla</span></h2></div>
    <div class="midc">
      <div class="chat"><span class="chat-you">Siz</span><div class="bub">Aksent rangni to'qroq terrakota qil. Karta oralig'ini zichlashtir.</div></div>
      <div class="propagate"><div class="minis">${mini(1)}${mini(1)}${mini(1)}</div><span class="prop-note">o'zgarish <strong>hamma ekranga birdan</strong> tushdi</span></div>
    </div>
    ${card(`Bir marta o'zgartir — <strong>hamma joyda bir xil</strong>.`)}
    ${footer()}
  </section>`;
}

function s8() {
  const node = (ic, t) => `<div class="fnode"><div class="fn-ic">${ic}</div><span>${t}</span></div>`;
  const codeI = `<svg viewBox="0 0 24 24" fill="none" stroke="#F3EFE8" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 8l-4 4 4 4M16 8l4 4-4 4"/></svg>`;
  const boxI = `<svg viewBox="0 0 24 24" fill="none" stroke="#F3EFE8" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>`;
  const upI = `<svg viewBox="0 0 24 24" fill="none" stroke="#F3EFE8" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V6M6 12l6-6 6 6"/></svg>`;
  return `<section class="slide dark">
    ${deco('tr')}
    ${topbar('QADAM 03', 7)}
    <div class="step-head"><span class="stepn">03</span><h2 class="h step">Claude Code'ga ber va <span class="acc">ship qil</span></h2></div>
    <p class="body">Native kodni Claude Code'ga berasiz — u <strong>tayyor qobiq</strong> ustiga haqiqiy mahsulotni quradi:</p>
    <div class="chips-row big"><span class="mchip">Bron mantiqi</span><span class="mchip">Ma'lumotlar bazasi</span><span class="mchip">To'lovlar</span><span class="mchip">Akkauntlar</span><span class="mchip">Push-bildirishnoma</span></div>
    <div class="fchain">
      ${node(codeI, 'Native kod')}<i>&rarr;</i>${node(sparkIcon(), 'Claude Code')}<i>&rarr;</i>${node(boxI, 'Xcode')}<i>&rarr;</i>${node(upI, 'App Store')}
    </div>
    ${card(`Dizayn qilgan narsangiz — aynan <strong>ship qiladigan</strong> narsangiz.`)}
    ${footer()}
  </section>`;
}

function s9() {
  return `<section class="slide dark cta">
    ${deco('c')}
    ${topbar('OXIRIGACHA YETDINGIZ', 8)}
    <div class="grow center">
      <div class="fire">🔥</div>
      <h2 class="h big">To'liq hujjatni<br><span class="acc">bepul oling</span></h2>
      <p class="body">Har bir qadam, tayyor promptlar va hech kim aytmaydigan detallar — bitta hujjatda.</p>
      <div class="plusbox"><div class="pb-l">Izohga shunchaki yozing:</div><div class="pb-k">«+»</div><div class="pb-u">&rarr; to'liq hujjatni <strong>directga</strong> yuboraman</div></div>
      <div class="follow">Obuna bo'ling — keyingi qo'llanmani o'tkazib yubormang</div>
    </div>
    ${footer()}
  </section>`;
}

const slides = [cover(), s2(), s3(), s4(), s5(), s6(), s7(), s8(), s9()];

function html() {
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{--bg:#ECE7DE; --ink:#1F1B16; --muted:#6E6A60; --accent:#C4623B; --line:#D8D2C6; --card:#F6F2EA;
    width:${W}px;height:${H}px;position:relative;overflow:hidden;background:var(--bg);color:var(--ink);
    font-family:${SANS};padding:66px 68px 78px;display:flex;flex-direction:column;}
  .slide.dark{--bg:#14110D; --ink:#F3EFE8; --muted:#8F887B; --accent:#D0703F; --line:#2C271F; --card:#211C16;}
  .slide.dark{background:#14110D;}
  .bg-grid{position:absolute;inset:0;z-index:0;background-image:radial-gradient(circle, rgba(0,0,0,.05) 1.6px, transparent 1.6px);background-size:36px 36px;opacity:.5;}
  .slide.dark .bg-grid{background-image:radial-gradient(circle, rgba(255,255,255,.05) 1.6px, transparent 1.6px);}
  .glow{position:absolute;z-index:0;width:760px;height:520px;border-radius:50%;filter:blur(10px);
    background:radial-gradient(closest-side, color-mix(in srgb,var(--accent) 26%, transparent), transparent 70%);opacity:.55;}
  .glow.tr{right:-160px;top:-160px;} .glow.bl{left:-200px;bottom:-160px;} .glow.c{left:50%;top:36%;transform:translateX(-50%);opacity:.4;}
  .slide>*{position:relative;z-index:1;}
  .bg-grid,.glow{position:absolute;z-index:0;}
  .acc{color:var(--accent);} strong{font-weight:800;color:var(--ink);}
  .grow{flex:1;display:flex;flex-direction:column;} .grow.center{justify-content:center;align-items:flex-start;gap:2px;}
  .midc{flex:1;display:flex;flex-direction:column;justify-content:center;gap:30px;}

  .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px;}
  .kick{display:flex;align-items:center;gap:12px;font-weight:800;font-size:24px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);}
  .kick .spk,.fbrand .spk{width:26px;height:26px;}
  .page{font-weight:700;font-size:25px;letter-spacing:.1em;color:var(--muted);}

  .h{font-family:${SERIF};font-weight:800;font-size:76px;line-height:1.03;margin:0;}
  .h.center{text-align:center;font-size:66px;} .h.big{font-size:72px;} .h .acc{color:var(--accent);}
  .body{font-size:35px;line-height:1.4;color:var(--muted);margin:18px 0 24px;max-width:900px;}
  .body strong{color:var(--ink);font-weight:800;}

  /* card */
  .card{margin-top:auto;display:flex;align-items:center;gap:22px;background:var(--card);border-radius:24px;padding:32px 38px;box-shadow:0 22px 48px -30px rgba(0,0,0,.5);}
  .card .cdot{width:18px;height:18px;border-radius:50%;background:var(--accent);flex:0 0 auto;}
  .card .ctext{font-family:${SERIF};font-weight:800;font-size:40px;line-height:1.18;color:var(--ink);}

  /* cover */
  .cover{padding-top:60px;}
  .cov-mid{margin-top:auto;}
  .icons{display:flex;align-items:center;gap:30px;margin-bottom:44px;}
  .appic{width:132px;height:132px;border-radius:32px;display:flex;align-items:center;justify-content:center;box-shadow:0 26px 54px -24px rgba(0,0,0,.7);}
  .appic.dark{background:#1C1813;border:1px solid #342E25;} .appic.acc{background:var(--accent);} .appic .ico{width:78px;height:78px;}
  .plus{font-size:60px;font-weight:300;color:#C9C2B4;}
  .cov-title{font-weight:900;font-size:88px;line-height:1.0;letter-spacing:-.01em;color:#F5F1EA;text-transform:uppercase;}
  .cov-title .acc{color:var(--accent);}
  .cov-sub{margin-top:26px;font-size:36px;line-height:1.34;color:#B7B0A2;max-width:760px;}
  .gift{margin-top:26px;display:inline-block;background:color-mix(in srgb,var(--accent) 16%, transparent);border:1px solid color-mix(in srgb,var(--accent) 50%, transparent);color:#EDD9C8;font-weight:700;font-size:29px;padding:14px 26px;border-radius:40px;}
  .cov-foot{margin-top:34px;}
  .swipe{font-weight:800;font-size:30px;letter-spacing:.12em;color:var(--accent);}

  /* split layout (s2,s5) */
  .split{display:flex;gap:30px;align-items:center;margin-top:8px;flex:1;}
  .split-l{flex:1;} .split-r{flex:0 0 auto;position:relative;display:flex;justify-content:center;padding-top:8px;}
  .stat{margin-top:26px;background:var(--card);border-radius:20px;padding:26px 30px;display:flex;align-items:center;gap:22px;}
  .stat-n{font-family:${SERIF};font-weight:800;font-size:62px;color:var(--accent);flex:0 0 auto;line-height:1;}
  .stat-l{font-size:27px;color:var(--muted);line-height:1.28;}
  .chips-row{margin-top:24px;display:flex;flex-wrap:wrap;gap:12px;}
  .mchip{font-size:24px;font-weight:600;color:var(--muted);border:1px solid var(--line);border-radius:30px;padding:12px 22px;}

  /* phone mockup */
  .phone{width:236px;height:472px;border-radius:40px;padding:12px;position:relative;box-shadow:0 34px 66px -30px rgba(0,0,0,.7);}
  .phone.bland{background:#26221B;border:1px solid #38322a;} .phone.good{background:#0f0d0a;border:1px solid #2b261e;}
  .slide.light .phone.bland{background:#cfc9bd;border:1px solid #bdb6a8;}
  .notch{position:absolute;top:22px;left:50%;transform:translateX(-50%);width:64px;height:8px;border-radius:6px;background:rgba(0,0,0,.35);z-index:2;}
  .sc{width:100%;height:100%;border-radius:30px;overflow:hidden;background:#F4F1EA;display:flex;flex-direction:column;}
  .s-hero{height:200px;} .s-hero.bland{background:#d9d4c8;} .s-hero.good{background:linear-gradient(150deg,#C4623B,#7d3f26);position:relative;}
  .s-badge{position:absolute;left:14px;top:14px;background:rgba(255,255,255,.85);color:#3a2013;font-size:16px;font-weight:700;padding:5px 12px;border-radius:20px;}
  .s-b{padding:18px 18px;display:flex;flex-direction:column;gap:12px;}
  .s-line{height:16px;border-radius:6px;background:#dcd6ca;} .w70{width:70%;} .w45{width:45%;} .w60{width:60%;} .w50{width:50%;}
  .s-title{font-family:${SERIF};font-weight:800;font-size:30px;color:#22201c;}
  .s-meta{font-size:19px;color:#8a8478;} .s-row{display:flex;gap:12px;}
  .s-mini{height:70px;border-radius:12px;flex:1;} .s-mini.bland{background:#dcd6ca;} .s-mini.good{background:linear-gradient(150deg,#caa,#b5794f);}
  .s-btn{margin-top:4px;background:#C4623B;color:#fff;text-align:center;font-weight:700;font-size:20px;padding:12px;border-radius:14px;}

  .tag{position:absolute;font-weight:800;font-size:23px;padding:10px 20px;border-radius:30px;z-index:3;}
  .tag.bad{top:-6px;right:-6px;background:#3a2a24;color:#e8a48c;border:1px solid #6b4a3c;}
  .slide.light .tag.bad{background:#efe2dc;color:#b0603f;border:1px solid #e3c9bd;}
  .tag.good{background:var(--accent);color:#fff;}

  /* before/after (s3) */
  .ba{flex:1;display:flex;align-items:center;justify-content:center;gap:20px;margin-top:6px;}
  .ba-col{display:flex;flex-direction:column;align-items:center;gap:16px;position:relative;}
  .ba-col .tag{position:static;}
  .ba-cap{font-size:24px;color:var(--muted);text-align:center;max-width:250px;}
  .ba-arrow{font-size:56px;color:var(--accent);font-weight:300;}

  /* tools (s4) */
  .tools{margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:22px;}
  .tool{background:var(--card);border-radius:24px;padding:34px 28px;text-align:center;box-shadow:0 20px 44px -30px rgba(0,0,0,.45);}
  .tic{width:96px;height:96px;border-radius:24px;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;}
  .tic.dark{background:#1C1813;} .tic.acc{background:var(--accent);} .tic .ico{width:54px;height:54px;}
  .tool b{display:block;font-family:${SERIF};font-weight:800;font-size:40px;color:var(--ink);}
  .tool span{display:block;margin-top:8px;font-size:26px;color:var(--muted);line-height:1.3;}
  .flow{margin-top:auto;display:flex;align-items:center;justify-content:center;gap:16px;background:var(--card);border-radius:22px;padding:26px 20px;flex-wrap:wrap;}
  .fstep{font-weight:700;font-size:30px;color:var(--muted);} .fstep.on{color:var(--ink);} .fstep.acc{color:var(--accent);font-weight:800;}
  .flow i{color:var(--accent);font-style:normal;font-size:30px;}

  /* feature list (s5) */
  .flist{display:flex;flex-direction:column;gap:14px;}
  .frow{display:flex;align-items:center;gap:18px;font-size:31px;color:var(--ink);background:var(--card);border-radius:16px;padding:20px 24px;}
  .fchk{flex:0 0 auto;width:40px;height:40px;border-radius:50%;background:var(--accent);color:#fff;font-size:24px;font-weight:800;display:flex;align-items:center;justify-content:center;}
  .split-r.stack{padding-top:0;width:280px;} .ph-back{position:absolute;left:8px;top:20px;opacity:.55;} .ph-front{position:relative;}

  /* step head */
  .step-head{display:flex;align-items:flex-start;gap:26px;margin-bottom:4px;}
  .stepn{font-family:${SERIF};font-weight:800;font-size:90px;line-height:.84;color:var(--accent);flex:0 0 auto;}
  .h.step{font-size:56px;padding-top:12px;}

  /* prompt box (s6) */
  .pbox{margin-top:14px;background:#0f0d0a;border:1px solid #2a251d;border-radius:22px;padding:32px 36px;}
  .slide.light .pbox{background:#1B1712;border-color:#2a251d;}
  .pbox-h{display:flex;align-items:center;gap:12px;font-weight:800;font-size:23px;letter-spacing:.14em;color:var(--accent);}
  .pbox-h .copy{margin-left:auto;color:#8f887b;font-size:22px;letter-spacing:.06em;text-transform:none;font-weight:600;}
  .pbox-t{margin-top:18px;font-family:${MONO};font-size:29px;line-height:1.5;color:#ECE7DB;}
  .hint{margin-top:auto;font-size:29px;color:var(--muted);text-align:center;}
  .hint strong{color:var(--accent);}

  /* chat + propagate (s7) */
  .chat{margin-top:8px;display:flex;align-items:flex-start;gap:16px;}
  .chat-you{flex:0 0 auto;background:var(--accent);color:#fff;font-weight:800;font-size:22px;padding:12px 18px;border-radius:16px;}
  .bub{background:var(--card);border-radius:18px;border-top-left-radius:4px;padding:24px 28px;font-size:31px;color:var(--ink);line-height:1.3;}
  .propagate{margin-top:34px;display:flex;flex-direction:column;align-items:center;gap:20px;}
  .minis{display:flex;gap:22px;}
  .mini-screen{width:150px;height:230px;border-radius:22px;background:#fff;box-shadow:0 20px 40px -26px rgba(0,0,0,.4);padding:14px;display:flex;flex-direction:column;gap:10px;border:1px solid var(--line);}
  .mini-screen.on{outline:3px solid var(--accent);outline-offset:3px;}
  .ms-hero{height:90px;border-radius:12px;background:linear-gradient(150deg,#C4623B,#8a4327);}
  .ms-l{height:14px;border-radius:5px;background:#e0dacd;} .ms-l.s{width:60%;}
  .prop-note{font-size:29px;color:var(--muted);} .prop-note strong{color:var(--accent);}

  /* flow chain (s8) */
  .chips-row.big{margin-top:6px;margin-bottom:8px;}
  .chips-row.big .mchip{font-size:26px;color:var(--ink);background:var(--card);border-color:transparent;}
  .fchain{margin-top:auto;margin-bottom:8px;display:flex;align-items:center;justify-content:space-between;background:var(--card);border-radius:24px;padding:34px 22px;}
  .fchain i{color:var(--accent);font-style:normal;font-size:34px;}
  .fnode{display:flex;flex-direction:column;align-items:center;gap:14px;}
  .fn-ic{width:96px;height:96px;border-radius:24px;background:#1C1813;display:flex;align-items:center;justify-content:center;}
  .slide.light .fn-ic{background:#211c16;}
  .fn-ic svg{width:48px;height:48px;} .fn-ic .ico{width:52px;height:52px;}
  .fnode span{font-weight:700;font-size:25px;color:var(--ink);}

  /* cta (s9) */
  .cta .fire{font-size:70px;} .cta .h{margin-top:8px;}
  .plusbox{margin-top:30px;background:var(--card);border-radius:26px;padding:34px 40px;width:100%;}
  .pb-l{font-size:30px;color:var(--muted);} .pb-k{font-family:${SERIF};font-weight:900;font-size:100px;color:var(--accent);line-height:1;margin:2px 0 6px;}
  .pb-u{font-weight:700;font-size:31px;color:var(--ink);} .pb-u strong{color:var(--accent);}
  .follow{margin-top:22px;font-size:27px;color:var(--muted);}

  /* footer */
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
  render(process.argv[2] || path.join(__dirname, 'out'))
    .then(f => console.log('Rendered:\n' + f.join('\n')))
    .catch(e => { console.error(e); process.exit(1); });
}
module.exports = { render, html };
