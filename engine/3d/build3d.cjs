// engine/3d/build3d.cjs — bespoke 3D carousels (distinct looks per deck)
// Deck A: dark neon / techno (Kimi x Claude Code)
// Deck B: bright claymorphism (20 things from one prompt)
// Renders each .slide to 1080x1350 PNG via Playwright.

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const W = 1080, H = 1350;

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Fredoka:wght@500;600;700&family=Inter:wght@400;600;700;800&display=swap');`;

const foot = (wm, hnd, i, total, cls) => {
  const dots = Array.from({ length: total }, (_, k) => `<span class="dot ${k === i ? 'on' : ''}"></span>`).join('');
  return `<div class="foot ${cls}"><div class="fl"><span class="sp">✳</span> ${wm}</div><div class="dots">${dots}</div><div class="fr">${hnd}</div></div>`;
};
const top = (kick, i, total) => `<div class="topbar"><span class="kick">${kick}</span><span class="pg">${String(i + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}</span></div>`;

/* ---------------- DECK A : DARK NEON ---------------- */
const cubeK3 = `<div class="scene"><div class="cube">
  <div class="f fr">K3</div><div class="f tp"></div><div class="f rt"></div></div></div>`;

const A_slides = [
  // 1 cover
  (i, t) => `${top('Kimi K3 · Claude Code', i, t)}
    <div class="grid3d"></div>
    <div class="cov">
      <div class="badge5">5×<small>arzon</small></div>
      ${cubeK3}
      <h1 class="h1">KIMI K3<br><span class="g">×</span> CLAUDE CODE</h1>
      <p class="sub">Fable darajasidagi kod — <b class="g">5x arzon</b></p>
      <div class="swipe">suring →</div>
    </div>`,
  // 2 problem
  (i, t) => `${top('Asosiy g\'oya', i, t)}
    <div class="body">
      <div class="glowline"></div>
      <h2 class="h2">Har so'rov <span class="c">eng qimmat</span><br>modelni so'ramaydi</h2>
      <p class="p">Kod o'qish · fayl qidirish · test · hujjat —<br>bularga <b>eng kuchli aql kerak emas</b>.</p>
      <div class="quote">🫖 Choynak qaynatishga atom reaktori kerakmi?</div>
    </div>`,
  // 3 chart 3D bars
  (i, t) => `${top('Bitta sessiya narxi', i, t)}
    <div class="body">
      <h2 class="h2">Narx — <span class="g">21× arzon</span></h2>
      <div class="bars3d">
        <div class="bcol"><div class="bar coral" style="height:340px"><span class="bv">$8.50</span></div><div class="blab">Fable 5</div></div>
        <div class="bcol"><div class="bar green" style="height:36px"><span class="bv">$0.39</span></div><div class="blab">Kimi K3<br><small>kesh bilan</small></div></div>
      </div>
      <p class="note">800K kod + 50K token · bir xil ish</p>
    </div>`,
  // 4 prices orbs
  (i, t) => `${top('Narx solishtiruv', i, t)}
    <div class="body">
      <h2 class="h2">K3 — <span class="g">arzonroq</span></h2>
      <div class="orbs">
        <div class="orbwrap"><div class="orb green"><b>$3</b></div><div class="olab">kirish / 1M</div></div>
        <div class="orbwrap"><div class="orb green2"><b>$15</b></div><div class="olab">chiqish / 1M</div></div>
      </div>
      <p class="note">Fable 5: <b class="c">$10 / $50</b> · ustiga K3'da 1M oyna</p>
    </div>`,
  // 5 route grid
  (i, t) => `${top('Nimani K3\'ga', i, t)}
    <div class="body">
      <h2 class="h2">Bularni <span class="g">K3</span> qiladi</h2>
      <div class="tiles">
        ${['Kod o\'qish', 'Fayl qidirish', 'Oddiy kod', 'Test', 'Hujjat', 'Katta repo'].map(x => `<div class="tile">${x}</div>`).join('')}
      </div>
    </div>`,
  // 6 methods
  (i, t) => `${top('3 ta yo\'l', i, t)}
    <div class="body">
      <h2 class="h2">K3'ni <span class="g">qanday ulash</span></h2>
      <div class="mcards">
        <div class="mc"><span class="mn">01</span><b>Kimi Code</b><span>tayyor dastur · $19/oy · eng oson</span></div>
        <div class="mc"><span class="mn">02</span><b>CC Switch</b><span>kichik GUI · K3 kalitini qo'shasiz</span></div>
        <div class="mc"><span class="mn">03</span><b>Orchestration</b><span>har rolga alohida model</span></div>
      </div>
    </div>`,
  // 7 flow
  (i, t) => `${top('Oddiy qoida', i, t)}
    <div class="body">
      <h2 class="h2"><span class="g">K3'dan</span> boshlang</h2>
      <div class="flow3">
        <div class="fn green"><span>Vazifa</span></div><div class="ar">→</div>
        <div class="fn green"><span>K3'da sina</span></div><div class="ar">→</div>
        <div class="fn green"><span>90% tayyor</span></div><div class="ar">→</div>
        <div class="fn coral"><span>10% Fable 5</span></div>
      </div>
      <p class="note">Ish 90% da K3 yetadi. Faqat eng og'irida Fable 5.</p>
    </div>`,
  // 8 cta
  (i, t) => `${top('Bepul qo\'llanma', i, t)}
    <div class="body ctab">
      <h2 class="h2">To'liq <span class="g">sozlash</span> kerakmi?</h2>
      <p class="p">3 usul · aniq qadamlar · yo'naltirish qoidasi</p>
      <div class="ctacard"><span>Izohga yozing:</span><b class="g">«K3»</b><span class="small">→ to'liq qo'llanma havolasi</span></div>
    </div>`,
];

const A_CSS = `
  .slide{--g:#1E9E57;--g2:#127a41;--c:#EC5F3E;--ink:#17251E;--mut:#5F7A6C;--panel:#FFFFFF;--line:#D8E7DE;
    width:${W}px;height:${H}px;position:relative;overflow:hidden;
    background:linear-gradient(165deg,#E7F4EC 0%,#FBFBF4 52%,#E4F2EA 100%);
    color:var(--ink);font-family:'Inter',sans-serif;padding:76px 74px 96px;display:flex;flex-direction:column;}
  .slide::before{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(30,158,87,.10) 1.5px,transparent 1.6px);background-size:42px 42px;opacity:.8;}
  .slide>*{position:relative;z-index:2;}
  .topbar{display:flex;justify-content:space-between;align-items:center;}
  .kick{font-family:'Space Grotesk';font-weight:600;font-size:25px;letter-spacing:.14em;text-transform:uppercase;color:var(--g);}
  .pg{font-weight:600;font-size:26px;color:var(--mut);letter-spacing:.1em;}
  .h1{font-family:'Space Grotesk';font-weight:700;font-size:96px;line-height:.98;letter-spacing:-.01em;margin:8px 0 0;}
  .h1 .g{color:var(--g);}
  .g{color:var(--g);} .c{color:var(--c);}
  .sub{font-size:38px;color:var(--mut);margin-top:26px;} .sub b{color:var(--ink);}
  .cov{flex:1;display:flex;flex-direction:column;justify-content:flex-end;}
  .swipe{margin-top:30px;font-family:'Space Grotesk';font-weight:600;font-size:27px;letter-spacing:.12em;text-transform:uppercase;color:var(--g);}
  /* soft grid floor */
  .grid3d{position:absolute;bottom:-40px;left:-30%;width:160%;height:52%;z-index:1;
    background-image:linear-gradient(rgba(30,158,87,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(30,158,87,.5) 1px,transparent 1px);
    background-size:66px 66px;transform:perspective(420px) rotateX(66deg);transform-origin:bottom center;opacity:.14;
    -webkit-mask-image:linear-gradient(transparent 8%,#000 60%);mask-image:linear-gradient(transparent 8%,#000 60%);}
  /* 3D cube */
  .scene{perspective:900px;height:230px;display:flex;align-items:center;margin:0 0 6px;}
  .cube{width:190px;height:190px;position:relative;transform-style:preserve-3d;transform:rotateX(-24deg) rotateY(-30deg);filter:drop-shadow(0 26px 30px rgba(30,158,87,.3));}
  .cube .f{position:absolute;width:190px;height:190px;display:flex;align-items:center;justify-content:center;
    font-family:'Space Grotesk';font-weight:700;font-size:78px;box-sizing:border-box;}
  .cube .fr{transform:translateZ(95px);background:linear-gradient(150deg,#43c47c,#1E9E57);color:#fff;box-shadow:inset 0 3px 0 rgba(255,255,255,.35);}
  .cube .tp{transform:rotateX(90deg) translateZ(95px);background:#63d493;}
  .cube .rt{transform:rotateY(90deg) translateZ(95px);background:#15784090;}
  .badge5{position:absolute;top:150px;right:70px;z-index:5;width:150px;height:150px;border-radius:50%;
    background:radial-gradient(circle at 35% 30%,#ffb39c,var(--c) 62%);color:#fff;
    display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Space Grotesk';font-weight:700;font-size:56px;
    box-shadow:0 22px 44px -8px rgba(236,95,62,.5),inset 0 -10px 20px rgba(0,0,0,.14),inset 0 8px 14px rgba(255,255,255,.4);transform:rotate(10deg);}
  .badge5 small{font-size:22px;font-weight:600;letter-spacing:.08em;margin-top:-6px;}
  /* body slides */
  .body{flex:1;display:flex;flex-direction:column;justify-content:center;}
  .h2{font-family:'Space Grotesk';font-weight:700;font-size:66px;line-height:1.06;margin:0 0 12px;}
  .p{font-size:37px;line-height:1.4;color:var(--mut);margin:14px 0;} .p b{color:var(--ink);}
  .note{margin-top:26px;font-size:30px;color:var(--mut);} .note b{color:var(--ink);}
  .glowline{width:120px;height:8px;border-radius:5px;background:var(--g);margin-bottom:24px;}
  .quote{margin-top:34px;font-family:'Space Grotesk';font-weight:600;font-size:44px;color:var(--g);line-height:1.15;}
  /* 3D bars */
  .bars3d{display:flex;gap:120px;justify-content:center;align-items:flex-end;height:440px;margin:20px 0 0;}
  .bcol{display:flex;flex-direction:column;align-items:center;gap:20px;}
  .bar{width:150px;border-radius:12px 12px 0 0;position:relative;}
  .bar.coral{background:linear-gradient(180deg,#ff8b6e,var(--c));box-shadow:14px 0 0 #c1462b, 0 18px 30px -8px rgba(236,95,62,.4);}
  .bar.green{background:linear-gradient(180deg,#5ed08e,var(--g));box-shadow:14px 0 0 #146c3b, 0 18px 30px -8px rgba(30,158,87,.4);}
  .bv{position:absolute;top:-56px;left:50%;transform:translateX(-50%);font-family:'Space Grotesk';font-weight:700;font-size:44px;color:var(--ink);white-space:nowrap;}
  .blab{font-size:30px;font-weight:600;text-align:center;} .blab small{color:var(--mut);font-weight:400;}
  /* orbs */
  .orbs{display:flex;gap:80px;justify-content:center;margin:34px 0;}
  .orbwrap{display:flex;flex-direction:column;align-items:center;gap:22px;}
  .orb{width:230px;height:230px;border-radius:50%;display:flex;align-items:center;justify-content:center;
    font-family:'Space Grotesk';font-weight:700;font-size:74px;color:#fff;}
  .orb.green{background:radial-gradient(circle at 34% 28%,#9df3bd,var(--g) 60%,#12723f 100%);box-shadow:0 30px 54px -10px rgba(30,158,87,.5),inset 0 -16px 30px rgba(0,0,0,.2),inset 0 14px 24px rgba(255,255,255,.35);}
  .orb.green2{background:radial-gradient(circle at 34% 28%,#8fe6b0,var(--g2) 60%,#0c5a31 100%);box-shadow:0 30px 54px -10px rgba(18,122,65,.5),inset 0 -16px 30px rgba(0,0,0,.2),inset 0 14px 24px rgba(255,255,255,.3);}
  .olab{font-size:30px;color:var(--mut);}
  /* tiles */
  .tiles{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:26px;}
  .tile{background:var(--panel);border:1.5px solid var(--line);
    border-radius:20px;padding:34px 30px;font-family:'Space Grotesk';font-weight:600;font-size:36px;color:var(--ink);
    box-shadow:0 16px 30px -16px rgba(30,158,87,.35),inset 0 -4px 0 rgba(30,158,87,.12);}
  /* method cards */
  .mcards{display:flex;flex-direction:column;gap:22px;margin-top:24px;}
  .mc{background:var(--panel);border:1.5px solid var(--line);border-radius:22px;padding:30px 34px;
    display:flex;flex-direction:column;gap:6px;position:relative;box-shadow:0 18px 34px -18px rgba(23,37,30,.35);}
  .mc .mn{position:absolute;right:30px;top:24px;font-family:'Space Grotesk';font-weight:700;font-size:52px;color:rgba(30,158,87,.24);}
  .mc b{font-family:'Space Grotesk';font-size:42px;color:var(--g);} .mc span{font-size:30px;color:var(--mut);}
  /* flow */
  .flow3{display:flex;align-items:center;justify-content:center;gap:14px;margin:34px 0;flex-wrap:wrap;}
  .fn{width:150px;height:150px;border-radius:24px;display:flex;align-items:center;justify-content:center;text-align:center;
    font-family:'Space Grotesk';font-weight:600;font-size:26px;padding:10px;transform:perspective(500px) rotateY(-14deg);}
  .fn.green{background:var(--panel);border:2px solid var(--g);color:var(--g);box-shadow:-12px 12px 0 rgba(30,158,87,.16);}
  .fn.coral{background:var(--panel);border:2px solid var(--c);color:var(--c);box-shadow:-12px 12px 0 rgba(236,95,62,.16);}
  .ar{font-size:44px;color:var(--mut);}
  /* cta */
  .ctab{justify-content:center;align-items:center;text-align:center;}
  .ctacard{margin-top:30px;background:var(--panel);border:2px solid rgba(30,158,87,.4);border-radius:26px;padding:40px 60px;display:flex;flex-direction:column;gap:10px;box-shadow:0 24px 44px -14px rgba(30,158,87,.35);}
  .ctacard b{font-family:'Space Grotesk';font-weight:700;font-size:82px;} .ctacard span{font-size:32px;color:var(--mut);} .ctacard .small{font-size:26px;}
  /* footer */
  .foot{position:absolute;left:74px;right:74px;bottom:46px;display:flex;align-items:center;justify-content:space-between;z-index:3;}
  .foot .fl{font-family:'Space Grotesk';font-weight:700;font-size:34px;color:var(--ink);} .foot .sp{color:var(--g);}
  .foot .fr{font-size:28px;color:var(--mut);}
  .dots{display:flex;gap:9px;} .dot{width:10px;height:10px;border-radius:50%;background:var(--mut);opacity:.35;} .dot.on{background:var(--g);opacity:1;width:26px;border-radius:5px;}
`;

/* ---------------- DECK B : CLAYMORPHISM ---------------- */
const clayBlocks = `<div class="floats">
  <div class="cb b1">🎮</div><div class="cb b2">💻</div><div class="cb b3">📊</div>
  <div class="cb b4">🧊</div><div class="orb o1"></div><div class="orb o2"></div></div>`;

const B_slides = [
  // 1 cover
  (i, t) => `${top('Kimi K3 · Bitta prompt', i, t)}
    ${clayBlocks}
    <div class="cov">
      <div class="num20">20</div>
      <h1 class="h1">narsa Kimi K3<br><span class="p1">bitta promptdan</span> quradi</h1>
      <p class="sub">ko'pchilik buni hali bilmaydi</p>
      <div class="swipe">suring →</div>
    </div>`,
  // 2 hook
  (i, t) => `${top('Nega bu muhim', i, t)}
    <div class="body">
      <div class="medal">🏆</div>
      <h2 class="h2">Frontend kodda<br><span class="p1">dunyoda #1</span></h2>
      <p class="p">Ko'r sinovda dasturchilar uni tanladi — <b>Fable 5 va Sol'dan ham oldinga</b>.</p>
    </div>`,
  // 3 what is K3
  (i, t) => `${top('60 soniyada', i, t)}
    <div class="body">
      <h2 class="h2">K3 <span class="p1">nima</span></h2>
      <div class="claystats">
        <div class="cs c-a"><b>2.8T</b><span>parametr · faqat 16tasi ishlaydi</span></div>
        <div class="cs c-b"><b>1M</b><span>kontekst · butun loyiha sig'adi</span></div>
      </div>
      <p class="note">Rasm va videoni <b>o'zi ko'radi</b> · doim fikrlaydi</p>
    </div>`,
  // 4 categories
  (i, t) => `${top('Nima quradi', i, t)}
    <div class="body">
      <h2 class="h2">Bitta promptdan — <span class="p1">tayyor</span></h2>
      <div class="ctiles">
        ${[['🎮', 'O\'yin & 3D', 'c1'], ['💻', 'Sayt & ilova', 'c2'], ['📊', 'Dashboard', 'c3'], ['🔀', 'Migratsiya', 'c4'], ['🤖', 'Agent', 'c5'], ['🖼️', 'Rasm tahlili', 'c6']].map(([e, l, c]) => `<div class="ct ${c}"><span class="ce">${e}</span><span class="cl">${l}</span></div>`).join('')}
      </div>
    </div>`,
  // 5 prompt game
  (i, t) => `${top('Misol · o\'yin', i, t)}
    <div class="body">
      <h2 class="h2">Brauzer <span class="p1">o'yini</span></h2>
      <div class="promptcard">
        <div class="pch"><span>⌨︎ Prompt</span><span class="pcopy">nusxa ol</span></div>
        <p>Bitta faylli brauzer o'yini yoz: yuqoridan ko'rinadigan arena. O'yinchi dushmanlardan qochib otadi. Harakat momentumi, urilish effekti, ochko va qayta boshlash tugmasi. 60fps, tashqi fayl yo'q.</p>
      </div>
    </div>`,
  // 6 prompt app
  (i, t) => `${top('Misol · ilova', i, t)}
    <div class="body">
      <h2 class="h2">To'liq <span class="p1">ilova</span></h2>
      <div class="promptcard">
        <div class="pch"><span>⌨︎ Prompt</span><span class="pcopy">nusxa ol</span></div>
        <p>Odat kuzatuvchi ilova qur. React + Node + Postgres + login. Ro'yxatdan o'tish, odat qo'shish, kunlik belgi, streak va haftalik hisobot. Avval baza, keyin API, keyin UI — hammasini ula.</p>
      </div>
    </div>`,
  // 7 multimodal
  (i, t) => `${top('Ko\'p tomonlama', i, t)}
    <div class="body">
      <h2 class="h2">Rasmdan <span class="p1">kodgacha</span></h2>
      <div class="mm">
        <div class="mmorb o-a">🖼️<span>Skrinshot → kod</span></div>
        <div class="mmorb o-b">📈<span>Grafikni o'qish</span></div>
        <div class="mmorb o-c">🎬<span>Videoni tushunish</span></div>
      </div>
    </div>`,
  // 8 warnings
  (i, t) => `${top('2 ta ogohlantirish', i, t)}
    <div class="body">
      <h2 class="h2">Buni <span class="p1">bilib</span> qo'ying</h2>
      <div class="warn w1"><b>1</b><p>Hamma ish uchun K3'ni default qilmang — mayda ishni u qimmatga «o'ylaydi». Oddiy ishni arzon modelga bering.</p></div>
      <div class="warn w2"><b>2</b><p>Ochiq vazn ≠ laptopda ishlaydi. U 1 TB'dan katta — ko'pchilik uchun «ishlatish» = ilova yoki API.</p></div>
    </div>`,
  // 9 cta
  (i, t) => `${top('Bepul qo\'llanma', i, t)}
    <div class="body ctab">
      <h2 class="h2">20ta promptning <span class="p1">hammasi?</span></h2>
      <p class="p">Barcha misollar + tayyor promptlar</p>
      <div class="claycta"><span>Izohga yozing:</span><b>«BUILD»</b><span class="small">→ to'liq qo'llanma havolasi</span></div>
    </div>`,
];

const B_CSS = `
  .slide{--p1:#7C5CFF;--p2:#FF7AB6;--a:#37B6A6;--y:#FFB03A;--ink:#2A2740;--mut:#7B7690;
    width:${W}px;height:${H}px;position:relative;overflow:hidden;
    background:linear-gradient(160deg,#F4EEFF 0%,#FDF3EC 52%,#EAF7F4 100%);
    color:var(--ink);font-family:'Fredoka',sans-serif;padding:76px 74px 96px;display:flex;flex-direction:column;}
  .slide>*{position:relative;z-index:2;}
  .topbar{display:flex;justify-content:space-between;align-items:center;}
  .kick{font-family:'Fredoka';font-weight:600;font-size:25px;letter-spacing:.1em;text-transform:uppercase;color:var(--p1);}
  .pg{font-weight:600;font-size:26px;color:var(--mut);letter-spacing:.08em;}
  .cov{flex:1;display:flex;flex-direction:column;justify-content:flex-end;}
  .h1{font-family:'Fredoka';font-weight:700;font-size:88px;line-height:1.0;margin:6px 0 0;color:var(--ink);}
  .h1 .p1{color:var(--p1);} .p1{color:var(--p1);}
  .sub{font-size:38px;color:var(--mut);margin-top:22px;font-weight:500;}
  .swipe{margin-top:28px;font-weight:600;font-size:27px;letter-spacing:.06em;text-transform:uppercase;color:var(--p1);}
  .num20{font-family:'Fredoka';font-weight:700;font-size:150px;line-height:.8;color:var(--p1);
    text-shadow:6px 6px 0 #E4D8FF, 12px 12px 24px rgba(124,92,255,.25);}
  /* floating clay */
  .floats{position:absolute;inset:0;z-index:1;}
  .cb{position:absolute;border-radius:28px;display:flex;align-items:center;justify-content:center;font-size:64px;
    box-shadow:0 22px 40px -10px rgba(0,0,0,.22),inset 0 -8px 14px rgba(0,0,0,.12),inset 0 8px 12px rgba(255,255,255,.6);}
  .cb.b1{width:150px;height:150px;top:120px;right:90px;background:#C9B8FF;transform:rotate(-10deg);}
  .cb.b2{width:130px;height:130px;top:300px;right:300px;background:#9EE6DC;transform:rotate(8deg);}
  .cb.b3{width:140px;height:140px;top:250px;right:120px;background:#FFC7DE;transform:rotate(14deg);}
  .cb.b4{width:120px;height:120px;top:430px;right:280px;background:#FFD98A;transform:rotate(-6deg);}
  .orb{position:absolute;border-radius:50%;}
  .orb.o1{width:90px;height:90px;top:180px;right:250px;background:radial-gradient(circle at 34% 30%,#fff,#FF9EC8 65%);box-shadow:0 16px 30px -6px rgba(255,122,182,.5);}
  .orb.o2{width:70px;height:70px;top:470px;right:120px;background:radial-gradient(circle at 34% 30%,#fff,#8FE0D4 65%);box-shadow:0 14px 26px -6px rgba(55,182,166,.5);}
  /* body */
  .body{flex:1;display:flex;flex-direction:column;justify-content:center;}
  .h2{font-family:'Fredoka';font-weight:700;font-size:70px;line-height:1.05;margin:0 0 14px;}
  .p{font-size:37px;line-height:1.42;color:var(--mut);font-weight:500;margin:12px 0;} .p b{color:var(--ink);}
  .note{margin-top:24px;font-size:31px;color:var(--mut);font-weight:500;} .note b{color:var(--ink);}
  .medal{font-size:120px;filter:drop-shadow(0 18px 26px rgba(255,176,58,.5));margin-bottom:10px;}
  /* clay stats */
  .claystats{display:flex;gap:28px;margin:24px 0;}
  .cs{flex:1;border-radius:30px;padding:40px 34px;box-shadow:0 24px 44px -12px rgba(0,0,0,.2),inset 0 -8px 16px rgba(0,0,0,.10),inset 0 8px 14px rgba(255,255,255,.7);}
  .cs.c-a{background:#D9CCFF;} .cs.c-b{background:#B9EDE4;}
  .cs b{display:block;font-family:'Fredoka';font-weight:700;font-size:84px;color:var(--ink);line-height:1;}
  .cs span{font-size:28px;color:#5b5570;font-weight:500;}
  /* clay tiles */
  .ctiles{display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;margin-top:26px;}
  .ct{border-radius:28px;padding:34px 16px;display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;
    box-shadow:0 20px 38px -12px rgba(0,0,0,.2),inset 0 -7px 14px rgba(0,0,0,.1),inset 0 7px 12px rgba(255,255,255,.65);}
  .ct .ce{font-size:60px;} .ct .cl{font-size:29px;font-weight:600;color:var(--ink);}
  .ct.c1{background:#C9B8FF;} .ct.c2{background:#9EE6DC;} .ct.c3{background:#FFC7DE;} .ct.c4{background:#FFD98A;} .ct.c5{background:#B8D8FF;} .ct.c6{background:#FFB9A3;}
  /* prompt card 3D */
  .promptcard{margin-top:22px;background:#221E38;border-radius:28px;padding:0 0 30px;overflow:hidden;
    box-shadow:0 30px 50px -14px rgba(34,30,56,.5),inset 0 8px 16px rgba(255,255,255,.06);transform:perspective(1200px) rotateX(3deg);}
  .pch{display:flex;justify-content:space-between;align-items:center;background:#191531;padding:22px 30px;color:#B9AEF0;font-weight:600;font-size:28px;}
  .pch .pcopy{color:#8B80C8;font-size:24px;}
  .promptcard p{color:#E9E4FF;font-family:'Inter',sans-serif;font-size:30px;line-height:1.5;padding:26px 34px 0;margin:0;}
  /* multimodal orbs */
  .mm{display:flex;gap:26px;justify-content:center;margin-top:30px;}
  .mmorb{width:250px;border-radius:30px;padding:40px 18px;display:flex;flex-direction:column;align-items:center;gap:18px;font-size:70px;text-align:center;
    box-shadow:0 24px 44px -12px rgba(0,0,0,.2),inset 0 -8px 16px rgba(0,0,0,.1),inset 0 8px 14px rgba(255,255,255,.7);}
  .mmorb span{font-family:'Fredoka';font-size:28px;font-weight:600;color:var(--ink);}
  .mmorb.o-a{background:#C9B8FF;} .mmorb.o-b{background:#9EE6DC;} .mmorb.o-c{background:#FFC7DE;}
  /* warnings */
  .warn{display:flex;gap:24px;align-items:flex-start;border-radius:26px;padding:30px 32px;margin-top:22px;
    box-shadow:0 20px 38px -14px rgba(0,0,0,.18),inset 0 -6px 12px rgba(0,0,0,.08),inset 0 6px 12px rgba(255,255,255,.6);}
  .warn.w1{background:#FFDCD2;} .warn.w2{background:#DCE8FF;}
  .warn b{flex:0 0 auto;width:60px;height:60px;border-radius:50%;background:var(--ink);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Fredoka';font-weight:700;font-size:34px;}
  .warn p{margin:0;font-size:30px;line-height:1.36;color:#40384f;font-weight:500;}
  /* cta */
  .ctab{justify-content:center;align-items:center;text-align:center;}
  .claycta{margin-top:28px;background:#C9B8FF;border-radius:32px;padding:44px 62px;display:flex;flex-direction:column;gap:10px;
    box-shadow:0 26px 46px -12px rgba(124,92,255,.45),inset 0 -9px 18px rgba(0,0,0,.12),inset 0 9px 16px rgba(255,255,255,.7);}
  .claycta b{font-family:'Fredoka';font-weight:700;font-size:84px;color:var(--ink);} .claycta span{font-size:32px;color:#5b5570;font-weight:500;} .claycta .small{font-size:26px;}
  /* footer */
  .foot{position:absolute;left:74px;right:74px;bottom:46px;display:flex;align-items:center;justify-content:space-between;z-index:3;}
  .foot .fl{font-family:'Fredoka';font-weight:700;font-size:34px;color:var(--ink);} .foot .sp{color:var(--p1);}
  .foot .fr{font-size:28px;color:var(--mut);}
  .dots{display:flex;gap:9px;} .dot{width:10px;height:10px;border-radius:50%;background:var(--mut);opacity:.4;} .dot.on{background:var(--p1);opacity:1;width:26px;border-radius:5px;}
`;

function page(css, slidesArr, footCls) {
  const total = slidesArr.length;
  const body = slidesArr.map((fn, i) => `<section class="slide">${fn(i, total)}${foot('AI Strateg', '@kodiyusufbay', i, total, footCls)}</section>`).join('\n');
  return `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}*{margin:0;padding:0;box-sizing:border-box;}body{background:#000;}${css}</style></head><body>${body}</body></html>`;
}

async function render(html, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  const pg = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  await pg.setContent(html, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts && document.fonts.ready);
  const slides = await pg.$$('.slide');
  const files = [];
  for (let i = 0; i < slides.length; i++) {
    const f = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    await slides[i].screenshot({ path: f });
    files.push(f);
  }
  await browser.close();
  return files;
}

(async () => {
  const a = await render(page(A_CSS, A_slides, 'da'), 'engine/out/3d-a');
  console.log('A:', a.length);
  const b = await render(page(B_CSS, B_slides, 'db'), 'engine/out/3d-b');
  console.log('B:', b.length);
})();
