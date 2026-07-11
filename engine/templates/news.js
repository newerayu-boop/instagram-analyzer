// engine/templates/news.js
// Светлый «news» стиль (как Prompt Lab / Google Stitch reference).
// Бренд: сверху-слева «● @yusufbaykodirov», снизу-слева «AI STRATEG», номера страниц НЕТ.
// Разметка в тексте: *курсив-сериф*  **жирный**
// Типы слайдов: cover | flow | cards | list | whofor | steps | cta

const WIDTH = 1080, HEIGHT = 1350;
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function inline(t = '') {
  return esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
}

const ICONS = {
  text: '<path d="M5 7h14M5 12h14M5 17h9"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 00-4 10.5c.7.7 1 1.3 1 2.5h6c0-1.2.3-1.8 1-2.5A6 6 0 0012 3z"/>',
  layout: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16M9 9v11"/>',
  star: '<path d="M12 3l2.6 5.6 6 .8-4.4 4.2 1.1 6L12 17l-5.3 2.6 1.1-6L3.4 9.4l6-.8L12 3z"/>',
  bolt: '<path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z"/>',
  dollar: '<path d="M12 3v18M16 7c0-2-2-3-4-3s-4 1-4 3 2 3 4 3 4 1 4 3-2 3-4 3-4-1-4-3"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><path d="M16 6a3 3 0 010 6M21 20c0-2-1-3.5-3-4.2"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
  doc: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
  calendar: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
  check: '<path d="M5 12l4 4L19 6"/>',
  code: '<path d="M9 8l-4 4 4 4M15 8l4 4-4 4"/>',
  rocket: '<path d="M12 3c3 1 5 4 5 8l-2 5H9l-2-5c0-4 2-7 5-8z"/><path d="M9 16l-3 3M15 16l3 3M12 11v.01"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  chart: '<path d="M5 20V11M12 20V4M19 20v-7"/>',
  heart: '<path d="M12 20s-7-4.3-7-9a4 4 0 017-2.6A4 4 0 0119 11c0 4.7-7 9-7 9z"/>',
  book: '<path d="M4 5a2 2 0 012-2h6v16H6a2 2 0 00-2 2zM20 5a2 2 0 00-2-2h-6v16h6a2 2 0 012 2z"/>',
  leaf: '<path d="M5 19C4 12 9 5 19 5c0 10-7 15-14 14zM5 19c3-4 6-6 9-7"/>',
};
const GRADS = {
  purple: 'linear-gradient(135deg,#8B6CF0,#6A4BE0)',
  blue:   'linear-gradient(135deg,#39A6F0,#1F7AD6)',
  green:  'linear-gradient(135deg,#22C58A,#12A06A)',
  orange: 'linear-gradient(135deg,#FB7A3C,#F0561F)',
  pink:   'linear-gradient(135deg,#F55CA6,#D63C86)',
  teal:   'linear-gradient(135deg,#1FC7C0,#12A6A0)',
};
function sicon(kind) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[kind] || ICONS.star}</svg>`;
}

const BRAND_TOP = '@yusufbaykodirov';
const BRAND_BOT = 'AI STRATEG';

function frame(inner, opts = {}, bignum = '') {
  const nav = opts.nav || 'Davom →';
  const bn = bignum ? `<span class="bignum">${bignum}</span>` : '';
  return `<section class="slide">
    ${bn}
    <div class="hdr"><span class="chip"><span class="gdot"></span>${esc(BRAND_TOP)}</span></div>
    <div class="body">${inner}</div>
    <div class="ftr"><span class="bl">${esc(BRAND_BOT)}</span><span class="br">${esc(nav)}</span></div>
  </section>`;
}

function eyebrow(t, color = '#1A6DF0') {
  return t ? `<div class="eyebrow" style="color:${color}">${esc(t)}</div>` : '';
}
function bighead(lines) {
  // lines: [{t, em?}]  em → сериф-курсив, иначе жирный гротеск
  return `<h1 class="bh">${lines.map(l => l.em ? `<span class="em">${esc(l.t)}</span>` : `<span class="bd">${esc(l.t)}</span>`).join('')}</h1>`;
}

function slide(s, i) {
  const num = String(i + 1).padStart(2, '0');
  if (s.type === 'cover') {
    const inner = `
      ${s.badge ? `<div class="cbadge"><span class="gdot"></span>${esc(s.badge)}</div>` : ''}
      ${bighead(s.lines || [])}
      ${s.sub ? `<p class="csub">${inline(s.sub)}</p>` : ''}
      ${s.eyebrow ? `<div class="ceyebrow">${esc(s.eyebrow)}</div>` : ''}
      ${s.quote ? `<p class="cquote">${inline(s.quote)}</p>` : ''}`;
    return frame(`<div class="cover">${inner}</div>`, { nav: s.nav || 'Boshlash →' });
  }
  const head = `${eyebrow(s.eyebrow)}${bighead(s.lines || [])}${s.sub ? `<p class="sub">${inline(s.sub)}</p>` : ''}`;
  if (s.type === 'flow') {
    const steps = (s.steps || []).map((st, k) => `
      ${k ? '<span class="arrow">→</span>' : ''}
      <div class="fstep"><span class="fico" style="background:${GRADS[st.grad] || GRADS.blue}">${sicon(st.icon)}</span>
        <span class="ftit">${esc(st.label)}</span>${st.sub ? `<span class="fsub">${esc(st.sub)}</span>` : ''}</div>`).join('');
    const stats = (s.stats || []).map(v => `<div class="stat"><div class="sbig">${inline(v.big)}</div><div class="slab">${esc(v.label)}</div></div>`).join('<span class="sdiv"></span>');
    return frame(`${head}<div class="flowcard">${steps}</div>${stats ? `<div class="statrow">${stats}</div>` : ''}`, {}, num);
  }
  if (s.type === 'cards') {
    const cards = (s.cards || []).map(c => `
      <div class="vcard" style="background:${c.color}">
        <span class="vn">${esc(c.n || '')}</span>
        <div class="vt">${inline(c.title)}</div>
        ${c.desc ? `<div class="vd">${inline(c.desc)}</div>` : ''}
        <span class="vico">${sicon(c.icon || 'star')}</span>
      </div>`).join('');
    return frame(`${head}<div class="vcards">${cards}</div>`, {}, num);
  }
  if (s.type === 'list') {
    const rows = (s.rows || []).map(r => `
      <div class="lrow"><span class="lico" style="color:${r.color || '#E0553A'}">${sicon(r.icon || 'check')}</span>
        <div class="ltx"><div class="ltit">${inline(r.title)}</div>${r.desc ? `<div class="ldesc">${inline(r.desc)}</div>` : ''}</div>
        ${r.tag ? `<span class="ltag">${esc(r.tag)}</span>` : ''}</div>`).join('');
    return frame(`${head}<div class="lrows">${rows}</div>`, {}, num);
  }
  if (s.type === 'whofor') {
    const rows = (s.rows || []).map((r, k) => `
      <div class="wrow"><span class="wn">${String(k + 1).padStart(2, '0')}</span>
        <div class="wtx"><div class="wtit">${inline(r.title)}</div>${r.desc ? `<div class="wdesc">${inline(r.desc)}</div>` : ''}</div>
        <span class="wico" style="background:${GRADS[r.grad] || GRADS.orange}">${sicon(r.icon || 'star')}</span></div>`).join('');
    return frame(`${head}<div class="wrows">${rows}</div>`, {}, num);
  }
  if (s.type === 'steps') {
    const rows = (s.rows || []).map((r, k) => `
      <div class="srow"><span class="snum">${String(k + 1).padStart(2, '0')}</span>
        <div class="stx"><div class="stit">${inline(r.title)}</div>${r.desc ? `<div class="sdesc">${inline(r.desc)}</div>` : ''}</div></div>`).join('');
    return frame(`${head}<div class="srows">${rows}</div>${s.note ? `<div class="note">${inline(s.note)}</div>` : ''}`, {}, num);
  }
  if (s.type === 'cta') {
    return frame(`${head}
      <div class="ctacard">
        <div class="ctaeyebrow">${esc(s.action || 'Izohga yoz:')}</div>
        <div class="ctakey">${esc(s.keyword || '«AI»')}</div>
        ${s.url ? `<div class="ctaurl">→ ${esc(s.url)}</div>` : ''}
      </div>`, { nav: s.nav || 'Ulashing →' }, num);
  }
  return frame(head, {}, num);
}

function buildHTML(carousel) {
  const body = (carousel.slides || []).map((s, i) => slide(s, i)).join('\n');
  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500;1,600;1,700&family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#c9c9c4;}
  .slide{
    --bg:#F0EFEA; --ink:#15150F; --muted:#87867E; --line:#E2E1DB; --card:#FFFFFF;
    width:${WIDTH}px;height:${HEIGHT}px;position:relative;overflow:hidden;
    background:var(--bg);color:var(--ink);font-family:'Inter',system-ui,sans-serif;
    padding:70px 74px 74px;display:flex;flex-direction:column;}
  .slide::before{content:'';position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.5;
    background-image:linear-gradient(#00000008 1px,transparent 1px),linear-gradient(90deg,#00000008 1px,transparent 1px);
    background-size:60px 60px;}
  .slide>*{position:relative;z-index:1;}
  .bignum{position:absolute;top:76px;right:70px;z-index:0;font-weight:800;font-size:190px;line-height:.8;
    color:transparent;-webkit-text-stroke:2px #d9d8d1;opacity:.6;letter-spacing:-.04em;}
  .hdr{display:flex;align-items:center;}
  .chip{display:inline-flex;align-items:center;gap:12px;font-weight:600;font-size:27px;color:#4A4A44;}
  .gdot{width:14px;height:14px;border-radius:50%;background:#2ECf94;box-shadow:0 0 0 5px #2ECf9425;}
  .body{flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0;}
  .ftr{display:flex;justify-content:space-between;align-items:center;color:#9A9A92;font-size:26px;}
  .ftr .bl{font-weight:800;letter-spacing:.14em;color:#7C7C74;}
  .ftr .br{font-weight:500;}

  .eyebrow{font-weight:800;font-size:26px;letter-spacing:.16em;text-transform:uppercase;margin-bottom:18px;}
  .bh{font-weight:800;font-size:86px;line-height:.98;letter-spacing:-.03em;}
  .bh .bd{display:inline;} .bh .em{display:inline;font-family:'Playfair Display',Georgia,serif;font-style:italic;font-weight:600;letter-spacing:-.01em;}
  .bh .bd + .em, .bh .em + .bd{margin-left:.24em;}
  .sub{margin-top:26px;font-size:37px;line-height:1.35;color:#6E6D66;max-width:860px;}
  .sub strong{color:var(--ink);font-weight:700;}
  .sub em{font-family:'Playfair Display',serif;font-style:italic;color:var(--ink);}

  /* cover */
  .cover{display:flex;flex-direction:column;align-items:center;text-align:center;}
  .cbadge{display:inline-flex;align-items:center;gap:12px;background:#fff;border:1px solid var(--line);
    border-radius:100px;padding:14px 28px;font-weight:600;font-size:28px;color:#3A3A34;margin-bottom:44px;box-shadow:0 8px 24px -14px #0003;}
  .cover .bh{font-size:118px;}
  .cover .bh .bd,.cover .bh .em{display:block;margin:0;}
  .csub{margin-top:34px;font-size:38px;line-height:1.36;color:#6E6D66;max-width:820px;}
  .csub strong{color:var(--ink);font-weight:700;}
  .ceyebrow{margin-top:64px;font-weight:800;font-size:24px;letter-spacing:.24em;text-transform:uppercase;color:#A7A69E;}
  .cquote{margin-top:16px;font-family:'Playfair Display',serif;font-style:italic;font-size:38px;color:#3C3B35;}

  /* flow */
  .flowcard{margin-top:40px;background:var(--card);border-radius:34px;padding:56px 44px;display:flex;align-items:flex-start;
    justify-content:center;gap:18px;box-shadow:0 30px 60px -40px #0004;border:1px solid #fff;}
  .fstep{display:flex;flex-direction:column;align-items:center;text-align:center;gap:14px;width:230px;}
  .fico{width:118px;height:118px;border-radius:28px;display:flex;align-items:center;justify-content:center;box-shadow:0 16px 30px -14px #0005;}
  .fico svg{width:56px;height:56px;}
  .ftit{font-weight:800;font-size:32px;color:var(--ink);}
  .fsub{font-size:26px;color:var(--muted);margin-top:-6px;}
  .arrow{align-self:center;margin-top:44px;color:#C4C3BB;font-size:44px;font-weight:400;}
  .statrow{margin-top:44px;display:flex;align-items:center;justify-content:space-between;padding:0 8px;}
  .stat{text-align:left;} .sbig{font-weight:800;font-size:64px;letter-spacing:-.02em;color:var(--ink);}
  .slab{font-size:27px;color:var(--muted);margin-top:4px;}
  .sdiv{width:1px;height:76px;background:var(--line);}

  /* cards */
  .vcards{margin-top:44px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:26px;}
  .vcard{position:relative;border-radius:30px;padding:44px 34px 120px;color:#fff;min-height:520px;box-shadow:0 30px 60px -40px #0006;}
  .vn{font-weight:700;font-size:30px;opacity:.6;}
  .vt{margin-top:26px;font-weight:800;font-size:44px;line-height:1.08;}
  .vd{margin-top:20px;font-size:29px;line-height:1.34;color:#ffffffe0;}
  .vico{position:absolute;left:34px;bottom:40px;width:66px;height:66px;border-radius:50%;background:#ffffff2e;display:flex;align-items:center;justify-content:center;}
  .vico svg{width:34px;height:34px;}

  /* list */
  .lrows{margin-top:30px;display:flex;flex-direction:column;gap:18px;}
  .lrow{display:flex;align-items:center;gap:28px;background:var(--card);border-radius:24px;padding:26px 38px;box-shadow:0 24px 46px -38px #0004;border:1px solid #fff;}
  .lico{flex:0 0 auto;width:76px;height:76px;border-radius:20px;background:#F5EEEC;display:flex;align-items:center;justify-content:center;}
  .lico svg{width:40px;height:40px;stroke:currentColor;}
  .ltx{flex:1;} .ltit{font-weight:800;font-size:36px;color:var(--ink);}
  .ldesc{margin-top:6px;font-size:29px;color:var(--muted);line-height:1.3;}
  .ltag{flex:0 0 auto;font-family:ui-monospace,Menlo,monospace;font-size:24px;color:#A7A69E;background:#EEEDE7;border-radius:10px;padding:8px 16px;}

  /* whofor */
  .wrows{margin-top:38px;display:flex;flex-direction:column;gap:26px;}
  .wrow{display:flex;align-items:center;gap:34px;background:var(--card);border-radius:26px;padding:36px 40px;box-shadow:0 24px 46px -38px #0004;border:1px solid #fff;}
  .wn{flex:0 0 auto;font-family:'Playfair Display',serif;font-style:italic;font-size:60px;color:#CFCEC6;width:70px;}
  .wtx{flex:1;} .wtit{font-weight:800;font-size:38px;color:var(--ink);line-height:1.12;}
  .wdesc{margin-top:10px;font-size:29px;color:var(--muted);line-height:1.3;}
  .wico{flex:0 0 auto;width:80px;height:80px;border-radius:20px;display:flex;align-items:center;justify-content:center;box-shadow:0 14px 26px -14px #0005;}
  .wico svg{width:40px;height:40px;}

  /* steps */
  .srows{margin-top:36px;display:flex;flex-direction:column;gap:24px;}
  .srow{display:flex;gap:32px;align-items:flex-start;}
  .snum{font-family:'Playfair Display',serif;font-style:italic;font-size:58px;color:#C9C8C0;width:88px;flex:0 0 auto;}
  .stit{font-weight:800;font-size:40px;color:var(--ink);line-height:1.12;}
  .sdesc{margin-top:8px;font-size:31px;color:var(--muted);line-height:1.32;}
  .note{margin-top:34px;background:#fff;border-left:6px solid #2ECf94;border-radius:0 18px 18px 0;padding:26px 32px;font-size:32px;color:#3C3B35;}
  .note strong{font-weight:800;}

  /* cta */
  .ctacard{margin-top:44px;background:var(--ink);border-radius:36px;padding:60px 56px;color:#fff;box-shadow:0 40px 70px -40px #0007;}
  .ctaeyebrow{font-size:34px;color:#B9B8B0;}
  .ctakey{margin:14px 0 12px;font-weight:900;font-size:104px;letter-spacing:-.02em;
    background:linear-gradient(135deg,#7CE0B4,#3AA6F0);-webkit-background-clip:text;background-clip:text;color:transparent;}
  .ctaurl{font-weight:700;font-size:34px;color:#EDEDEA;}
  </style></head><body>${body}</body></html>`;
}

module.exports = { buildHTML, WIDTH, HEIGHT };
