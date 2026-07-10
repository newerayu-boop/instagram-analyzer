// engine/templates/carousel.js
// Генератор HTML-каруселей в жирном инфо-стиле («тимочко»).
// Принимает объект carousel { handle, slides: [...] } и возвращает
// самодостаточный HTML, где каждый .slide — отдельная страница 1080x1350 (4:5).
//
// Типы слайдов:
//   cover   { kicker, title, highlight, subtitle }
//   content { index, total, title, body, bullets:[...] }
//   quote   { text, source }
//   cta     { title, body, action }
//
// Стиль настраивается через объект theme (цвета/шрифты/лого) —
// сюда позже подставим реальные бренд-ассеты пользователя.

const DEFAULT_THEME = {
  bg: '#0B0B0F',
  bgAlt: '#141419',
  fg: '#FFFFFF',
  muted: '#9A9AA7',
  accent: '#C6F542',      // электрик-лайм — легко заменить на бренд-цвет
  accentInk: '#0B0B0F',
  fontHead: "'Montserrat', sans-serif",
  fontBody: "'Inter', sans-serif",
  handle: '@your_handle',
  logoDataUri: null,       // сюда позже: data:image/png;base64,...
};

const WIDTH = 1080;
const HEIGHT = 1350;

function esc(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Подсветка ключевых слов вида **слово** → цветной маркер
function mark(text = '', accent) {
  return esc(text).replace(
    /\*\*(.+?)\*\*/g,
    `<span style="color:${accent}">$1</span>`
  );
}

function footer(theme, index, total) {
  const dots = Array.from({ length: total }, (_, i) =>
    `<span class="dot ${i === index ? 'on' : ''}"></span>`
  ).join('');
  const logo = theme.logoDataUri
    ? `<img class="logo" src="${theme.logoDataUri}" alt="">`
    : `<span class="handle">${esc(theme.handle)}</span>`;
  return `
    <div class="footer">
      <div class="dots">${dots}</div>
      ${logo}
    </div>`;
}

function swipeCue(theme, label = 'Surg') {
  return `<div class="swipe">${esc(label)} <span class="arrow">→</span></div>`;
}

function renderSlide(slide, i, total, theme) {
  const f = footer(theme, i, total);
  switch (slide.type) {
    case 'cover':
      return `
      <section class="slide cover">
        ${slide.kicker ? `<div class="kicker">${esc(slide.kicker)}</div>` : ''}
        <h1 class="cover-title">
          ${mark(slide.title, theme.accent)}
          ${slide.highlight ? `<span class="hl">${esc(slide.highlight)}</span>` : ''}
        </h1>
        ${slide.subtitle ? `<p class="cover-sub">${mark(slide.subtitle, theme.accent)}</p>` : ''}
        ${swipeCue(theme, slide.swipe || 'Surg')}
        ${f}
      </section>`;

    case 'quote':
      return `
      <section class="slide quote">
        <div class="qmark">“</div>
        <blockquote>${mark(slide.text, theme.accent)}</blockquote>
        ${slide.source ? `<div class="qsource">— ${esc(slide.source)}</div>` : ''}
        ${f}
      </section>`;

    case 'cta':
      return `
      <section class="slide cta">
        <h2 class="cta-title">${mark(slide.title, theme.accent)}</h2>
        ${slide.body ? `<p class="cta-body">${mark(slide.body, theme.accent)}</p>` : ''}
        ${slide.action ? `<div class="cta-btn">${esc(slide.action)}</div>` : ''}
        ${f}
      </section>`;

    case 'content':
    default: {
      const bullets = (slide.bullets || [])
        .map(b => `<li>${mark(b, theme.accent)}</li>`)
        .join('');
      return `
      <section class="slide content">
        <div class="num">${String((slide.index ?? i)).padStart(2, '0')}</div>
        ${slide.title ? `<h2 class="c-title">${mark(slide.title, theme.accent)}</h2>` : ''}
        ${slide.body ? `<p class="c-body">${mark(slide.body, theme.accent)}</p>` : ''}
        ${bullets ? `<ul class="c-list">${bullets}</ul>` : ''}
        ${f}
      </section>`;
    }
  }
}

function buildHTML(carousel, themeOverride = {}) {
  const theme = { ...DEFAULT_THEME, ...themeOverride };
  const slides = carousel.slides || [];
  const total = slides.length;
  const body = slides.map((s, i) => renderSlide(s, i, total, theme)).join('\n');

  return `<!doctype html>
<html lang="uz">
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#000; }
  .slide {
    width:${WIDTH}px; height:${HEIGHT}px;
    position:relative; overflow:hidden;
    background:${theme.bg};
    color:${theme.fg};
    font-family:${theme.fontBody};
    padding:96px 88px 120px;
    display:flex; flex-direction:column;
  }
  /* лёгкая текстура/градиент для «дорогого» вида */
  .slide::before{
    content:''; position:absolute; inset:0;
    background:
      radial-gradient(1200px 600px at 80% -10%, ${theme.accent}14, transparent 60%),
      radial-gradient(900px 500px at -10% 110%, #ffffff08, transparent 60%);
    pointer-events:none;
  }
  .slide > * { position:relative; z-index:1; }

  .kicker{
    font-family:${theme.fontHead}; font-weight:800; font-size:30px;
    letter-spacing:.22em; text-transform:uppercase; color:${theme.accent};
    margin-bottom:36px;
  }
  .cover-title{
    font-family:${theme.fontHead}; font-weight:900; line-height:1.02;
    font-size:118px; letter-spacing:-0.02em; margin-top:auto;
  }
  .cover-title .hl{
    display:inline-block; margin-top:18px;
    background:${theme.accent}; color:${theme.accentInk};
    padding:6px 20px; border-radius:14px;
  }
  .cover-sub{ font-size:40px; color:${theme.muted}; margin-top:34px; max-width:820px; }

  .num{
    font-family:${theme.fontHead}; font-weight:900; font-size:150px;
    color:${theme.accent}; line-height:.8; opacity:.9; margin-bottom:8px;
  }
  .c-title{ font-family:${theme.fontHead}; font-weight:800; font-size:80px; line-height:1.06; letter-spacing:-0.01em; }
  .c-body{ font-size:42px; line-height:1.4; color:#E7E7EE; margin-top:30px; }
  .c-list{ list-style:none; margin-top:38px; display:flex; flex-direction:column; gap:26px; }
  .c-list li{
    font-size:40px; line-height:1.35; padding-left:56px; position:relative; color:#EDEDF3;
  }
  .c-list li::before{
    content:''; position:absolute; left:0; top:16px;
    width:26px; height:26px; border-radius:8px; background:${theme.accent};
  }

  .quote{ justify-content:center; }
  .qmark{ font-family:${theme.fontHead}; font-weight:900; font-size:220px; color:${theme.accent}; line-height:.6; }
  blockquote{ font-family:${theme.fontHead}; font-weight:800; font-size:76px; line-height:1.12; margin-top:10px; }
  .qsource{ font-size:36px; color:${theme.muted}; margin-top:40px; }

  .cta{ justify-content:center; align-items:flex-start; }
  .cta-title{ font-family:${theme.fontHead}; font-weight:900; font-size:96px; line-height:1.03; }
  .cta-body{ font-size:44px; color:#E7E7EE; margin-top:28px; }
  .cta-btn{
    margin-top:56px; background:${theme.accent}; color:${theme.accentInk};
    font-family:${theme.fontHead}; font-weight:800; font-size:44px;
    padding:26px 46px; border-radius:20px;
  }

  .swipe{
    margin-top:40px;
    font-family:${theme.fontHead}; font-weight:800; font-size:34px; color:${theme.accent};
    display:inline-flex; align-items:center; gap:14px; align-self:flex-start;
  }

  .footer{
    position:absolute; left:88px; right:88px; bottom:64px;
    display:flex; align-items:center; justify-content:space-between;
  }
  .dots{ display:flex; gap:12px; }
  .dot{ width:16px; height:16px; border-radius:50%; background:#ffffff26; }
  .dot.on{ background:${theme.accent}; width:44px; border-radius:10px; }
  .handle{ font-family:${theme.fontHead}; font-weight:700; font-size:32px; color:${theme.muted}; }
  .logo{ height:52px; }
</style>
</head>
<body>
${body}
</body>
</html>`;
}

module.exports = { buildHTML, DEFAULT_THEME, WIDTH, HEIGHT };
