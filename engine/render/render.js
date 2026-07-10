// engine/render/render.js
// Рендерит карусель (JSON) в набор PNG-слайдов 1080x1350 через Playwright/Chromium.
//
// Использование:
//   node engine/render/render.js <carousel.json> <outDir>
//
// carousel.json: { "handle": "@...", "theme": {...?}, "slides": [ {...}, ... ] }

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { buildHTML, WIDTH, HEIGHT } = require('../templates/carousel');

async function render(carousel, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const html = buildHTML(carousel, carousel.theme || {});

  const browser = await chromium.launch({
    // используем системный Chromium из образа
    executablePath: process.env.CHROMIUM_PATH || undefined,
  });
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 2, // ретина-качество
  });
  await page.setContent(html, { waitUntil: 'networkidle' });
  // ждём подгрузку веб-шрифтов
  await page.evaluate(() => document.fonts && document.fonts.ready);

  const slides = await page.$$('.slide');
  const files = [];
  for (let i = 0; i < slides.length; i++) {
    const file = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    await slides[i].screenshot({ path: file });
    files.push(file);
  }
  await browser.close();
  return files;
}

if (require.main === module) {
  const [, , jsonPath, outDir = 'out'] = process.argv;
  if (!jsonPath) {
    console.error('usage: node render.js <carousel.json> <outDir>');
    process.exit(1);
  }
  const carousel = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  render(carousel, outDir)
    .then(files => console.log('Rendered:\n' + files.join('\n')))
    .catch(err => { console.error(err); process.exit(1); });
}

module.exports = { render };
