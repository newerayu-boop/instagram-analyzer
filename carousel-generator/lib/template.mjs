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
  const header = `
    <header class="bar top">
      <div class="brand">
        <div class="mark">AI</div>
        <div class="brand-t">
          <div class="brand-name">${ctx.brand}</div>
          <div class="brand-sub">${ctx.brandSub}</div>
        </div>
      </div>
      <div class="pill date">${ctx.date}</div>
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
  return `
  @font-face { font-family:'Inter'; src:url('file://${FONTS}/Inter.ttf'); font-weight:100 900; }
  @font-face { font-family:'Unbounded'; src:url('file://${FONTS}/Unbounded.ttf'); font-weight:200 900; }
  * { margin:0; padding:0; box-sizing:border-box; }
  :root { --a:${a}; --b:${b}; }
  html,body { width:1080px; height:1350px; }
  body {
    font-family:'Inter',sans-serif; color:#F2F6FF; overflow:hidden; position:relative;
    background:
      radial-gradient(1000px 780px at 100% -8%, ${hexToRgba(a, 0.30)}, transparent 62%),
      radial-gradient(900px 860px at -12% 112%, ${hexToRgba(b, 0.26)}, transparent 60%),
      radial-gradient(700px 500px at 50% 118%, ${hexToRgba(a, 0.10)}, transparent 60%),
      #070C1F;
  }
  .gridbg { position:absolute; inset:0; z-index:0;
    background-image:linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
    background-size:90px 90px;
    -webkit-mask-image:radial-gradient(1200px 900px at 70% 20%, #000 30%, transparent 75%);
  }
  .frame { position:absolute; inset:26px; border:1.5px solid rgba(255,255,255,.10); border-radius:40px; z-index:1; }
  .ghost { position:absolute; right:14px; bottom:64px; z-index:0; font-family:'Unbounded'; font-weight:900;
    font-size:430px; line-height:1; color:rgba(255,255,255,.035); letter-spacing:-.02em; }
  .stage { position:absolute; inset:0; z-index:2; display:flex; flex-direction:column; padding:74px 84px 64px; }
  .emj { height:1.06em; width:1.06em; vertical-align:-.14em; }

  .bar { display:flex; align-items:center; justify-content:space-between; }
  .brand { display:flex; align-items:center; gap:22px; }
  .mark { width:64px; height:64px; border-radius:19px; display:flex; align-items:center; justify-content:center;
    font-family:'Unbounded'; font-weight:800; font-size:26px; color:#05070F;
    background:linear-gradient(135deg, var(--a), ${hexToRgba(b, 0.95)});
    box-shadow:0 0 42px ${hexToRgba(a, 0.45)}; }
  .brand-name { font-family:'Unbounded'; font-weight:700; font-size:27px; letter-spacing:.10em; }
  .brand-sub { font-size:19px; font-weight:600; letter-spacing:.26em; color:#8A9AC0; margin-top:6px; }
  .pill { border:1.5px solid rgba(255,255,255,.16); background:rgba(255,255,255,.055);
    border-radius:999px; padding:16px 30px; font-weight:700; font-size:25px; letter-spacing:.08em; }
  .content { flex:1; display:flex; flex-direction:column; justify-content:center; position:relative; min-height:0; padding:40px 0 16px; }

  .handle { font-weight:600; font-size:26px; color:#8A9AC0; letter-spacing:.04em; }
  .pager { display:flex; align-items:center; gap:26px; }
  .count { font-family:'Unbounded'; font-weight:600; font-size:24px; color:#A9B6D6; letter-spacing:.1em; }
  .cta-pill { display:flex; align-items:center; gap:14px; background:linear-gradient(135deg, var(--a), ${hexToRgba(b, 0.9)});
    color:#05070F; font-weight:800; font-size:24px; letter-spacing:.1em; border-radius:999px; padding:18px 32px;
    box-shadow:0 0 44px ${hexToRgba(a, 0.35)}; }
  .arr { font-family:'Inter'; font-weight:900; }

  .tag { display:inline-flex; align-items:center; gap:14px; align-self:flex-start;
    background:linear-gradient(135deg, var(--a), ${hexToRgba(b, 0.92)}); color:#05070F;
    font-family:'Unbounded'; font-weight:700; font-size:24px; letter-spacing:.12em; text-transform:uppercase;
    padding:16px 32px; border-radius:14px; box-shadow:0 0 50px ${hexToRgba(a, 0.35)}; }
  .kicker { font-weight:800; font-size:27px; letter-spacing:.22em; text-transform:uppercase; color:var(--a); }
  .grad { background:linear-gradient(92deg, var(--a) 10%, #FFFFFF 90%); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .acc { color:var(--a); font-weight:inherit; }

  h1 { font-family:'Unbounded'; font-weight:800; line-height:1.12; letter-spacing:-.01em; }
  h2 { font-family:'Unbounded'; font-weight:700; font-size:56px; line-height:1.18; margin-top:30px; }
  .sub { font-size:42px; font-weight:500; line-height:1.42; color:#C4CDE6; }
  .body { font-size:40px; font-weight:400; line-height:1.52; color:#D9E0F2; }
  .body b, .sub b { color:#FFFFFF; font-weight:700; }

  .meta { display:flex; flex-wrap:wrap; gap:20px; }
  .meta .pill { display:flex; align-items:center; gap:16px; font-size:30px; letter-spacing:0;
    padding:20px 34px; background:rgba(255,255,255,.06); }
  .meta .pill b { color:#fff; }

  .bullets { display:flex; flex-direction:column; gap:30px; }
  .bullet { display:flex; gap:26px; align-items:flex-start; }
  .bullet .dot { flex:0 0 auto; width:16px; height:16px; border-radius:5px; margin-top:22px;
    background:linear-gradient(135deg, var(--a), ${hexToRgba(b, 0.9)}); box-shadow:0 0 22px ${hexToRgba(a, 0.55)}; }

  .box { border-radius:30px; padding:42px 46px; margin-top:14px;
    background:linear-gradient(135deg, ${hexToRgba(a, 0.13)}, ${hexToRgba(b, 0.07)});
    border:1.5px solid ${hexToRgba(a, 0.38)}; }
  .box-title { font-family:'Unbounded'; font-weight:700; font-size:30px; letter-spacing:.08em;
    text-transform:uppercase; color:var(--a); margin-bottom:26px; }

  .facts { display:flex; flex-direction:column; gap:28px; }
  .fact { display:flex; align-items:center; gap:32px; border-radius:28px; padding:30px 36px;
    background:rgba(255,255,255,.05); border:1.5px solid rgba(255,255,255,.12); }
  .fact .ic { flex:0 0 auto; width:92px; height:92px; border-radius:24px; display:flex; align-items:center; justify-content:center;
    background:linear-gradient(145deg, ${hexToRgba(a, 0.22)}, ${hexToRgba(a, 0.06)}); border:1.5px solid ${hexToRgba(a, 0.4)}; }
  .fact .ic .emj { height:48px; width:48px; }
  .fact .lb { font-size:26px; font-weight:700; letter-spacing:.16em; color:#8A9AC0; text-transform:uppercase; }
  .fact .vl { font-size:38px; font-weight:700; margin-top:8px; line-height:1.25; }
  .fact .vl small { display:block; font-size:29px; font-weight:500; color:#C4CDE6; margin-top:6px; }

  .hero { position:absolute; top:-10px; right:0; width:250px; height:250px; border-radius:60px;
    display:flex; align-items:center; justify-content:center;
    background:linear-gradient(145deg, ${hexToRgba(a, 0.20)}, rgba(255,255,255,.03));
    border:2px solid ${hexToRgba(a, 0.45)}; box-shadow:0 0 110px ${hexToRgba(a, 0.35)}; }
  .hero .emj { width:140px; height:140px; }

  .idx { font-family:'Unbounded'; font-weight:800; font-size:112px; line-height:1; color:var(--a);
    text-shadow:0 0 60px ${hexToRgba(a, 0.5)}; }
  .src-chip { font-weight:700; font-size:25px; letter-spacing:.1em; color:#A9B6D6; text-transform:uppercase;
    border:1.5px solid rgba(255,255,255,.16); border-radius:999px; padding:14px 28px; background:rgba(255,255,255,.05); }

  .preview { display:flex; flex-direction:column; gap:24px; }
  .pv { display:flex; gap:24px; align-items:center; background:rgba(255,255,255,.05);
    border:1.5px solid rgba(255,255,255,.11); border-radius:22px; padding:24px 32px; }
  .pv .n { font-family:'Unbounded'; font-weight:800; font-size:30px; color:var(--a); }
  .pv .t { font-size:33px; font-weight:600; line-height:1.3; }

  .center { align-items:center; text-align:center; }
  .actions { display:flex; gap:26px; justify-content:center; }
  .action { display:flex; flex-direction:column; align-items:center; gap:18px;
    background:rgba(255,255,255,.05); border:1.5px solid rgba(255,255,255,.13);
    border-radius:30px; padding:38px 30px; width:272px; }
  .action .emj { width:74px; height:74px; }
  .action .t { font-family:'Unbounded'; font-weight:700; font-size:26px; letter-spacing:.06em; }
  .action .d { font-size:24px; color:#A9B6D6; font-weight:500; line-height:1.3; }
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
