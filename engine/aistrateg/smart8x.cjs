// engine/aistrateg/smart8x.cjs
// «AI STRATEG» — Claude'ni 8x aqlliroq qilish (Context Engineering).
// WOW REDESIGN: har slayd ALOHIDA kompozitsiya (gigant raqam, doiraviy diagramma, full-bleed, qatlamlar).
// Brend rangi: to'q sariq/amber oila. Fonlar almashadi (qora/krem/orange/shaftoli). O'zbekcha B1.
// Footer brend: AI STRATEG / @kodiyusufbay. CTA: izohga «+».

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
const WARM = ['#E0794C', '#E8A34B', '#E8B84B', '#D98E5A', '#C4623B', '#B4501F', '#EE9E6B'];

const pg = (i) => `${String(i + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`;
const mark = (i, tag = 'AI STRATEG') => `<div class="mark"><span class="mb">✦ ${tag}</span><span class="mp">${pg(i)}</span></div>`;
const foot = () => `<div class="foot">${HANDLE}</div>`;

// ── slides ────────────────────────────────────────────────
// 1. COVER — dark, convergence hero
function cover() {
  const nodeX = 792, nodeY = 175;
  const ys = WARM.map((_, i) => 40 + i * 45);
  let lines = '', bars = '';
  WARM.forEach((c, i) => {
    const y = ys[i];
    lines += `<path d="M250 ${y} C 430 ${y}, 560 ${nodeY}, ${nodeX - 44} ${nodeY}" stroke="${c}" stroke-width="3.4" fill="none" opacity=".7"/>`;
    bars += `<rect x="44" y="${y - 15}" width="206" height="30" rx="9" fill="#1a1712" stroke="${c}" stroke-width="2"/><circle cx="70" cy="${y}" r="6.5" fill="${c}"/>`;
  });
  return `<section class="slide s-dark">
    <div class="glowbig"></div>
    ${mark(0)}
    <div class="cov">
      <svg viewBox="0 0 900 350" class="conv">${lines}${bars}
        <circle cx="${nodeX}" cy="${nodeY}" r="60" fill="url(#ng)"/><circle cx="${nodeX}" cy="${nodeY}" r="44" fill="#160f0a" stroke="#E0794C" stroke-width="3"/>
        <text x="${nodeX}" y="${nodeY + 14}" text-anchor="middle" font-family="${SERIF}" font-size="44" font-weight="900" fill="#F0A362">C</text>
        <defs><radialGradient id="ng"><stop offset="0" stop-color="#E0794C" stop-opacity=".6"/><stop offset="1" stop-color="#E0794C" stop-opacity="0"/></radialGradient></defs>
      </svg>
      <div class="cov-badge">ANTHROPIC MUHANDISLARI USULI</div>
      <h1 class="cov-t">CLAUDE'NI<br><span class="huge">8×</span> AQLLIROQ<br>QILING</h1>
      <p class="cov-s">Model o'zgarmadi. Faqat u ishdan oldin <b>ko'radigan ma'lumot</b> o'zgardi.</p>
      <div class="cov-swipe">SURING →</div>
    </div>
    ${foot()}
  </section>`;
}

// 2. MUAMMO — full-bleed statement on ORANGE
function s2() {
  return `<section class="slide s-orange">
    <div class="corner-num">01</div>
    ${mark(1)}
    <div class="stmt">
      <div class="stmt-k">MUAMMO</div>
      <h2 class="stmt-h">Aybdor —<br>model <span class="strike">emas.</span></h2>
      <div class="stmt-big">KONTEKST</div>
      <p class="stmt-s">Claude faqat kontekst oynasidagi narsani ko'radi. Tashqarisi — yo'qdek. Kamlik qilsa, u <b>taxmin qiladi</b>.</p>
    </div>
    ${foot()}
  </section>`;
}

// 3. 7 QISM — radial hub diagram on CREAM
function s3() {
  const labels = ['Xotira', "Ko'rsatma", 'Misollar', 'Fayllar', 'Vositalar', 'Holat', 'Tarix'];
  const cx = 450, cy = 205, rx = 372, ry = 150;
  let spokes = '', nodes = '';
  labels.forEach((t, i) => {
    const a = (-90 + i * (360 / 7)) * Math.PI / 180;
    const x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry;
    const c = WARM[i];
    spokes += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${c}" stroke-width="3" opacity=".5"/>`;
    nodes += `<g><circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="34" fill="${c}"/><circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="34" fill="none" stroke="#2A2016" stroke-width="2"/></g>
      <text x="${x.toFixed(0)}" y="${(y + 62).toFixed(0)}" text-anchor="middle" font-family="${SANS}" font-size="25" font-weight="800" fill="#2A2016">${t}</text>`;
  });
  return `<section class="slide s-cream">
    ${mark(2)}
    <div class="mid-h"><span class="tag">7 QISM</span><h2 class="h2 dark">Kontekst nimadan iborat?</h2></div>
    <svg viewBox="0 0 900 470" class="radial">
      ${spokes}
      <circle cx="${cx}" cy="${cy}" r="82" fill="#2A2016"/>
      <text x="${cx}" y="${cy - 6}" text-anchor="middle" font-family="${SERIF}" font-size="34" font-weight="900" fill="#F2ECDE">KON-</text>
      <text x="${cx}" y="${cy + 30}" text-anchor="middle" font-family="${SERIF}" font-size="34" font-weight="900" fill="#E0794C">TEKST</text>
      ${nodes}
    </svg>
    ${foot()}
  </section>`;
}

// 4. AGENT LOOP — circular flow on DARK
function s4() {
  const steps = ['So\'rov', 'Kontekst', 'Claude', 'Vosita', 'Natija'];
  const cx = 450, cy = 235, r = 175;
  let arcs = '', nodes = '';
  steps.forEach((t, i) => {
    const a = (-90 + i * 72) * Math.PI / 180;
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    nodes += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="58" fill="#1d150d" stroke="#E0794C" stroke-width="2.5"/>
      <text x="${x.toFixed(0)}" y="${(y + 9).toFixed(0)}" text-anchor="middle" font-family="${SANS}" font-size="24" font-weight="800" fill="#F2ECDE">${t}</text>`;
  });
  // dashed ring with arrows
  return `<section class="slide s-charcoal">
    ${mark(3)}
    <div class="mid-h"><span class="tag amber">AYLANMA</span><h2 class="h2">Agent — bu doira</h2></div>
    <svg viewBox="0 0 900 490" class="loop">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#E0794C" stroke-width="3" stroke-dasharray="4 16" opacity=".55"/>
      <text x="${cx}" y="${cy - 6}" text-anchor="middle" font-family="${SERIF}" font-size="66" font-weight="900" fill="#E0794C">↻</text>
      <text x="${cx}" y="${cy + 42}" text-anchor="middle" font-family="${SANS}" font-size="22" font-weight="700" letter-spacing="3" fill="#8b7f6e">TO'XTAMAYDI</text>
      ${nodes}
    </svg>
    <p class="foot-note">Zaif agent 2-qadamda buziladi: kontekst to'liq emas → xato.</p>
    ${foot()}
  </section>`;
}

// 5. 3 QATLAM — stacked perspective layers on PEACH, giant "3"
function s5() {
  const L = [
    ['GLOBAL', 'Kimligi, qoidalar, uslub — har doim bor', '#B4501F'],
    ['LOYIHA', 'AGENTS.md, arxitektura, papkalar', '#E0794C'],
    ['VAZIFA', 'Joriy fayl, maqsad, cheklovlar', '#E8A34B'],
  ].map(([t, d, c], i) => `<div class="layer" style="--lc:${c};z-index:${3 - i}"><div class="layer-t">${t}</div><div class="layer-d">${d}</div></div>`).join('');
  return `<section class="slide s-peach">
    <div class="ghost-num">3</div>
    ${mark(4)}
    <div class="mid-h"><span class="tag">3 QATLAM</span><h2 class="h2 dark">Kontekst — 3 qavat</h2></div>
    <div class="stack">${L}</div>
    ${foot()}
  </section>`;
}

// 6. AGENTS.md — tilted code panel on DARK, big watermark
function s6() {
  return `<section class="slide s-dark">
    <div class="wm">.md</div>
    ${mark(5)}
    <div class="mid-h"><span class="tag amber">ENG MUHIM FAYL</span><h2 class="h2">AGENTS.md</h2></div>
    <div class="panel tilt">
      <div class="p-bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="p-name">AGENTS.md</span></div>
      <div class="p-body"><span class="c-cmt"># Arxitektura</span><br>API — /api ichida. /legacy — tegmang.<br><br><span class="c-cmt"># Qoidalar</span><br>axios yo'q, doim fetch.<br><br><span class="c-cmt"># Tegmaslik</span><br><span class="c-warn">src/payments/</span> — inson tasdig'i</div>
    </div>
    <p class="foot-note">Har qator — Claude qaytarmaydigan bitta xato. O'qiladi har sessiya boshida.</p>
    ${foot()}
  </section>`;
}

// 7. XOTIRA — 3 big circular icons timeline on CREAM
function s7() {
  const m = [
    ['🗄️', 'UZOQ', 'Barcha sessiyalardan'],
    ['💬', 'QISQA', 'Shu suhbatda'],
    ['🧠', 'ISHCHI', 'Hozir oynada'],
  ].map(([e, t, d], i) => `<div class="mem"><div class="mem-c">${e}</div><div class="mem-t">${t}</div><div class="mem-d">${d}</div></div>${i < 2 ? '<div class="mem-arr">→</div>' : ''}`).join('');
  return `<section class="slide s-cream">
    ${mark(6)}
    <div class="mid-h"><span class="tag">XOTIRA</span><h2 class="h2 dark">Uch xil xotira</h2></div>
    <div class="mem-row">${m}</div>
    <div class="ribbon">Amalda bu — <b>xotira fayli</b>: boshida o'qiladi, oxirida yangilanadi.</div>
    ${foot()}
  </section>`;
}

// 8. MCP — constellation on CHARCOAL
function s8() {
  const sys = [['GitHub', 150, 90], ['Slack', 720, 130], ['Linear', 120, 330], ['Postgres', 760, 350], ['Sentry', 250, 430], ['Drive', 640, 60], ['Jira', 430, 470], ['Files', 620, 440]];
  const cx = 450, cy = 250;
  let lines = '', nodes = '';
  sys.forEach(([t, x, y], i) => {
    lines += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${WARM[i % WARM.length]}" stroke-width="2" opacity=".35"/>`;
    nodes += `<g><circle cx="${x}" cy="${y}" r="9" fill="${WARM[i % WARM.length]}"/></g><text x="${x}" y="${y - 20}" text-anchor="middle" font-family="${SANS}" font-size="24" font-weight="700" fill="#E7DECF">${t}</text>`;
  });
  return `<section class="slide s-charcoal">
    ${mark(7)}
    <div class="mid-h"><span class="tag amber">MCP</span><h2 class="h2">Hamma joydan kontekst</h2></div>
    <svg viewBox="0 0 900 520" class="constel">
      ${lines}
      <circle cx="${cx}" cy="${cy}" r="70" fill="url(#cg)"/><circle cx="${cx}" cy="${cy}" r="52" fill="#1d150d" stroke="#E0794C" stroke-width="3"/>
      <text x="${cx}" y="${cy + 12}" text-anchor="middle" font-family="${SERIF}" font-size="40" font-weight="900" fill="#F0A362">C</text>
      ${nodes}
      <defs><radialGradient id="cg"><stop offset="0" stop-color="#E0794C" stop-opacity=".5"/><stop offset="1" stop-color="#E0794C" stop-opacity="0"/></radialGradient></defs>
    </svg>
    <p class="foot-note">U kodni emas — tiket, Slack qarori, xato va bazani ham ko'radi.</p>
    ${foot()}
  </section>`;
}

// 9. CTA — giant 8x on ORANGE gradient
function s9() {
  return `<section class="slide s-orange cta">
    ${mark(8)}
    <div class="cta-wrap">
      <div class="cta-8">8<span class="x">×</span></div>
      <div class="cta-line">ko'proq ish. Bir xil model.</div>
      <div class="cta-box"><div class="cta-l">To'liq qo'llanmani DM'da oling</div><div class="cta-u">Izohga <b>«+»</b> yozing</div></div>
    </div>
    ${foot()}
  </section>`;
}

const slides = [cover(), s2(), s3(), s4(), s5(), s6(), s7(), s8(), s9()];

function html() {
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,900&family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{width:${W}px;height:${H}px;position:relative;overflow:hidden;font-family:${SANS};}
  .s-dark{background:radial-gradient(120% 90% at 78% 8%, #241609, #0C0805 60%);color:#F3EADB;}
  .s-charcoal{background:#17120C;color:#F3EADB;}
  .s-cream{background:#F2ECDE;color:#2A2016;}
  .s-peach{background:linear-gradient(160deg,#FAE6D0,#F4D3B4);color:#2A2016;}
  .s-orange{background:linear-gradient(155deg,#D06F3C 0%,#B4501F 55%,#8F3D18 100%);color:#FFF3E9;}
  .slide>*{position:relative;z-index:2;}
  b,strong{font-weight:800;}

  /* brand mark */
  .mark{position:absolute;top:58px;left:66px;right:66px;display:flex;justify-content:space-between;align-items:center;z-index:5;opacity:.92;}
  .mb{font-weight:900;font-size:25px;letter-spacing:.14em;} .mp{font-weight:700;font-size:24px;letter-spacing:.08em;opacity:.7;}
  .foot{position:absolute;bottom:56px;right:66px;font-weight:700;font-size:25px;opacity:.6;z-index:5;}
  .s-dark .mb,.s-charcoal .mb,.s-orange .mb{color:#F0A362;} .s-cream .mb,.s-peach .mb{color:#C4623B;}

  /* shared heading block */
  .mid-h{position:absolute;top:150px;left:66px;right:66px;z-index:3;}
  .tag{display:inline-block;background:#E0794C;color:#160f0a;font-weight:900;font-size:22px;letter-spacing:.1em;padding:8px 18px;border-radius:8px;margin-bottom:16px;}
  .tag.amber{background:#E8B84B;}
  .h2{font-family:${SERIF};font-weight:900;font-size:64px;line-height:1.02;color:#F3EADB;}
  .h2.dark{color:#2A2016;}

  /* 1 COVER */
  .glowbig{position:absolute;width:900px;height:640px;right:-200px;top:-160px;border-radius:50%;background:radial-gradient(closest-side,rgba(224,121,76,.28),transparent 70%);filter:blur(12px);z-index:1;}
  .cov{position:absolute;top:50%;left:66px;right:66px;transform:translateY(-50%);}
  .conv{width:100%;height:auto;display:block;margin-bottom:20px;}
  .cov-badge{display:inline-block;background:rgba(224,121,76,.18);border:1px solid rgba(224,121,76,.5);color:#EDD3BE;font-weight:800;font-size:21px;letter-spacing:.08em;padding:9px 20px;border-radius:30px;margin-bottom:20px;}
  .cov-t{font-weight:900;font-size:82px;line-height:.98;text-transform:uppercase;color:#F7EFE2;}
  .cov-t .huge{font-family:${SERIF};color:#E0794C;font-size:110px;}
  .cov-s{margin-top:22px;font-size:31px;line-height:1.34;color:#C3B6A3;max-width:840px;} .cov-s b{color:#F3EADB;}
  .cov-swipe{margin-top:26px;font-weight:900;font-size:30px;letter-spacing:.1em;color:#E0794C;}

  /* 2 STATEMENT (orange) */
  .corner-num{position:absolute;top:120px;right:56px;font-family:${SERIF};font-weight:900;font-size:150px;color:rgba(255,255,255,.13);z-index:1;}
  .stmt{position:absolute;top:50%;left:66px;right:66px;transform:translateY(-50%);}
  .stmt-k{font-weight:900;font-size:24px;letter-spacing:.16em;color:#FFD9BE;margin-bottom:20px;}
  .stmt-h{font-family:${SERIF};font-weight:900;font-size:92px;line-height:.98;color:#FFF3E9;}
  .stmt-h .strike{position:relative;} .stmt-h .strike::after{content:"";position:absolute;left:-4px;right:-4px;top:52%;height:7px;background:#160f0a;transform:rotate(-3deg);}
  .stmt-big{font-family:${SERIF};font-weight:900;font-size:132px;line-height:1;color:#160f0a;letter-spacing:-.02em;margin:8px 0 22px;text-shadow:3px 3px 0 rgba(255,255,255,.25);}
  .stmt-s{font-size:32px;line-height:1.36;color:#FBE6D6;max-width:900px;} .stmt-s b{color:#fff;}

  /* 3 RADIAL (cream) */
  .radial{position:absolute;top:330px;left:40px;right:40px;width:auto;height:auto;z-index:2;}

  /* 4 LOOP (charcoal) */
  .loop{position:absolute;top:320px;left:60px;right:60px;z-index:2;}
  .foot-note{position:absolute;bottom:140px;left:66px;right:66px;font-size:28px;line-height:1.34;color:#b3a793;text-align:center;z-index:3;}
  .s-cream .foot-note,.s-peach .foot-note{color:#6b6252;}

  /* 5 STACK (peach) */
  .ghost-num{position:absolute;top:120px;right:20px;font-family:${SERIF};font-weight:900;font-size:400px;line-height:.7;color:rgba(180,80,31,.12);z-index:1;}
  .stack{position:absolute;top:360px;left:76px;right:76px;display:flex;flex-direction:column;gap:26px;z-index:2;}
  .layer{background:var(--lc);border-radius:20px;padding:30px 34px;box-shadow:0 16px 30px rgba(120,50,20,.22);color:#fff;transform:perspective(900px) rotateX(6deg);}
  .layer:nth-child(1){margin-right:70px;} .layer:nth-child(2){margin-left:40px;margin-right:20px;} .layer:nth-child(3){margin-left:80px;}
  .layer-t{font-family:${SERIF};font-weight:900;font-size:42px;letter-spacing:.02em;} .layer-d{font-size:26px;margin-top:6px;opacity:.95;}

  /* 6 PANEL (dark) */
  .wm{position:absolute;bottom:60px;right:40px;font-family:${SERIF};font-weight:900;font-size:280px;line-height:.7;color:rgba(224,121,76,.08);z-index:1;}
  .panel{position:absolute;top:330px;left:66px;right:66px;background:#0d0a07;border:1px solid #2a2018;border-radius:18px;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,.4);z-index:2;}
  .panel.tilt{transform:rotate(-1.6deg);}
  .p-bar{display:flex;align-items:center;gap:10px;padding:18px 22px;background:#171009;} .d{width:15px;height:15px;border-radius:50%;} .d.r{background:#ED6A5E;}.d.y{background:#F5BF4F;}.d.g{background:#61C554;} .p-name{margin-left:12px;font-family:${MONO};font-size:23px;color:#8b7f6e;}
  .p-body{padding:28px 30px;font-family:${MONO};font-size:29px;line-height:1.5;color:#E7DECF;} .c-cmt{color:#9bb37f;} .c-warn{color:#F0A362;font-weight:700;}

  /* 7 MEMORY (cream) */
  .mem-row{position:absolute;top:400px;left:66px;right:66px;display:flex;align-items:flex-start;justify-content:space-between;z-index:2;}
  .mem{flex:1;text-align:center;} .mem-c{width:130px;height:130px;margin:0 auto;border-radius:50%;background:#fff;border:3px solid #E0794C;display:flex;align-items:center;justify-content:center;font-size:60px;box-shadow:0 12px 26px rgba(196,98,59,.2);}
  .mem-t{font-family:${SERIF};font-weight:900;font-size:34px;margin-top:16px;color:#2A2016;} .mem-d{font-size:24px;color:#6b6252;margin-top:4px;}
  .mem-arr{align-self:center;margin-top:44px;color:#E0794C;font-size:44px;font-weight:800;padding:0 4px;}
  .ribbon{position:absolute;bottom:150px;left:66px;right:66px;background:#2A2016;color:#F2ECDE;border-radius:14px;padding:22px 28px;font-size:27px;text-align:center;z-index:3;} .ribbon b{color:#E8A34B;}

  /* 8 CONSTELLATION */
  .constel{position:absolute;top:300px;left:40px;right:40px;z-index:2;}

  /* 9 CTA (orange) */
  .cta-wrap{position:absolute;top:50%;left:66px;right:66px;transform:translateY(-50%);text-align:center;}
  .cta-8{font-family:${SERIF};font-weight:900;font-size:340px;line-height:.82;color:#160f0a;text-shadow:5px 5px 0 rgba(255,255,255,.22);} .cta-8 .x{color:#FFF3E9;}
  .cta-line{font-family:${SERIF};font-weight:900;font-size:52px;color:#FFF3E9;margin-top:6px;}
  .cta-box{margin-top:34px;background:rgba(22,15,10,.28);border:2px solid rgba(255,243,233,.4);border-radius:22px;padding:30px;} .cta-l{font-size:28px;color:#FBE6D6;} .cta-u{margin-top:8px;font-weight:800;font-size:38px;color:#fff;} .cta-u b{color:#FFD9BE;}
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
