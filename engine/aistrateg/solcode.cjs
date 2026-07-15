// engine/aistrateg/solcode.cjs
// «AI STRATEG» — GPT-5.6 Sol'ni Claude Code ichida ishga tushirish.
// KOD MUHARRIRI / IDE mavzu: oyna chrome, qator raqamlari, sintaksis ranglar, diff/terminal/checklist. O'zbekcha B1.
// Footer: AI STRATEG / @kodiyusufbay. CTA: izohga «+».

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const cfg = require('../../src/config');

const W = 1080, H = 1350;
const SANS = "'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace,'SF Mono',Menlo,Consolas,monospace";
const HANDLE = '@kodiyusufbay';
const TOTAL = 10;

const pg = (i) => `${String(i + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`;
const spark = (c = 'var(--accent)') => `<svg class="spk" viewBox="0 0 24 24"><path d="M12 1l2.2 7.4L21.5 6l-5.1 5.6 6.6 3.4-7.6.5 2.3 7.4L12 17l-5.7 5.9 2.3-7.4L1 15l6.6-3.4L2.5 6l7.3 2.4z" fill="${c}"/></svg>`;
const deco = () => `<div class="bg-grid"></div>`;
const topbar = (kick, i) => `<div class="top"><div class="kick">${spark()}${kick}</div><span class="page">${pg(i)}</span></div>`;
const footer = () => `<div class="rule"></div><div class="footer"><span class="fbrand">${spark()}AI STRATEG</span><span class="fhandle">${HANDLE}</span></div>`;

// editor window: filename tab + numbered code lines
function editor(fname, lines) {
  const rows = lines.map((html, i) => `<div class="ln"><span class="lnn">${String(i + 1).padStart(2, '0')}</span><div class="lnc">${html === '' ? '&nbsp;' : html}</div></div>`).join('');
  return `<div class="editor">
    <div class="ed-bar"><span class="md r"></span><span class="md y"></span><span class="md g"></span><span class="fname">${fname}</span></div>
    <div class="ed-body">${rows}</div>
  </div>`;
}

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
    ${editor('muammo.diff', [
      `<span class="cmt big">// eski usul — charchatadi</span>`,
      ``,
      `<span class="del">- Ikki terminal ochasiz</span>`,
      `<span class="del">- Nusxa → joylash → nusxa</span>`,
      `<span class="del">- Kontekst yo'qoladi</span>`,
      ``,
      `<span class="add">+ Bitta terminal</span>`,
      `<span class="add">+ Nusxa-joylash yo'q</span>`,
      `<span class="add">+ Ikki model tekshiradi</span>`,
      ``,
      `<span class="cmt">// natija: tez va toza</span>`,
    ])}
    </div>
    ${footer()}
  </section>`;
}

function s3() {
  return `<section class="slide">
    ${deco()}
    ${topbar('YECHIM', 2)}
    <div class="mid">
    ${editor('yechim.sh', [
      `<span class="cmt big">// bitta oynada ikki aql</span>`,
      ``,
      `<span class="pr">$</span> <span class="kw">claude</span> yoz <span class="op">|</span> <span class="kw">sol</span> tekshir <span class="op">|</span> siz jo'nat`,
      ``,
      `<span class="cmt"># Claude — yozadi</span>`,
      `<span class="cmt"># Sol   — xatolarni topadi</span>`,
      `<span class="cmt"># Siz   — jo'natasiz</span>`,
      ``,
      `<span class="cmt">// ikki xil ko'z, nusxa-joylash yo'q</span>`,
    ])}
    </div>
    ${footer()}
  </section>`;
}

function s4() {
  return `<section class="slide">
    ${deco()}
    ${topbar('NIMA KERAK', 3)}
    <div class="mid">
    ${editor('talablar.md', [
      `<span class="cmt big">// boshlashdan oldin</span>`,
      ``,
      `<span class="ok">[x]</span> Claude Code o'rnatilgan`,
      `<span class="ok">[x]</span> ChatGPT Plus (Sol uchun)`,
      `<span class="no">[ ]</span> Bepul hisob — <span class="del2">ishlamaydi</span>`,
      ``,
      `<span class="cmt">// ikkalasi tayyor? 10 daqiqa yetadi</span>`,
    ])}
    </div>
    ${footer()}
  </section>`;
}

function s5() {
  return `<section class="slide">
    ${deco()}
    ${topbar('SOZLASH · 1-3', 4)}
    <div class="mid">
    ${editor('setup-1.sh', [
      `<span class="pr">$</span> <span class="kw">claude</span> --version`,
      `<span class="cmt"># bormi tekshiring</span>`,
      ``,
      `<span class="pr">$</span> <span class="kw">brew install</span> <span class="str">proxy</span>`,
      `<span class="cmt"># ikki modelni bog'lovchi ko'prik</span>`,
      ``,
      `<span class="pr">$</span> <span class="kw">proxy</span> auth login`,
      `<span class="cmt"># ChatGPT'ni ulang — API kalit shart emas</span>`,
    ])}
    </div>
    ${footer()}
  </section>`;
}

function s6() {
  return `<section class="slide">
    ${deco()}
    ${topbar('SOZLASH · 4-6', 5)}
    <div class="mid">
    ${editor('setup-2.sh', [
      `<span class="pr">$</span> <span class="kw">proxy</span> serve`,
      `<span class="cmt"># 1-terminal — ochiq qoldiring</span>`,
      ``,
      `<span class="pr">$</span> <span class="kw">claude</span> <span class="str">--sol</span>`,
      `<span class="cmt"># 2-terminal — Sol shu yerda ochiladi</span>`,
      ``,
      `<span class="pr">&gt;</span> <span class="cmd2">/effort</span> <span class="hl2">high</span>`,
      `<span class="cmt"># qiyin ishga high, oddiyga medium</span>`,
    ])}
    </div>
    ${footer()}
  </section>`;
}

function s7() {
  return `<section class="slide">
    ${deco()}
    ${topbar('KUCH DARAJASI', 6)}
    <div class="mid">
    ${editor('effort.sh', [
      `<span class="cmt big">// Sol qancha o'ylasin?</span>`,
      ``,
      `<span class="pr">&gt;</span> <span class="cmd2">/effort</span> <span class="hl2">high</span>`,
      ``,
      `low · medium · <span class="kw">high</span> · xhigh · max`,
      ``,
      `<span class="cmt"># high — boshlang'ich tanlov</span>`,
      `<span class="warn"># max — juda ko'p sarflaydi!</span>`,
    ])}
    </div>
    ${footer()}
  </section>`;
}

function s8() {
  return `<section class="slide">
    ${deco()}
    ${topbar('HALOL GAP', 7)}
    <div class="mid">
    ${editor('README.md', [
      `<span class="warn big">// ⚠ bilib qo'ying</span>`,
      ``,
      `<span class="warn">! Ikki obuna:</span> Anthropic + ChatGPT`,
      `<span class="warn">! Proxy:</span> mahalliy, norasmiy yo'l`,
      `<span class="warn">! Kompaniya:</span> rasmiy API dan yuring`,
      ``,
      `<span class="cmt">// Sol — ikkinchi dvigatel, shart emas</span>`,
    ])}
    </div>
    ${footer()}
  </section>`;
}

function s9() {
  return `<section class="slide">
    ${deco()}
    ${topbar('BONUS · PLUGIN', 8)}
    <div class="mid">
    ${editor('plugin.sh', [
      `<span class="cmt big">// faqat tekshiruvchi kerakmi?</span>`,
      ``,
      `<span class="pr">&gt;</span> <span class="cmd2">/plugin</span> marketplace add codex`,
      `<span class="pr">&gt;</span> <span class="cmd2">/plugin</span> install codex`,
      `<span class="pr">&gt;</span> <span class="cmd2">/codex</span>:setup`,
      ``,
      `<span class="cmt"># Claude yozadi, Sol tanqid qiladi</span>`,
    ])}
    </div>
    ${footer()}
  </section>`;
}

function s10() {
  return `<section class="slide cta">
    ${deco()}
    ${topbar('OXIRIGACHA YETDINGIZ', 9)}
    <div class="mid">
    ${editor('command-kit.sh', [
      `<span class="cmt big">// ikki labaratoriya, bitta terminal</span>`,
      ``,
      `<span class="pr">$</span> <span class="kw">get</span> <span class="str">command-kit</span>`,
      ``,
      `<span class="cmt"># barcha ishlaydigan buyruqlar DM'da</span>`,
      `<span class="add">+ Izohga «+» yozing <span class="cur"></span></span>`,
    ])}
    <div class="cap">Saqlang va keyingi 10 daqiqada sinab ko'ring.</div>
    </div>
    ${footer()}
  </section>`;
}

const slides = [cover(), s2(), s3(), s4(), s5(), s6(), s7(), s8(), s9(), s10()];

function html() {
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{--bg:#EFEADD; --ink:#26221C; --muted:#726D5F; --accent:#C4623B; --line:#DDD5C6; --card:#FBF8EF; --cardln:#E6DECB;
    width:${W}px;height:${H}px;position:relative;overflow:hidden;background:var(--bg);color:var(--ink);
    font-family:${SANS};padding:150px 66px 178px;display:flex;flex-direction:column;justify-content:center;}
  .bg-grid{position:absolute;inset:0;z-index:0;background-image:radial-gradient(circle, rgba(38,34,28,.05) 1.5px, transparent 1.5px);background-size:34px 34px;opacity:.6;}
  .slide>*{position:relative;z-index:1;}
  .acc{color:var(--accent);} b,strong{font-weight:800;color:var(--ink);}

  .top{position:absolute;top:60px;left:66px;right:66px;display:flex;justify-content:space-between;align-items:center;}
  .kick{display:flex;align-items:center;gap:12px;font-family:${MONO};font-weight:700;font-size:24px;letter-spacing:.06em;text-transform:uppercase;color:var(--accent);}
  .kick .spk,.fbrand .spk{width:26px;height:26px;}
  .page{font-family:${MONO};font-weight:700;font-size:25px;letter-spacing:.05em;color:var(--muted);}

  /* cover */
  .cover{padding-top:52px;}
  .cov-mid{position:absolute;top:50%;left:66px;right:66px;transform:translateY(-50%);display:flex;flex-direction:column;}
  .cov-art{width:100%;margin-bottom:18px;} .rigsvg{width:100%;height:auto;display:block;}
  .badge{align-self:flex-start;background:color-mix(in srgb,var(--accent) 14%, transparent);border:1.5px solid color-mix(in srgb,var(--accent) 55%, transparent);color:var(--accent);font-family:${MONO};font-weight:700;font-size:22px;letter-spacing:.04em;padding:10px 22px;border-radius:8px;margin-bottom:20px;}
  .cov-title{font-weight:900;font-size:80px;line-height:1.0;letter-spacing:-.02em;color:var(--ink);text-transform:uppercase;}
  .cov-title .hl{background:#B9F0CE;color:#0F3D25;padding:2px 14px;border-radius:8px;box-decoration-break:clone;-webkit-box-decoration-break:clone;}
  .cov-sub{margin-top:22px;font-size:32px;line-height:1.34;color:var(--muted);max-width:860px;} .cov-sub b{color:var(--ink);}
  .gift{margin-top:22px;align-self:flex-start;background:var(--card);border:1.5px solid var(--cardln);color:var(--ink);font-weight:700;font-size:27px;padding:13px 24px;border-radius:8px;}
  .swipe{margin-top:24px;font-family:${MONO};font-weight:700;font-size:30px;letter-spacing:.08em;color:var(--accent);}

  /* editor window */
  .editor{background:#0F0D0B;border-radius:18px;overflow:hidden;border:1px solid #2a251d;box-shadow:0 30px 70px rgba(30,20,10,.22);}
  .ed-bar{display:flex;align-items:center;gap:10px;padding:20px 24px;background:#181410;border-bottom:1px solid #241f18;}
  .md{width:17px;height:17px;border-radius:50%;} .md.r{background:#ED6A5E;} .md.y{background:#F5BF4F;} .md.g{background:#61C554;}
  .fname{margin-left:14px;font-family:${MONO};font-size:25px;color:#8b8578;font-weight:600;}
  .ed-body{padding:30px 30px 34px;font-family:${MONO};}
  .ln{display:flex;gap:24px;align-items:flex-start;padding:6px 0;}
  .lnn{flex:0 0 auto;width:40px;text-align:right;color:#48423a;font-size:26px;line-height:1.42;user-select:none;}
  .lnc{font-size:33px;line-height:1.42;color:#E7E1D6;font-weight:500;word-break:break-word;}
  .lnc .big{font-size:40px;font-weight:700;}
  .cmt{color:#7a9a6c;} .del{color:#EA7B6E;} .add{color:#6FCF8F;} .kw{color:#3DDC84;font-weight:700;} .str{color:#E7A968;} .op{color:#8b8578;}
  .pr{color:#3DDC84;font-weight:800;} .cmd2{color:#3DDC84;font-weight:700;} .hl2{background:#1FA463;color:#fff;padding:0 12px;border-radius:6px;}
  .warn{color:#F5BF4F;} .ok{color:#6FCF8F;font-weight:700;} .no{color:#EA7B6E;font-weight:700;} .del2{color:#EA7B6E;text-decoration:line-through;}
  .cur{display:inline-block;width:18px;height:32px;background:#3DDC84;vertical-align:-4px;margin-left:6px;}
  .cap{margin-top:22px;text-align:center;font-family:${MONO};font-size:27px;color:var(--muted);}

  .rule{position:absolute;left:66px;right:66px;bottom:140px;height:2px;background:var(--line);}
  .footer{position:absolute;left:66px;right:66px;bottom:78px;display:flex;align-items:center;justify-content:space-between;}
  .mid{position:absolute;top:50%;left:66px;right:66px;transform:translateY(-50%);display:flex;flex-direction:column;}
  .fbrand{display:flex;align-items:center;gap:10px;font-family:${MONO};font-weight:800;font-size:27px;letter-spacing:.06em;color:var(--accent);}
  .fhandle{font-family:${MONO};font-weight:500;font-size:27px;color:var(--muted);}
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
