// engine/vibecode/gold.cjs
// «vibecoder_qiz» — чёрно-золотая карусель (10 слайдов, пока 1-5).
// Точное воспроизведение дизайна пользователя, ребрендинг:
//   footer wordmark: AI Strategiya → vibe code
//   kicker handle:   AI STRATEGIYA → VIBECODER_QIZ
// Дизайн и цвета не меняю. Рендер 1080x1350 → PNG (Playwright).

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const cfg = require('../../src/config');

const W = 1080, H = 1350;
const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace,'SF Mono',Menlo,Consolas,monospace";
const WORDMARK = 'vibe code';
const HANDLE = 'VIBECODER_QIZ';
const TOTAL = 10;

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pg = (i) => `${i + 1}/${TOTAL}`;

const kicker = (t) => `<div class="kicker"><span class="ktick"></span>${t}</div>`;
const footer = (i, dark) => `<div class="rule ${dark ? 'd' : ''}"></div>
  <div class="footer ${dark ? 'd' : ''}"><span class="wm">${esc(WORDMARK)}</span><span class="pgn">${pg(i)}</span></div>`;

// 10-конечная звезда для обложки
function star() {
  const cx = 250, cy = 250, R = 235, r = 96, n = 10;
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2;
    const rad = i % 2 ? r : R;
    pts.push(`${(cx + Math.cos(a) * rad).toFixed(1)},${(cy + Math.sin(a) * rad).toFixed(1)}`);
  }
  return `<svg class="star" viewBox="0 0 500 500"><polygon points="${pts.join(' ')}" fill="#4B3F20"/></svg>`;
}

// чёрный блок «TAYYOR PROMPT»
const promptBox = (bodyHTML, label = 'TAYYOR PROMPT', copy = 'NUSXALASH') => `
  <div class="pbox">
    <div class="pbox-h"><span class="ph-l"><span class="ktick g"></span>${label}</span><span class="ph-c">${copy} <span class="copyic">⧉</span></span></div>
    <div class="pbox-t">${bodyHTML}</div>
  </div>`;

const stepHead = (num, title) => `<div class="stephead"><span class="stepnum">${num}</span><h2 class="h step">${title}</h2></div>`;

// ── СЛАЙДЫ ────────────────────────────────────────────────
function s1() {
  return `<section class="slide dark cover">
    <div class="starwrap">${star()}</div>
    ${kicker(`TO&#8217;LIQ QO&#8217;LLANMA &middot; ${HANDLE}`)}
    <div class="cover-body">
      <h1 class="cover-title"><span class="w">KOD YOZMANG —</span><br><span class="g">CLAUDE YOZADI.</span></h1>
      <p class="cover-sub">Studiya darajasidagi saytni<br>atigi <span class="g">6 qadamda</span></p>
      <div class="badge"><span class="bdot"></span>Tayyor promptlar bilan</div>
    </div>
    <div class="swipe">SURIB KO&#8217;RING &nbsp;&rarr;</div>
    ${footer(0, true)}
  </section>`;
}

function s2() {
  return `<section class="slide light">
    ${kicker('ASOSIY G&#8217;OYA')}
    <h2 class="h">Siz aytasiz — Claude yozadi</h2>
    <p class="body">Ko&#8217;pchilik toza sayt uchun <span class="chip">React o&#8217;rganish</span> kerak deb o&#8217;ylaydi. Aslida siz faqat ko&#8217;rsatma berasiz — har bir qatorni Claude o&#8217;zi yozadi.</p>
    <div class="cmp">
      <div class="cmp-card light">
        <div class="cmp-lab">CLAUDE — STANDART</div>
        <div class="sk"><span style="width:100%"></span><span style="width:100%"></span><span style="width:100%"></span><span style="width:62%"></span></div>
        <div class="cmp-cap">bir xil shrift &middot; kulrang qutilar</div>
      </div>
      <div class="cmp-card black">
        <div class="cmp-lab g">2 SKILL BILAN</div>
        <div class="cmp-title">Frontend<br><span class="g">Studio</span></div>
        <div class="cmp-sub">premium &middot; kinematografik</div>
        <div class="gbtn">Ko&#8217;rish &rarr;</div>
        <div class="cmp-cap dk">o&#8217;ziga xos uslub &middot; sayqallangan</div>
      </div>
    </div>
    <div class="note">
      <div class="note-h"><span class="ktick g"></span>ESLAB QOLING</div>
      <p>Claude&#8217;ning odatiy dizayni o&#8217;rtacha. Ikkita ko&#8217;nikma (skill) buni tuzatadi va natija studiya yasagandek chiqadi.</p>
    </div>
    ${footer(1)}
  </section>`;
}

function macbar(title) {
  return `<div class="macbar"><span class="md r"></span><span class="md y"></span><span class="md g"></span><span class="mtitle">${title}</span></div>`;
}

function s3() {
  const term = `<div class="mock term">
    ${macbar('Claude Code — terminal')}
    <div class="term-body">
      <div class="tl"><span class="tg">$</span> claude skill install</div>
      <div class="tl"><span class="tb">frontend-design</span>  <span class="tb">--global</span></div>
      <div class="tl"><span class="tok">✅</span> <span class="tg2">standart shriftlar bloklandi</span></div>
      <div class="tl">&nbsp;</div>
      <div class="tl"><span class="tg">$</span> npm i ui-ux-pro-max</div>
      <div class="tl"><span class="tok">✅</span> <span class="tg2">57 uslub · 95 palitra · 56 shrift</span></div>
      <div class="tl"><span class="tgold">→ mode: Auto</span></div>
      <div class="term-cards">
        <div class="tc"><span class="tcdot"></span><div><b>Frontend Design</b><span>yomon standartni bloklaydi</span></div></div>
        <div class="tc"><span class="tcdot"></span><div><b>UI/UX Pro Max</b><span>57 premium uslub beradi</span></div></div>
      </div>
    </div>
  </div>`;
  return `<section class="slide light">
    ${kicker('QADAM 01 / 06')}
    ${stepHead('01', 'Ikki ko&#8217;nikmani o&#8217;rnating')}
    <p class="body">Biri <b>yomon standart sozlamalarni</b> bloklaydi. Ikkinchisi Claude&#8217;ga tanlash uchun <b>57 xil interfeys uslubini</b> beradi.</p>
    ${term}
    ${promptBox(`Install this skill: github.com/anthropics/skills/.../frontend-design — install it globally. Keyin: npm i ui-ux-pro-max. Mode&#8217;ni «Auto» ga o&#8217;tkaz.`)}
    ${footer(2)}
  </section>`;
}

function s4() {
  const files = [
    ['1.png', 'hero bo&#8217;lim'], ['2.png', 'ishlar'], ['6.png', 'futer'],
    ['7.png', 'portfolio'], ['11.png', 'loyiha'], ['12.png', 'yuklanish'],
  ].map(([n, s]) => `<div class="thumb"><div class="thbox"><span></span><span></span><span></span></div><b>${n}</b><span class="thsub">${s}</span></div>`).join('');
  const browser = `<div class="mock brw">
    ${macbar('/reference')}
    <div class="brw-body">
      <div class="brw-side">
        <div>Loyiha</div><div class="on">reference</div><div>src</div><div>public</div>
      </div>
      <div class="brw-main">${files}</div>
    </div>
  </div>`;
  return `<section class="slide light">
    ${kicker('QADAM 02 / 06')}
    ${stepHead('02', 'Namunalarni bo&#8217;lim-bo&#8217;lim &ldquo;o&#8217;g&#8217;irlang&rdquo;')}
    <p class="body">Saytni so&#8217;z bilan tasvirlab berish ish bermaydi. Buning o&#8217;rniga <span class="chip">Claude&#8217;ga ko&#8217;rsating</span> — yoqqan bo&#8217;limlarni skrinshot qilib oling.</p>
    ${browser}
    ${promptBox(`Yoqqan saytlardan faqat kerakli bo&#8217;limlarni ol: hero, ishlar, futer, loyiha sahifasi, yuklanish ekrani. Hammasini loyiha ichidagi /reference papkasiga joyla.`)}
    ${footer(3)}
  </section>`;
}

function s5() {
  const qs = [
    'Qanday shrift ohangi — klassik yoki zamonaviy?',
    'Nechta bo&#8217;lim bo&#8217;lsin?',
    'Animatsiya darajasi — vazmin yoki dadil?',
    'Rang palitrasi qanday?',
    'Matn ohangi — rasmiy yoki erkin?',
  ].map((q, i) => `<div class="qrow"><span class="qn">${i + 1}.</span>${q}</div>`).join('');
  const chat = `<div class="mock chat">
    ${macbar('Claude Code')}
    <div class="chat-body">
      <div class="ubub">/ui-ux-pro-max — premium portfolio sayt yasa. Namunalar /reference&#8217;da. Yasashdan oldin savol ber.</div>
      <div class="clab">Claude</div>
      <div class="cans">Yasashdan oldin 5 ta savol:</div>
      <div class="qs">${qs}</div>
    </div>
  </div>`;
  return `<section class="slide light">
    ${kicker('QADAM 03 / 06')}
    ${stepHead('03', 'Yasash promptini yozing')}
    <p class="body">Promptni <span class="chip">/ui-ux-pro-max</span> bilan boshlang va oxirida bitta sehrli qator qo&#8217;shing: <span class="chip">&ldquo;avval savol ber&rdquo;</span>.</p>
    ${chat}
    ${promptBox(`/ui-ux-pro-max — Build a premium portfolio website. Use references from /reference folder. Ask me any clarifying questions before building.`)}
    ${footer(4)}
  </section>`;
}

const slides = [s1(), s2(), s3(), s4(), s5()];

function html() {
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700;1,800;1,900&family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  :root{--gold:#C6A24C; --goldB:#D8B662;}
  .slide{--bg:#ECE9E2; --ink:#171512; --muted:#7F7A70; --line:#D5D0C6; --card:#F4F1EA; --black:#0E0C0A;
    width:${W}px;height:${H}px;position:relative;overflow:hidden;background:var(--bg);color:var(--ink);
    font-family:${SANS};padding:70px 66px 84px;display:flex;flex-direction:column;}
  .slide.dark{--bg:#0C0B08; --ink:#F5F2EB; --muted:#8C8578; --line:#2A2620;}
  .slide.dark{background:radial-gradient(1200px 600px at 88% 2%, #17130B, #0C0B08 60%);}
  .slide>*{position:relative;z-index:1;}

  .kicker{display:flex;align-items:center;gap:16px;font-weight:800;font-size:24px;letter-spacing:.22em;
    text-transform:uppercase;color:var(--gold);margin-bottom:30px;}
  .ktick{width:30px;height:3px;background:var(--gold);border-radius:2px;flex:0 0 auto;}
  .ktick.g{width:26px;}

  /* footer */
  .rule{margin-top:auto;height:1px;background:var(--line);}
  .footer{margin-top:26px;display:flex;align-items:center;justify-content:space-between;}
  .wm{font-family:${SERIF};font-weight:800;font-size:34px;color:var(--ink);}
  .pgn{font-weight:500;font-size:30px;color:var(--muted);}

  /* ── cover ── */
  .cover{padding-top:96px;}
  .starwrap{position:absolute;right:-90px;top:-120px;width:430px;height:430px;z-index:0;}
  .star{width:100%;height:100%;}
  .cover .kicker{color:var(--gold);}
  .cover-body{margin-top:150px;}
  .cover-title{font-weight:900;font-size:88px;line-height:1.0;letter-spacing:-.01em;text-transform:uppercase;}
  .cover-title .w{color:#F7F4ED;}
  .cover-title .g{color:var(--gold);}
  .cover-sub{margin-top:36px;font-family:${SERIF};font-style:italic;font-weight:700;font-size:52px;
    line-height:1.16;color:#EDE8DE;}
  .cover-sub .g{color:var(--gold);}
  .badge{margin-top:34px;display:inline-flex;align-items:center;gap:16px;background:var(--gold);color:#141109;
    font-weight:800;font-size:32px;padding:20px 42px;border-radius:44px;}
  .badge .bdot{width:16px;height:16px;border-radius:50%;background:#141109;}
  .swipe{position:absolute;left:0;right:0;bottom:210px;text-align:center;
    font-weight:600;font-size:30px;letter-spacing:.14em;color:#8E887C;}
  .footer.d .wm{color:#F5F2EB;} .footer.d .pgn{color:#8E887C;} .rule.d{background:#2A2620;}

  /* ── headings ── */
  .h{font-family:${SERIF};font-weight:800;font-size:62px;line-height:1.06;color:var(--ink);}
  .stephead{display:flex;align-items:flex-start;gap:34px;margin-bottom:8px;}
  .stepnum{font-family:${SERIF};font-style:italic;font-weight:800;font-size:104px;line-height:.86;color:var(--gold);flex:0 0 auto;}
  .h.step{font-size:58px;padding-top:16px;}
  .body{font-size:34px;line-height:1.4;color:var(--muted);margin:16px 0 22px;}
  .body b{color:var(--ink);font-weight:800;}
  .chip{display:inline-block;background:var(--card);color:var(--ink);font-weight:700;
    padding:2px 16px;border-radius:12px;box-shadow:0 3px 12px -6px rgba(0,0,0,.3);}

  /* ── slide 2 compare ── */
  .cmp{display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:8px;}
  .cmp-card{border-radius:26px;padding:34px 32px;min-height:400px;display:flex;flex-direction:column;}
  .cmp-card.light{background:var(--card);box-shadow:0 24px 50px -34px rgba(0,0,0,.4);}
  .cmp-card.black{background:var(--black);}
  .cmp-lab{font-weight:800;font-size:22px;letter-spacing:.14em;color:#9A948A;}
  .cmp-lab.g{color:var(--gold);}
  .sk{margin-top:30px;display:flex;flex-direction:column;gap:20px;}
  .sk span{height:34px;border-radius:9px;background:#DCD8CE;}
  .cmp-cap{margin-top:auto;font-size:24px;color:#A19B90;}
  .cmp-cap.dk{color:#7A756B;}
  .cmp-title{margin-top:24px;font-family:${SERIF};font-weight:800;font-size:52px;line-height:1.02;color:#F5F2EB;}
  .cmp-title .g{color:var(--gold);}
  .cmp-sub{margin-top:14px;font-size:26px;color:#9A948A;}
  .gbtn{margin-top:26px;align-self:flex-start;background:var(--gold);color:#141109;font-weight:800;
    font-size:28px;padding:16px 34px;border-radius:34px;}
  .note{margin-top:26px;background:var(--black);border-radius:24px;padding:34px 40px;}
  .note-h{display:flex;align-items:center;gap:14px;font-weight:800;font-size:24px;letter-spacing:.16em;color:var(--gold);}
  .note p{margin-top:20px;font-size:32px;line-height:1.4;color:#EDE8DE;}

  /* ── mockups ── */
  .mock{border-radius:22px;overflow:hidden;}
  .macbar{display:flex;align-items:center;gap:12px;padding:16px 26px;position:relative;}
  .md{width:20px;height:20px;border-radius:50%;} .md.r{background:#ED6A5E;} .md.y{background:#F5BF4F;} .md.g{background:#61C554;}
  .mtitle{position:absolute;left:0;right:0;text-align:center;font-size:26px;color:#9A948A;}

  .term{background:#0E0C0A;}
  .term .macbar{background:#161310;} .term .mtitle{color:#8f887b;}
  .term-body{padding:26px 30px 28px;font-family:${MONO};font-size:26px;line-height:1.5;color:#E7E2D6;}
  .tl{white-space:pre-wrap;}
  .tg{color:#7CC26B;} .tb{color:#7FB2E6;} .tok{color:#5FBE7E;} .tg2{color:#8FD49E;} .tgold{color:var(--goldB);}
  .term-cards{margin-top:26px;display:grid;grid-template-columns:1fr 1fr;gap:18px;}
  .tc{display:flex;gap:16px;align-items:center;border:1px solid #2A2620;border-radius:14px;padding:18px 20px;font-family:${SANS};}
  .tcdot{width:16px;height:16px;border-radius:50%;background:var(--gold);flex:0 0 auto;}
  .tc b{display:block;color:#F1ECE0;font-size:24px;} .tc span{font-size:20px;color:#8f887b;}

  /* browser (slide 4) */
  .brw{background:#F4F1EA;box-shadow:0 26px 56px -34px rgba(0,0,0,.4);}
  .brw .macbar{background:#EAE6DD;border-bottom:1px solid #DCD7CD;} .brw .mtitle{color:#8A857B;}
  .brw-body{display:flex;}
  .brw-side{width:190px;padding:22px 22px;font-size:25px;color:#6F6A60;display:flex;flex-direction:column;gap:18px;border-right:1px solid #E4DFD5;}
  .brw-side .on{background:#EFE4C7;color:#8A6D2E;border-radius:10px;padding:6px 12px;margin:-6px -12px;font-weight:600;}
  .brw-main{flex:1;padding:22px 24px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px 18px;align-content:start;}
  .thumb{display:flex;flex-direction:column;}
  .thbox{background:#131109;border-radius:10px;height:88px;padding:14px;display:flex;flex-direction:column;gap:8px;justify-content:center;}
  .thbox span{height:10px;border-radius:4px;background:#2C2820;} .thbox span:nth-child(2){width:70%;} .thbox span:nth-child(3){width:85%;}
  .thumb b{margin-top:8px;font-size:23px;color:#201E18;} .thsub{font-size:19px;color:#948E83;}

  /* chat (slide 5) */
  .chat{background:#F4F1EA;box-shadow:0 26px 56px -34px rgba(0,0,0,.4);}
  .chat .macbar{background:#EAE6DD;border-bottom:1px solid #DCD7CD;} .chat .mtitle{color:#8A857B;}
  .chat-body{padding:18px 28px 22px;}
  .ubub{margin-left:auto;max-width:78%;background:#F3E7CC;border-radius:16px;padding:14px 22px;font-size:24px;line-height:1.36;color:#3A342A;}
  .clab{margin-top:14px;font-weight:800;font-size:23px;color:var(--gold);}
  .cans{margin-top:6px;font-weight:800;font-size:26px;color:#201E18;}
  .qs{margin-top:10px;display:flex;flex-direction:column;gap:8px;}
  .qrow{display:flex;gap:16px;background:#EFEBE1;border-radius:12px;padding:10px 20px;font-size:24px;color:#39352C;}
  .qn{color:var(--gold);font-weight:800;flex:0 0 auto;}

  /* prompt box */
  .pbox{margin-top:22px;background:var(--black);border-radius:22px;padding:30px 38px;}
  .pbox-h{display:flex;align-items:center;justify-content:space-between;}
  .ph-l{display:flex;align-items:center;gap:14px;font-weight:800;font-size:24px;letter-spacing:.16em;color:var(--gold);}
  .ph-c{font-size:22px;letter-spacing:.1em;color:#8f887b;display:flex;align-items:center;gap:8px;}
  .copyic{font-size:26px;}
  .pbox-t{margin-top:22px;font-size:30px;line-height:1.5;color:#ECE7DB;word-break:break-word;}
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
  render(process.argv[2] || path.join(__dirname, 'gold-out'))
    .then(f => console.log('Rendered:\n' + f.join('\n')))
    .catch(e => { console.error(e); process.exit(1); });
}
module.exports = { render, html };
