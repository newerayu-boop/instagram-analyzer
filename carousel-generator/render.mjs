// Render Instagram carousel slides (1080x1350 PNG) from a content JSON.
// Usage: node render.mjs content/2026-07-11.json [--only carousel-id]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { renderSlide } from './lib/template.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const contentPath = process.argv[2] || 'content/latest.json';
const onlyIdx = process.argv.indexOf('--only');
const only = onlyIdx > -1 ? process.argv[onlyIdx + 1] : null;

const data = JSON.parse(fs.readFileSync(path.resolve(ROOT, contentPath), 'utf8'));
const buildDir = path.join(ROOT, 'build');
const outRoot = path.join(ROOT, 'output', data.date_slug);
fs.mkdirSync(buildDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium',
});
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });

for (const car of data.carousels) {
  if (only && car.id !== only) continue;
  const outDir = path.join(outRoot, car.id);
  fs.mkdirSync(outDir, { recursive: true });
  const total = car.slides.length;

  for (let i = 0; i < total; i++) {
    const ctx = {
      brand: data.brand.name,
      brandSub: data.brand.sub,
      handle: data.brand.handle,
      date: data.brand.date,
      accent: car.accent,
      accent2: car.accent2 || car.accent,
      tag: car.tag || '',
      index: i + 1,
      total,
      theme: data.theme || 'dark',
    };
    const html = renderSlide(car.slides[i], ctx);
    const htmlPath = path.join(buildDir, `${car.id}-${i + 1}.html`);
    fs.writeFileSync(htmlPath, html);
    await page.goto('file://' + htmlPath);
    await page.evaluate(() => document.fonts.ready);

    // auto-fit: shrink content if it overflows its area
    await page.evaluate(() => {
      const c = document.querySelector('.content');
      if (!c) return;
      let zoom = 1;
      while ((c.scrollHeight > c.clientHeight + 2 || c.scrollWidth > c.clientWidth + 2) && zoom > 0.66) {
        zoom -= 0.03;
        c.style.zoom = zoom;
      }
    });
    await page.waitForTimeout(60);

    const png = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    await page.screenshot({ path: png, clip: { x: 0, y: 0, width: 1080, height: 1350 } });
    console.log('rendered', path.relative(ROOT, png));
  }

  if (car.caption_uz) fs.writeFileSync(path.join(outDir, 'caption-uz.txt'), car.caption_uz.trim() + '\n');
  if (car.caption_ru) fs.writeFileSync(path.join(outDir, 'caption-ru.txt'), car.caption_ru.trim() + '\n');
}

await browser.close();
console.log('done ->', path.relative(ROOT, outRoot));
