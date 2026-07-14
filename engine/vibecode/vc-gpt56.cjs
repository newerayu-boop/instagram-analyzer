// engine/aistrateg/sketch.cjs
// «vibe code» — GPT-5.6 ni limitga urilmasdan 24 soat ishlatish.
// Sketch/qog'oz uslubi (banner kabi), pastel yorliqlar, marker chiziqlar. O'zbekcha B1.
// Footer: vibe code / @vibecoder_qiz. CTA: izohga «+».

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
const dots = (i) => `<span class="fdots">${Array.from({length:TOTAL},(_,k)=>`<span class="fdot${k===i?' on':''}"></span>`).join('')}</span>`;
const footer = (i = 0) => `<div class="rule"></div><div class="footer"><span class="fbrand">${spark()}vibe code</span>${dots(i)}<span class="fhandle">${HANDLE}</span></div>`;

// doodle robot with a pastel label
const bot = (label, cls) => `<div class="bot ${cls}"><div class="bot-face"><span class="eye"></span><span class="eye"></span><span class="mouth"></span></div><span class="bot-lab">${label}</span></div>`;

// ── slides ────────────────────────────────────────────────
function cover() {
  return `<section class="slide cover">
    ${deco()}
    <div class="top"><div class="kick">${spark()}vibe code</div><span class="page">${pg(0)}</span></div>
    <div class="cov-bots">
      ${bot('orkestrator', 'g')}${bot('bajaruvchi', 'p')}${bot('skaner', 'b')}
    </div>
    <div class="cov-mid">
      <div class="badge">CODEX · TEJAMKOR SOZLASH</div>
      <h1 class="cov-title">GPT-5.6 ni <span class="u">24 soat</span><br>ishlating</h1>
      <p class="cov-sub">$200 to'lab, limitga 4 soatda urildingizmi? Ko'p yonish — oldini olsa bo'ladigan narsa. Mana tejamkor sozlash.</p>
      <div class="sticker">48 soat.<br>0 limit.</div>
      <div class="swipe">SURING <b>&rarr;</b></div>
    </div>
    ${footer(0)}
  </section>`;
}

function s2() {
  return `<section class="slide">
    ${deco()}
    ${topbar('MUAMMO', 1)}
    <div class="mid">
    <h2 class="h">Nega limit <span class="u">tez tugaydi</span></h2>
    <p class="body">Codex yordamchi ochsa, u asosiy modelni <b>aynan nusxalaydi</b>. Sol'ni «Ultra»ga qo'ysangiz — har yordamchi ham Ultra bo'ladi.</p>
    <div class="mathbox">
      <div class="mrow"><span class="mbot">🤖</span><span class="mx">×3 yordamchi</span><span class="meq">=</span><span class="mres">3× Ultra birga yonadi</span></div>
      <div class="mline"></div>
      <div class="mconc">5 soatlik oyna → <b>90 daqiqada</b> tugaydi 🔥</div>
    </div>
    <div class="note">Bu — sizning aybingiz emas. Bu tizimning yo'naltirish xatosi. Lekin yechimi bor.</div>
    </div>
    ${footer(1)}
  </section>`;
}

function s3() {
  return `<section class="slide">
    ${deco()}
    ${topbar('BIRINCHI QOIDA', 2)}
    <div class="mid">
    <h2 class="h">«Ultra»ga <span class="u">tegmang</span></h2>
    <p class="body">Ultra — daraja emas, <b>ko'paytiruvchi</b>. Bitta chaqiruv ichida 4 ta parallel yordamchi ochadi. Ular yana ochadi — rekursiv, boshqarib bo'lmaydigan, nihoyatda qimmat.</p>
    <div class="cmp">
      <div class="cmp-box"><div class="cmp-t">Ultra</div><div class="cmp-n">91.9%</div><div class="cmp-s">dasturlashda</div></div>
      <div class="cmp-vs">farqi<br><b>3.1 ball</b></div>
      <div class="cmp-box hi"><div class="cmp-t">Extra High</div><div class="cmp-n">88.8%</div><div class="cmp-s">dasturlashda</div></div>
    </div>
    <div class="note warn">Atigi 3.1 ball uchun — <b>3 barobar narx</b>. Ultradan butunlay voz keching.</div>
    </div>
    ${footer(2)}
  </section>`;
}

function s4() {
  const rows = [
    ['g', '🧠', 'Orkestrator', 'Sol Extra High', 'Rejalashtiradi, arxitektura, qaror'],
    ['p', '⚙️', 'Bajaruvchi', 'Sol Medium', 'Kod yozadi, xato tuzatadi, sinaydi'],
    ['b', '🔍', 'Skaner', 'Luna Extra High', 'Fayl qidiradi, kod ko\'radi, dalil yig\'adi'],
  ].map(([c, e, t, m, d]) => `<div class="mrole ${c}"><span class="mrole-e">${e}</span><div class="mrole-tx"><b>${t}</b><span class="mrole-m">${m}</span><span class="mrole-d">${d}</span></div></div>`).join('');
  return `<section class="slide">
    ${deco()}
    ${topbar('YECHIM', 3)}
    <div class="mid">
    <h2 class="h">3 model — <span class="u">3 vazifa</span></h2>
    <p class="body">Bitta model hamma ishni maksimal kuchda emas. Uch yordamchi, uch xil ish:</p>
    <div class="mroles">${rows}</div>
    <div class="note">Kundalik ish uchun: <b>Sol Medium</b> — arzon, tez va yetarli. Faqat eng qiyin ishga Extra High.</div>
    </div>
    ${footer(3)}
  </section>`;
}

function s5() {
  return `<section class="slide">
    ${deco()}
    ${topbar('ASOSIY USUL', 4)}
    <div class="mid">
    <h2 class="h">48 soat, <span class="u">0 limit</span></h2>
    <div class="loop">
      <div class="lnode g"><b>Sol</b><span>rejani yozadi</span></div>
      <span class="larr">→</span>
      <div class="lnode b"><b>Luna</b><span>bajaradi</span></div>
      <span class="larr">→</span>
      <div class="lnode g"><b>Sol</b><span>tekshiradi</span></div>
    </div>
    <p class="body sm">Bitta halqa. Rekursiv ochilish yo'q. Luna og'ir ishni <b>2.5x arzon</b> bajaradi — umumiy yonish keskin tushadi.</p>
    <div class="term"><div class="term-h">AGENTS.md ga qo'shing 👇</div><div class="term-b">Faqat men aytganda yordamchi och.
Avtomatik ochma.</div></div>
    </div>
    ${footer(4)}
  </section>`;
}

function s6() {
  return `<section class="slide">
    ${deco()}
    ${topbar('SOZLAMA', 5)}
    <div class="mid">
    <h2 class="h">Bitta qator — <span class="u">rekursiyani</span> to'xtatadi</h2>
    <p class="body">config.toml faylida ikki sozlama hamma narsani hal qiladi:</p>
    <div class="code">
      <div class="code-bar"><span class="md r"></span><span class="md y"></span><span class="md g"></span><span class="code-nm">~/.codex/config.toml</span></div>
      <div class="code-b"><span class="ck">[agents]</span>
max_threads = <span class="cv">6</span>
max_depth = <span class="cv">1</span>   <span class="cc"># muhim!</span></div>
    </div>
    <div class="two">
      <div class="tw"><b>max_depth = 1</b><span>yordamchi o'z yordamchisini ocholmaydi</span></div>
      <div class="tw"><b>max_threads = 6</b><span>bir vaqtda 6 tadan ko'p emas</span></div>
    </div>
    </div>
    ${footer(5)}
  </section>`;
}

function s7() {
  return `<section class="slide">
    ${deco()}
    ${topbar('PROMPT YOZISH', 6)}
    <div class="mid">
    <h2 class="h">Har promptga <span class="u">to'xtash nuqtasi</span></h2>
    <p class="body">Model to'xtamasdan davom etaveradi va oynangizni yeydi. Unga aniq ayting — qachon to'xtasin:</p>
    <div class="pcards">
      <div class="pcard"><span class="ptag g">REJA</span><span class="ptx">«Avval faqat reja yoz. Tugagach to'xta, fikrimni so'ra. Kod yozma.»</span></div>
      <div class="pcard"><span class="ptag b">BAJARISH</span><span class="ptx">«Qur. Sinovlar o'tguncha davom et. PR ochib to'xta — qolganini o'zim ko'raman.»</span></div>
      <div class="pcard"><span class="ptag p">DEBUG</span><span class="ptx">«Avval faylni o'qi, tashxis yoz. O'zgartirishdan oldin ko'rsat.»</span></div>
    </div>
    </div>
    ${footer(6)}
  </section>`;
}

function s8() {
  const rows = [
    ['Oddiy tuzatish', 'Sol Low / Medium', 'g'],
    ['Yangi imkoniyat', 'Sol High', 'b'],
    ['Qiyin masala', 'Sol Extra High', 'p'],
    ['Tez qidiruv', 'Luna Extra High', 'o'],
    ['Hech qachon', 'Ultra', 'r'],
  ].map(([t, m, c]) => `<div class="cheat ${c}"><span class="cheat-t">${t}</span><span class="cheat-a">→</span><span class="cheat-m">${m}</span></div>`).join('');
  return `<section class="slide">
    ${deco()}
    ${topbar('SHPARGALKA', 7)}
    <div class="mid">
    <h2 class="h">Qaysi ishga <span class="u">qaysi model</span></h2>
    <div class="cheats">${rows}</div>
    <div class="note">Bir daraja pastga tushiring — sifat o'sha, narx ancha arzon. Ko'pchilik hamma ishga ikki daraja balandda ishlaydi.</div>
    </div>
    ${footer(7)}
  </section>`;
}

function s9() {
  return `<section class="slide">
    ${deco()}
    ${topbar('AVVAL / KEYIN', 8)}
    <h2 class="h">Bir xil $200 — <span class="u">boshqa natija</span></h2>
    <div class="ba">
      <div class="ba-box old"><div class="ba-lab old">❌ AVVAL</div><ul><li>Ultra hammasida</li><li>Yordamchilar nusxalanadi</li><li>3× Ultra birga yonadi</li><li>Oyna 90 daqiqada tugaydi</li></ul></div>
      <div class="ba-box new"><div class="ba-lab new">✅ KEYIN</div><ul><li>Sol High — asosiy</li><li>Luna — skan, Medium — kod</li><li>max_depth = 1</li><li>48 soat, 0 limit</li></ul></div>
    </div>
    ${footer(8)}
  </section>`;
}

function s10() {
  return `<section class="slide cta">
    ${deco()}
    ${topbar('OXIRIGACHA YETDINGIZ', 9)}
    <div class="grow center">
      <div class="fire">🔥</div>
      <h2 class="h big">To'liq qo'llanmani<br><span class="u">bepul oling</span></h2>
      <p class="body">Ultra tuzog'i, 3-model tizimi, config.toml, to'xtash nuqtalari va model shpargalkasi — hammasi bitta hujjatda.</p>
      <div class="plusbox"><div class="pb-l">Izohga shunchaki yozing:</div><div class="pb-k">«+»</div><div class="pb-u">&rarr; to'liq qo'llanmani <strong>shaxsiyga</strong> yuboraman</div></div>
      <div class="follow">Obuna bo'ling — AI, Claude va real ishlaydigan tizimlar haqida</div>
    </div>
    ${footer(9)}
  </section>`;
}

const slides = [cover(), s2(), s3(), s4(), s5(), s6(), s7(), s8(), s9(), s10()];

function html() {
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{--bg:#F4EFE2; --ink:#2A2620; --muted:#75705F; --accent:#C4623B; --line:#DED7C6; --card:#FBF8EF; --cardln:#E6DECB;
    --g:#5E9E63; --p:#8A6FC6; --b:#4E86C4; --o:#D08A3E; --r:#D0574B;
    width:${W}px;height:${H}px;position:relative;overflow:hidden;background:var(--bg);color:var(--ink);
    font-family:${SANS};padding:64px 66px 76px;display:flex;flex-direction:column;}
  .paper{position:absolute;inset:0;z-index:0;
    background-image:linear-gradient(rgba(0,0,0,.028) 1px, transparent 1px);background-size:100% 46px;opacity:.7;}
  .paper::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 78% 12%, rgba(196,98,59,.10), transparent 46%);}
  .slide>*{position:relative;z-index:1;}
  .u{position:relative;color:var(--accent);white-space:nowrap;}
  .u::after{content:'';position:absolute;left:-2px;right:-2px;bottom:6px;height:14px;background:rgba(196,98,59,.24);border-radius:8px;z-index:-1;transform:rotate(-1deg);}
  b,strong{font-weight:800;color:var(--ink);}
  .grow{flex:1;display:flex;flex-direction:column;} .grow.center{justify-content:center;align-items:flex-start;gap:2px;}
  .mid{flex:1;display:flex;flex-direction:column;justify-content:center;gap:22px;}
  .mid>.h{margin-bottom:0;} .mid>.body{margin:0;} .mid .note,.mid .term,.mid .two{margin-top:0;}

  .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px;}
  .kick{display:flex;align-items:center;gap:12px;font-weight:800;font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);}
  .kick .spk,.fbrand .spk{width:26px;height:26px;}
  .page{font-family:${HAND};font-weight:700;font-size:28px;color:var(--muted);}

  .h{font-family:${HAND};font-weight:700;font-size:74px;line-height:1.06;margin:0;color:var(--ink);}
  .h.big{font-size:76px;}
  .body{font-size:33px;line-height:1.42;color:var(--muted);margin:16px 0 22px;max-width:900px;} .body.sm{font-size:30px;}
  .body b{color:var(--ink);font-weight:800;}
  .note{margin-top:auto;background:var(--card);border:2px dashed var(--cardln);border-radius:18px;padding:24px 30px;font-size:28px;color:var(--muted);line-height:1.36;} .note b{color:var(--accent);}
  .note.warn{border-color:color-mix(in srgb,var(--r) 50%,transparent);background:color-mix(in srgb,var(--r) 8%,var(--card));}

  /* cover */
  .cov-bots{display:flex;gap:26px;justify-content:center;margin:18px 0 6px;}
  .bot{display:flex;flex-direction:column;align-items:center;gap:12px;transform:rotate(var(--rot,0deg));}
  .cov-bots .bot:nth-child(1){--rot:-4deg;} .cov-bots .bot:nth-child(3){--rot:4deg;}
  .bot-face{width:118px;height:104px;border:4px solid var(--ink);border-radius:26px;background:var(--bc,#fff);display:flex;align-items:center;justify-content:center;gap:16px;position:relative;box-shadow:6px 7px 0 rgba(0,0,0,.12);}
  .bot-face::before{content:'';position:absolute;top:-24px;width:5px;height:20px;background:var(--ink);}
  .bot-face::after{content:'';position:absolute;top:-30px;width:14px;height:14px;border-radius:50%;background:var(--bc2,var(--accent));}
  .eye{width:17px;height:17px;border-radius:50%;background:var(--ink);margin-top:-6px;}
  .mouth{position:absolute;bottom:20px;width:44px;height:16px;border:4px solid var(--ink);border-top:none;border-radius:0 0 22px 22px;}
  .bot-lab{font-family:${HAND};font-weight:700;font-size:28px;padding:6px 18px;border-radius:16px;color:#25221c;}
  .bot.g{--bc2:var(--g);} .bot.g .bot-lab{background:#CBE6CC;} .bot.p{--bc2:var(--p);} .bot.p .bot-lab{background:#DDD3F2;} .bot.b{--bc2:var(--b);} .bot.b .bot-lab{background:#CCDFF3;}

  .cov-mid{margin-top:auto;}
  .badge{display:inline-block;background:var(--card);border:2px solid var(--cardln);color:var(--accent);font-weight:800;font-size:22px;letter-spacing:.06em;padding:10px 22px;border-radius:30px;margin-bottom:18px;}
  .cov-title{font-family:${HAND};font-weight:700;font-size:96px;line-height:1.0;color:var(--ink);}
  .cov-sub{margin-top:20px;font-size:33px;line-height:1.34;color:var(--muted);max-width:820px;}
  .sticker{position:absolute;right:0;top:-30px;font-family:${HAND};font-weight:700;font-size:38px;line-height:1.05;text-align:center;color:#25221c;background:#F5D06B;padding:22px 26px;border-radius:20px;transform:rotate(6deg);box-shadow:5px 6px 0 rgba(0,0,0,.14);border:3px solid #2A2620;}
  .swipe{margin-top:24px;font-family:${HAND};font-weight:700;font-size:34px;color:var(--accent);}

  /* s2 math */
  .mathbox{background:var(--card);border:2px solid var(--cardln);border-radius:22px;padding:30px 34px;margin:8px 0;}
  .mrow{display:flex;align-items:center;gap:18px;font-size:32px;} .mbot{font-size:44px;} .mx{font-weight:700;} .meq{color:var(--accent);font-size:40px;} .mres{font-weight:800;color:var(--ink);}
  .mline{height:2px;background:var(--cardln);margin:22px 0;}
  .mconc{font-family:${HAND};font-weight:700;font-size:40px;color:var(--ink);} .mconc b{color:var(--r);}

  /* s3 compare */
  .cmp{display:flex;align-items:center;justify-content:center;gap:20px;margin:6px 0;}
  .cmp-box{flex:1;background:var(--card);border:2px solid var(--cardln);border-radius:22px;padding:30px 20px;text-align:center;}
  .cmp-box.hi{border-color:var(--g);background:color-mix(in srgb,var(--g) 8%,var(--card));}
  .cmp-t{font-weight:800;font-size:30px;color:var(--muted);} .cmp-n{font-family:${HAND};font-weight:700;font-size:80px;line-height:1;color:var(--ink);margin:6px 0;} .cmp-box.hi .cmp-n{color:var(--g);} .cmp-s{font-size:24px;color:var(--muted);}
  .cmp-vs{font-family:${HAND};font-weight:700;font-size:28px;color:var(--accent);text-align:center;} .cmp-vs b{font-size:34px;color:var(--r);}

  /* s4 roles */
  .mroles{display:flex;flex-direction:column;gap:16px;margin-top:4px;}
  .mrole{display:flex;align-items:center;gap:22px;background:var(--card);border:2px solid var(--cardln);border-radius:20px;padding:24px 28px;border-left:10px solid var(--rc);}
  .mrole.g{--rc:var(--g);} .mrole.p{--rc:var(--p);} .mrole.b{--rc:var(--b);}
  .mrole-e{font-size:46px;flex:0 0 auto;} .mrole-tx{display:flex;flex-direction:column;}
  .mrole-tx b{font-size:34px;} .mrole-m{font-family:${MONO};font-size:24px;color:var(--rc);font-weight:700;margin:2px 0;} .mrole-d{font-size:25px;color:var(--muted);}

  /* s5 loop */
  .loop{display:flex;align-items:center;justify-content:center;gap:14px;margin:8px 0 18px;}
  .lnode{background:var(--card);border:3px solid var(--nc,var(--accent));border-radius:20px;padding:22px 30px;text-align:center;min-width:190px;}
  .lnode.g{--nc:var(--g);} .lnode.b{--nc:var(--b);}
  .lnode b{display:block;font-family:${HAND};font-weight:700;font-size:38px;color:var(--ink);} .lnode span{font-size:24px;color:var(--muted);}
  .larr{font-family:${HAND};color:var(--accent);font-size:44px;font-weight:700;}
  .term{margin-top:auto;background:#20242a;border-radius:18px;overflow:hidden;}
  .term-h{background:#2b3038;color:#cfe3d0;font-weight:700;font-size:24px;padding:16px 24px;}
  .term-b{padding:22px 26px;font-family:${MONO};font-size:27px;line-height:1.5;color:#eef2ee;white-space:pre-wrap;}

  /* s6 code */
  .code{background:#20242a;border-radius:18px;overflow:hidden;margin:6px 0 18px;}
  .code-bar{display:flex;align-items:center;gap:10px;padding:16px 20px;background:#2b3038;} .md{width:16px;height:16px;border-radius:50%;} .md.r{background:#ED6A5E;} .md.y{background:#F5BF4F;} .md.g{background:#61C554;}
  .code-nm{margin-left:10px;font-family:${MONO};font-size:22px;color:#9fb0a4;}
  .code-b{padding:24px 28px;font-family:${MONO};font-size:29px;line-height:1.55;color:#eef2ee;white-space:pre-wrap;} .code-b .ck{color:#E6A96B;} .code-b .cv{color:#8FD3F4;font-weight:700;} .code-b .cc{color:#7f8c82;}
  .two{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:auto;}
  .tw{background:var(--card);border:2px solid var(--cardln);border-radius:18px;padding:24px 26px;} .tw b{font-family:${MONO};font-size:28px;color:var(--accent);} .tw span{display:block;font-size:25px;color:var(--muted);margin-top:6px;line-height:1.3;}

  /* s7 prompt cards */
  .pcards{display:flex;flex-direction:column;gap:16px;margin-top:4px;}
  .pcard{display:flex;align-items:center;gap:22px;background:var(--card);border:2px solid var(--cardln);border-radius:20px;padding:24px 28px;}
  .ptag{flex:0 0 auto;font-family:${HAND};font-weight:700;font-size:28px;padding:10px 20px;border-radius:14px;color:#25221c;}
  .ptag.g{background:#CBE6CC;} .ptag.b{background:#CCDFF3;} .ptag.p{background:#DDD3F2;}
  .ptx{font-size:28px;color:var(--ink);line-height:1.32;}

  /* s8 cheat */
  .cheats{display:flex;flex-direction:column;gap:13px;margin:4px 0;}
  .cheat{display:flex;align-items:center;gap:18px;background:var(--card);border:2px solid var(--cardln);border-radius:16px;padding:22px 28px;border-left:10px solid var(--cc,var(--accent));}
  .cheat.g{--cc:var(--g);} .cheat.b{--cc:var(--b);} .cheat.p{--cc:var(--p);} .cheat.o{--cc:var(--o);} .cheat.r{--cc:var(--r);}
  .cheat-t{flex:1;font-size:31px;font-weight:700;color:var(--ink);} .cheat-a{color:var(--muted);font-size:30px;} .cheat-m{font-family:${MONO};font-size:28px;font-weight:700;color:var(--cc);}
  .cheat.r .cheat-t{color:var(--r);}

  /* s9 before/after */
  .ba{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:8px;}
  .ba-box{background:var(--card);border:2px solid var(--cardln);border-radius:22px;padding:28px 30px;}
  .ba-box.new{border-color:var(--g);}
  .ba-lab{font-family:${HAND};font-weight:700;font-size:34px;margin-bottom:14px;} .ba-lab.old{color:var(--r);} .ba-lab.new{color:var(--g);}
  .ba-box ul{list-style:none;display:flex;flex-direction:column;gap:12px;}
  .ba-box li{font-size:27px;color:var(--ink);line-height:1.26;padding-left:26px;position:relative;}
  .ba-box li:before{content:'—';position:absolute;left:0;color:var(--accent);}

  /* cta */
  .cta .fire{font-size:70px;} .cta .h{margin-top:8px;}
  .plusbox{margin-top:28px;background:var(--card);border:2px solid var(--cardln);border-radius:26px;padding:34px 40px;width:100%;}
  .pb-l{font-size:30px;color:var(--muted);} .pb-k{font-family:${HAND};font-weight:700;font-size:100px;color:var(--accent);line-height:1;margin:2px 0 6px;}
  .pb-u{font-weight:700;font-size:31px;color:var(--ink);} .pb-u strong{color:var(--accent);}
  .follow{margin-top:22px;font-size:27px;color:var(--muted);}

  .rule{margin-top:auto;height:2px;background:var(--line);}
  .footer{margin-top:22px;display:flex;align-items:center;justify-content:space-between;}
  .fbrand{display:flex;align-items:center;gap:10px;font-weight:900;font-size:28px;letter-spacing:.1em;color:var(--accent);}
  .fhandle{font-family:${HAND};font-weight:700;font-size:30px;color:var(--muted);}
  
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
  render(process.argv[2] || path.join(__dirname, 'sketch-out'))
    .then(f => console.log('Rendered:\n' + f.join('\n')))
    .catch(e => { console.error(e); process.exit(1); });
}
module.exports = { render, html };
