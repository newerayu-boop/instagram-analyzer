// engine/templates/carousel.js
// Генератор HTML-каруселей в фирменном стиле «AI Strateg»:
// чёрный фон, тёплое золото, крупная serif-типографика с италиками.
// Референс: премиальный редакторский стиль @kodiyusufbay.
//
// carousel = { handle, avatarDataUri?, theme?, slides: [...] }
//
// Типы слайдов:
//   cover   { kicker, title, swipe }          — жирный SANS uppercase, золотой акцент
//   story   { kicker, title, paragraphs:[], punch? } — serif заголовок + абзацы
//   list    { kicker, title, items:[{n,text}], callout? }
//   callout { kicker, title, text }            — цитата/вывод с золотой полосой
//   cta     { kicker, title, body, action, url } — финал с лид-магнитом
//
// Разметка внутри текста:
//   *слово*  → золотой курсив (serif emphasis)
//   **слово** → жирный акцент

const DEFAULT_THEME = {
  bg: '#0B0A08',
  fg: '#F4F1EA',
  muted: '#8C8578',
  gold: '#C6A15B',
  goldLite: '#D8B979',
  line: '#2A2620',
  serif: "'Playfair Display', Georgia, serif",
  sans: "'Inter', system-ui, sans-serif",
  wordmark: 'AI Strateg',
  handle: '@kodiyusufbay',
  avatarDataUri: null,
};

const WIDTH = 1080;
const HEIGHT = 1350;

function esc(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// **bold** и *gold italic*
function inline(text = '') {
  let s = esc(text);
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*(.+?)\*/g, '<em class="gold">$1</em>');
  return s;
}

function avatar(theme) {
  if (theme.avatarDataUri) {
    return `<span class="ava"><img src="${theme.avatarDataUri}" alt=""></span>`;
  }
  return `<span class="ava ava-ph">Yu</span>`;
}

function footer(theme, index, total) {
  const dots = Array.from({ length: total }, (_, i) =>
    `<span class="dot ${i === index ? 'on' : ''}"></span>`).join('');
  return `
    <div class="footer">
      <div class="brand">
        <span class="wordmark">${esc(theme.wordmark)}</span>
        <div class="dots">${dots}</div>
      </div>
      <div class="brand brand-r">
        <span class="handle">${esc(theme.handle)}</span>
        <span class="brand-ava">${theme.avatarDataUri ? `<img src="${theme.avatarDataUri}" alt="">` : 'Yu'}</span>
      </div>
    </div>`;
}

function kicker(text, theme) {
  if (!text) return '';
  return `<div class="kicker"><span class="dash"></span>${esc(text)}</div>`;
}

function renderSlide(slide, i, total, theme) {
  const f = footer(theme, i, total);
  switch (slide.type) {
    case 'cover':
      return `
      <section class="slide cover">
        <div class="top">
          ${kicker(slide.kicker, theme)}
          ${avatar(theme)}
        </div>
        <h1 class="cover-title">${inline(slide.title)}</h1>
        ${slide.swipe ? `<div class="swipe">${esc(slide.swipe)} <span>→</span></div>` : ''}
        ${f}
      </section>`;

    case 'list': {
      const items = (slide.items || []).map(it => `
        <div class="row">
          <div class="row-n">${esc(it.n)}</div>
          <div class="row-t">${inline(it.text)}</div>
        </div>`).join('<div class="row-div"></div>');
      return `
      <section class="slide">
        ${kicker(slide.kicker, theme)}
        ${slide.title ? `<h2 class="serif-h">${inline(slide.title)}</h2>` : ''}
        <div class="rows">${items}</div>
        ${slide.callout ? `<div class="callout"><span class="bar"></span><p>${inline(slide.callout)}</p></div>` : ''}
        ${f}
      </section>`;
    }

    case 'callout':
      return `
      <section class="slide mid">
        ${kicker(slide.kicker, theme)}
        ${slide.title ? `<h2 class="serif-h">${inline(slide.title)}</h2>` : ''}
        <div class="callout big"><span class="bar"></span><p>${inline(slide.text)}</p></div>
        ${f}
      </section>`;

    case 'cta':
      return `
      <section class="slide mid">
        ${kicker(slide.kicker, theme)}
        <h2 class="serif-h">${inline(slide.title)}</h2>
        ${slide.body ? `<p class="body">${inline(slide.body)}</p>` : ''}
        ${slide.action ? `<div class="cta-btn">${esc(slide.action)}</div>` : ''}
        ${slide.url ? `<div class="cta-url">${esc(slide.url)}</div>` : ''}
        ${f}
      </section>`;

    case 'story':
    default: {
      const paras = (slide.paragraphs || []).map(p => `<p class="body">${inline(p)}</p>`).join('');
      return `
      <section class="slide">
        ${kicker(slide.kicker, theme)}
        ${slide.title ? `<h2 class="serif-h">${inline(slide.title)}</h2>` : ''}
        <div class="paras">${paras}</div>
        ${slide.punch ? `<div class="punch">${inline(slide.punch)}</div>` : ''}
        ${f}
      </section>`;
    }
  }
}

function buildHTML(carousel, themeOverride = {}) {
  const theme = { ...DEFAULT_THEME, ...themeOverride };
  if (carousel.avatarDataUri) theme.avatarDataUri = carousel.avatarDataUri;
  if (carousel.handle) theme.handle = carousel.handle;
  const slides = carousel.slides || [];
  const total = slides.length;
  const body = slides.map((s, i) => renderSlide(s, i, total, theme)).join('\n');

  return `<!doctype html>
<html lang="uz"><head><meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700;1,800&family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{
    width:${WIDTH}px;height:${HEIGHT}px;position:relative;overflow:hidden;
    background:${theme.bg};color:${theme.fg};font-family:${theme.sans};
    padding:88px 84px 108px;display:flex;flex-direction:column;
  }
  .slide::before{content:'';position:absolute;inset:0;pointer-events:none;
    background:radial-gradient(1100px 520px at 88% -8%, ${theme.gold}1f, transparent 62%);}
  .slide>*{position:relative;z-index:1;}
  .mid{justify-content:center;}

  /* kicker */
  .kicker{display:flex;align-items:center;gap:20px;font-family:${theme.sans};
    font-weight:700;font-size:25px;letter-spacing:.24em;text-transform:uppercase;
    color:${theme.gold};margin-bottom:34px;}
  .kicker .dash{width:44px;height:3px;background:${theme.gold};display:inline-block;}

  /* top row (cover) */
  .top{display:flex;align-items:flex-start;justify-content:space-between;}
  .top .kicker{margin-bottom:0;}
  .ava{width:96px;height:96px;border-radius:50%;overflow:hidden;flex:0 0 auto;
    border:2px solid ${theme.gold};display:flex;align-items:center;justify-content:center;
    background:#17140F;}
  .ava img{width:100%;height:100%;object-fit:cover;}
  .ava-ph{font-family:${theme.serif};font-style:italic;font-weight:700;font-size:44px;color:${theme.gold};}

  /* cover headline: heavy sans uppercase */
  .cover-title{margin-top:auto;font-family:${theme.sans};font-weight:900;
    font-size:118px;line-height:.98;letter-spacing:-0.02em;text-transform:uppercase;}
  .cover-title strong{font-weight:900;}
  .cover-title em.gold{font-style:normal;color:${theme.gold};}

  .swipe{margin-top:44px;align-self:flex-start;font-family:${theme.sans};font-weight:700;
    font-size:26px;letter-spacing:.16em;text-transform:uppercase;color:${theme.muted};}
  .swipe span{color:${theme.gold};}

  /* serif headline (inner) */
  .serif-h{font-family:${theme.serif};font-weight:700;font-size:92px;line-height:1.04;
    letter-spacing:-0.01em;margin-bottom:14px;}
  .serif-h em.gold{font-style:italic;color:${theme.gold};}
  .serif-h strong{font-weight:800;}

  /* body */
  .paras{margin-top:26px;display:flex;flex-direction:column;gap:34px;}
  .body{font-family:${theme.sans};font-weight:400;font-size:41px;line-height:1.42;color:#D7D2C6;}
  .body strong{color:${theme.fg};font-weight:700;}
  .body em.gold{font-style:italic;color:${theme.gold};font-family:${theme.serif};}

  .punch{margin-top:auto;font-family:${theme.serif};font-style:italic;font-weight:700;
    font-size:76px;color:${theme.gold};}

  /* numbered list */
  .rows{margin-top:36px;display:flex;flex-direction:column;}
  .row{display:flex;gap:44px;align-items:flex-start;padding:34px 0;}
  .row-n{font-family:${theme.serif};font-style:italic;font-weight:700;font-size:70px;
    color:${theme.gold};line-height:1;flex:0 0 auto;min-width:120px;}
  .row-t{font-family:${theme.sans};font-size:40px;line-height:1.36;color:#D7D2C6;padding-top:8px;}
  .row-t strong{color:${theme.fg};font-weight:700;}
  .row-div{height:1px;background:${theme.line};}

  /* callout */
  .callout{margin-top:auto;display:flex;gap:28px;align-items:stretch;}
  .callout .bar{width:5px;background:${theme.gold};flex:0 0 auto;border-radius:3px;}
  .callout p{font-family:${theme.sans};font-size:40px;line-height:1.36;color:#D7D2C6;padding:6px 0;}
  .callout p strong{color:${theme.goldLite};font-weight:700;}
  .callout.big p{font-family:${theme.serif};font-style:italic;font-weight:700;font-size:66px;
    line-height:1.14;color:${theme.fg};}
  .callout.big p strong{color:${theme.gold};}

  /* cta */
  .cta-btn{margin-top:52px;align-self:flex-start;background:${theme.gold};color:#0B0A08;
    font-family:${theme.sans};font-weight:800;font-size:40px;padding:26px 46px;border-radius:16px;}
  .cta-url{margin-top:26px;font-family:${theme.sans};font-weight:600;font-size:32px;color:${theme.muted};}

  /* footer */
  .footer{position:absolute;left:84px;right:84px;bottom:52px;display:flex;align-items:center;
    justify-content:space-between;}
  .brand{display:flex;align-items:center;gap:18px;}
  .brand-r{gap:16px;}
  .brand-ava{width:56px;height:56px;border-radius:50%;overflow:hidden;background:#17140F;
    border:2px solid ${theme.gold};display:inline-flex;align-items:center;justify-content:center;
    font-family:${theme.serif};font-style:italic;font-weight:700;font-size:26px;color:${theme.gold};}
  .brand-ava img{width:100%;height:100%;object-fit:cover;}
  .wordmark{font-family:${theme.serif};font-weight:700;font-size:36px;color:${theme.fg};}
  .handle{font-family:${theme.sans};font-weight:600;font-size:30px;color:${theme.muted};}
  .dots{display:flex;gap:11px;}
  .dot{width:12px;height:12px;border-radius:50%;background:#ffffff26;}
  .dot.on{background:${theme.gold};width:30px;border-radius:6px;}
</style></head>
<body>
${body}
</body></html>`;
}

module.exports = { buildHTML, DEFAULT_THEME, WIDTH, HEIGHT };
