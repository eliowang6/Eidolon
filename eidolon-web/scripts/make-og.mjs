import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
// Serve the project root first, e.g. `python -m http.server 4378 --bind 127.0.0.1`,
// then `npm run og` (or pass another URL to scripts/og.html as the first argument).
const base = process.argv[2] ?? 'http://127.0.0.1:4378/scripts/og.html';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--force-device-scale-factor=1'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

for (const lang of ['zh', 'en']) {
  await page.goto(`${base}?lang=${lang}`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 250));
  const png = await page.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } });
  // Lossless, just packed harder: about a third of the raw screenshot.
  const packed = await sharp(png).png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 }).toBuffer();
  writeFileSync(resolve(ROOT, `public/assets/og-${lang}.png`), packed);
  console.log('og', lang);
}
await browser.close();
