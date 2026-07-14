// engine/aistrateg/mijoz.cjs
// «vibe code» — AI bilan mijoz topish (lead-gen). Original kontent, o'zbekcha B1.
// Yorug' editorial dizayn: voronka grafik, terrakota + yashil o'sish rangi.
// Footer: vibe code / @vibecoder_qiz. CTA: izohga «+».

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const cfg = require('../../src/config');

const W = 1080, H = 1350;
const SANS = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace,'SF Mono',Menlo,Consolas,monospace";
const HANDLE = '@vibecoder_qiz';
const TOTAL = 9;

const pg = (i) => `${String(i + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`;
const spark = (c = 'var(--accent)') => `<svg class="spk" viewBox="0 0 24 24"><path d="M12 1l2.2 7.4L21.5 6l-5.1 5.6 6.6 3.4-7.6.5 2.3 7.4L12 17l-5.7 5.9 2.3-7.4L1 15l6.6-3.4L2.5 6l7.3 2.4z" fill="${c}"/></svg>`;
const deco = (cls = '') => `<div class="bg-grid"></div><div class="glow ${cls}"></div>`;
const topbar = (kick, i) => `<div class="top"><div class="kick">${spark()}${kick}</div><span class="page">${pg(i)}</span></div>`;
const dots = (i) => `<span class="fdots">${Array.from({length:TOTAL},(_,k)=>`<span class="fdot${k===i?' on':''}"></span>`).join('')}</span>`;
const footer = (i = 0) => `<div class="rule"></div><div class="footer"><span class="fbrand">${spark()}vibe code</span>${dots(i)}<span class="fhandle">${HANDLE}</span></div>`;

// ── slides ────────────────────────────────────────────────
function cover() {
  return `<section class="slide light cover">
    ${deco('tr')}
    <div class="top"><div class="kick">${spark()}vibe code</div><span class="page">${pg(0)}</span></div>
    <div class="cov-mid">
      <div class="badge">AI + MIJOZ TOPISH</div>
      <h1 class="cov-title">Mijozlarni <span class="acc">AI bilan</span> toping</h1>
      <p class="cov-sub">Har kuni 1 soat — barqaror mijozlar oqimi. Omadga kutmang, <b>tizim</b> tuzing.</p>
      <div class="cov-stats">
        <div class="cst"><b>1 soat</b><span>kuniga</span></div>
        <div class="cst"><b>20 xabar</b><span>10 daqiqada</span></div>
        <div class="cst grn"><b>+mijoz</b><span>har hafta</span></div>
      </div>
      <div class="gift">🎁 Oxirida — bepul bosqichma-bosqich qo'llanma</div>
      <div class="swipe">SURING <b>&rarr;</b></div>
    </div>
    ${footer(0)}
  </section>`;
}

function s2() {
  return `<section class="slide dark">
    ${deco('bl')}
    ${topbar('MUAMMO', 1)}
    <h2 class="h">Ko'pchilik mijozni <span class="acc">kutadi</span></h2>
    <div class="ba">
      <div class="ba-box old"><div class="ba-lab old">❌ ESKI YO'L</div><ul><li>Reklama beradi, kutadi</li><li>«O'zi topilar» deb o'ylaydi</li><li>Mijoz — tasodifan keladi</li><li>Bir oy bor, bir oy yo'q</li></ul></div>
      <div class="ba-box new"><div class="ba-lab new">✅ TIZIM</div><ul><li>Har kuni 10 odamga yozadi</li><li>AI xabarni tayyorlaydi</li><li>Mijoz — reja bo'yicha keladi</li><li>Barqaror oqim</li></ul></div>
    </div>
    <div class="stripe">Farqi — iste'dodda emas, <b>tizimda</b>.</div>
    ${footer(1)}
  </section>`;
}

function s3() {
  const steps = [
    ['100%', 'Toping', 'kim sizga mijoz'],
    ['70%', 'Yozing', 'shaxsiy xabar'],
    ['45%', 'Ishonch', 'foyda ko\'rsating'],
    ['25%', 'Bitim', 'kelishuv'],
  ];
  const bars = steps.map(([w, t, s], i) => `<div class="fn-row"><div class="fn-bar" style="width:${w}"><span class="fn-t">${t}</span></div><span class="fn-s">${s}</span></div>`).join('');
  return `<section class="slide light">
    ${deco('tr')}
    ${topbar('VORONKA', 2)}
    <h2 class="h">Mijoz <span class="acc">4 bosqichdan</span> o'tadi</h2>
    <p class="body">Har bir mijoz shu yo'ldan yuradi. Vazifangiz — har bosqichda yordam berish:</p>
    <div class="funnel">${bars}</div>
    ${footer(2)}
  </section>`;
}

function s4() {
  return `<section class="slide dark">
    ${deco('tr')}
    ${topbar('QADAM 1-2', 3)}
    <h2 class="h">Kimni va <span class="acc">qayerda</span> topasiz</h2>
    <div class="steps">
      <div class="st"><span class="st-n">1</span><div><b>Ideal mijozni aniqlang</b><span>Kim? Qanday muammosi bor? Siz uni qanday hal qilasiz — bir jumlada yozing.</span></div></div>
      <div class="st"><span class="st-n">2</span><div><b>Qayerda topasiz</b><span>Instagram, Telegram guruhlar, LinkedIn, tanish-bilish. Mijozingiz vaqt o'tkazadigan joy.</span></div></div>
    </div>
    <div class="chips"><span class="chip">📸 Instagram</span><span class="chip">💬 Telegram</span><span class="chip">💼 LinkedIn</span><span class="chip">🤝 Tavsiya</span></div>
    ${footer(3)}
  </section>`;
}

function s5() {
  return `<section class="slide light">
    ${deco('bl')}
    ${topbar('QADAM 3-4', 4)}
    <h2 class="h">Yozing va <span class="acc">kuzatib boring</span></h2>
    <div class="steps lt">
      <div class="st"><span class="st-n">3</span><div><b>AI bilan shaxsiy xabar</b><span>Bir xil spam emas. AI 10 daqiqada 20 ta shaxsiy xabar tayyorlaydi — har biri odamga moslangan.</span></div></div>
      <div class="st"><span class="st-n">4</span><div><b>Kunlik ro'yxat</b><span>Har kuni: 10 yangi odam + 5 eski bilan aloqa. Kichik, lekin doimiy.</span></div></div>
    </div>
    <div class="stripe">Sir — bir kunlik zarba emas, <b>har kungi kichik qadam</b>.</div>
    ${footer(4)}
  </section>`;
}

function s6() {
  const items = [
    ['🔎', 'Qidiradi', 'Mos odamlarni topib, ro\'yxat qiladi'],
    ['✍️', 'Yozadi', 'Har biriga shaxsiy xabar tayyorlaydi'],
    ['🔔', 'Kuzatadi', 'Kim javob berdi, kimga qayta yozish kerak'],
  ].map(([e, t, d]) => `<div class="ai3"><span class="ai3-e">${e}</span><div class="ai3-tx"><b>${t}</b><span>${d}</span></div></div>`).join('');
  return `<section class="slide dark">
    ${deco('tr')}
    ${topbar('AI YORDAMCHI', 5)}
    <h2 class="h">AI uchta <span class="acc">og'ir ishni</span> oladi</h2>
    <p class="body">Siz faqat suhbatlashasiz — qolganini AI qiladi:</p>
    <div class="ai3s">${items}</div>
    ${footer(5)}
  </section>`;
}

function s7() {
  return `<section class="slide light">
    ${deco('bl')}
    ${topbar('TAYYOR SHABLON', 6)}
    <h2 class="h">AI ga shunday <span class="acc">buyruq bering</span></h2>
    <p class="body">Nusxa oling, qavslarni to'ldiring — AI shaxsiy xabarlarni yozib beradi:</p>
    <div class="promptbox">
      <div class="pb-h">${spark('#C4623B')} SOTUV YORDAMCHISI</div>
      <div class="pb-b">Sen mening sotuv yordamchimsan. Men [xizmat] taklif qilaman. Mana mijoz haqida ma'lumot: [ma'lumot]. Unga qisqa, samimiy va shaxsiy xabar yoz. Reklama emas — foydasini ayt va bitta savol ber.</div>
    </div>
    ${footer(6)}
  </section>`;
}

function s8() {
  return `<section class="slide dark">
    ${deco('tr')}
    ${topbar('XATO / TO\'G\'RI', 7)}
    <h2 class="h">Xabarni <span class="acc">to'g'ri</span> yozing</h2>
    <div class="twocol">
      <div class="col yes"><div class="col-h">✓ TO'G'RI</div><ul><li>Shaxsiy, ismini yozing</li><li>Uning foydasi haqida</li><li>Bitta oddiy savol</li><li>Javob bermasa — eslating</li></ul></div>
      <div class="col no"><div class="col-h">✗ XATO</div><ul><li>Bir xil spam hammaga</li><li>Faqat o'zingiz haqida</li><li>Darhol narx yuborish</li><li>Bir marta yozib, tashlab ketish</li></ul></div>
    </div>
    ${footer(7)}
  </section>`;
}

function s9() {
  return `<section class="slide dark cta">
    ${deco('c')}
    ${topbar('OXIRIGACHA YETDINGIZ', 8)}
    <div class="grow center">
      <div class="fire">🔥</div>
      <h2 class="h big">To'liq qo'llanmani<br><span class="acc">bepul oling</span></h2>
      <p class="body">Ideal mijoz, qayerdan topish, AI xabar shablonlari, kunlik ro'yxat va kuzatuv — hammasi bosqichma-bosqich, bitta hujjatda.</p>
      <div class="plusbox"><div class="pb-l">Izohga shunchaki yozing:</div><div class="pb-k">«+»</div><div class="pb-u">&rarr; to'liq qo'llanmani <strong>shaxsiyga</strong> yuboraman</div></div>
      <div class="follow">Obuna bo'ling — AI, biznes va real ishlaydigan tizimlar haqida</div>
    </div>
    ${footer(8)}
  </section>`;
}

const slides = [cover(), s2(), s3(), s4(), s5(), s6(), s7(), s8(), s9()];

function html() {
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{--bg:#F1ECE1; --ink:#221E17; --muted:#6E695C; --accent:#C4623B; --grn:#3E8E5C; --line:#DAD3C4; --card:#FBF8F0; --cardln:#E7DFCE;
    width:${W}px;height:${H}px;position:relative;overflow:hidden;background:var(--bg);color:var(--ink);
    font-family:${SANS};padding:64px 66px 76px;display:flex;flex-direction:column;}
  .slide.dark{--bg:#15130E; --ink:#F3EFE6; --muted:#8F887B; --accent:#DA7A45; --grn:#5FA878; --line:#2C271F; --card:#201B14; --cardln:#332C22; background:#15130E;}
  .bg-grid,.glow{position:absolute;z-index:0;}
  .bg-grid{inset:0;background-image:radial-gradient(circle, rgba(0,0,0,.05) 1.6px, transparent 1.6px);background-size:36px 36px;opacity:.45;}
  .slide.dark .bg-grid{background-image:radial-gradient(circle, rgba(255,255,255,.05) 1.6px, transparent 1.6px);}
  .glow{width:740px;height:520px;border-radius:50%;filter:blur(10px);background:radial-gradient(closest-side, color-mix(in srgb,var(--accent) 24%, transparent), transparent 70%);opacity:.5;}
  .glow.tr{right:-160px;top:-160px;} .glow.bl{left:-200px;bottom:-160px;} .glow.c{left:50%;top:32%;transform:translateX(-50%);opacity:.42;}
  .slide>*{position:relative;z-index:1;}
  .acc{color:var(--accent);} b,strong{font-weight:800;color:var(--ink);}
  .grow{flex:1;display:flex;flex-direction:column;} .grow.center{justify-content:center;align-items:flex-start;gap:2px;}

  .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px;}
  .kick{display:flex;align-items:center;gap:12px;font-weight:800;font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);}
  .kick .spk,.fbrand .spk{width:26px;height:26px;}
  .page{font-weight:700;font-size:25px;letter-spacing:.1em;color:var(--muted);}

  .h{font-weight:900;font-size:74px;line-height:1.05;margin:0;letter-spacing:-.015em;}
  .h.big{font-size:76px;} .h .acc{color:var(--accent);}
  .body{font-size:33px;line-height:1.4;color:var(--muted);margin:16px 0 22px;max-width:900px;}
  .body b{color:var(--ink);font-weight:800;}

  /* cover */
  .cover{padding-top:56px;}
  .cov-mid{margin-top:auto;}
  .badge{display:inline-block;background:color-mix(in srgb,var(--accent) 14%, transparent);border:1px solid color-mix(in srgb,var(--accent) 45%, transparent);color:var(--accent);font-weight:800;font-size:22px;letter-spacing:.08em;padding:10px 22px;border-radius:30px;margin-bottom:20px;}
  .cov-title{font-weight:900;font-size:104px;line-height:.98;letter-spacing:-.02em;color:var(--ink);}
  .cov-title .acc{color:var(--accent);}
  .cov-sub{margin-top:22px;font-size:35px;line-height:1.3;color:var(--muted);max-width:820px;} .cov-sub b{color:var(--ink);}
  .cov-stats{display:flex;gap:16px;margin-top:26px;}
  .cst{flex:1;background:var(--card);border:1px solid var(--cardln);border-radius:18px;padding:22px 20px;text-align:center;}
  .cst b{display:block;font-size:40px;font-weight:900;color:var(--ink);} .cst span{font-size:23px;color:var(--muted);} .cst.grn b{color:var(--grn);}
  .gift{margin-top:24px;display:inline-block;background:color-mix(in srgb,var(--accent) 14%, transparent);border:1px solid color-mix(in srgb,var(--accent) 45%, transparent);color:var(--accent);font-weight:700;font-size:27px;padding:13px 24px;border-radius:40px;}
  .swipe{margin-top:22px;font-weight:800;font-size:30px;letter-spacing:.12em;color:var(--accent);}

  /* before/after */
  .ba{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:6px;}
  .ba-box{background:var(--card);border:1px solid var(--cardln);border-radius:22px;padding:28px 30px;}
  .ba-box.new{border-color:color-mix(in srgb,var(--grn) 50%,transparent);}
  .ba-lab{font-weight:800;font-size:25px;letter-spacing:.04em;margin-bottom:14px;} .ba-lab.old{color:#c9503f;} .ba-lab.new{color:var(--grn);}
  .ba-box ul{list-style:none;display:flex;flex-direction:column;gap:12px;}
  .ba-box li{font-size:27px;color:var(--ink);line-height:1.26;padding-left:22px;position:relative;}
  .ba-box li:before{content:'';position:absolute;left:0;top:13px;width:9px;height:9px;border-radius:50%;background:var(--accent);}
  .ba-box.new li:before{background:var(--grn);}
  .stripe{margin-top:auto;background:var(--card);border:1px solid var(--cardln);border-radius:18px;padding:24px 30px;font-size:30px;color:var(--muted);text-align:center;} .stripe b{color:var(--accent);}

  /* s3 funnel */
  .funnel{margin-top:8px;display:flex;flex-direction:column;gap:18px;align-items:center;}
  .fn-row{display:flex;align-items:center;gap:22px;width:100%;justify-content:center;}
  .fn-bar{height:96px;background:linear-gradient(90deg,var(--accent),#a94f2c);border-radius:16px;display:flex;align-items:center;justify-content:center;min-width:200px;box-shadow:0 14px 30px -18px rgba(0,0,0,.5);}
  .fn-row:nth-child(1) .fn-bar{background:linear-gradient(90deg,#D98A5F,#C4623B);}
  .fn-row:nth-child(4) .fn-bar{background:linear-gradient(90deg,var(--grn),#2f6f47);}
  .fn-t{font-weight:900;font-size:40px;color:#fff;}
  .fn-s{font-size:26px;color:var(--muted);white-space:nowrap;width:280px;}

  /* steps */
  .steps{display:flex;flex-direction:column;gap:16px;margin-top:4px;}
  .st{display:flex;align-items:flex-start;gap:24px;background:var(--card);border:1px solid var(--cardln);border-radius:20px;padding:26px 30px;}
  .st-n{flex:0 0 auto;width:58px;height:58px;border-radius:16px;background:var(--accent);color:#fff;font-weight:900;font-size:32px;display:flex;align-items:center;justify-content:center;}
  .st div b{font-size:34px;color:var(--ink);} .st div span{display:block;font-size:27px;color:var(--muted);margin-top:6px;line-height:1.32;}
  .chips{margin-top:auto;display:flex;gap:14px;flex-wrap:wrap;justify-content:center;}
  .chip{background:var(--card);border:1px solid var(--cardln);border-radius:30px;padding:16px 26px;font-size:27px;font-weight:600;color:var(--ink);}

  /* s6 ai3 */
  .ai3s{display:flex;flex-direction:column;gap:16px;margin-top:4px;}
  .ai3{display:flex;align-items:center;gap:24px;background:var(--card);border:1px solid var(--cardln);border-radius:20px;padding:26px 30px;}
  .ai3-e{font-size:48px;flex:0 0 auto;} .ai3-tx b{font-size:34px;} .ai3-tx span{display:block;font-size:27px;color:var(--muted);margin-top:2px;}

  /* prompt */
  .promptbox{margin-top:6px;background:var(--card);border:1px solid var(--cardln);border-radius:22px;overflow:hidden;}
  .slide.dark .promptbox{background:#0f0d0a;border-color:#2a251d;}
  .pb-h{display:flex;align-items:center;gap:12px;font-weight:800;font-size:23px;letter-spacing:.1em;color:var(--accent);padding:26px 32px 0;} .pb-h .spk{width:22px;height:22px;}
  .pb-b{padding:18px 32px 30px;font-family:${MONO};font-size:29px;line-height:1.5;color:var(--ink);}

  /* twocol */
  .twocol{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:6px;}
  .col{background:var(--card);border:1px solid var(--cardln);border-radius:22px;padding:28px 30px;}
  .col-h{font-weight:800;font-size:28px;letter-spacing:.06em;margin-bottom:14px;}
  .col.yes .col-h{color:var(--grn);} .col.no .col-h{color:#c9503f;}
  .col ul{list-style:none;display:flex;flex-direction:column;gap:13px;}
  .col li{font-size:28px;color:var(--ink);padding-left:24px;position:relative;line-height:1.24;}
  .col li:before{content:'';position:absolute;left:0;top:12px;width:9px;height:9px;border-radius:50%;background:var(--accent);}

  /* cta */
  .cta .fire{font-size:70px;} .cta .h{margin-top:8px;}
  .plusbox{margin-top:28px;background:var(--card);border:1px solid var(--cardln);border-radius:26px;padding:34px 40px;width:100%;}
  .pb-l{font-size:30px;color:var(--muted);} .pb-k{font-weight:900;font-size:100px;color:var(--accent);line-height:1;margin:2px 0 6px;}
  .pb-u{font-weight:700;font-size:31px;color:var(--ink);} .pb-u strong{color:var(--accent);}
  .follow{margin-top:22px;font-size:27px;color:var(--muted);}

  .rule{margin-top:auto;height:1px;background:var(--line);}
  .footer{margin-top:22px;display:flex;align-items:center;justify-content:space-between;}
  .fbrand{display:flex;align-items:center;gap:10px;font-weight:900;font-size:28px;letter-spacing:.1em;color:var(--accent);}
  .fhandle{font-weight:600;font-size:28px;color:var(--muted);}
  
  .fdots{display:flex;align-items:center;gap:10px;}
  .fdot{width:11px;height:11px;border-radius:50%;background:var(--muted);opacity:.30;}
  .fdot.on{background:var(--accent);opacity:1;width:28px;border-radius:6px;}
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
  render(process.argv[2] || path.join(__dirname, 'mijoz-out'))
    .then(f => console.log('Rendered:\n' + f.join('\n')))
    .catch(e => { console.error(e); process.exit(1); });
}
module.exports = { render, html };
