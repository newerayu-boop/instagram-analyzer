/* Build a fully self-contained copy of the masterclass page for the Artifact host.
   The CSP there blocks every external host, so fonts, images and video are inlined,
   and the lead POST is short-circuited into a local success state. */
const fs = require('fs');
const path = require('path');

const REPO = '/home/user/instagram-analyzer';
const SCRATCH = '/tmp/claude-0/-home-user-instagram-analyzer/bd3ae410-1804-5c99-9838-4a7e12a2e218/scratchpad';
const SRC = path.join(REPO, 'public/masterclass/index.html');
const OUT = path.join(SCRATCH, 'artifact/masterclass-demo.html');

let html = fs.readFileSync(SRC, 'utf8');

/* ---- 1. fonts: swap the Google Fonts <link>s for the pre-inlined @font-face block ---- */
const fontCss = fs.readFileSync(path.join(SCRATCH, 'artifact/fonts-inline.css'), 'utf8');
const before = html.length;
html = html.replace(
  /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\s*<link href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]*" rel="stylesheet">/,
  '<style>\n' + fontCss + '\n</style>'
);
if (html.length === before) throw new Error('font link block not matched');

/* ---- 2. every /masterclass/img/... reference becomes a data: URI ---- */
const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
               '.webp': 'image/webp', '.mp4': 'video/mp4', '.svg': 'image/svg+xml' };
const cache = new Map();
let inlined = 0, missing = [];

// lighter re-encodes used only for the artifact build — the site keeps the originals
const OPT = path.join(SCRATCH, 'artifact/opt');
function optimised(rel) {
  const base = path.basename(rel);
  if (base === 'masterclass.mp4') return path.join(SCRATCH, 'artifact/mc-small.mp4');
  if (base === 'video-poster.jpg' || base === 'ballroom.jpg') return path.join(OPT, base);
  if (/^r[1-6]\.png$/.test(base)) return path.join(OPT, base.replace('.png', '.jpg'));
  return null;
}

function dataUri(rel) {
  if (cache.has(rel)) return cache.get(rel);
  const file = optimised(rel) || path.join(REPO, 'public', rel.replace(/^\//, ''));
  if (!fs.existsSync(file)) { missing.push(rel); return rel; }
  const mime = MIME[path.extname(file).toLowerCase()];
  const uri = `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;
  cache.set(rel, uri); inlined++;
  return uri;
}

html = html.replace(/(["'\s])(\/masterclass\/img\/[^"'\s>]+)/g, (m, lead, rel) => lead + dataUri(rel));
if (missing.length) throw new Error('missing assets: ' + [...new Set(missing)].join(', '));

/* ---- 2b. Lenis is loaded from unpkg on the site; the CSP here blocks it, so inline it ---- */
// the bundle assigns globalThis.Lenis itself; only the source-map comment needs dropping
const lenis = fs.readFileSync(path.join(SCRATCH, 'artifact/lenis.min.js'), 'utf8')
  .replace(/\/\/# sourceMappingURL=.*$/m, '');
const lenisTag = /<script src="https:\/\/unpkg\.com\/lenis@[^"]*"[^>]*><\/script>/;
if (!lenisTag.test(html)) throw new Error('lenis script tag not found');
html = html.replace(lenisTag, '<script>\n' + lenis + '\n</script>');

/* ---- 3. og:image can't be a 600 KB data URI — drop it, it means nothing here ---- */
html = html.replace(/<meta property="og:image"[^>]*>\s*/, '');

/* ---- 4. no /api/lead on the artifact host: show the success state locally ---- */
const marker = "    fetch('/api/lead',{";
if (!html.includes(marker)) throw new Error('lead fetch call not found');
html = html.replace(marker, [
  '    if(window.__DEMO__){',
  '      setTimeout(function(){',
  "        document.getElementById('regFormWrap').style.display='none';",
  "        document.getElementById('regDone').style.display='block';",
  '        btn.disabled=false; btn.style.opacity=1;',
  '      }, 550);',
  '      return;',
  '    }',
  marker
].join('\n'));
html = html.replace('<body', '<script>window.__DEMO__=true;</script><body');

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);
console.log('inlined assets :', inlined);
console.log('output         :', OUT);
console.log('size           :', (fs.statSync(OUT).size / 1048576).toFixed(2), 'MB');
