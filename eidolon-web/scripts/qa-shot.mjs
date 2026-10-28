import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const base = process.argv[2] ?? 'http://localhost:4321/';
const width = Number(process.argv[3] ?? 1440);
const height = Number(process.argv[4] ?? 900);
const query = process.argv[5] ?? '?t=day';
const targets = (process.argv[6] ?? '.hero,.why,.loop-sec,.values-sec,.compare-sec,.foundation-sec,.who-sec,.road-sec,.waitlist-sec,#site-footer').split(',');
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
    const node = document.querySelector(sel);
    const y = node.getBoundingClientRect().top + window.scrollY;
    if (sel === '.loop-sec') window.scrollTo(0, y + 320);
    else {
      node.scrollIntoView({ block: 'start', behavior: 'auto' });
      window.scrollBy(0, -80);
    }
  }, selector);
  await new Promise((r) => setTimeout(r, selector === '.loop-sec' ? 1800 : 500));
  const name = selector.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
  const path = `.shots/${width}-${name}.png`;
  await page.screenshot({ path });
  console.log('shot', path);
}
await browser.close();
