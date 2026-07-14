// engine/aistrateg/aiteam.cjs
// «VIBE CODING» — Birinchi AI jamoangizni quring. Original kontent, o'zbekcha B1.
// Sketch/qog'oz uslubi (banner kabi), doodle robotlar, pastel yorliqlar.
// Footer: VIBE CODING / @vibecoder_qiz. CTA: izohga «+».

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const cfg = require('../../src/config');

const W = 1080, H = 1350;
const HAND = "'Kalam', 'Comic Sans MS', cursive";
const SANS = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace,'SF Mono',Menlo,Consolas,monospace";
const HANDLE = '@vibecoder_qiz';
const TOTAL = 10;

const pg = (i) => `${String(i + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`;
const spark = (c = 'var(--accent)') => `<svg class="spk" viewBox="0 0 24 24"><path d="M12 1l2.2 7.4L21.5 6l-5.1 5.6 6.6 3.4-7.6.5 2.3 7.4L12 17l-5.7 5.9 2.3-7.4L1 15l6.6-3.4L2.5 6l7.3 2.4z" fill="${c}"/></svg>`;
const deco = () => `<div class="paper"></div>`;
const topbar = (kick, i) => `<div class="top"><div class="kick">${spark()}${kick}</div><span class="page">${pg(i)}</span></div>`;
const footer = () => `<div class="rule"></div><div class="footer"><span class="fbrand">${spark()}VIBE CODING</span><span class="fhandle">${HANDLE}</span></div>`;
const bot = (label, cls) => `<div class="bot ${cls}"><div class="bot-face"><span class="eye"></span><span class="eye"></span><span class="mouth"></span></div><span class="bot-lab">${label}</span></div>`;

// ── slides ────────────────────────────────────────────────
function cover() {
  return `<section class="slide cover">
    ${deco()}
    <div class="top"><div class="kick">${spark()}VIBE CODING</div><span class="page">${pg(0)}</span></div>
    <div class="cov-mid">
      <div class="cov-bots">
        ${bot('tadqiqotchi', 'g')}${bot('yozuvchi', 'p')}${bot('tanqidchi', 'o')}${bot('sayqal', 'b')}
      </div>
      <div class="badge">AI JAMOA · YANGI DARAJA</div>
      <h1 class="cov-title">Birinchi <span class="u">AI jamoangizni</span> quring</h1>
      <p class="cov-sub">Bitta AI emas — bir nechta agent birga ishlaydi va bir-birini tekshiradi. Siz uxlab yotganda ham ishlaydi.</p>
      <div class="sticker">Men<br>uxlaganda…</div>
      <div class="swipe">SURING <b>&rarr;</b></div>
    </div>
    ${footer()}
  </section>`;
}

function s2() {
  return `<section class="slide">
    ${deco()}
    ${topbar('ASOSIY FIKR', 1)}
    <div class="mid">
    <h2 class="h">1 agent — javob.<br><span class="u">Ko'p agent</span> — tekshirilgan javob</h2>
    <p class="body">Ko'pchilik AI'ni kalkulyator kabi ishlatadi: bitta savol, bitta javob, tamom. Jamoa boshqacha — agentlar birga ishlaydi va bir-birini nazorat qiladi.</p>
    <div class="mathbox">
      <div class="mconc">Biri yozadi, ikkinchisi <b>tanqid qiladi</b> — omon qolgani ikkalasidan ham <b>kuchliroq</b>. ✅</div>
    </div>
    </div>
    ${footer()}
  </section>`;
}

function s3() {
  const rows = [
    ['g', '🔎', 'Tadqiqotchi', 'Faqat faktlarni topadi, manba bilan'],
    ['p', '✍️', 'Yozuvchi', 'Tadqiqotdan birinchi qoralamani yozadi'],
    ['o', '🔥', 'Tanqidchi', 'Kamchilik va zaif joyni topadi'],
    ['b', '✨', 'Sayqallovchi', 'Xatolarni tuzatib, yakuniy versiya'],
  ].map(([c, e, t, d]) => `<div class="mrole ${c}"><span class="mrole-e">${e}</span><div class="mrole-tx"><b>${t}</b><span class="mrole-d">${d}</span></div></div>`).join('');
  return `<section class="slide">
    ${deco()}
    ${topbar('4 ROL', 2)}
    <div class="mid">
    <h2 class="h">Har jamoaga <span class="u">4 rol</span> kerak</h2>
    <div class="mroles">${rows}</div>
    </div>
    ${footer()}
  </section>`;
}

function s4() {
  return `<section class="slide">
    ${deco()}
    ${topbar('ENG MUHIM ROL', 3)}
    <div class="mid">
    <h2 class="h">Ko'pchilik <span class="u">tanqidchini</span> tashlab ketadi</h2>
    <p class="body">Odamlar o'zi yozadi, o'zi tekshiradi, o'zi joylaydi. Lekin miyangiz o'zi yaratgan narsadagi xatoni ko'rmaydi.</p>
    <div class="quotebox">
      <div class="qmark">"</div>
      <div class="qtx">Faqat kamchilik qidiradigan alohida agent — jamoaning eng kuchli qismi. Iloji bo'lsa, <b>boshqa model</b> tanqid qilsin.</div>
    </div>
    </div>
    ${footer()}
  </section>`;
}

function s5() {
  return `<section class="slide">
    ${deco()}
    ${topbar('ISH TARTIBI', 4)}
    <div class="mid">
    <h2 class="h">Bitta topshiriq — <span class="u">to'liq zanjir</span></h2>
    <div class="chainflow">
      <div class="cf g"><b>Tadqiqot</b><span>faktlar</span></div><span class="cfa">→</span>
      <div class="cf p"><b>Qoralama</b><span>1-versiya</span></div><span class="cfa">→</span>
      <div class="cf o"><b>Tanqid</b><span>xatolar</span></div><span class="cfa">→</span>
      <div class="cf b"><b>Sayqal</b><span>yakuniy</span></div>
    </div>
    <p class="body sm">Har agent oldingisining ishini ko'radi. Oxirida <b>siz bir marta</b> tasdiqlaysiz — tayyor natija.</p>
    </div>
    ${footer()}
  </section>`;
}

function s6() {
  const rows = [
    ['Faktlar, tadqiqot', 'Claude', 'g'],
    ['Ijodiy matn', 'Boshqa model', 'p'],
    ['Kod yozish', 'Claude Code', 'b'],
    ['Tanqid qilish', 'Qarama-qarshi model', 'o'],
  ].map(([t, m, c]) => `<div class="cheat ${c}"><span class="cheat-t">${t}</span><span class="cheat-a">→</span><span class="cheat-m">${m}</span></div>`).join('');
  return `<section class="slide">
    ${deco()}
    ${topbar('QAYSI ISHGA KIM', 5)}
    <div class="mid">
    <h2 class="h">Har ishga <span class="u">mos model</span></h2>
    <div class="cheats">${rows}</div>
    <div class="note">Bitta modelni hamma ishga ishlatish — bitta odamni hamma vazifaga qo'yishdek. Har kim o'z kuchli tomonida.</div>
    </div>
    ${footer()}
  </section>`;
}

function s7() {
  return `<section class="slide">
    ${deco()}
    ${topbar('TAYYOR BUYRUQLAR', 6)}
    <div class="mid">
    <h2 class="h">Nusxa oling, <span class="u">bugun boshlang</span></h2>
    <div class="pcards">
      <div class="pcard"><span class="ptag g">TADQIQOTCHI</span><span class="ptx">«Faqat tekshirilgan faktlarni ber, har biriga manba yoz. O'z fikringni qo'shma.»</span></div>
      <div class="pcard"><span class="ptag o">TANQIDCHI</span><span class="ptx">«Faqat kamchilik va zaif joyni top. Yechim taklif qilma. Har biriga daraja ber. Qattiq bo'l.»</span></div>
      <div class="pcard"><span class="ptag b">SAYQALLOVCHI</span><span class="ptx">«Qoralama va tanqidni ol. Har xatoni tuzat, ishlagan joyni saqla. Yakuniy versiya ber.»</span></div>
    </div>
    </div>
    ${footer()}
  </section>`;
}

function s8() {
  return `<section class="slide">
    ${deco()}
    ${topbar('ENG KO\'P XATO', 7)}
    <div class="mid">
    <h2 class="h">Yangi boshlovchi <span class="u">xatolari</span></h2>
    <div class="xlist">
      <div class="xrow"><span class="xn">1</span><div><b>Hammaga bitta model</b><span>Har model o'z ishida kuchli — birini hammaga ishlatmang.</span></div></div>
      <div class="xrow"><span class="xn">2</span><div><b>Tanqidchi yo'q</b><span>O'zingiz yozib, o'zingiz tekshirsangiz — xatoni ko'rmaysiz.</span></div></div>
      <div class="xrow"><span class="xn">3</span><div><b>Umumiy kontekst yo'q</b><span>Agentlar bir-birini ko'rmasa, har biri noldan boshlaydi.</span></div></div>
      <div class="xrow"><span class="xn">4</span><div><b>Qidiruv kabi ishlatish</b><span>«Bu nima?» emas — rol, kontekst va aniq maqsad bering.</span></div></div>
    </div>
    </div>
    ${footer()}
  </section>`;
}

function s9() {
  return `<section class="slide">
    ${deco()}
    ${topbar('BIR HAFTA', 8)}
    <div class="mid">
    <h2 class="h">AI jamoa bilan <span class="u">haftangiz</span></h2>
    <div class="week">
      <div class="wd"><span class="wday">DUSH</span><span class="wtx">Tadqiqotchi ma'lumot yig'adi</span></div>
      <div class="wd"><span class="wday">SESH</span><span class="wtx">Yozuvchi 5 ta matn tayyorlaydi</span></div>
      <div class="wd"><span class="wday">CHOR</span><span class="wtx">Tanqidchi tekshiradi, siz ko'rasiz</span></div>
      <div class="wd"><span class="wday">PAY</span><span class="wtx">Sayqallovchi yakunlaydi</span></div>
      <div class="wd"><span class="wday">JUM</span><span class="wtx">Siz joylaysiz 🚀</span></div>
    </div>
    <div class="note">Sizning vaqtingiz: <b>2-3 soat</b> ko'rish va qaror. Jamoa: <b>24/7</b> ishlaydi.</div>
    </div>
    ${footer()}
  </section>`;
}

function s10() {
  return `<section class="slide cta">
    ${deco()}
    ${topbar('OXIRIGACHA YETDINGIZ', 9)}
    <div class="grow center">
      <div class="fire">🔥</div>
      <h2 class="h big">To'liq qo'llanmani<br><span class="u">bepul oling</span></h2>
      <p class="body">4 rol, ish tartibi, model tanlash, tayyor buyruqlar va yangi boshlovchi xatolari — hammasi bitta hujjatda.</p>
      <div class="plusbox"><div class="pb-l">Izohga shunchaki yozing:</div><div class="pb-k">«+»</div><div class="pb-u">&rarr; to'liq qo'llanmani <strong>shaxsiyga</strong> yuboraman</div></div>
      <div class="follow">Obuna bo'ling — AI, Claude va real ishlaydigan tizimlar haqida</div>
    </div>
    ${footer()}
  </section>`;
}

const slides = [cover(), s2(), s3(), s4(), s5(), s6(), s7(), s8(), s9(), s10()];

function html() {
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{--bg:#F4EFE2; --ink:#2A2620; --muted:#75705F; --accent:#7A5AF0; --line:#DED7C6; --card:#FBF8EF; --cardln:#E6DECB;
    --g:#5E9E63; --p:#8A6FC6; --b:#4E86C4; --o:#D08A3E; --r:#D0574B;
    width:${W}px;height:${H}px;position:relative;overflow:hidden;background:var(--bg);color:var(--ink);
    font-family:${SANS};padding:150px 66px 178px;display:flex;flex-direction:column;justify-content:center;}
  .paper{position:absolute;inset:0;z-index:0;background-image:linear-gradient(rgba(0,0,0,.028) 1px, transparent 1px);background-size:100% 46px;opacity:.7;}
  .paper::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 78% 12%, rgba(122,90,240,.12), transparent 46%);}
  .slide>*{position:relative;z-index:1;}
  .u{position:relative;color:var(--accent);white-space:nowrap;}
  .u::after{content:'';position:absolute;left:-2px;right:-2px;bottom:6px;height:14px;background:rgba(122,90,240,.26);border-radius:8px;z-index:-1;transform:rotate(-1deg);}
  b,strong{font-weight:800;color:var(--ink);}
  .grow{flex:1;display:flex;flex-direction:column;} .grow.center{justify-content:center;align-items:flex-start;gap:2px;}
  .mid{position:absolute;top:49%;left:66px;right:66px;transform:translateY(-50%);display:flex;flex-direction:column;gap:22px;}
  .mid>.h{margin-bottom:0;} .mid>.body{margin:0;} .mid .note{margin-top:0;}

  .top{position:absolute;top:60px;left:66px;right:66px;display:flex;justify-content:space-between;align-items:center;}
  .kick{display:flex;align-items:center;gap:12px;font-weight:800;font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);}
  .kick .spk,.fbrand .spk{width:26px;height:26px;}
  .page{font-family:${HAND};font-weight:700;font-size:28px;color:var(--muted);}

  .h{font-family:${HAND};font-weight:700;font-size:70px;line-height:1.08;margin:0;color:var(--ink);}
  .h.big{font-size:76px;}
  .body{font-size:33px;line-height:1.42;color:var(--muted);margin:0;max-width:900px;} .body.sm{font-size:30px;}
  .body b{color:var(--ink);font-weight:800;}
  .note{background:var(--card);border:2px dashed var(--cardln);border-radius:18px;padding:24px 30px;font-size:28px;color:var(--muted);line-height:1.36;} .note b{color:var(--accent);}

  /* cover */
  .cov-bots{display:flex;gap:18px;justify-content:center;margin:18px 0 6px;}
  .bot{display:flex;flex-direction:column;align-items:center;gap:10px;transform:rotate(var(--rot,0deg));}
  .cov-bots .bot:nth-child(1){--rot:-5deg;} .cov-bots .bot:nth-child(2){--rot:3deg;} .cov-bots .bot:nth-child(3){--rot:-3deg;} .cov-bots .bot:nth-child(4){--rot:5deg;}
  .bot-face{width:104px;height:92px;border:4px solid var(--ink);border-radius:24px;background:#fff;display:flex;align-items:center;justify-content:center;gap:14px;position:relative;box-shadow:5px 6px 0 rgba(0,0,0,.12);}
  .bot-face::before{content:'';position:absolute;top:-22px;width:5px;height:18px;background:var(--ink);}
  .bot-face::after{content:'';position:absolute;top:-28px;width:13px;height:13px;border-radius:50%;background:var(--bc2,var(--accent));}
  .eye{width:15px;height:15px;border-radius:50%;background:var(--ink);margin-top:-6px;}
  .mouth{position:absolute;bottom:18px;width:40px;height:14px;border:4px solid var(--ink);border-top:none;border-radius:0 0 20px 20px;}
  .bot-lab{font-family:${HAND};font-weight:700;font-size:25px;padding:5px 15px;border-radius:14px;color:#25221c;}
  .bot.g{--bc2:var(--g);} .bot.g .bot-lab{background:#CBE6CC;} .bot.p{--bc2:var(--p);} .bot.p .bot-lab{background:#DDD3F2;}
  .bot.o{--bc2:var(--o);} .bot.o .bot-lab{background:#F3DDBE;} .bot.b{--bc2:var(--b);} .bot.b .bot-lab{background:#CCDFF3;}

  .cov-mid{position:absolute;top:49%;left:66px;right:66px;transform:translateY(-50%);display:flex;flex-direction:column;}
  .badge{display:inline-block;background:var(--card);border:2px solid var(--cardln);color:var(--accent);font-weight:800;font-size:22px;letter-spacing:.06em;padding:10px 22px;border-radius:30px;margin-bottom:18px;}
  .cov-title{font-family:${HAND};font-weight:700;font-size:88px;line-height:1.02;color:var(--ink);}
  .cov-sub{margin-top:20px;font-size:33px;line-height:1.34;color:var(--muted);max-width:820px;}
  .sticker{position:absolute;right:6px;top:-230px;font-family:${HAND};font-weight:700;font-size:36px;line-height:1.05;text-align:center;color:#25221c;background:#F5D06B;padding:20px 24px;border-radius:20px;transform:rotate(6deg);box-shadow:5px 6px 0 rgba(0,0,0,.14);border:3px solid #2A2620;}
  .swipe{margin-top:24px;font-family:${HAND};font-weight:700;font-size:34px;color:var(--accent);}

  /* s2 */
  .mathbox{background:var(--card);border:2px solid var(--cardln);border-radius:22px;padding:32px 36px;}
  .mconc{font-family:${HAND};font-weight:700;font-size:42px;line-height:1.2;color:var(--ink);} .mconc b{color:var(--accent);}

  /* roles */
  .mroles{display:flex;flex-direction:column;gap:16px;}
  .mrole{display:flex;align-items:center;gap:22px;background:var(--card);border:2px solid var(--cardln);border-radius:20px;padding:24px 28px;border-left:10px solid var(--rc);}
  .mrole.g{--rc:var(--g);} .mrole.p{--rc:var(--p);} .mrole.o{--rc:var(--o);} .mrole.b{--rc:var(--b);}
  .mrole-e{font-size:46px;flex:0 0 auto;} .mrole-tx{display:flex;flex-direction:column;}
  .mrole-tx b{font-size:34px;} .mrole-d{font-size:26px;color:var(--muted);margin-top:2px;}

  /* s4 quote */
  .quotebox{background:var(--card);border:2px solid var(--cardln);border-radius:22px;padding:20px 34px 30px;position:relative;}
  .qmark{font-family:${HAND};font-weight:700;font-size:100px;color:var(--accent);line-height:1;}
  .qtx{font-size:34px;line-height:1.36;color:var(--ink);margin-top:-20px;} .qtx b{color:var(--accent);}

  /* s5 chainflow */
  .chainflow{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;}
  .cf{background:var(--card);border:3px solid var(--nc,var(--accent));border-radius:18px;padding:20px 20px;text-align:center;min-width:180px;}
  .cf.g{--nc:var(--g);} .cf.p{--nc:var(--p);} .cf.o{--nc:var(--o);} .cf.b{--nc:var(--b);}
  .cf b{display:block;font-family:${HAND};font-weight:700;font-size:34px;color:var(--ink);} .cf span{font-size:23px;color:var(--muted);}
  .cfa{font-family:${HAND};color:var(--accent);font-size:40px;font-weight:700;}

  /* s6 cheat */
  .cheats{display:flex;flex-direction:column;gap:14px;}
  .cheat{display:flex;align-items:center;gap:18px;background:var(--card);border:2px solid var(--cardln);border-radius:16px;padding:24px 28px;border-left:10px solid var(--cc,var(--accent));}
  .cheat.g{--cc:var(--g);} .cheat.b{--cc:var(--b);} .cheat.p{--cc:var(--p);} .cheat.o{--cc:var(--o);}
  .cheat-t{flex:1;font-size:31px;font-weight:700;color:var(--ink);} .cheat-a{color:var(--muted);font-size:30px;} .cheat-m{font-family:${MONO};font-size:26px;font-weight:700;color:var(--cc);}

  /* s7 prompt cards */
  .pcards{display:flex;flex-direction:column;gap:16px;}
  .pcard{display:flex;flex-direction:column;align-items:flex-start;gap:12px;background:var(--card);border:2px solid var(--cardln);border-radius:20px;padding:24px 28px;}
  .ptag{font-family:${HAND};font-weight:700;font-size:26px;padding:8px 20px;border-radius:14px;color:#25221c;white-space:nowrap;}
  .ptag.g{background:#CBE6CC;} .ptag.o{background:#F3DDBE;} .ptag.b{background:#CCDFF3;}
  .ptx{font-size:28px;color:var(--ink);line-height:1.34;}

  /* s8 xlist */
  .xlist{display:flex;flex-direction:column;gap:14px;}
  .xrow{display:flex;align-items:flex-start;gap:22px;background:var(--card);border:2px solid var(--cardln);border-radius:18px;padding:22px 28px;}
  .xn{flex:0 0 auto;width:52px;height:52px;border-radius:14px;background:var(--r);color:#fff;font-family:${HAND};font-weight:700;font-size:30px;display:flex;align-items:center;justify-content:center;}
  .xrow div b{font-size:31px;color:var(--ink);} .xrow div span{display:block;font-size:25px;color:var(--muted);margin-top:2px;line-height:1.28;}

  /* s9 week */
  .week{display:flex;flex-direction:column;gap:12px;}
  .wd{display:flex;align-items:center;gap:22px;background:var(--card);border:2px solid var(--cardln);border-radius:16px;padding:20px 28px;}
  .wday{flex:0 0 auto;width:96px;font-family:${HAND};font-weight:700;font-size:32px;color:var(--accent);}
  .wtx{font-size:29px;color:var(--ink);}

  /* cta */
  .cta .fire{font-size:70px;} .cta .h{margin-top:8px;}
  .plusbox{margin-top:28px;background:var(--card);border:2px solid var(--cardln);border-radius:26px;padding:34px 40px;width:100%;}
  .pb-l{font-size:30px;color:var(--muted);} .pb-k{font-family:${HAND};font-weight:700;font-size:100px;color:var(--accent);line-height:1;margin:2px 0 6px;}
  .pb-u{font-weight:700;font-size:31px;color:var(--ink);} .pb-u strong{color:var(--accent);}
  .follow{margin-top:22px;font-size:27px;color:var(--muted);}

  .rule{position:absolute;left:66px;right:66px;bottom:140px;height:2px;background:var(--line);}
  .footer{position:absolute;left:66px;right:66px;bottom:78px;display:flex;align-items:center;justify-content:space-between;}
  .fbrand{display:flex;align-items:center;gap:10px;font-weight:900;font-size:28px;letter-spacing:.1em;color:var(--accent);}
  .fhandle{font-family:${HAND};font-weight:700;font-size:30px;color:var(--muted);}
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
  render(process.argv[2] || path.join(__dirname, 'aiteam-vibe-out'))
    .then(f => console.log('Rendered:\n' + f.join('\n')))
    .catch(e => { console.error(e); process.exit(1); });
}
module.exports = { render, html };
