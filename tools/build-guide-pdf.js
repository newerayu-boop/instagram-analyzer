#!/usr/bin/env node
/**
 * public/guide/index.html -> public/guide/gemini-notebooklm-qollanma.pdf
 *
 * Shriftlar (Inter, Manrope) PDF ichiga base64 qilib joylanadi — shunda fayl
 * internetsiz ham bir xil ko'rinadi. Ishga tushirish: node tools/build-guide-pdf.js
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { chromium } = require(require('child_process')
  .execSync('npm root -g').toString().trim() + '/playwright');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'public/guide/index.html');
const OUT = path.join(ROOT, 'public/guide/gemini-notebooklm-qollanma.pdf');
const CACHE = path.join(__dirname, '.fonts-cache.css');
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';
const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@700;800&display=swap';

function get(url, binary) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return get(res.headers.location, binary).then(resolve, reject);
      }
      const chunks = [];
      res.on('data', (d) => chunks.push(d));
      res.on('end', () => resolve(binary ? Buffer.concat(chunks) : Buffer.concat(chunks).toString()));
    }).on('error', reject);
  });
}

// Faqat latin va latin-ext qismini olamiz — o'zbek va rus interfeys nomlari uchun yetadi.
const SKIP = ['U+0460', 'U+1F00', 'U+0370', 'U+1EA0'];

async function buildFontCss() {
  if (fs.existsSync(CACHE)) return fs.readFileSync(CACHE, 'utf8');
  const css = await get(FONTS_URL);
  let out = '';
  for (const block of css.split('@font-face').slice(1)) {
    const fam = /font-family: '([^']+)'/.exec(block);
    const weight = /font-weight: (\d+)/.exec(block);
    const url = /url\((https:[^)]+)\)/.exec(block);
    const range = /unicode-range: ([^;]+);/.exec(block);
    if (!fam || !weight || !url) continue;
    const r = range ? range[1] : '';
    if (SKIP.some((s) => r.includes(s))) continue;
    const buf = await get(url[1], true);
    out += `@font-face{font-family:'${fam[1]}';font-style:normal;font-weight:${weight[1]};`
      + `font-display:block;src:url(data:font/woff2;base64,${buf.toString('base64')}) format('woff2');`
      + (r ? `unicode-range:${r};` : '') + '}\n';
  }
  fs.writeFileSync(CACHE, out);
  return out;
}

(async () => {
  const fontCss = await buildFontCss();
  const html = fs.readFileSync(SRC, 'utf8')
    .replace(/<link id="webfonts"[^>]*>/, '')
    .replace('/*FONTS*/', fontCss);

  const tmp = path.join(require('os').tmpdir(), 'guide-print.html');
  fs.writeFileSync(tmp, html);

  const browser = await chromium.launch({ args: ['--font-render-hinting=none'] });
  const page = await browser.newPage();
  await page.goto('file://' + tmp, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: OUT,
    printBackground: true,
    width: '794px',
    height: '1122px',
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await browser.close();
  fs.unlinkSync(tmp);

  const kb = (fs.statSync(OUT).size / 1024).toFixed(0);
  console.log(`PDF tayyor: ${path.relative(ROOT, OUT)} (${kb} KB)`);
})();
