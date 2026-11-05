#!/usr/bin/env node
/**
 * SEO artifact generator + search engine submitter for both sites.
 *
 *   instarmony.com            → the lab site (sitemap.xml)
 *   sholarel.instarmony.com    → the Sholarel product site (Astro emits
 *                               sitemap-index.xml → sitemap-0.xml; this script
 *                               flattens that child into sitemap.xml, which is
 *                               what robots.txt advertises)
 *
 * Usage:
 *   node scripts/seo-submit.mjs generate   # build sitemap.xml + robots.txt (before packaging)
 *   node scripts/seo-submit.mjs submit     # push URLs to IndexNow / Baidu / Google (after deploy)
 *
 * Optional environment (every submit path degrades to "skipped" when absent):
 *   SEO_INDEXNOW_KEY           IndexNow key; served as /<key>.txt on BOTH hosts
 *   SEO_BAIDU_TOKEN            Baidu 普通收录 token for instarmony.com
 *   SEO_BAIDU_TOKEN_EIDOLON    Baidu 普通收录 token for sholarel.instarmony.com
 *   SEO_BAIDU_SITE             Override the Baidu "site" param for instarmony.com
 *   SEO_BAIDU_SITE_EIDOLON     Override it for sholarel.instarmony.com
 *                              (defaults to the origin; set it when 百度平台
 *                               registered the bare domain instead of https://)
 *   SEO_BAIDU_REWRITE_HOST     Rewrite the host of pushed URLs (instarmony.com)
 *   SEO_BAIDU_REWRITE_HOST_EIDOLON   Same for sholarel.instarmony.com
 *                              (use when 百度 registered www.x but the site's
 *                               canonical host is the bare domain)
 *   SEO_BAIDU_INCLUDE_EN=1     Also push /en/ pages (off by default — they waste
 *                              the ~10/day quota and never rank for zh queries)
 *   SEO_GSC_ACCESS_TOKEN       Google OAuth2 token with Search Console scope
 *
 * Reads .env from the repo root, so a local `node scripts/seo-submit.mjs submit`
 * behaves like the deploy.
 */

import { writeFileSync, existsSync, readFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// .env
// ---------------------------------------------------------------------------

function loadEnvFile(file) {
  if (!existsSync(file)) return 0;
  let n = 0;
  for (const raw of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
      n++;
    }
  }
  return n;
}

loadEnvFile(resolve(ROOT, '.env'));

// ---------------------------------------------------------------------------
// Site definitions
// ---------------------------------------------------------------------------

const SITES = [
  {
    host: 'instarmony.com',
    origin: 'https://instarmony.com',
    // sitemap file name, relative to the deployed root
    sitemap: 'sitemap.xml',
    // The docs live on the product sub-domain (see the second entry), so this
    // host no longer ships a documentation tree.
    // directory whose contents get zipped into that site's Pages project
    outRoot: ROOT,
    baiduEnv: 'SEO_BAIDU_TOKEN',
    baiduSiteEnv: 'SEO_BAIDU_SITE',
    baiduRewriteEnv: 'SEO_BAIDU_REWRITE_HOST',
  },
  {
    host: 'sholarel.instarmony.com',
    origin: 'https://sholarel.instarmony.com',
    // Astro emits sitemap-index.xml → sitemap-0.xml; generate() flattens the
    // child into a single sitemap.xml, which is what robots.txt advertises.
    sitemap: 'sitemap.xml',
    // The Docusaurus URLs are merged into that sitemap.xml by generate(), so
    // there is nothing to add here — an extra sitemap entry would only point
    // at a file that lives in the docs build output, not in this outRoot.
    outRoot: resolve(ROOT, 'eidolon-site'),
    baiduEnv: 'SEO_BAIDU_TOKEN_EIDOLON',
    baiduSiteEnv: 'SEO_BAIDU_SITE_EIDOLON',
    baiduRewriteEnv: 'SEO_BAIDU_REWRITE_HOST_EIDOLON',
  },
];

// Canonical pages of the lab host. The Sholarel product lives on its own
// sub-domain with an Astro-generated sitemap; every file under /eidolon/ is a
// noindex + canonical-ised 0-second redirect stub, so none of them belong here.
const MAIN_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/team/eli0wang6/', priority: '0.5', changefreq: 'monthly' },
];

const MAIN_ROBOTS = `User-agent: *
Allow: /
Disallow: /web/

# The documentation lives on the product sub-domain now. The old
# /docs/build/* URLs answer with a 301 (edgeone.json), so they must not be
# advertised here as canonical pages of this host.
#
# The former /eidolon/login.html stub is not disallowed either: it answers with
# a 301 to the download page, and a Disallow would stop the crawler from ever
# reading that redirect.
Sitemap: https://instarmony.com/sitemap.xml
`;

const SUB_ROBOTS = `User-agent: *
Allow: /

# The only pages excluded from indexing are the two 0-second redirect stubs
# (login.html, contact.html). They carry <meta name="robots" content="noindex">
# themselves, so they are deliberately NOT disallowed here — a Disallow would
# stop crawlers from ever reading the noindex and keep the stub in the index.

Sitemap: https://sholarel.instarmony.com/sitemap.xml
`;

// ---------------------------------------------------------------------------
// generate
// ---------------------------------------------------------------------------

function today() {
  return new Date().toISOString().slice(0, 10);
}

function generateMain() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${MAIN_PAGES.map(
  (p) => `  <url>
    <loc>https://instarmony.com${p.path}</loc>
    <lastmod>${today()}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
).join('\n')}
</urlset>
`;
  writeFileSync(resolve(ROOT, 'sitemap.xml'), sitemap, 'utf8');
  writeFileSync(resolve(ROOT, 'robots.txt'), MAIN_ROBOTS, 'utf8');
  console.log(`[OK] instarmony.com: sitemap.xml (${MAIN_PAGES.length} URLs) + robots.txt`);
}

function generateSub() {
  const out = resolve(ROOT, 'eidolon-site');
  if (!existsSync(resolve(out, 'index.html'))) {
    console.log('[WARN] eidolon-site/ not built yet — skipping sub-domain robots.txt');
    return;
  }
  const robots = resolve(out, 'robots.txt');
  if (!existsSync(robots)) {
    // public/robots.txt is the source of truth; this is the fallback for a
    // --skip-site-build run against a stale output directory.
    writeFileSync(robots, SUB_ROBOTS, 'utf8');
    console.log('[WARN] eidolon-site/robots.txt was missing — wrote the fallback copy');
  } else {
    console.log('[OK] sholarel.instarmony.com: robots.txt present');
  }
  // Collapse Astro's two-file output into ONE canonical sitemap.
  //
  // Astro emits sitemap-index.xml → sitemap-0.xml. We keep a single flat
  // sitemap.xml because EdgeOne classifies "sitemap-0.xml" as a content-hashed
  // asset and serves it `max-age=31536000, immutable` — a year-long cache on a
  // file that changes every deploy. "sitemap.xml" gets `max-age=0`.
  //
  // sitemap-index.xml survives but is repointed at sitemap.xml instead of being
  // deleted: Bing and Google were both handed that URL at some point, so a 404
  // here would show up as a sitemap error in their consoles until someone
  // remembers to delete the row. A one-entry index costs nothing and keeps every
  // entry point converging on the same fresh document.
  const flat = resolve(out, 'sitemap.xml');
  const child = resolve(out, 'sitemap-0.xml');
  const index = resolve(out, 'sitemap-index.xml');
  const subOrigin = SITES.find((s) => s.host === 'sholarel.instarmony.com').origin;

  if (existsSync(child)) {
    const xml = readFileSync(child, 'utf8');
    writeFileSync(flat, xml, 'utf8');
    rmSync(child, { force: true });
    const count = (xml.match(/<loc>/g) || []).length;
    console.log(`[OK] sholarel.instarmony.com: sitemap.xml flattened (${count} URLs)`);
  } else if (existsSync(flat)) {
    const count = (readFileSync(flat, 'utf8').match(/<loc>/g) || []).length;
    console.log(`[OK] sholarel.instarmony.com: sitemap.xml already flattened (${count} URLs)`);
  } else {
    console.log('[WARN] eidolon-site has no sitemap at all — run the Astro build');
    return;
  }

  // The docs live on this host too, under /docs/. Astro knows nothing about
  // them, so their URLs are merged in from the Docusaurus sitemaps — otherwise
  // the documentation pages would be indexed only by discovery, never by the
  // sitemap the crawlers are pointed at.
  const docsLocs = [];
  for (const rel of ['docs/sitemap.xml', 'docs/en/sitemap.xml']) {
    const docSitemap = resolve(ROOT, 'docs', 'build', rel.replace(/^docs\//, ''));
    if (!existsSync(docSitemap)) continue;
    const xml = readFileSync(docSitemap, 'utf8');
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      docsLocs.push(m[1].trim());
    }
  }
  if (docsLocs.length) {
    const current = readFileSync(flat, 'utf8');
    // Docusaurus emits absolute URLs against the url it was built with, which
    // is the product sub-domain — the same origin this sitemap belongs to.
    //
    // This step has to be idempotent: generate() may run again against an
    // output directory that already carries a merged sitemap (a --skip-site-build
    // run, or a second call in the same session). Appending blindly would
    // duplicate every documentation URL on each pass, and a sitemap with
    // repeated entries is a warning in every search console.
    const present = new Set();
    for (const m of current.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      present.add(m[1].trim());
    }
    const fresh = docsLocs.filter((loc) => !present.has(loc));
    if (fresh.length) {
      const entries = fresh
        .map((loc) => `  <url><loc>${loc}</loc><changefreq>monthly</changefreq></url>`)
        .join('\n');
      const merged = current.replace('</urlset>', `${entries}\n</urlset>`);
      writeFileSync(flat, merged, 'utf8');
      console.log(`[OK] sholarel.instarmony.com: merged ${fresh.length} docs URLs into sitemap.xml`);
    } else {
      console.log('[OK] sholarel.instarmony.com: docs URLs already present in sitemap.xml');
    }
  } else {
    console.log('[WARN] no docs sitemap found — the documentation pages are not in sitemap.xml');
  }

  writeFileSync(
    index,
    '<?xml version="1.0" encoding="UTF-8"?>'
      + '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
      + `<sitemap><loc>${subOrigin}/sitemap.xml</loc></sitemap>`
      + '</sitemapindex>',
    'utf8',
  );
  console.log('[OK] sholarel.instarmony.com: sitemap-index.xml repointed at sitemap.xml');
}

function generateKeyFiles() {
  const key = process.env.SEO_INDEXNOW_KEY;
  if (!key) {
    console.log('[INFO] SEO_INDEXNOW_KEY not set — IndexNow is disabled (Bing will only crawl organically)');
    return;
  }
  // IndexNow verifies ownership by fetching /<key>.txt from the host of every
  // submitted URL, so the file has to exist on BOTH hosts, not just the main one.
  for (const site of SITES) {
    writeFileSync(resolve(site.outRoot, `${key}.txt`), key, 'utf8');
  }
  console.log(`[OK] IndexNow key file written to both hosts (${key}.txt)`);
}

function generate() {
  generateMain();
  generateSub();
  generateKeyFiles();
}

// ---------------------------------------------------------------------------
// submit
// ---------------------------------------------------------------------------

async function request(url, { method = 'GET', body, headers = {} } = {}) {
  try {
    const res = await fetch(url, { method, headers, body });
    const text = await res.text().catch(() => '');
    return { status: res.status, ok: res.ok, text };
  } catch (e) {
    return { status: 0, ok: false, text: String(e) };
  }
}

/** Every <loc> in one sitemap file, following one level of sitemap index. */
function locsOf(outRoot, relPath) {
  const file = resolve(outRoot, relPath);
  if (!existsSync(file)) return null;
  const xml = readFileSync(file, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!/<sitemapindex/.test(xml)) return locs;

  const urls = [];
  for (const childUrl of locs) {
    const childFile = resolve(outRoot, basename(new URL(childUrl).pathname));
    if (!existsSync(childFile)) {
      console.log(`[WARN] child sitemap ${basename(childUrl)} not found locally`);
      continue;
    }
    const childXml = readFileSync(childFile, 'utf8');
    urls.push(...[...childXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  }
  return urls;
}

function urlsFromSitemap(site) {
  const all = [];
  for (const rel of [site.sitemap, ...(site.extraSitemaps ?? [])]) {
    const locs = locsOf(site.outRoot, rel);
    if (locs === null) {
      console.log(`[WARN] ${site.host}: ${rel} not found — skipping`);
      continue;
    }
    all.push(...locs);
  }
  return [...new Set(all)];
}

async function submitIndexNow(site, urls) {
  const key = process.env.SEO_INDEXNOW_KEY;
  if (!key) {
    console.log(`[IndexNow] ${site.host}: skipped (SEO_INDEXNOW_KEY not set)`);
    return;
  }
  const body = JSON.stringify({
    host: site.host,
    key,
    keyLocation: `${site.origin}/${key}.txt`,
    urlList: urls,
  });
  const r = await request('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body,
  });
  // 200 = accepted, 202 = accepted but key still being validated, 403 = key file unreachable
  const note =
    r.status === 403
      ? ' — key file not reachable at ' + `${site.origin}/${key}.txt`
      : r.status === 422
        ? ' — URL/host mismatch'
        : r.status === 429
          ? ' — too many requests'
          : '';
  console.log(`[IndexNow] ${site.host}: ${r.ok ? 'OK' : 'FAILED'} (status ${r.status}, ${urls.length} URLs)${note}`);
}

async function submitBaidu(site, urls) {
  const token = process.env[site.baiduEnv];
  if (!token) {
    console.log(`[Baidu] ${site.host}: skipped (${site.baiduEnv} not set)`);
    return;
  }
  // The `site` parameter must match the property exactly as registered in
  // 百度搜索资源平台, protocol included — a mismatch comes back as
  // {"error":400,"message":"site init fail"}. Overridable per host for the case
  // where the platform shows the bare domain.
  const baiduSite = process.env[site.baiduSiteEnv] || site.origin;

  // Quota is per site and starts around 10 URLs/day for a new property, so
  // spend it on pages Baidu can actually rank. It does not meaningfully index
  // /en/ pages for Chinese queries — those come back as not_valid/ignored and
  // just burn the daily allowance. Opt back in with SEO_BAIDU_INCLUDE_EN=1.
  let queue = urls;
  if (process.env.SEO_BAIDU_INCLUDE_EN !== '1') {
    const before = queue.length;
    queue = queue.filter((u) => !/\/en(\/|$)/.test(new URL(u).pathname));
    if (queue.length !== before) {
      console.log(`[Baidu] ${site.host}: skipping ${before - queue.length} /en/ URLs (SEO_BAIDU_INCLUDE_EN=1 to include)`);
    }
  }

  // If 百度 registered the site under a different host than the canonical one
  // (e.g. www.instarmony.com vs instarmony.com), every pushed URL comes back in
  // not_same_site. This rewrites the host instead of dropping the submission.
  const rewriteHost = process.env[site.baiduRewriteEnv];
  if (rewriteHost) {
    queue = queue.map((u) => {
      const url = new URL(u);
      url.host = rewriteHost;
      return url.href;
    });
    console.log(`[Baidu] ${site.host}: rewriting host to ${rewriteHost}`);
  }

  let accepted = 0;
  let remain = null;
  const rejected = [];
  for (let i = 0; i < queue.length; i += 50) {
    const chunk = queue.slice(i, i + 50);
    const r = await request(
      `http://data.zz.baidu.com/urls?site=${encodeURIComponent(baiduSite)}&token=${encodeURIComponent(token)}`,
      { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: chunk.join('\n') }
    );
    try {
      const json = JSON.parse(r.text);
      accepted += json.success ?? 0;
      if (json.remain !== undefined) remain = json.remain;
      if (json.not_same_site?.length) {
        rejected.push(...json.not_same_site);
        console.log(
          `[Baidu] ${site.host}: ${json.not_same_site.length} URL(s) not_same_site — ` +
            `registered site is ${baiduSite}, URLs are on ${site.host}. ` +
            `Set ${site.baiduRewriteEnv} or register ${site.origin} in 百度平台.`
        );
      }
      if (json.error) {
        console.log(`[Baidu] ${site.host}: error ${json.error} — ${json.message ?? ''}`);
        if (/site init fail/i.test(json.message ?? '')) {
          console.log(
            `[Baidu]   hint: "site" 参数必须与平台上注册的站点完全一致（含协议）。` +
              `当前用的是 ${baiduSite}，可用 ${site.baiduSiteEnv} 覆盖。`
          );
        }
        if (/over quota/i.test(json.message ?? '')) {
          console.log(
            `[Baidu]   hint: 当日配额用完了。普通收录 API 的额度按站点计、每天重置，` +
              `额度很紧（通常 10 条/天起）——明天再跑一次即可。`
          );
        }
      }
    } catch {
      if (!r.ok) console.log(`[Baidu] ${site.host}: HTTP ${r.status} ${r.text.slice(0, 120)}`);
    }
  }
  console.log(
    `[Baidu] ${site.host}: ${accepted}/${queue.length} URLs accepted` +
      (remain !== null ? ` (daily quota left: ${remain})` : '')
  );
  if (remain !== null && remain < queue.length - accepted) {
    console.log(`[Baidu] ${site.host}: quota is the bottleneck — re-run tomorrow for the rest`);
  }
}

async function submitGoogle(site, urls) {
  const token = process.env.SEO_GSC_ACCESS_TOKEN;
  if (!token) {
    console.log(`[Google] ${site.host}: skipped (SEO_GSC_ACCESS_TOKEN not set)`);
    return;
  }
  // Google needs a Search Console property per host; sc-domain: covers subdomains.
  const property = encodeURIComponent('sc-domain:instarmony.com');
  const sitemapUrl = encodeURIComponent(`${site.origin}/${site.sitemap}`);
  const r = await request(
    `https://www.googleapis.com/webmasters/v3/sites/${property}/sitemaps/${sitemapUrl}`,
    { method: 'PUT', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
  );
  console.log(`[Google] ${site.host}: ${r.ok ? 'OK' : 'FAILED'} (status ${r.status}, ${urls.length} URLs in sitemap)`);
}

async function submit() {
  for (const site of SITES) {
    const urls = urlsFromSitemap(site);
    if (urls.length === 0) continue;
    console.log(`\n--- ${site.host} (${urls.length} URLs)`);
    await submitIndexNow(site, urls);
    await submitBaidu(site, urls);
    await submitGoogle(site, urls);
  }
}

// ---------------------------------------------------------------------------
// urls — plain-text lists, one URL per line, for 百度手动提交 / copy-paste
// ---------------------------------------------------------------------------

const isEnglish = (u) => /\/en(\/|$)/.test(new URL(u).pathname);

function writeUrlLists() {
  const dir = resolve(ROOT, 'dist');
  mkdirSync(dir, { recursive: true });
  for (const site of SITES) {
    const urls = urlsFromSitemap(site);
    if (urls.length === 0) continue;
    const stem = site.host.replace(/\./g, '-');
    const groups = [
      ['zh', urls.filter((u) => !isEnglish(u))],
      ['en', urls.filter(isEnglish)],
      ['all', urls],
    ];
    for (const [suffix, list] of groups) {
      if (list.length === 0) continue;
      writeFileSync(resolve(dir, `${stem}-${suffix}.txt`), list.join('\n') + '\n', 'utf8');
      console.log(`[OK] dist/${stem}-${suffix}.txt  (${list.length} URLs)`);
    }
  }
}

// ---------------------------------------------------------------------------

const cmd = process.argv[2];
if (cmd === 'generate') {
  generate();
} else if (cmd === 'submit') {
  await submit();
} else if (cmd === 'urls') {
  writeUrlLists();
} else {
  console.error('Usage: node scripts/seo-submit.mjs <generate|submit|urls>');
  process.exit(1);
}
