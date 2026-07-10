// engine/templates/carousel.js  (v2 — «rich» блоки)
// Наполненные карусели в стиле AI Strateg / @kodiyusufbay.
// Две темы: light (кремовый + терракота, по умолчанию) и dark (чёрный + золото).
//
// carousel = { handle, wordmark?, avatarDataUri?, theme?:{mode}, slides:[...] }
//
// Типы слайдов (blocks):
//   cover   { kicker, title, sub, art }            art: 'robot'|'spark'|'bolt'
//   stat    { kicker, title, stats:[{big,label}] }
//   steps   { kicker, title, items:[{n,text}], note? }
//   prompt  { kicker, title, body, prompt, label? } — готовый промпт в тёмной плашке
//   mockup  { kicker, title, body, window:{name, rows:[{t,tag}]} } — «окно приложения»
//   callout { kicker, title, text }
//   cta     { kicker, title, body, keyword, action, url }
//
// Инлайн-разметка: *акцент* (цвет), **жирный**

const THEMES = {
  light: {
    bg: '#E7E3DA', panel: '#F3F0E9', ink: '#23211C', muted: '#6F6B61',
    accent: '#C8613B', accentSoft: '#EAD3C4', dark: '#181712', line: '#D7D2C6',
    onDark: '#F3F0E9',
  },
  dark: {
    bg: '#0B0A08', panel: '#16130E', ink: '#F4F1EA', muted: '#8C8578',
    accent: '#C6A15B', accentSoft: '#3a3323', dark: '#000000', line: '#2A2620',
    onDark: '#F4F1EA',
  },
};
const BASE = {
  serif: "'Playfair Display', Georgia, serif",
  sans: "'Inter', system-ui, sans-serif",
  wordmark: 'AI Strateg', handle: '@kodiyusufbay', avatarDataUri: null,
};

const WIDTH = 1080, HEIGHT = 1350;
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function inline(t = '') {
  return esc(t)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="acc">$1</em>');
}

// ---------- декоративные SVG ----------
function art(kind, c) {
  const s = c.accent;
  if (kind === 'spark') return `
    <svg class="art" viewBox="0 0 200 200" fill="none">
      ${Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2, r1 = 34, r2 = i % 2 ? 92 : 74;
        const x1 = 100 + Math.cos(a) * r1, y1 = 100 + Math.sin(a) * r1;
        const x2 = 100 + Math.cos(a) * r2, y2 = 100 + Math.sin(a) * r2;
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${s}" stroke-width="9" stroke-linecap="round"/>`;
      }).join('')}
      <circle cx="100" cy="100" r="26" fill="${s}"/>
    </svg>`;
  if (kind === 'bolt') return `
    <svg class="art" viewBox="0 0 200 200" fill="none">
      <path d="M118 20 L60 110 H100 L82 180 L150 80 H108 Z" fill="${s}"/>
    </svg>`;
  // robot (line-art, как в референсе)
  return `
    <svg class="art" viewBox="0 0 220 220" fill="none" stroke="${s}" stroke-width="4">
      <rect x="58" y="70" width="104" height="86" rx="22"/>
      <circle cx="90" cy="112" r="11" fill="${s}" stroke="none"/>
      <circle cx="130" cy="112" r="11" fill="none"/>
      <path d="M88 138 h44" stroke-linecap="round"/>
      <line x1="110" y1="46" x2="110" y2="70"/>
      <circle cx="110" cy="40" r="9" fill="${s}" stroke="none"/>
      <path d="M58 100 H30 M58 126 H36" stroke-linecap="round"/>
      <path d="M162 100 h34 M162 126 h26" stroke-linecap="round"/>
      <circle cx="24" cy="100" r="7" fill="${s}" stroke="none"/>
      <circle cx="200" cy="100" r="7" fill="${s}" stroke="none"/>
      <rect x="80" y="156" width="60" height="30" rx="8"/>
    </svg>`;
}

const kicker = (t, c) => t ? `<div class="kicker"><span class="dash"></span>${esc(t)}</div>` : '';

function footer(c, i, total) {
  const dots = Array.from({ length: total }, (_, k) =>
    `<span class="dot ${k === i ? 'on' : ''}"></span>`).join('');
  const ava = c.avatarDataUri
    ? `<span class="fava"><img src="${c.avatarDataUri}"></span>`
    : `<span class="fava ph">Yu</span>`;
  return `<div class="footer">
      <div class="fl"><span class="spark">✳</span><span class="wm">${esc(c.wordmark)}</span><span class="dots">${dots}</span></div>
      <div class="fr"><span class="hnd">${esc(c.handle)}</span>${ava}</div>
    </div>`;
}

function promptBox(text, label, c) {
  return `<div class="pbox">
     <div class="pbox-h"><span class="dash sm"></span>${esc(label || 'TAYYOR PROMPT')}<span class="copy">⧉</span></div>
     <div class="pbox-t">${inline(text)}</div>
   </div>`;
}

function windowMock(w, c) {
  const rows = (w.rows || []).map(r => `
    <div class="wrow"><span class="wt">${inline(r.t)}</span>${r.tag ? `<span class="wtag ${r.tag.k || ''}">${esc(r.tag.v || r.tag)}</span>` : ''}</div>`).join('');
  return `<div class="mock">
     <div class="mock-bar"><span></span><span></span><span></span><b>${esc(w.name || 'AI')}</b></div>
     <div class="mock-body">${rows}</div>
   </div>`;
}

function slide(s, i, total, c) {
  const f = footer(c, i, total);
  const k = kicker(s.kicker, c);
  switch (s.type) {
    case 'cover':
      return `<section class="slide cover">
        <div class="top">${k}<span class="page">${String(i + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}</span></div>
        <div class="cover-art">${art(s.art || 'robot', c)}</div>
        <h1 class="cover-title">${inline(s.title)}</h1>
        ${s.sub ? `<p class="cover-sub">${inline(s.sub)}</p>` : ''}
        ${s.swipe ? `<div class="swipe">${esc(s.swipe)} <span>→</span></div>` : ''}
        ${f}</section>`;

    case 'stat': {
      const cards = (s.stats || []).map(st => `
        <div class="scard"><div class="sbig">${inline(st.big)}</div><div class="slab">${inline(st.label)}</div></div>`).join('');
      return `<section class="slide">
        ${k}${s.title ? `<h2 class="h">${inline(s.title)}</h2>` : ''}
        <div class="scards">${cards}</div>
        ${s.note ? `<div class="callout"><span class="bar"></span><p>${inline(s.note)}</p></div>` : ''}
        ${f}</section>`;
    }

    case 'steps': {
      const rows = (s.items || []).map(it => `
        <div class="step"><span class="badge">${esc(it.n)}</span><div class="stext">${inline(it.text)}</div></div>`).join('');
      return `<section class="slide">
        ${k}${s.title ? `<h2 class="h">${inline(s.title)}</h2>` : ''}
        <div class="steps">${rows}</div>
        ${s.note ? `<div class="callout"><span class="bar"></span><p>${inline(s.note)}</p></div>` : ''}
        ${f}</section>`;
    }

    case 'prompt':
      return `<section class="slide">
        ${k}${s.title ? `<h2 class="h">${inline(s.title)}</h2>` : ''}
        ${s.body ? `<p class="body">${inline(s.body)}</p>` : ''}
        ${promptBox(s.prompt, s.label, c)}
        ${f}</section>`;

    case 'mockup':
      return `<section class="slide">
        ${k}${s.title ? `<h2 class="h">${inline(s.title)}</h2>` : ''}
        ${s.body ? `<p class="body">${inline(s.body)}</p>` : ''}
        ${windowMock(s.window || {}, c)}
        ${f}</section>`;

    case 'callout':
      return `<section class="slide mid">
        ${k}${s.title ? `<h2 class="h">${inline(s.title)}</h2>` : ''}
        <div class="callout big"><span class="bar"></span><p>${inline(s.text)}</p></div>
        ${f}</section>`;

    case 'cta':
      return `<section class="slide mid">
        ${k}<h2 class="h">${inline(s.title)}</h2>
        ${s.body ? `<p class="body">${inline(s.body)}</p>` : ''}
        <div class="ctacard">
          <div class="ctacard-l">${esc(s.action || 'Directga yozing:')}</div>
          <div class="ctacard-k">${esc(s.keyword || 'JAMOA')}</div>
          ${s.url ? `<div class="ctacard-u">→ ${esc(s.url)}</div>` : ''}
        </div>
        ${f}</section>`;

    default:
      return `<section class="slide">${k}<h2 class="h">${inline(s.title || '')}</h2>${f}</section>`;
  }
}

function buildHTML(carousel, override = {}) {
  const mode = (carousel.theme && carousel.theme.mode) || override.mode || 'light';
  const c = { ...BASE, ...THEMES[mode], ...override };
  if (carousel.wordmark) c.wordmark = carousel.wordmark;
  if (carousel.handle) c.handle = carousel.handle;
  if (carousel.avatarDataUri) c.avatarDataUri = carousel.avatarDataUri;
  const slides = carousel.slides || [];
  const total = slides.length;
  const body = slides.map((s, i) => slide(s, i, total, c)).join('\n');

  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700;1,800&family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{width:${WIDTH}px;height:${HEIGHT}px;position:relative;overflow:hidden;
    background:${c.bg};color:${c.ink};font-family:${c.sans};padding:84px 78px 104px;
    display:flex;flex-direction:column;}
  .slide::after{content:'';position:absolute;inset:0;pointer-events:none;
    background:radial-gradient(900px 480px at 92% 6%, ${c.accent}1c, transparent 60%);}
  .slide>*{position:relative;z-index:1;}
  .mid{justify-content:center;}
  .acc{color:${c.accent};font-style:normal;}
  strong{font-weight:800;color:${c.ink};}

  .top{display:flex;justify-content:space-between;align-items:center;}
  .kicker{display:flex;align-items:center;gap:18px;font-weight:700;font-size:26px;
    letter-spacing:.2em;text-transform:uppercase;color:${c.accent};}
  .kicker .dash{width:42px;height:3px;background:${c.accent};}
  .dash.sm{width:26px;height:2px;background:${c.accent};display:inline-block;}
  .page{font-weight:600;font-size:28px;letter-spacing:.12em;color:${c.muted};}

  /* cover */
  .cover-art{position:absolute;right:20px;top:230px;width:520px;height:520px;opacity:.9;z-index:0;}
  .cover-art .art{width:100%;height:100%;}
  .cover-title{margin-top:auto;font-family:${c.serif};font-weight:800;font-size:112px;
    line-height:1.0;letter-spacing:-0.02em;max-width:900px;}
  .cover-title .acc{color:${c.accent};font-style:italic;}
  .cover-sub{margin-top:26px;font-size:40px;line-height:1.34;color:${c.muted};max-width:760px;}
  .cover-sub strong{color:${c.ink};}
  .swipe{margin-top:36px;align-self:flex-start;font-weight:700;font-size:26px;
    letter-spacing:.14em;text-transform:uppercase;color:${c.accent};}

  /* headings / body */
  .h{font-family:${c.serif};font-weight:800;font-size:78px;line-height:1.04;margin:8px 0 8px;}
  .h .acc{color:${c.accent};font-style:italic;}
  .body{font-size:40px;line-height:1.4;color:${c.muted};margin:18px 0 30px;}
  .body strong{color:${c.ink};font-weight:700;}

  /* stat cards */
  .scards{margin-top:30px;display:grid;grid-template-columns:1fr 1fr;gap:26px;}
  .scard{background:${c.panel};border:1px solid ${c.line};border-radius:26px;padding:40px 38px;}
  .sbig{font-family:${c.serif};font-weight:800;font-size:84px;color:${c.accent};line-height:1;}
  .slab{margin-top:14px;font-size:31px;color:${c.muted};line-height:1.3;}

  /* steps */
  .steps{margin-top:26px;display:flex;flex-direction:column;gap:20px;}
  .step{display:flex;gap:30px;align-items:flex-start;background:${c.panel};
    border:1px solid ${c.line};border-radius:22px;padding:30px 34px;}
  .badge{flex:0 0 auto;width:60px;height:60px;border-radius:50%;background:${c.dark};
    color:${c.onDark};font-weight:800;font-size:30px;display:flex;align-items:center;justify-content:center;}
  .stext{font-size:36px;line-height:1.32;color:${c.ink};padding-top:6px;}
  .stext strong{color:${c.accent};}

  /* prompt box */
  .pbox{margin-top:14px;background:${c.dark};border-radius:26px;padding:38px 40px;}
  .pbox-h{display:flex;align-items:center;gap:16px;color:${c.accent};font-weight:700;
    font-size:24px;letter-spacing:.16em;text-transform:uppercase;}
  .pbox-h .copy{margin-left:auto;color:${c.onDark};opacity:.5;font-size:30px;}
  .pbox-t{margin-top:22px;color:${c.onDark};font-size:37px;line-height:1.42;}
  .pbox-t strong{color:#fff;}

  /* mockup window */
  .mock{margin-top:18px;background:${c.panel};border:1px solid ${c.line};border-radius:22px;overflow:hidden;}
  .mock-bar{display:flex;align-items:center;gap:12px;padding:22px 30px;border-bottom:1px solid ${c.line};}
  .mock-bar span{width:16px;height:16px;border-radius:50%;background:${c.line};}
  .mock-bar b{margin-left:16px;font-weight:700;font-size:28px;color:${c.muted};}
  .mock-body{padding:14px 30px 22px;}
  .wrow{display:flex;align-items:center;justify-content:space-between;gap:20px;
    padding:22px 0;border-bottom:1px solid ${c.line};font-size:32px;}
  .wrow:last-child{border-bottom:none;}
  .wt{color:${c.ink};}
  .wtag{font-weight:700;font-size:24px;padding:8px 18px;border-radius:999px;
    background:${c.accentSoft};color:${c.accent};}
  .wtag.red{background:#F3C9BE;color:#B23A20;}
  .wtag.ok{background:#CFE6CE;color:#3B7A3B;}

  /* callout */
  .callout{margin-top:auto;display:flex;gap:26px;}
  .callout .bar{width:5px;background:${c.accent};border-radius:3px;flex:0 0 auto;}
  .callout p{font-size:38px;line-height:1.35;color:${c.ink};padding:4px 0;}
  .callout p strong{color:${c.accent};}
  .callout.big p{font-family:${c.serif};font-style:italic;font-weight:700;font-size:62px;line-height:1.16;}

  /* cta */
  .ctacard{margin-top:34px;background:${c.panel};border:1px solid ${c.line};border-radius:28px;padding:44px 46px;}
  .ctacard-l{font-size:36px;color:${c.muted};}
  .ctacard-k{font-family:${c.serif};font-weight:800;font-size:88px;color:${c.accent};margin:8px 0 10px;}
  .ctacard-u{font-weight:700;font-size:34px;color:${c.ink};}

  /* footer */
  .footer{position:absolute;left:78px;right:78px;bottom:50px;display:flex;
    align-items:center;justify-content:space-between;}
  .fl,.fr{display:flex;align-items:center;gap:16px;}
  .spark{color:${c.accent};font-size:30px;}
  .wm{font-family:${c.serif};font-weight:800;font-size:34px;color:${c.ink};}
  .hnd{font-weight:600;font-size:29px;color:${c.muted};}
  .dots{display:flex;gap:10px;margin-left:12px;}
  .dot{width:11px;height:11px;border-radius:50%;background:${c.muted}44;}
  .dot.on{background:${c.accent};width:28px;border-radius:6px;}
  .fava{width:54px;height:54px;border-radius:50%;overflow:hidden;border:2px solid ${c.accent};
    display:inline-flex;align-items:center;justify-content:center;background:${c.panel};}
  .fava img{width:100%;height:100%;object-fit:cover;}
  .fava.ph{font-family:${c.serif};font-style:italic;font-weight:700;font-size:24px;color:${c.accent};}
  </style></head><body>
  ${body}
  </body></html>`;
}

module.exports = { buildHTML, THEMES, WIDTH, HEIGHT };
