// engine/aistrateg/flows.cjs
// «VIBE CODING» — Sizsiz ishlaydigan Claude workflow'lari.
// Yorug' + terrakota chiziqli blok-sxema (banner uslubi). O'zbekcha B1.
// Footer: VIBE CODING / @vibecoder_qiz. CTA: izohga «+».

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const cfg = require('../../src/config');

const W = 1080, H = 1350;
const SERIF = "'Fraunces', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";
const MONO = "ui-monospace,'SF Mono',Menlo,Consolas,monospace";
const HANDLE = '@vibecoder_qiz';
const TOTAL = 9;

const pg = (i) => `${String(i + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}`;
const spark = (c = 'var(--accent)') => `<svg class="spk" viewBox="0 0 24 24"><path d="M12 1l2.2 7.4L21.5 6l-5.1 5.6 6.6 3.4-7.6.5 2.3 7.4L12 17l-5.7 5.9 2.3-7.4L1 15l6.6-3.4L2.5 6l7.3 2.4z" fill="${c}"/></svg>`;
const deco = (cls = '') => `<div class="bg-grid"></div><div class="glow ${cls}"></div>`;
const topbar = (kick, i) => `<div class="top"><div class="kick">${spark()}${kick}</div><span class="page">${pg(i)}</span></div>`;
const footer = () => `<div class="rule"></div><div class="footer"><span class="fbrand">${spark()}VIBE CODING</span><span class="fhandle">${HANDLE}</span></div>`;
// line-art flow chain from array of {t, s}
const chain = (nodes) => `<div class="chain">${nodes.map((n, i) => `<div class="cnode"><b>${n.t}</b>${n.s ? `<span>${n.s}</span>` : ''}</div>${i < nodes.length - 1 ? '<span class="carr">→</span>' : ''}`).join('')}</div>`;

// ── slides ────────────────────────────────────────────────
function cover() {
  return `<section class="slide light cover">
    ${deco('tr')}
    <div class="top"><div class="kick">${spark()}VIBE CODING</div><span class="page">${pg(0)}</span></div>
    <div class="cov-mid">
      <div class="cov-art">
        ${chain([{t:'⏰ 7:00'},{t:'🌐 Skan'},{t:'✅ Natija'}])}
        <div class="cov-branch">
          <div class="minibox">✍️ Kontent</div><div class="minibox">💼 Frilanser</div><div class="minibox">🔍 Tadqiqot</div>
        </div>
      </div>
      <div class="badge">AVTOMATLASHTIRISH · SIZSIZ ISHLAYDI</div>
      <h1 class="cov-title">Sizsiz ishlaydigan <span class="acc">tizim</span></h1>
      <p class="cov-sub">Claude'ni bir marta sozlang — u siz uxlab yotganda ham ishlab, tayyor natija beradi.</p>
      <div class="gift">🎁 Oxirida — bepul bosqichma-bosqich qo'llanma</div>
      <div class="swipe">SURING <b>&rarr;</b></div>
    </div>
    ${footer()}
  </section>`;
}

function s2() {
  return `<section class="slide dark">
    ${deco('bl')}
    ${topbar('ASOSIY FARQ', 1)}
    <div class="mid">
    <h2 class="h">Chat <span class="acc">javob beradi</span>,<br>tizim <span class="acc">ish qiladi</span></h2>
    <p class="body">Ko'pchilik Claude'ni aqlli qidiruv kabi ishlatadi: savol beradi, javob oladi, ko'chiradi. Tizim boshqacha — u so'ramasdan o'zi ishga tushadi.</p>
    <div class="parts">
      <div class="part"><span class="part-i">🎭</span><b>ROL</b><span>doimiy vazifa</span></div>
      <div class="part"><span class="part-i">🧰</span><b>VOSITALAR</b><span>fayl, email, veb</span></div>
      <div class="part"><span class="part-i">⏱</span><b>TRIGGER</b><span>vaqt yoki hodisa</span></div>
      <div class="part"><span class="part-i">📦</span><b>NATIJA</b><span>tayyor mahsulot</span></div>
    </div>
    </div>
    ${footer()}
  </section>`;
}

function s3() {
  return `<section class="slide light">
    ${deco('tr')}
    ${topbar('ASOSIY O\'ZGARISH', 2)}
    <div class="mid">
    <h2 class="h">Siz endi <span class="acc">tasdiqlovchi</span>siz</h2>
    <div class="ba">
      <div class="ba-box old"><div class="ba-lab old">❌ AVVAL</div><p>Har kuni o'zingiz: manba tekshirasiz, postni qayta yozasiz, hisobotga raqam kiritasiz, xat yuborasiz.</p><div class="ba-tag">Siz — sekin «trigger»siz</div></div>
      <div class="ba-box new"><div class="ba-lab new">✅ ENDI</div><p>Tizim o'zi qiladi, siz faqat ko'rib chiqib tasdiqlaysiz. Ishni bajaruvchi emas — <b>boshqaruvchisiz</b>.</p><div class="ba-tag new">Siz — tasdiqlovchi</div></div>
    </div>
    <div class="stripe">Bu — butun o'zgarish. Endi haftangiz vazifalar emas, <b>topshiriqlar</b> ro'yxati.</div>
    </div>
    ${footer()}
  </section>`;
}

function s4() {
  const roles = [
    ['✍️', 'Kontent yaratuvchi', 'Har ertalab 5-7 post g\'oyasi, ilmog\'i bilan', '~5 soat/hafta'],
    ['💼', 'Frilanser', 'Mijozni baholaydi: qo\'ng\'iroq qilasizmi yoki yo\'q', 'behuda suhbatsiz'],
    ['🔍', 'Tadqiqotchi', 'Kuniga bitta xabar — faqat muhim yangiliklar', '~2 soat/kun'],
    ['👥', 'Hamma uchun', 'Ertalabki brifing: kalendar + email + trend', '30 daqiqa/kun'],
  ].map(([e, t, d, tm]) => `<div class="role"><span class="role-e">${e}</span><div class="role-tx"><b>${t}</b><span>${d}</span></div><span class="role-tm">${tm}</span></div>`).join('');
  return `<section class="slide light">
    ${deco('bl')}
    ${topbar('NIMA QURISH MUMKIN', 3)}
    <div class="mid">
    <h2 class="h">Rol bo'yicha <span class="acc">tizimlar</span></h2>
    <div class="roles">${roles}</div>
    </div>
    ${footer()}
  </section>`;
}

function s5() {
  return `<section class="slide dark">
    ${deco('tr')}
    ${topbar('MISOL · ERTALABKI BRIFING', 4)}
    <div class="mid">
    <h2 class="h">Bitta xabar — <span class="acc">butun kun</span></h2>
    <p class="body">Har ertalab soat 7:00 da tizim uch manbani yig'ib, sizga bitta qisqa xabar yuboradi:</p>
    ${chain([{t:'⏰ 7:00',s:'trigger'},{t:'🗓 Kalendar',s:'+ email + veb'},{t:'✉️ Bitta xabar',s:'tayyor'}])}
    <div class="brief">
      <div class="brief-h">📋 Bugungi brifing</div>
      <div class="brief-l"><b>BUGUN:</b> 2 uchrashuv — 11:00 tayyorgarlik kerak</div>
      <div class="brief-l"><b>XATLAR:</b> 3 ta javob kutmoqda</div>
      <div class="brief-l"><b>SIGNAL:</b> sohangizda 1 muhim yangilik</div>
    </div>
    </div>
    ${footer()}
  </section>`;
}

function s6() {
  return `<section class="slide light">
    ${deco('bl')}
    ${topbar('QANDAY QURILADI · 5 QADAM', 5)}
    <div class="mid">
    <h2 class="h">Besh <span class="acc">oddiy</span> qadam</h2>
    <div class="steps5">
      <div class="st"><span class="st-n">1</span><div><b>Rol yozing</b><span>«Sen mening kontent-strategimsan» — aniq vazifa bering</span></div></div>
      <div class="st"><span class="st-n">2</span><div><b>Vositalarni ulang</b><span>fayl, email, kalendar, veb — faqat kerakligini</span></div></div>
      <div class="st"><span class="st-n">3</span><div><b>Trigger qo'ying</b><span>har kuni 7:00, yoki «yangi xat kelganda»</span></div></div>
      <div class="st"><span class="st-n">4</span><div><b>Natijani belgilang</b><span>xabar yuborsin yoki fayl saqlasin</span></div></div>
      <div class="st"><span class="st-n">5</span><div><b>Sinang va sozlang</b><span>bir marta qo'lda ishga tushiring, keyin tuzating</span></div></div>
    </div>
    </div>
    ${footer()}
  </section>`;
}

function s7() {
  const conn = [
    ['📧', 'Gmail', 'xat yozish va tartiblash'],
    ['🗓', 'Kalendar', 'brifing va rejalashtirish'],
    ['🌐', 'Veb qidiruv', 'trend va yangilik'],
  ].map(([e, t, d]) => `<div class="conn"><span class="conn-e">${e}</span><div class="conn-tx"><b>${t}</b><span>${d}</span></div><span class="conn-ok">✓</span></div>`).join('');
  return `<section class="slide dark">
    ${deco('tr')}
    ${topbar('VOSITALARNI ULASH', 6)}
    <div class="mid">
    <h2 class="h">Tizimga <span class="acc">qo'l</span> bering</h2>
    <p class="body">Ertalabki brifing uchun uch narsani ulaysiz. Bitta Google hisobi email va kalendarni birga qamrab oladi.</p>
    <div class="conns">${conn}</div>
    </div>
    ${footer()}
  </section>`;
}

function s8() {
  return `<section class="slide light">
    ${deco('bl')}
    ${topbar('SOATNI QO\'YING', 7)}
    <div class="mid">
    <h2 class="h">Bir marta yozing — <span class="acc">o'zi ishlaydi</span></h2>
    <p class="body">Rejalashtirilgan vazifaga rolni joylang, soatni qo'ying. Instagramga emas — avval o'zingizga yuborsin.</p>
    <div class="promptbox">
      <div class="pb-h">${spark('#C4623B')} ERTALABKI BRIFING · ROL</div>
      <div class="pb-b">Sen mening ertalabki brifing tizimimsan. Har kuni 7:00 da bitta xabar yubor: BUGUN (kalendar), XATLAR (faqat javob kutayotgani), SIGNAL (sohamdagi 1 yangilik). Qisqa yoz — ortiqcha gap yo'q.</div>
    </div>
    <div class="stripe">Qo'lda bir marta sinang → to'g'ri bo'lsa → <b>soatni yoqing</b> ✅</div>
    </div>
    ${footer()}
  </section>`;
}

function s9() {
  return `<section class="slide dark cta">
    ${deco('c')}
    ${topbar('OXIRIGACHA YETDINGIZ', 8)}
    <div class="grow center">
      <div class="fire">🔥</div>
      <h2 class="h big">To'liq qo'llanmani<br><span class="acc">bepul oling</span></h2>
      <p class="body">Har bir rol uchun tayyor rollar, vositalar, triggerlar va ertalabki brifing — hammasi bosqichma-bosqich, bitta hujjatda.</p>
      <div class="plusbox"><div class="pb-l">Izohga shunchaki yozing:</div><div class="pb-k">«+»</div><div class="pb-u">&rarr; to'liq qo'llanmani <strong>shaxsiyga</strong> yuboraman</div></div>
      <div class="follow">Obuna bo'ling — AI, Claude va real ishlaydigan tizimlar haqida</div>
    </div>
    ${footer()}
  </section>`;
}

const slides = [cover(), s2(), s3(), s4(), s5(), s6(), s7(), s8(), s9()];

function html() {
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800;9..144,900&family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{--bg:#F1ECE2; --ink:#211E18; --muted:#6E6A5F; --accent:#7A5AF0; --line:#DBD4C7; --card:#FBF8F1; --cardln:#E6DFD1;
    width:${W}px;height:${H}px;position:relative;overflow:hidden;background:var(--bg);color:var(--ink);
    font-family:${SANS};padding:150px 66px 178px;display:flex;flex-direction:column;justify-content:center;}
  .slide.dark{--bg:#16130E; --ink:#F3EFE6; --muted:#8F887B; --accent:#9B7DFF; --line:#2C271F; --card:#211C15; --cardln:#332C22; background:#16130E;}
  .bg-grid,.glow{position:absolute;z-index:0;}
  .bg-grid{inset:0;background-image:radial-gradient(circle, rgba(0,0,0,.05) 1.6px, transparent 1.6px);background-size:36px 36px;opacity:.45;}
  .slide.dark .bg-grid{background-image:radial-gradient(circle, rgba(255,255,255,.05) 1.6px, transparent 1.6px);}
  .glow{width:740px;height:520px;border-radius:50%;filter:blur(10px);background:radial-gradient(closest-side, color-mix(in srgb,var(--accent) 24%, transparent), transparent 70%);opacity:.5;}
  .glow.tr{right:-160px;top:-160px;} .glow.bl{left:-200px;bottom:-160px;} .glow.c{left:50%;top:32%;transform:translateX(-50%);opacity:.42;}
  .slide>*{position:relative;z-index:1;}
  .acc{color:var(--accent);} b,strong{font-weight:800;color:var(--ink);}
  .grow{flex:1;display:flex;flex-direction:column;} .grow.center{justify-content:center;align-items:flex-start;gap:2px;}

  .top{position:absolute;top:60px;left:66px;right:66px;display:flex;justify-content:space-between;align-items:center;}
  .kick{display:flex;align-items:center;gap:12px;font-weight:800;font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);}
  .kick .spk,.fbrand .spk{width:26px;height:26px;}
  .page{font-weight:700;font-size:25px;letter-spacing:.1em;color:var(--muted);}

  .h{font-family:${SERIF};font-weight:800;font-size:66px;line-height:1.06;margin:0;}
  .h.big{font-size:70px;} .h .acc{color:var(--accent);}
  .body{font-size:33px;line-height:1.4;color:var(--muted);margin:16px 0 22px;max-width:900px;}
  .body b{color:var(--ink);font-weight:800;}

  /* line-art chain */
  .chain{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;margin:6px 0;}
  .cnode{background:transparent;border:2.5px solid var(--accent);border-radius:16px;padding:20px 26px;text-align:center;min-width:150px;}
  .slide.dark .cnode{background:rgba(122,90,240,.10);}
  .cnode b{display:block;font-size:30px;color:var(--ink);} .cnode span{font-size:22px;color:var(--muted);}
  .carr{color:var(--accent);font-size:38px;font-weight:300;}

  /* cover */
  .cover{padding-top:52px;}
  .cov-art{margin-bottom:26px;}
  .cov-branch{display:flex;gap:14px;justify-content:center;margin-top:18px;}
  .minibox{border:2px solid color-mix(in srgb,var(--accent) 55%,transparent);border-radius:14px;padding:14px 22px;font-size:24px;font-weight:700;color:var(--ink);background:var(--card);}
  .cov-mid{position:absolute;top:49%;left:66px;right:66px;transform:translateY(-50%);display:flex;flex-direction:column;}
  .badge{display:inline-block;background:color-mix(in srgb,var(--accent) 14%, transparent);border:1px solid color-mix(in srgb,var(--accent) 45%, transparent);color:var(--accent);font-weight:800;font-size:22px;letter-spacing:.06em;padding:10px 22px;border-radius:30px;margin-bottom:20px;}
  .cov-title{font-family:${SERIF};font-weight:900;font-size:84px;line-height:1.0;color:var(--ink);}
  .cov-title .acc{color:var(--accent);}
  .cov-sub{margin-top:22px;font-size:34px;line-height:1.32;color:var(--muted);max-width:840px;}
  .gift{margin-top:22px;display:inline-block;background:color-mix(in srgb,var(--accent) 14%, transparent);border:1px solid color-mix(in srgb,var(--accent) 45%, transparent);color:var(--accent);font-weight:700;font-size:27px;padding:13px 24px;border-radius:40px;}
  .swipe{margin-top:24px;font-weight:800;font-size:30px;letter-spacing:.12em;color:var(--accent);}

  /* s2 parts */
  .parts{margin-top:auto;display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:16px;}
  .part{background:var(--card);border:1px solid var(--cardln);border-radius:18px;padding:26px 16px;text-align:center;}
  .part-i{font-size:44px;} .part b{display:block;font-size:27px;margin-top:10px;letter-spacing:.04em;} .part span{font-size:22px;color:var(--muted);}

  /* before/after */
  .ba{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:6px;}
  .ba-box{background:var(--card);border:1px solid var(--cardln);border-radius:22px;padding:28px 30px;}
  .ba-box.new{border-color:color-mix(in srgb,var(--accent) 45%,transparent);}
  .ba-lab{font-weight:800;font-size:25px;letter-spacing:.04em;margin-bottom:14px;} .ba-lab.old{color:#c9503f;} .ba-lab.new{color:#3E8E5C;}
  .ba-box p{font-size:28px;color:var(--ink);line-height:1.34;margin:0;}
  .ba-tag{margin-top:18px;font-size:23px;font-weight:700;color:var(--muted);border-top:1px dashed var(--cardln);padding-top:14px;} .ba-tag.new{color:var(--accent);}
  .stripe{margin-top:auto;background:var(--card);border:1px solid var(--cardln);border-radius:18px;padding:24px 30px;font-size:29px;color:var(--muted);text-align:center;} .stripe b{color:var(--accent);}

  /* s4 roles */
  .roles{display:flex;flex-direction:column;gap:14px;margin-top:6px;}
  .role{display:flex;align-items:center;gap:20px;background:var(--card);border:1px solid var(--cardln);border-radius:18px;padding:22px 26px;}
  .role-e{font-size:42px;flex:0 0 auto;} .role-tx{flex:1;} .role-tx b{font-size:31px;} .role-tx span{display:block;font-size:24px;color:var(--muted);margin-top:2px;line-height:1.26;}
  .role-tm{flex:0 0 auto;background:color-mix(in srgb,var(--accent) 14%,transparent);color:var(--accent);font-weight:800;font-size:22px;padding:10px 16px;border-radius:12px;white-space:nowrap;}

  /* s5 brief */
  .brief{margin-top:auto;background:var(--card);border:1px solid var(--cardln);border-radius:20px;padding:28px 32px;}
  .slide.dark .brief{background:#0f0d0a;border-color:#2a251d;}
  .brief-h{font-weight:800;font-size:27px;color:var(--accent);margin-bottom:16px;}
  .brief-l{font-size:28px;color:var(--ink);padding:8px 0;line-height:1.3;} .brief-l b{color:var(--accent);}

  /* s6 steps */
  .steps5{display:flex;flex-direction:column;gap:12px;margin-top:4px;}
  .st{display:flex;align-items:flex-start;gap:20px;background:var(--card);border:1px solid var(--cardln);border-radius:16px;padding:20px 26px;}
  .st-n{flex:0 0 auto;width:50px;height:50px;border-radius:50%;background:var(--accent);color:#fff;font-weight:800;font-size:27px;display:flex;align-items:center;justify-content:center;}
  .st div b{font-size:30px;color:var(--ink);} .st div span{display:block;font-size:24px;color:var(--muted);margin-top:2px;line-height:1.26;}

  /* s7 connectors */
  .conns{display:flex;flex-direction:column;gap:16px;margin-top:6px;}
  .conn{display:flex;align-items:center;gap:22px;background:var(--card);border:1px solid var(--cardln);border-radius:18px;padding:24px 28px;}
  .conn-e{font-size:42px;flex:0 0 auto;} .conn-tx{flex:1;} .conn-tx b{font-size:32px;} .conn-tx span{display:block;font-size:25px;color:var(--muted);margin-top:2px;}
  .conn-ok{flex:0 0 auto;width:52px;height:52px;border-radius:50%;background:#3E8E5C;color:#fff;font-weight:800;font-size:30px;display:flex;align-items:center;justify-content:center;}

  /* s8 promptbox */
  .promptbox{margin-top:4px;background:var(--card);border:1px solid var(--cardln);border-radius:20px;overflow:hidden;}
  .pb-h{display:flex;align-items:center;gap:12px;font-weight:800;font-size:23px;letter-spacing:.1em;color:var(--accent);padding:22px 28px 0;}
  .pb-h .spk{width:22px;height:22px;}
  .pb-b{padding:16px 28px 26px;font-family:${MONO};font-size:26px;line-height:1.5;color:var(--ink);}

  /* cta */
  .cta .fire{font-size:70px;} .cta .h{margin-top:8px;}
  .plusbox{margin-top:28px;background:var(--card);border:1px solid var(--cardln);border-radius:26px;padding:34px 40px;width:100%;}
  .pb-l{font-size:30px;color:var(--muted);} .pb-k{font-family:${SERIF};font-weight:900;font-size:100px;color:var(--accent);line-height:1;margin:2px 0 6px;}
  .pb-u{font-weight:700;font-size:31px;color:var(--ink);} .pb-u strong{color:var(--accent);}
  .follow{margin-top:22px;font-size:27px;color:var(--muted);}

  .rule{position:absolute;left:66px;right:66px;bottom:140px;height:1px;background:var(--line);}
  .footer{position:absolute;left:66px;right:66px;bottom:78px;display:flex;align-items:center;justify-content:space-between;}
  .mid{position:absolute;top:49%;left:66px;right:66px;transform:translateY(-50%);display:flex;flex-direction:column;gap:22px;}
  .mid>*{margin-top:0!important;margin-bottom:0!important;}
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
  render(process.argv[2] || path.join(__dirname, 'flows-vibe-out'))
    .then(f => console.log('Rendered:\n' + f.join('\n')))
    .catch(e => { console.error(e); process.exit(1); });
}
module.exports = { render, html };
