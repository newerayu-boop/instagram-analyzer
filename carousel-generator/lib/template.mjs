// Slide HTML templates for Instagram carousels (1080x1350)
// Design: dark navy tech style with per-carousel accent color,
// Unbounded for headlines, Inter for body, twemoji SVGs for emoji.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FONTS = path.join(ROOT, 'fonts');
const EMOJI_DIR = path.join(ROOT, 'emoji');

// ---------- emoji handling ----------
const emojiMap = new Map(); // char sequence -> absolute svg path
for (const f of fs.readdirSync(EMOJI_DIR)) {
  if (!f.endsWith('.svg')) continue;
  const cps = f.replace('.svg', '').split('-').map((h) => parseInt(h, 16));
  emojiMap.set(String.fromCodePoint(...cps), path.join(EMOJI_DIR, f));
}
const emojiKeys = [...emojiMap.keys()].sort((a, b) => b.length - a.length);

export function em(text) {
  // replace known emoji with <img>, strip unknown emoji (avoid tofu)
  let out = String(text).replace(/️/g, '');
  for (const key of emojiKeys) {
    if (out.includes(key)) {
      out = out.split(key).join(`<img class="emj" src="file://${emojiMap.get(key)}">`);
    }
  }
  out = out.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{1F1E6}-\u{1F1FF}]/gu, '');
  return out;
}

// **bold-accent** -> gradient text, *soft* -> accent color, plain <b> allowed
function rich(text) {
  return em(text)
    .replace(/\*\*(.+?)\*\*/g, '<span class="grad">$1</span>')
    .replace(/\*(.+?)\*/g, '<span class="acc">$1</span>');
}

function hexToRgba(hex, a) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

// ---------- chrome (header / footer / background) ----------
function chrome(ctx, { last = false, first = false } = {}) {
  const a = ctx.accent, b = ctx.accent2;
  const datePill = ctx.date ? `<div class="pill date">${ctx.date}</div>` : '';
  const header = `
    <header class="bar top">
      <div class="brand">
        <div class="mark">AI</div>
        <div class="brand-t">
          <div class="brand-name">${ctx.brand}</div>
          <div class="brand-sub">${ctx.brandSub}</div>
        </div>
      </div>
      ${datePill}
    </header>`;
  const arrow = last
    ? `<div class="cta-pill">${em('📌')}&nbsp; SAQLAB QO‘YING</div>`
    : `<div class="cta-pill">${first ? 'VARAQLANG' : 'DAVOMI'} <span class="arr">➔</span></div>`;
  const footer = `
    <footer class="bar bottom">
      <div class="handle">${ctx.handle}</div>
      <div class="pager">
        <div class="count">${String(ctx.index).padStart(2, '0')} / ${String(ctx.total).padStart(2, '0')}</div>
        ${arrow}
      </div>
    </footer>`;
  const ghost = `<div class="ghost">${String(ctx.index).padStart(2, '0')}</div>`;
  return { header, footer, ghost, a, b };
}

function css(ctx) {
  const a = ctx.accent, b = ctx.accent2;
  const isLight = ctx.theme === 'light';

  const bgColor = isLight ? '#FFFFFF' : '#070C1F';
  const textColor = isLight ? '#1F2937' : '#F2F6FF';
  const secondaryText = isLight ? '#6B7280' : '#8A9AC0';
  const tertiaryText = isLight ? '#9CA3AF' : '#A9B6D6';
  const lightBg = isLight ? 'rgba(0,0,0,.04)' : 'rgba(255,255,255,.05)';
  const mediumBorder = isLight ? 'rgba(0,0,0,.10)' : 'rgba(255,255,255,.12)';
  const lightBorder = isLight ? 'rgba(0,0,0,.08)' : 'rgba(255,255,255,.10)';
  const gridColor = isLight ? 'rgba(0,0,0,.06)' : 'rgba(255,255,255,.045)';
  const ghostColor = isLight ? 'rgba(0,0,0,.04)' : 'rgba(255,255,255,.035)';

  return `
  @font-face { font-family:'Inter'; src:url('file://${FONTS}/Inter.ttf'); font-weight:100 900; }
  @font-face { font-family:'Unbounded'; src:url('file://${FONTS}/Unbounded.ttf'); font-weight:200 900; }
  * { margin:0; padding:0; box-sizing:border-box; }
  :root { --a:${a}; --b:${b}; }
  html,body { width:1080px; height:1350px; }
  body {
    font-family:'Inter',sans-serif; color:${textColor}; overflow:hidden; position:relative;
    background:
      radial-gradient(1000px 780px at 100% -8%, ${hexToRgba(a, isLight ? 0.12 : 0.30)}, transparent 62%),
      radial-gradient(900px 860px at -12% 112%, ${hexToRgba(b, isLight ? 0.10 : 0.26)}, transparent 60%),
      radial-gradient(700px 500px at 50% 118%, ${hexToRgba(a, isLight ? 0.06 : 0.10)}, transparent 60%),
      ${bgColor};
  }
  .gridbg { position:absolute; inset:0; z-index:0;
    background-image:linear-gradient(${gridColor} 1px, transparent 1px),
      linear-gradient(90deg, ${gridColor} 1px, transparent 1px);
    background-size:90px 90px;
    -webkit-mask-image:radial-gradient(1200px 900px at 70% 20%, #000 30%, transparent 75%);
  }
  .frame { position:absolute; inset:26px; border:1.5px solid ${lightBorder}; border-radius:40px; z-index:1; }
  .ghost { position:absolute; right:14px; bottom:64px; z-index:0; font-family:'Unbounded'; font-weight:900;
    font-size:430px; line-height:1; color:${ghostColor}; letter-spacing:-.02em; }
  .stage { position:absolute; inset:0; z-index:2; display:flex; flex-direction:column; padding:74px 84px 64px; }
  .emj { height:1.06em; width:1.06em; vertical-align:-.14em; }

  .bar { display:flex; align-items:center; justify-content:space-between; }
  .brand { display:flex; align-items:center; gap:22px; }
  .mark { width:64px; height:64px; border-radius:19px; display:flex; align-items:center; justify-content:center;
    font-family:'Unbounded'; font-weight:800; font-size:26px; color:${isLight ? '#FFFFFF' : '#05070F'};
    background:linear-gradient(135deg, var(--a), ${hexToRgba(b, 0.95)});
    box-shadow:0 0 42px ${hexToRgba(a, isLight ? 0.25 : 0.45)}, 0 8px 32px ${hexToRgba(a, isLight ? 0.15 : 0.25)};
    position: relative; overflow: hidden;
  }
  .mark::before { content: ''; position: absolute; inset: 0; background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%); }
  .brand-name { font-family:'Unbounded'; font-weight:700; font-size:27px; letter-spacing:.10em; color:${textColor}; }
  .brand-sub { font-size:19px; font-weight:600; letter-spacing:.26em; color:${secondaryText}; margin-top:6px; }
  .pill { border:1.5px solid ${isLight ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.16)'}; background:${isLight ? 'rgba(0,0,0,.04)' : 'rgba(255,255,255,.055)'};
    border-radius:999px; padding:16px 30px; font-weight:700; font-size:25px; letter-spacing:.08em; color:${textColor}; }
  .content { flex:1; display:flex; flex-direction:column; justify-content:center; position:relative; min-height:0; padding:40px 0 16px; }

  .handle { font-weight:600; font-size:26px; color:${secondaryText}; letter-spacing:.04em; }
  .pager { display:flex; align-items:center; gap:26px; }
  .count { font-family:'Unbounded'; font-weight:600; font-size:24px; color:${tertiaryText}; letter-spacing:.1em; }
  .cta-pill { display:flex; align-items:center; gap:14px; background:linear-gradient(135deg, var(--a), ${hexToRgba(b, 0.9)});
    color:${isLight ? '#FFFFFF' : '#05070F'}; font-weight:800; font-size:24px; letter-spacing:.1em; border-radius:999px; padding:18px 32px;
    box-shadow:0 0 44px ${hexToRgba(a, isLight ? 0.25 : 0.35)}, inset 0 1px 20px rgba(255,255,255,0.3);
    position: relative; overflow: hidden;
    animation: glow 2s ease-in-out infinite;
  }
  @keyframes glow { 0%, 100% { box-shadow: 0 0 44px ${hexToRgba(a, isLight ? 0.25 : 0.35)}, inset 0 1px 20px rgba(255,255,255,0.3); }
                    50% { box-shadow: 0 0 60px ${hexToRgba(a, isLight ? 0.35 : 0.45)}, inset 0 1px 20px rgba(255,255,255,0.4); } }
  .arr { font-family:'Inter'; font-weight:900; }

  .tag { display:inline-flex; align-items:center; gap:14px; align-self:flex-start;
    background:linear-gradient(135deg, var(--a), ${hexToRgba(b, 0.92)}); color:${isLight ? '#FFFFFF' : '#05070F'};
    font-family:'Unbounded'; font-weight:700; font-size:24px; letter-spacing:.12em; text-transform:uppercase;
    padding:16px 32px; border-radius:14px; box-shadow:0 0 50px ${hexToRgba(a, isLight ? 0.20 : 0.35)}, inset 0 1px 0 rgba(255,255,255,0.3);
    position: relative; overflow: hidden;
  }
  .tag::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent); animation: shimmer 3s infinite; }
  @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
  .kicker { font-weight:800; font-size:27px; letter-spacing:.22em; text-transform:uppercase; color:var(--a); }
  .grad { background:linear-gradient(92deg, var(--a) 10%, ${isLight ? '#1F2937' : '#FFFFFF'} 90%); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .acc { color:var(--a); font-weight:inherit; }

  h1 { font-family:'Unbounded'; font-weight:800; line-height:1.12; letter-spacing:-.01em; color:${textColor}; }
  h2 { font-family:'Unbounded'; font-weight:700; font-size:56px; line-height:1.18; margin-top:30px; color:${textColor}; }
  .sub { font-size:42px; font-weight:500; line-height:1.42; color:${isLight ? '#374151' : '#C4CDE6'}; }
  .body { font-size:40px; font-weight:400; line-height:1.52; color:${isLight ? '#4B5563' : '#D9E0F2'}; }
  .body b, .sub b { color:${isLight ? '#1F2937' : '#FFFFFF'}; font-weight:700; }

  .meta { display:flex; flex-wrap:wrap; gap:20px; }
  .meta .pill { display:flex; align-items:center; gap:16px; font-size:30px; letter-spacing:0;
    padding:20px 34px; background:${lightBg}; color:${textColor}; }
  .meta .pill b { color:${isLight ? '#1F2937' : '#fff'}; }

  .bullets { display:flex; flex-direction:column; gap:30px; }
  .bullet { display:flex; gap:26px; align-items:flex-start; }
  .bullet .dot { flex:0 0 auto; width:16px; height:16px; border-radius:5px; margin-top:22px;
    background:linear-gradient(135deg, var(--a), ${hexToRgba(b, 0.9)});
    box-shadow:0 0 22px ${hexToRgba(a, 0.55)}, inset 0 1px 3px rgba(255,255,255,0.4);
    animation: pulse 2s infinite;
  }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }

  .box { border-radius:30px; padding:42px 46px; margin-top:14px;
    background:linear-gradient(135deg, ${hexToRgba(a, isLight ? 0.10 : 0.13)}, ${hexToRgba(b, isLight ? 0.06 : 0.07)});
    border:1.5px solid ${hexToRgba(a, isLight ? 0.25 : 0.38)}; }
  .box-title { font-family:'Unbounded'; font-weight:700; font-size:30px; letter-spacing:.08em;
    text-transform:uppercase; color:var(--a); margin-bottom:26px; }

  .facts { display:flex; flex-direction:column; gap:28px; }
  .fact { display:flex; align-items:center; gap:32px; border-radius:28px; padding:30px 36px;
    background:linear-gradient(135deg, ${lightBg}, ${hexToRgba(a, isLight ? 0.04 : 0.06)});
    border:1.5px solid ${mediumBorder};
    box-shadow:0 8px 32px ${hexToRgba(a, isLight ? 0.08 : 0.12)};
    backdrop-filter: blur(10px);
    position: relative; overflow: hidden;
  }
  .fact::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent); }
  .fact .ic { flex:0 0 auto; width:92px; height:92px; border-radius:24px; display:flex; align-items:center; justify-content:center;
    background:linear-gradient(145deg, var(--a), ${hexToRgba(a, isLight ? 0.1 : 0.15)});
    border:2px solid ${hexToRgba(a, isLight ? 0.35 : 0.5)};
    box-shadow:0 8px 24px ${hexToRgba(a, isLight ? 0.15 : 0.25)};
    position: relative;
  }
  .fact .ic::after { content: ''; position: absolute; inset: 0; border-radius: 24px; background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent); }
  .fact .ic .emj { height:48px; width:48px; }
  .fact .lb { font-size:26px; font-weight:700; letter-spacing:.16em; color:${secondaryText}; text-transform:uppercase; }
  .fact .vl { font-size:38px; font-weight:700; margin-top:8px; line-height:1.25; color:${textColor}; }
  .fact .vl small { display:block; font-size:29px; font-weight:500; color:${secondaryText}; margin-top:6px; }

  .hero { position:absolute; top:-10px; right:0; width:250px; height:250px; border-radius:60px;
    display:flex; align-items:center; justify-content:center;
    background:linear-gradient(145deg, ${hexToRgba(a, isLight ? 0.12 : 0.20)}, ${isLight ? 'rgba(0,0,0,.02)' : 'rgba(255,255,255,.03)'});
    border:2px solid ${hexToRgba(a, isLight ? 0.30 : 0.45)};
    box-shadow:0 0 110px ${hexToRgba(a, isLight ? 0.15 : 0.35)}, inset 0 1px 30px rgba(255,255,255,0.2);
    animation: float 3s ease-in-out infinite;
  }
  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
  .hero .emj { width:140px; height:140px; filter: drop-shadow(0 20px 40px ${hexToRgba(a, 0.3)}); }

  .idx { font-family:'Unbounded'; font-weight:800; font-size:112px; line-height:1; color:var(--a);
    text-shadow:0 0 60px ${hexToRgba(a, isLight ? 0.25 : 0.5)}; }
  .src-chip { font-weight:700; font-size:25px; letter-spacing:.1em; color:${secondaryText}; text-transform:uppercase;
    border:1.5px solid ${isLight ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.16)'}; border-radius:999px; padding:14px 28px; background:${lightBg}; }

  .preview { display:flex; flex-direction:column; gap:24px; }
  .pv { display:flex; gap:24px; align-items:center; background:${lightBg};
    border:1.5px solid ${mediumBorder}; border-radius:22px; padding:24px 32px; color:${textColor}; }
  .pv .n { font-family:'Unbounded'; font-weight:800; font-size:30px; color:var(--a); }
  .pv .t { font-size:33px; font-weight:600; line-height:1.3; color:${isLight ? '#374151' : '#inherit'}; }

  .center { align-items:center; text-align:center; }
  .actions { display:flex; gap:26px; justify-content:center; }
  .action { display:flex; flex-direction:column; align-items:center; gap:18px;
    background:linear-gradient(135deg, ${lightBg}, ${hexToRgba(a, isLight ? 0.06 : 0.08)});
    border:1.5px solid ${mediumBorder};
    border-radius:30px; padding:38px 30px; width:272px;
    box-shadow:0 10px 40px ${hexToRgba(a, isLight ? 0.08 : 0.15)};
    transition: transform 0.3s, box-shadow 0.3s;
    position: relative; overflow: hidden;
  }
  .action::before { content: ''; position: absolute; inset: 0; border-radius: 30px;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
    opacity: 0;
  }
  .action .emj { width:74px; height:74px; filter: drop-shadow(0 4px 12px ${hexToRgba(a, 0.15)}); }
  .action .t { font-family:'Unbounded'; font-weight:700; font-size:26px; letter-spacing:.06em; color:${textColor}; }
  .action .d { font-size:24px; color:${secondaryText}; font-weight:500; line-height:1.3; }
  `;
}

function doc(ctx, inner, opts = {}) {
  const { header, footer, ghost } = chrome(ctx, { ...(ctx.opts || {}), ...opts });
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css(ctx)}</style></head>
  <body><div class="gridbg"></div>${ghost}<div class="frame"></div>
  <div class="stage">${header}<main class="content">${inner}</main>${footer}</div></body></html>`;
}

// ---------- slide types ----------
function titleSize(t) {
  const len = t.replace(/\*/g, '').length;
  if (len <= 22) return 96;
  if (len <= 34) return 84;
  if (len <= 48) return 74;
  if (len <= 64) return 64;
  return 56;
}

export function renderSlide(slide, ctx) {
  const t = slide.type;
  ctx.opts = { last: !!slide.last || t === 'cta' || ctx.index === ctx.total, first: t === 'cover' };

  if (t === 'cover') {
    const hero = slide.heroEmoji ? `<div class="hero">${em(slide.heroEmoji)}</div>` : '';
    const meta = (slide.meta || [])
      .map((m) => `<div class="pill">${em(m.icon || '')} <span>${rich(m.text)}</span></div>`) .join('');
    const preview = (slide.preview || [])
      .map((p, i) => `<div class="pv"><div class="n">${String(i + 1).padStart(2, '0')}</div><div class="t">${rich(p)}</div></div>`) .join('');
    return doc(ctx, `
      ${hero}
      <div class="tag">${em(slide.tag || ctx.tag)}</div>
      <h1 style="font-size:${titleSize(slide.title)}px; margin-top:44px; max-width:${slide.heroEmoji ? '86%' : '100%'};">${rich(slide.title)}</h1>
      ${slide.subtitle ? `<div class="sub" style="margin-top:36px; max-width:92%;">${rich(slide.subtitle)}</div>` : ''}
      ${preview ? `<div class="preview" style="margin-top:44px;">${preview}</div>` : ''}
      ${meta ? `<div class="meta" style="margin-top:48px;">${meta}</div>` : ''}
    `);
  }

  if (t === 'body') {
    const parts = [];
    if (slide.kicker) parts.push(`<div class="kicker">${em(slide.kicker)}</div>`);
    if (slide.heading) parts.push(`<h2 style="font-size:${slide.headingSize || 54}px;">${rich(slide.heading)}</h2>`);
    for (const p of slide.paragraphs || []) parts.push(`<div class="body" style="margin-top:34px;">${rich(p)}</div>`);
    if (slide.bullets?.length) {
      parts.push(`<div class="bullets" style="margin-top:40px;">${slide.bullets
        .map((x) => `<div class="bullet"><div class="dot"></div><div class="body">${rich(x)}</div></div>`) .join('')}</div>`);
    }
    if (slide.box) {
      const rows = (slide.box.rows || []).map((r) => `<div class="fact" style="background:transparent; border:none; padding:12px 0;">
        <div class="ic">${em(r.icon || '➡️')}</div><div><div class="lb">${em(r.label || '')}</div><div class="vl">${rich(r.value)}</div></div></div>`).join('');
      parts.push(`<div class="box" style="margin-top:44px;">${slide.box.title ? `<div class="box-title">${em(slide.box.title)}</div>` : ''}
        ${slide.box.text ? `<div class="body">${rich(slide.box.text)}</div>` : ''}${rows}</div>`);
    }
    return doc(ctx, parts.join(''));
  }

  if (t === 'facts') {
    const rows = (slide.facts || []).map((f) => `
      <div class="fact"><div class="ic">${em(f.icon || '➡️')}</div>
      <div><div class="lb">${em(f.label)}</div><div class="vl">${rich(f.value)}${f.note ? `<small>${rich(f.note)}</small>` : ''}</div></div></div>`).join('');
    return doc(ctx, `
      ${slide.kicker ? `<div class="kicker">${em(slide.kicker)}</div>` : ''}
      ${slide.heading ? `<h2 style="font-size:54px;">${rich(slide.heading)}</h2>` : ''}
      <div class="facts" style="margin-top:48px;">${rows}</div>
      ${slide.footnote ? `<div class="body" style="margin-top:40px; font-size:33px; color:#A9B6D6;">${rich(slide.footnote)}</div>` : ''}
    `);
  }

  if (t === 'news') {
    return doc(ctx, `
      <div style="display:flex; align-items:center; justify-content:space-between;">
        <div class="idx">${String(slide.n).padStart(2, '0')}</div>
        ${slide.source ? `<div class="src-chip">${em(slide.source)}</div>` : ''}
      </div>
      <h2 style="font-size:${slide.headingSize || 56}px; margin-top:34px;">${rich(slide.heading)}</h2>
      ${(slide.paragraphs || []).map((p) => `<div class="body" style="margin-top:32px;">${rich(p)}</div>`).join('')}
      ${slide.stat ? `<div class="box" style="margin-top:44px; display:flex; align-items:baseline; gap:28px;">
          <div style="font-family:'Unbounded'; font-weight:800; font-size:74px; color:var(--a);">${em(slide.stat.value)}</div>
          <div class="body" style="font-size:34px;">${rich(slide.stat.label)}</div></div>` : ''}
    `);
  }

  if (t === 'cta') {
    const bigHandle = ctx.handle;
    ctx = { ...ctx, handle: ctx.brand };
    const actions = (slide.actions || [
      { icon: '📌', t: 'SAQLANG', d: 'keyin kerak bo‘ladi' },
      { icon: '📢', t: 'ULASHING', d: 'do‘stlaringizga yuboring' },
      { icon: '🔔', t: 'OBUNA', d: 'har kuni AI yangiliklari' },
    ]).map((x) => `<div class="action">${em(x.icon)}<div class="t">${em(x.t)}</div><div class="d">${em(x.d)}</div></div>`).join('');
    return doc(ctx, `
      <div class="content center" style="justify-content:center;">
        <div class="tag">${em(slide.tag || 'HAR KUNI YANGI POST')}</div>
        <h1 style="font-size:84px; margin-top:48px;">${rich(slide.title || 'Foydali bo‘ldimi?')}</h1>
        ${slide.subtitle ? `<div class="sub" style="margin-top:34px;">${rich(slide.subtitle)}</div>` : ''}
        <div class="actions" style="margin-top:64px;">${actions}</div>
        <div style="margin-top:60px; font-family:'Unbounded'; font-weight:700; font-size:40px;" class="grad">${bigHandle}</div>
      </div>
    `);
  }

  throw new Error(`unknown slide type: ${t}`);
}
