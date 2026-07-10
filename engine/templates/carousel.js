// engine/templates/carousel.js  (v3 — микс светлых/тёмных слайдов + схемы)
// Наполненные карусели в стиле AI Strateg / @kodiyusufbay.
// Каждый слайд можно сделать тёмным: "dark": true  → комбинируем свет+тьму в одной карусели.
// Footer: слева «AI Strateg», справа «@kodiyusufbay».
//
// Типы слайдов:
//   cover   { kicker, title, sub, art, swipe, dark? }        art: robot|spark|bolt
//   story   { kicker, title, paragraphs:[], punch?, dark? }
//   steps   { kicker, title, items:[{n,text}], note?, dark? }
//   stat    { kicker, title, stats:[{big,label}], note?, dark? }
//   diagram { kicker, title, top:{title,sub}, nodes:[{n,label}], caption?, callout?, dark? }
//   prompt  { kicker, title, body, prompt, label?, dark? }
//   callout { kicker, title, text, dark? }
//   cta     { kicker, title, body, keyword, action, url, dark? }
//
// Разметка: *акцент*  **жирный**

const BASE = {
  serif: "'Playfair Display', Georgia, serif",
  sans: "'Inter', system-ui, sans-serif",
  wordmark: 'AI Strateg', handle: '@kodiyusufbay',
};
const WIDTH = 1080, HEIGHT = 1350;
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function inline(t = '') {
  return esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em class="acc">$1</em>');
}

const kicker = (t) => t ? `<div class="kicker"><span class="dash"></span>${esc(t)}</div>` : '';
const pageStr = (i, total) => `${String(i + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
const topbar = (k, i, total) => `<div class="top">${kicker(k)}<span class="page">${pageStr(i, total)}</span></div>`;

function art(kind) {
  if (kind === 'spark') return `<svg class="art" viewBox="0 0 200 200" fill="none">${Array.from({length:16},(_, i)=>{const a=(i/16)*Math.PI*2,r1=34,r2=i%2?92:74;return `<line x1="${(100+Math.cos(a)*r1).toFixed(1)}" y1="${(100+Math.sin(a)*r1).toFixed(1)}" x2="${(100+Math.cos(a)*r2).toFixed(1)}" y2="${(100+Math.sin(a)*r2).toFixed(1)}" stroke="var(--accent)" stroke-width="9" stroke-linecap="round"/>`;}).join('')}<circle cx="100" cy="100" r="26" fill="var(--accent)"/></svg>`;
  if (kind === 'bolt') return `<svg class="art" viewBox="0 0 200 200" fill="none"><path d="M118 20 L60 110 H100 L82 180 L150 80 H108 Z" fill="var(--accent)"/></svg>`;
  return `<svg class="art" viewBox="0 0 220 220" fill="none" stroke="var(--accent)" stroke-width="4"><rect x="58" y="70" width="104" height="86" rx="22"/><circle cx="90" cy="112" r="11" fill="var(--accent)" stroke="none"/><circle cx="130" cy="112" r="11"/><path d="M88 138 h44" stroke-linecap="round"/><line x1="110" y1="46" x2="110" y2="70"/><circle cx="110" cy="40" r="9" fill="var(--accent)" stroke="none"/><path d="M58 100 H30 M58 126 H36 M162 100 h34 M162 126 h26" stroke-linecap="round"/><circle cx="24" cy="100" r="7" fill="var(--accent)" stroke="none"/><circle cx="200" cy="100" r="7" fill="var(--accent)" stroke="none"/><rect x="80" y="156" width="60" height="30" rx="8"/></svg>`;
}

function footer(c, i, total) {
  const dots = Array.from({ length: total }, (_, k) => `<span class="dot ${k === i ? 'on' : ''}"></span>`).join('');
  return `<div class="footer">
    <div class="fl"><span class="spark">✳</span><span class="wm">${esc(c.wordmark)}</span></div>
    <div class="dots">${dots}</div>
    <div class="fr"><span class="hnd">${esc(c.handle)}</span></div>
  </div>`;
}

function diagram(d) {
  const nodes = (d.nodes || []).map(n => `
    <div class="dnode"><div class="dcirc">${esc(n.n)}</div><div class="dlabel">${esc(n.label)}</div></div>`).join('');
  const n = (d.nodes || []).length || 3;
  // соединительные линии от верхнего блока к узлам
  const lines = Array.from({ length: n }, (_, i) => {
    const x = ((i + 0.5) / n) * 100;
    return `<line x1="50" y1="0" x2="${x.toFixed(1)}" y2="100" stroke="var(--accent)" stroke-width="1.4" vector-effect="non-scaling-stroke"/>`;
  }).join('');
  return `<div class="diagram">
    <div class="dtop"><b>${esc(d.top?.title || '')}</b>${d.top?.sub ? `<span>${esc(d.top.sub)}</span>` : ''}</div>
    <svg class="dlines" viewBox="0 0 100 100" preserveAspectRatio="none">${lines}</svg>
    <div class="dnodes">${nodes}</div>
    ${d.caption ? `<div class="dcaption">${inline(d.caption)}</div>` : ''}
  </div>`;
}

function slide(s, i, total, c) {
  const f = footer(c, i, total);
  const k = topbar(s.kicker, i, total);
  const cls = `slide${c.gold ? ' gold' : (s.dark ? ' dark' : '')}`;
  switch (s.type) {
    case 'cover':
      return `<section class="${cls} cover">
        <div class="top">${kicker(s.kicker)}<span class="page">${pageStr(i, total)}</span></div>
        <div class="cover-art">${art(s.art || 'robot')}</div>
        <h1 class="cover-title">${inline(s.title)}</h1>
        ${s.sub ? `<p class="cover-sub">${inline(s.sub)}</p>` : ''}
        ${s.swipe ? `<div class="swipe">${esc(s.swipe)} <span>→</span></div>` : ''}
        ${f}</section>`;
    default: {
      const bg = `<span class="bgnum">${String(i + 1).padStart(2, '0')}</span>`;
      const title = s.title ? `<h2 class="h">${inline(s.title)}</h2>` : '';
      let inner = '';
      if (s.type === 'stat') {
        const cards = (s.stats || []).map(st => `<div class="scard"><div class="sbig">${inline(st.big)}</div><div class="slab">${inline(st.label)}</div></div>`).join('');
        inner = `${title}<div class="scards">${cards}</div>${s.note ? `<div class="callout"><span class="bar"></span><p>${inline(s.note)}</p></div>` : ''}`;
      } else if (s.type === 'steps') {
        const rows = (s.items || []).map(it => `<div class="step"><span class="badge">${esc(it.n)}</span><div class="stext">${inline(it.text)}</div></div>`).join('');
        inner = `${title}<div class="steps">${rows}</div>${s.note ? `<div class="callout"><span class="bar"></span><p>${inline(s.note)}</p></div>` : ''}`;
      } else if (s.type === 'diagram') {
        inner = `${title}${diagram(s)}${s.callout ? `<div class="callout"><span class="bar"></span><p>${inline(s.callout)}</p></div>` : ''}`;
      } else if (s.type === 'prompt') {
        inner = `${title}${s.body ? `<p class="body">${inline(s.body)}</p>` : ''}<div class="pbox"><div class="pbox-h"><span class="dash sm"></span>${esc(s.label || 'TAYYOR PROMPT')}<span class="copy">⧉</span></div><div class="pbox-t">${inline(s.prompt)}</div></div>`;
      } else if (s.type === 'callout') {
        inner = `${title}<div class="callout big"><span class="bar"></span><p>${inline(s.text)}</p></div>`;
      } else if (s.type === 'cta') {
        inner = `<h2 class="h">${inline(s.title)}</h2>${s.body ? `<p class="body">${inline(s.body)}</p>` : ''}<div class="ctacard"><div class="ctacard-l">${esc(s.action || 'Izohga yozing:')}</div><div class="ctacard-k">${esc(s.keyword || '«AI»')}</div>${s.url ? `<div class="ctacard-u">→ ${esc(s.url)}</div>` : ''}</div>`;
      } else { // story
        const paras = (s.paragraphs || []).map(p => `<p class="body">${inline(p)}</p>`).join('');
        inner = `${title}<div class="paras">${paras}</div>${s.punch ? `<div class="punch">${inline(s.punch)}</div>` : ''}`;
      }
      return `<section class="${cls}">${bg}${k}<div class="content">${inner}</div>${f}</section>`;
    }
  }
}

function buildHTML(carousel) {
  const c = { ...BASE };
  c.gold = !!carousel.gold; // чёрно-золотая тема (стиль AI Strateg premium)
  if (carousel.wordmark) c.wordmark = carousel.wordmark;
  if (carousel.handle) c.handle = carousel.handle;
  const slides = carousel.slides || [];
  const total = slides.length;
  const body = slides.map((s, i) => slide(s, i, total, c)).join('\n');
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700;1,800&family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#000;}
  .slide{
    --bg:#E7E3DA; --ink:#23211C; --muted:#6F6B61; --accent:#C8613B;
    --panel:#F3F0E9; --line:#D7D2C6; --badge-bg:#22201C; --badge-ink:#F3F0E9;
    --card:#F3F0E9; --glow:#C8613B1c;
    width:${WIDTH}px;height:${HEIGHT}px;position:relative;overflow:hidden;
    background:var(--bg);color:var(--ink);font-family:${c.sans};padding:84px 78px 104px;
    display:flex;flex-direction:column;}
  .slide.dark{
    --bg:#26221C; --ink:#EFE8DD; --muted:#A79E90; --accent:#D2703F;
    --panel:#332E27; --line:#41392F; --badge-bg:#EFE8DD; --badge-ink:#26221C;
    --card:#332E27; --glow:#D2703F26;}
  .slide.gold{
    --bg:#0B0A08; --ink:#F4F1EA; --muted:#8C8578; --accent:#C6A15B;
    --panel:#16130E; --line:#2A2620; --badge-bg:#C6A15B; --badge-ink:#0B0A08;
    --card:#16130E; --glow:#C6A15B1f;}
  .slide::after{content:'';position:absolute;inset:0;pointer-events:none;z-index:0;
    background:radial-gradient(900px 480px at 92% 6%, var(--glow), transparent 60%),
               radial-gradient(760px 460px at -8% 104%, var(--glow), transparent 62%);}
  .slide>*{position:relative;z-index:1;}
  .bgnum{position:absolute!important;right:-6px;bottom:-96px;z-index:0!important;pointer-events:none;
    font-family:${c.serif};font-weight:800;font-size:460px;line-height:1;color:var(--ink);opacity:.045;}
  .content{flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0;}
  .mid{justify-content:center;}
  .acc{color:var(--accent);font-style:normal;}
  strong{font-weight:800;color:var(--ink);}

  .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:30px;}
  .cover .top{margin-bottom:0;}
  .kicker{display:flex;align-items:center;gap:18px;font-weight:700;font-size:26px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);}
  .kicker .dash{width:42px;height:3px;background:var(--accent);}
  .dash.sm{width:26px;height:2px;background:var(--accent);display:inline-block;}
  .page{font-weight:600;font-size:28px;letter-spacing:.12em;color:var(--muted);}

  .cover-art{position:absolute;right:16px;top:210px;width:540px;height:540px;opacity:.85;z-index:0;}
  .cover-art .art{width:100%;height:100%;}
  .cover-title{margin-top:auto;font-family:${c.serif};font-weight:800;font-size:110px;line-height:1.0;letter-spacing:-0.02em;max-width:900px;}
  .cover-title .acc{color:var(--accent);font-style:italic;}
  .cover-sub{margin-top:26px;font-size:40px;line-height:1.34;color:var(--muted);max-width:780px;}
  .cover-sub strong{color:var(--ink);}
  .swipe{margin-top:34px;align-self:flex-start;font-weight:700;font-size:26px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);}

  .h{font-family:${c.serif};font-weight:800;font-size:78px;line-height:1.04;margin:0 0 8px;}
  .h .acc{color:var(--accent);font-style:italic;}
  .body{font-size:40px;line-height:1.4;color:var(--muted);margin:18px 0 30px;}
  .body strong{color:var(--ink);font-weight:700;}
  .paras{margin-top:22px;display:flex;flex-direction:column;gap:28px;}
  .paras .body{margin:0;}
  .punch{margin-top:30px;font-family:${c.serif};font-style:italic;font-weight:700;font-size:66px;color:var(--accent);line-height:1.08;}

  .scards{margin-top:30px;display:grid;grid-template-columns:1fr 1fr;gap:26px;}
  .scard{background:var(--card);border:1px solid var(--line);border-radius:26px;padding:40px 38px;}
  .sbig{font-family:${c.serif};font-weight:800;font-size:84px;color:var(--accent);line-height:1;}
  .slab{margin-top:14px;font-size:31px;color:var(--muted);line-height:1.3;}

  .steps{margin-top:24px;display:flex;flex-direction:column;gap:20px;}
  .step{display:flex;gap:30px;align-items:flex-start;background:var(--card);border:1px solid var(--line);border-radius:22px;padding:30px 34px;}
  .badge{flex:0 0 auto;width:60px;height:60px;border-radius:50%;background:var(--accent);color:#fff;font-weight:800;font-size:30px;display:flex;align-items:center;justify-content:center;}
  .stext{font-size:35px;line-height:1.3;color:var(--ink);padding-top:6px;}
  .stext strong{color:var(--accent);}

  /* diagram */
  .diagram{margin-top:20px;display:flex;flex-direction:column;align-items:center;position:relative;}
  .dtop{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:22px 40px;text-align:center;z-index:2;}
  .dtop b{display:block;font-weight:800;font-size:38px;letter-spacing:.04em;color:var(--ink);}
  .dtop span{font-size:28px;color:var(--muted);}
  .dlines{width:70%;height:120px;margin-top:-2px;}
  .dnodes{display:flex;justify-content:space-between;width:78%;margin-top:-8px;}
  .dnode{display:flex;flex-direction:column;align-items:center;gap:14px;}
  .dcirc{width:116px;height:116px;border-radius:50%;border:3px solid var(--accent);color:var(--accent);
    font-family:${c.serif};font-weight:800;font-size:52px;display:flex;align-items:center;justify-content:center;background:var(--bg);}
  .dlabel{font-size:28px;color:var(--muted);}
  .dcaption{margin-top:30px;text-align:center;font-size:34px;color:var(--ink);}

  .callout{margin-top:30px;display:flex;gap:26px;}
  .callout .bar{width:5px;background:var(--accent);border-radius:3px;flex:0 0 auto;}
  .callout p{font-size:38px;line-height:1.35;color:var(--ink);}
  .callout p strong{color:var(--accent);}
  .callout.big p{font-family:${c.serif};font-style:italic;font-weight:700;font-size:60px;line-height:1.16;}

  .pbox{margin-top:14px;background:#181712;border-radius:24px;padding:34px 38px;}
  .pbox-h{display:flex;align-items:center;gap:14px;color:var(--accent);font-weight:700;font-size:23px;letter-spacing:.14em;text-transform:uppercase;}
  .pbox-h .copy{margin-left:auto;color:#EDE7DD;opacity:.5;font-size:28px;}
  .pbox-t{margin-top:20px;color:#EDE7DD;font-size:32px;line-height:1.5;white-space:pre-wrap;word-break:break-word;font-family:ui-monospace,'SF Mono',Menlo,Consolas,monospace;}
  .pbox-t strong{color:#fff;}

  .ctacard{margin-top:30px;background:var(--card);border:1px solid var(--line);border-radius:28px;padding:44px 46px;}
  .ctacard-l{font-size:36px;color:var(--muted);}
  .ctacard-k{font-family:${c.serif};font-weight:800;font-size:88px;color:var(--accent);margin:8px 0 10px;}
  .ctacard-u{font-weight:700;font-size:34px;color:var(--ink);}

  .footer{position:absolute;left:78px;right:78px;bottom:52px;display:flex;align-items:center;justify-content:space-between;}
  .fl{display:flex;align-items:center;gap:14px;}
  .spark{color:var(--accent);font-size:30px;}
  .wm{font-family:${c.serif};font-weight:800;font-size:36px;color:var(--ink);}
  .hnd{font-weight:600;font-size:30px;color:var(--muted);}
  .dots{display:flex;gap:10px;}
  .dot{width:11px;height:11px;border-radius:50%;background:var(--muted);opacity:.35;}
  .dot.on{background:var(--accent);opacity:1;width:28px;border-radius:6px;}
  </style></head><body>
  ${body}
  </body></html>`;
}

module.exports = { buildHTML, WIDTH, HEIGHT };
