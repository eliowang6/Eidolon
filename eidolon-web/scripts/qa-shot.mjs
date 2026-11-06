import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const base = process.argv[2] ?? 'http://localhost:4321/';
const width = Number(process.argv[3] ?? 1440);
const height = Number(process.argv[4] ?? 900);
// e.g. '?c=ael' to see the page with Ael
const query = process.argv[5] ?? '';
// the home page's sections, top to bottom
const targets = (process.argv[6] ?? '.hero,.day,.desk,.powers,.trust,.log,.plans,.investors,.home-faq,#site-footer').split(',');
mkdirSync('.shots', { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--force-device-scale-factor=1'],
});
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 1 });
await page.goto(base + query, { waitUntil: 'networkidle0' });
await page.evaluate(async () => {
  document.documentElement.style.scrollBehavior = 'auto';
  try { localStorage.removeItem('instarmony_lang'); } catch {}
  document.getElementById('lang-hint')?.remove();
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 600) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 40));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 400));
});
for (const selector of targets) {
  const el = await page.$(selector);
  if (!el) { console.log('missing', selector); continue; }
  await page.evaluate((sel) => {
    document.querySelector(sel).scrollIntoView({ block: 'start', behavior: 'auto' });
    window.scrollBy(0, -80);
  }, selector);
  await new Promise((r) => setTimeout(r, 500));
  const name = selector.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
  const path = `.shots/${width}-${name}.png`;
  await page.screenshot({ path });
  console.log('shot', path);
}
await browser.close();
