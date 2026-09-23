#!/usr/bin/env node
/**
 * SEO artifact generator + search engine submitter for instarmony.com.
 *
 * Usage:
 *   node scripts/seo-submit.mjs generate   # build sitemap.xml + robots.txt (run before packaging)
 *   node scripts/seo-submit.mjs submit     # ping IndexNow / Baidu / Google (run after deploy)
 *
 * Optional environment (all submit features degrade gracefully when absent):
 *   SEO_INDEXNOW_KEY      IndexNow API key (also served as /<key>.txt at site root)
 *   SEO_GSC_ACCESS_TOKEN  Google OAuth2 access token with Search Console scope
 *   Baidu ping needs no credential.
 *
 * Rebuilt 2026-09-06 after the original script was lost in a workspace cleanup.
 */

import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const SITE = 'https://instarmony.com';

// Canonical pages: top-level site pages + product pages under /eidolon/.
// Redirect stubs (login.html / contact.html) are intentionally NOT listed:
// they are noindex + canonical-ized, and crawling them yields duplicate content.
const PAGES = [
  { path: '/',                priority: '1.0', changefreq: 'weekly' },
  { path: '/eidolon/',        priority: '1.0', changefreq: 'weekly' },
  { path: '/eidolon/download.html',  priority: '0.9', changefreq: 'weekly' },
  { path: '/eidolon/features.html',  priority: '0.8', changefreq: 'monthly' },
  { path: '/eidolon/pricing.html',   priority: '0.8', changefreq: 'monthly' },
  { path: '/eidolon/docs.html',      priority: '0.7', changefreq: 'weekly' },
  { path: '/eidolon/about.html',     priority: '0.5', changefreq: 'monthly' },
  { path: '/team/eli0wang6/',        priority: '0.5', changefreq: 'monthly' },
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function generate() {
  const urls = PAGES.map(p => SITE + p.path);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(p => `  <url>
    <loc>${SITE + p.path}</loc>
    <lastmod>${today()}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

  const robots = `User-agent: *
Allow: /
Disallow: /web/
Disallow: /eidolon/login.html

Sitemap: ${SITE}/sitemap.xml
`;

  writeFileSync(resolve(ROOT, 'sitemap.xml'), sitemap, 'utf8');
  writeFileSync(resolve(ROOT, 'robots.txt'), robots, 'utf8');
  console.log(`[OK] Generated sitemap.xml (${PAGES.length} URLs) and robots.txt`);

  // IndexNow key file: must be reachable at the site root for ownership verification.
  const key = process.env.SEO_INDEXNOW_KEY;
  if (key) {
    writeFileSync(resolve(ROOT, `${key}.txt`), key, 'utf8');
    console.log('[OK] Generated IndexNow key file');
  } else {
    console.log('[INFO] SEO_INDEXNOW_KEY not set, skipped IndexNow key file (submit will skip IndexNow too)');
  }
}

function post(url, body, headers) {
  return fetch(url, {
    method: 'POST',
    headers,
    body,
  }).then(r => ({ status: r.status, ok: r.ok })).catch(e => ({ status: 0, ok: false, error: String(e) }));
}

async function submit() {
  const sitemapPath = resolve(ROOT, 'sitemap.xml');
  if (!existsSync(sitemapPath)) {
    console.log('[WARN] sitemap.xml not found, run "generate" first');
    return;
  }
  const sitemap = readFileSync(sitemapPath, 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  if (urls.length === 0) {
    console.log('[WARN] sitemap.xml contains no URLs');
    return;
  }
  console.log(`[INFO] Submitting ${urls.length} URLs`);

  // --- IndexNow (Bing / Yandex / Naver via api.indexnow.org) ---
  const indexNowKey = process.env.SEO_INDEXNOW_KEY;
  if (indexNowKey) {
    const body = JSON.stringify({
      host: 'instarmony.com',
      key: indexNowKey,
      urlList: urls,
    });
    const r = await post('https://api.indexnow.org/indexnow', body, { 'Content-Type': 'application/json; charset=utf-8' });
    console.log(`[IndexNow] ${r.ok ? 'OK' : 'FAILED'} (status ${r.status})`);
  } else {
    console.log('[IndexNow] Skipped (SEO_INDEXNOW_KEY not set)');
  }

  // --- Baidu ziyuan ping (no credential needed, per-URL API) ---
  let baiduOk = 0;
  for (const u of urls) {
    const r = await post(`http://data.zz.baidu.com/urls?site=instarmony.com&token=${encodeURIComponent(process.env.SEO_BAIDU_TOKEN || '')}`, u, { 'Content-Type': 'text/plain' });
    if (r.ok) baiduOk++;
  }
  console.log(`[Baidu] ${baiduOk}/${urls.length} URLs accepted` + (process.env.SEO_BAIDU_TOKEN ? '' : ' (set SEO_BAIDU_TOKEN for a valid token)'));
  if (!process.env.SEO_BAIDU_TOKEN) {
    console.log('[Baidu] Skipped effectively: no token configured');
  }

  // --- Google Search Console (sitemap resubmission) ---
  const gscToken = process.env.SEO_GSC_ACCESS_TOKEN;
  if (gscToken) {
    const r = await post(
      'https://www.googleapis.com/webmasters/v3/sites/' + encodeURIComponent('sc-domain:instarmony.com') + '/sitemaps/' + encodeURIComponent(SITE + '/sitemap.xml'),
      '',
      { Authorization: `Bearer ${gscToken}`, 'Content-Type': 'application/json' }
    );
    console.log(`[Google] ${r.ok ? 'OK' : 'FAILED'} (status ${r.status})`);
  } else {
    console.log('[Google] Skipped (SEO_GSC_ACCESS_TOKEN not set)');
  }
}

const cmd = process.argv[2];
if (cmd === 'generate') {
  generate();
} else if (cmd === 'submit') {
  await submit();
} else {
  console.error('Usage: node scripts/seo-submit.mjs <generate|submit>');
  process.exit(1);
}
