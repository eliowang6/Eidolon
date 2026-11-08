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
 *   node scripts/seo-submit.mjs push       # incremental push after a deploy (state-aware)
 *   node scripts/seo-submit.mjs push --site=main   # only the host that was deployed
 *   node scripts/seo-submit.mjs push --dry-run   # print the plan, send nothing, keep state
 *   node scripts/seo-submit.mjs submit     # force push every sitemap URL (manual, quota-bound)
 *   node scripts/seo-submit.mjs urls       # plain-text URL lists for manual submission
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
 *   SEO_BAIDU_ENABLED=1        Master switch for Baidu push. Default is OFF:
 *                              unless this is exactly 1/true, nothing is sent
 *                              to data.zz.baidu.com even when the sitemap and
 *                              the state file still hold pending URLs (the
 *                              sub-domain property is not verified yet). While
 *                              off, pending URLs stay in the state untouched.
 *   SEO_BAIDU_INCLUDE_EN=1     Legacy switch; /en/ pages are now queued behind
 *                              every zh page and only pushed with leftover quota
 *                              (see SEO_BAIDU_EN_MAX). Set to 0 to drop them.
 *   SEO_BAIDU_MAX_PER_RUN      Baidu URLs per deploy run (default: 10)
 *   SEO_BAIDU_EN_MAX           Max /en/ URLs per run once zh is drained (default: 2)
 *   SEO_GSC_ACCESS_TOKEN       Google OAuth2 token with Search Console scope
 *   SEO_PUSH_STATE_PATH        Override the incremental state file location
 *   SEO_BAIDU_ENDPOINT / SEO_INDEXNOW_ENDPOINT
 *                              Override the submit endpoint (local mock only —
 *                              used by the dry-run rehearsal, never in prod)
 *
 * Reads .env from the repo root, so a local `node scripts/seo-submit.mjs push`
 * behaves like the deploy.
 *
 * Incremental state lives in seo/push-state.json (untracked; override with
 * SEO_PUSH_STATE_PATH). It records, per host and per engine, the URL, the
 * SHA-1 of the page file that was live at push time, the push time and the
 * result. `push` only sends URLs that are missing from that record, or whose
 * page hash changed since it was accepted.
 */

import { writeFileSync, existsSync, readFileSync, mkdirSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
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
    key: 'main',
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
    key: 'sub',
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
// incremental push state
// ---------------------------------------------------------------------------

const STATE_PATH = process.env.SEO_PUSH_STATE_PATH
  ? resolve(process.env.SEO_PUSH_STATE_PATH)
  : resolve(ROOT, 'seo', 'push-state.json');

function loadState() {
  if (existsSync(STATE_PATH)) {
    try {
      const raw = JSON.parse(readFileSync(STATE_PATH, 'utf8'));
      if (raw && raw.version === 1 && raw.hosts && typeof raw.hosts === 'object') return raw;
      console.log(`[WARN] ${STATE_PATH}: unexpected shape — starting from an empty state`);
    } catch (error) {
      // A truncated file must not abort a deploy; losing the state only costs
      // quota on the next run, whereas throwing would take the publish with it.
      console.log(`[WARN] ${STATE_PATH}: unreadable (${error.message}) — treating every URL as pending`);
    }
  }
  return { version: 1, updatedAt: null, hosts: {} };
}

function saveState(state) {
  state.updatedAt = new Date().toISOString();
  mkdirSync(dirname(STATE_PATH), { recursive: true });
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n', 'utf8');
}

function hostState(state, host) {
  state.hosts[host] ??= {};
  return state.hosts[host];
}

const isEnglish = (u) => /\/en(\/|$)/.test(new URL(u).pathname);

/** Candidate local files for a sitemap URL, in serve order. */
function pageCandidates(site, rawUrl) {
  const rel = new URL(rawUrl).pathname.replace(/^\//, '');
  const variants = (r) => {
    if (!r) return ['index.html'];
    const bare = r.replace(/\/$/, '');
    return [r, `${bare}.html`, `${bare}/index.html`];
  };
  const files = [];
  const add = (base, rels) => {
    for (const r of rels) files.push(resolve(base, r));
  };
  add(site.outRoot, variants(rel));
  // The docs are built by Docusaurus into docs/build and shipped under /docs/,
  // so they are not inside the product site's outRoot.
  if (/^docs(\/|$)/.test(rel)) {
    add(resolve(ROOT, 'docs', 'build'), variants(rel.replace(/^docs\/?/, '')));
  }
  return files;
}

/** SHA-1 of the page file that is about to be served; null when unresolvable. */
function pageHash(site, url) {
  for (const file of pageCandidates(site, url)) {
    if (file.endsWith('.html') && existsSync(file)) {
      return createHash('sha1').update(readFileSync(file)).digest('hex').slice(0, 16);
    }
  }
  return null;
}

/**
 * Split the sitemap into what still needs pushing.
 *
 * IndexNow has no quota, so it takes every changed URL. Baidu is quota-bound,
 * so its queue is split zh-first / en-last and anything already accepted with
 * the same page hash is dropped.
 */
function planPush(site, urls, state, { force }) {
  const hs = hostState(state, site.host);
  const hashes = {};
  const indexNow = [];
  const baidu = { zh: [], en: [] };
  for (const url of urls) {
    const hash = pageHash(site, url);
    hashes[url] = hash;

    if (force || !hs.indexnow?.[url] || hs.indexnow[url].status !== 'ok') {
      indexNow.push(url);
    }

    const record = hs.baidu?.[url];
    const changed = !!(hash && record?.hash && hash !== record.hash);
    const stale = force || !record || record.status !== 'accepted' || changed;
    if (stale) (isEnglish(url) ? baidu.en : baidu.zh).push(url);
  }
  return { hashes, indexNow, baidu };
}

function countRecorded(host, engine, status) {
  const bucket = host[engine] ?? {};
  return Object.values(bucket).filter((record) => record.status === status).length;
}


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

async function pushIndexNow(site, urls, state, dryRun) {
  const key = process.env.SEO_INDEXNOW_KEY;
  if (!key) {
    console.log(`[IndexNow] ${site.host}: skipped (SEO_INDEXNOW_KEY not set)`);
    return;
  }
  if (!urls.length) {
    console.log(`[IndexNow] ${site.host}: nothing to push (no new or changed URL)`);
    return;
  }
  if (dryRun) {
    console.log(`[DRY-RUN] [IndexNow] ${site.host}: would submit ${urls.length} changed URL(s)`);
    return;
  }
  const body = JSON.stringify({
    host: site.host,
    key,
    keyLocation: `${site.origin}/${key}.txt`,
    urlList: urls,
  });
  const r = await request(process.env.SEO_INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow', {
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
  const ok = r.status >= 200 && r.status < 300;
  const hs = hostState(state, site.host);
  hs.indexnow ??= {};
  const pushedAt = new Date().toISOString();
  for (const url of urls) {
    // Failures stay unrecorded so the next deploy retries them; IndexNow has no
    // quota, so a retry costs nothing.
    hs.indexnow[url] = { pushedAt, status: ok ? 'ok' : `http-${r.status}` };
  }
  console.log(`[IndexNow] ${site.host}: ${ok ? 'OK' : 'FAILED'} (status ${r.status}, ${urls.length} URLs)${note}`);
}

async function pushBaidu(site, queues, hashes, state, dryRun) {
  // Master switch, checked before anything else so a normal deploy can never
  // reach data.zz.baidu.com by accident. Default OFF: the sub-domain property
  // is still pending 百度 verification. Nothing is sent and no state is written
  // while off, so the pending URLs simply wait for the switch to be turned on.
  const enabled = process.env.SEO_BAIDU_ENABLED;
  if (enabled !== '1' && enabled !== 'true') {
    console.log(
      `[Baidu] ${site.host}: 推送已关闭（SEO_BAIDU_ENABLED=${enabled ?? '未设置'}，设为 1 才开启）` +
        `，待推 zh ${queues.zh.length} / en ${queues.en.length} 留在账本，本次发出 0 条`
    );
    return;
  }

  const token = process.env[site.baiduEnv];
  if (!token) {
    console.log(`[Baidu] ${site.host}: skipped (${site.baiduEnv} not set)`);
    return;
  }

  // Quota is per site and starts around 10 URLs/day, so a run is capped and
  // zh pages are spent first. /en/ pages are not dropped outright — they are
  // queued behind every zh page and only take the leftover budget, because
  // they do get indexed for English queries but cannot compete for the scarce
  // allowance.
  const maxPerRun = Math.max(1, Number(process.env.SEO_BAIDU_MAX_PER_RUN || 10));
  const enMax = Math.max(0, Number(process.env.SEO_BAIDU_EN_MAX ?? 2));
  const dropEn = process.env.SEO_BAIDU_INCLUDE_EN === '0';
  const enPending = dropEn ? [] : queues.en;
  const zhPlan = queues.zh.slice(0, maxPerRun);
  const enPlan = enPending.slice(0, Math.min(enMax, Math.max(0, maxPerRun - zhPlan.length)));
  const planned = [...zhPlan, ...enPlan];
  const hs = hostState(state, site.host);
  const alreadyAccepted = countRecorded(hs, 'baidu', 'accepted');

  console.log(
    `[Baidu] ${site.host}: 待推 zh ${queues.zh.length} / en ${enPending.length}` +
      `，本次计划 zh ${zhPlan.length} / en ${enPlan.length}` +
      `，历史已成功 ${alreadyAccepted}，每次上限 ${maxPerRun}` +
      (dropEn ? '（SEO_BAIDU_INCLUDE_EN=0，/en/ 不推）' : '')
  );
  if (!planned.length) {
    console.log(`[Baidu] ${site.host}: 无新增或变更 URL，跳过（不消耗配额）`);
    return;
  }
  if (dryRun) {
    console.log(`[DRY-RUN] [Baidu] ${site.host}: would submit ${planned.length} URL(s); 未发送请求，配额未知，state 不写入`);
    return;
  }

  // The `site` parameter must match the property exactly as registered in
  // 百度搜索资源平台. A mismatch comes back as {"error":400,"message":"site init fail"}.
  const baiduSite = process.env[site.baiduSiteEnv] || site.origin;
  // If 百度 registered a different host (www vs bare domain), rewrite instead of
  // dropping the submission.
  const rewriteHost = process.env[site.baiduRewriteEnv];
  if (rewriteHost) console.log(`[Baidu] ${site.host}: rewriting host to ${rewriteHost}`);
  const sentUrls = rewriteHost
    ? planned.map((u) => {
        const url = new URL(u);
        url.host = rewriteHost;
        return url.href;
      })
    : planned;

  let accepted = 0;
  let remain = null;
  let stopReason = '';
  let cursor = 0;
  while (cursor < sentUrls.length) {
    if (remain === 0) {
      stopReason = 'API 返回 remain=0（当日配额已用尽）';
      break;
    }
    const chunk = sentUrls.slice(cursor, cursor + 50);
    const r = await request(
      `${process.env.SEO_BAIDU_ENDPOINT || 'http://data.zz.baidu.com/urls'}?site=${encodeURIComponent(baiduSite)}&token=${encodeURIComponent(token)}`,
      { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: chunk.join('\n') }
    );
    let json = null;
    try {
      json = JSON.parse(r.text);
    } catch {
      json = null;
    }
    if (!json) {
      stopReason = `HTTP ${r.status}（响应不是 JSON）`;
      console.log(`[Baidu] ${site.host}: HTTP ${r.status} ${r.text.slice(0, 120)} — 本轮停止，未记为成功`);
      break;
    }

    const success = json.success ?? 0;
    accepted += success;
    if (json.remain !== undefined) remain = json.remain;
    if (json.not_same_site?.length) {
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

    // The API reports a count, not which URLs, but it processes the list in
    // order — the first `success` entries are the accepted ones. Everything
    // after them stays pending for the next run.
    hs.baidu ??= {};
    const pushedAt = new Date().toISOString();
    for (let i = 0; i < success && i < chunk.length; i++) {
      const sourceUrl = planned[cursor + i];
      hs.baidu[sourceUrl] = { hash: hashes[sourceUrl] ?? null, pushedAt, status: 'accepted' };
    }

    if (json.error) {
      stopReason = json.message ? `error ${json.error}: ${json.message}` : `error ${json.error}`;
      break;
    }
    if (success < chunk.length) {
      stopReason = `接口本次只接受 ${success}/${chunk.length} 条（配额或 URL 校验限制）`;
      break;
    }
    cursor += chunk.length;
  }

  const acceptedZh = Math.min(accepted, zhPlan.length);
  const acceptedEn = Math.max(0, accepted - acceptedZh);
  console.log(
    `[Baidu] ${site.host}: 提交 ${planned.length} 条，成功 ${accepted} 条` +
      `，剩余配额 ${remain === null ? '未知（本次响应未返回 remain）' : remain}` +
      (stopReason ? `，停止原因：${stopReason}` : '')
  );
  console.log(
    `[Baidu] ${site.host}: 仍待推 zh ${queues.zh.length - acceptedZh}` +
      ` / en ${enPending.length - acceptedEn}（下次发布继续，不会重复推送已成功的 URL）`
  );
}

async function pushGoogle(site, urls, dryRun) {
  const token = process.env.SEO_GSC_ACCESS_TOKEN;
  if (!token) {
    console.log(`[Google] ${site.host}: skipped (SEO_GSC_ACCESS_TOKEN not set — see README「搜索引擎」)`);
    return;
  }
  if (dryRun) {
    console.log(`[DRY-RUN] [Google] ${site.host}: would re-submit sitemap ${site.origin}/${site.sitemap} (${urls.length} URLs)`);
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

/**
 * Push after a deploy.
 *
 * force=false is the incremental path (`push`): only new/changed URLs.
 * force=true is `submit`, kept for manual full re-submission (still capped by
 * the Baidu budget).
 */
async function push({ force = false, dryRun = false, sites = null } = {}) {
  const state = loadState();
  console.log(`[push] state: ${STATE_PATH}${dryRun ? ' (dry-run: state will not be written)' : ''}`);
  const selected = sites ? SITES.filter((site) => site.key === sites) : SITES;
  if (sites && selected.length === 0) {
    console.log(`[WARN] unknown --site=${sites} — nothing to push`);
    return;
  }
  for (const site of selected) {
    const urls = urlsFromSitemap(site);
    if (urls.length === 0) {
      console.log(`[WARN] ${site.host}: no URLs from sitemap — skipping`);
      continue;
    }
    const plan = planPush(site, urls, state, { force });
    console.log(
      `\n--- ${site.host}: sitemap ${urls.length} URLs` +
        `，本次变更 ${plan.indexNow.length}` +
        `，Baidu 待推 zh ${plan.baidu.zh.length} / en ${plan.baidu.en.length}`
    );
    await pushIndexNow(site, plan.indexNow, state, dryRun);
    await pushBaidu(site, plan.baidu, plan.hashes, state, dryRun);
    await pushGoogle(site, urls, dryRun);
  }
  if (dryRun) {
    console.log(`[DRY-RUN] state untouched: ${STATE_PATH}`);
    return;
  }
  saveState(state);
}

// ---------------------------------------------------------------------------
// urls — plain-text lists, one URL per line, for 百度手动提交 / copy-paste
// ---------------------------------------------------------------------------

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
const flags = new Set(process.argv.slice(3));
const siteArg = process.argv.find((a) => a.startsWith('--site='))?.split('=')[1] ?? null;
if (cmd === 'generate') {
  generate();
} else if (cmd === 'push') {
  await push({ dryRun: flags.has('--dry-run'), sites: siteArg });
} else if (cmd === 'submit') {
  await push({ force: true, dryRun: flags.has('--dry-run'), sites: siteArg });
} else if (cmd === 'urls') {
  writeUrlLists();
} else {
  console.error('Usage: node scripts/seo-submit.mjs <generate|push|submit|urls> [--site=main|sub] [--dry-run]');
  process.exit(1);
}
