#!/usr/bin/env node
/**
 * seo-health.mjs — 搜索引擎可抓取性体检
 *
 * 为什么需要它：站点"没被收录"有五六种完全不同的原因（DNS 解析不到 / 被 noindex /
 * robots 挡了 / 服务器对爬虫 UA 报错 / canonical 指到别处 / 纯粹是排队没轮到），
 * 它们的修法毫无重叠。靠猜会浪费几天，靠这一个脚本 30 秒就能定位到具体那一层。
 *
 * 用法：
 *   node scripts/seo-health.mjs                    # 体检两个站
 *   node scripts/seo-health.mjs sholarel.instarmony.com
 *
 * 它检查什么（全部是"能不能被抓"的硬事实，不含收录结果）：
 *   1. DNS —— 跨 3 家公共解析器查 A 记录，并重复查询看是否稳定
 *   2. 抓取 —— 用 Baiduspider / bingbot / Googlebot 的真实 UA 请求首页
 *   3. 指令 —— meta robots / X-Robots-Tag / canonical / title
 *   4. 入口 —— robots.txt、sitemap.xml 是否可达、里面有多少 URL
 *   5. 协议 —— http 是否 301 到 https
 *
 * 它检查不了什么：是否已被收录。百度和 Bing 都没有公开的收录查询接口，
 * `site:` 查询是估算值且会被反爬拦截（百度直接跳图形验证码）。
 * 收录状态只能看站长工具：Bing 用 URL 检查，百度用「索引量」。
 */

import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// ── .env（只取用得到的几个键，不引入依赖） ──────────────────────────────
function loadEnv() {
  const file = resolve(ROOT, '.env');
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
    if (!m) continue;
    const value = m[2].replace(/^["']|["']$/g, '').trim();
    if (value && !process.env[m[1]]) process.env[m[1]] = value;
  }
}
loadEnv();

const DEFAULT_HOSTS = ['instarmony.com', 'sholarel.instarmony.com'];
const hosts = process.argv.slice(2).filter((a) => !a.startsWith('-'));
if (hosts.length === 0) hosts.push(...DEFAULT_HOSTS);

const RESOLVERS = [
  { name: 'AliDNS', url: (n) => `https://dns.alidns.com/resolve?name=${n}&type=A` },
  { name: 'Google', url: (n) => `https://dns.google/resolve?name=${n}&type=A` },
  { name: 'Cloudflare', url: (n) => `https://cloudflare-dns.com/dns-query?name=${n}&type=A` },
];

const BOTS = [
  { name: 'Baiduspider', ua: 'Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)' },
  { name: 'bingbot', ua: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)' },
  { name: 'Googlebot', ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
];

const problems = [];
const notes = [];

const paint = (s, code) => (process.stdout.isTTY ? `\x1b[${code}m${s}\x1b[0m` : s);
const ok = (s) => paint(s, '32');
const bad = (s) => paint(s, '31');
const dim = (s) => paint(s, '90');
const bold = (s) => paint(s, '1');

async function get(url, { ua, timeout = 15000, redirect = 'follow', headers = {} } = {}) {
  const started = Date.now();
  try {
    const res = await fetch(url, {
      redirect,
      headers: { ...(ua ? { 'user-agent': ua } : {}), ...headers },
      signal: AbortSignal.timeout(timeout),
    });
    const body = res.status < 400 ? await res.text() : '';
    return { ok: true, status: res.status, body, ms: Date.now() - started, headers: res.headers };
  } catch (err) {
    return { ok: false, status: 0, body: '', ms: Date.now() - started, error: err.name };
  }
}

// ── 1. DNS ────────────────────────────────────────────────────────────
async function checkDns(host) {
  console.log(bold('\n  1) DNS 解析'));
  const seen = new Map();
  let answered = 0;   // 真的答上来 A 记录的解析器数
  let reachable = 0;  // 能正常对话的解析器数（用于区分「没记录」和「探测器坏了」）

  for (const resolver of RESOLVERS) {
    let ips = [];
    let status = null;
    let spoke = false;
    // 连续 3 次：既拿结果，也顺手探稳定性
    for (let i = 0; i < 3; i += 1) {
      // Cloudflare / Google 的 DoH 要求显式声明接受 dns-json，缺了会返回 400
      const res = await get(resolver.url(host), { timeout: 10000, headers: { accept: 'application/dns-json' } });
      if (!res.ok) continue;
      try {
        const json = JSON.parse(res.body);
        spoke = true;
        status = json.Status;
        const a = (json.Answer ?? []).filter((r) => r.type === 1).map((r) => r.data);
        if (a.length > 0) ips = a;
      } catch {
        /* 解析器返回了非 JSON，当作没答上来 */
      }
    }

    if (ips.length > 0) {
      answered += 1;
      reachable += 1;
      for (const ip of ips) seen.set(ip, (seen.get(ip) ?? 0) + 1);
      console.log(`     ${resolver.name.padEnd(11)} ${ok('✓')} ${ips.join(', ')}`);
    } else if (spoke) {
      // 解析器正常回答、但确实没有 A 记录 —— 这才是真问题
      reachable += 1;
      console.log(`     ${resolver.name.padEnd(11)} ${bad('✗')} 无 A 记录（Status=${status}）`);
    } else {
      // 解析器根本没答话：这是我们自己探测失败，不能算到站点头上
      console.log(`     ${resolver.name.padEnd(11)} ${dim('? 探测器无响应（忽略）')}`);
    }
  }

  // 只有「能对话的解析器」里出现分歧才算线路问题；
  // 若一家都答不上来，才是真 DNS 故障。
  if (reachable === 0) {
    problems.push(`${host}: 所有解析器都无响应 —— 先确认本机网络/代理，再判断 DNS`);
  } else if (answered === 0) {
    problems.push(`${host}: 解析器能回答但没有 A 记录 —— 真 DNS 故障，先修解析再谈收录`);
  } else if (answered < reachable) {
    notes.push(`${host}: 有 ${reachable - answered}/${reachable} 家解析器拿不到 A 记录，部分线路抓不到`);
  }

  if (seen.size > 0) {
    const list = [...seen.entries()].map(([ip, n]) => `${ip}${n > 1 ? `×${n}` : ''}`);
    console.log(dim(`     稳定返回：${list.join('  ')}`));
  }
  return [...seen.keys()];
}

// ── 2. 抓取 ───────────────────────────────────────────────────────────
async function checkCrawl(host) {
  console.log(bold('\n  2) 爬虫抓取（真实 UA）'));
  const results = {};
  for (const bot of BOTS) {
    const res = await get(`https://${host}/`, { ua: bot.ua, timeout: 20000 });
    if (!res.ok) {
      console.log(`     ${bot.name.padEnd(12)} ${bad('✗')} 连接失败（${res.error}）`);
      problems.push(`${host}: ${bot.name} 连不上（${res.error}）—— 可能是 CDN/WAF 拦了这个 UA 或 IP 段`);
    } else if (res.status !== 200) {
      console.log(`     ${bot.name.padEnd(12)} ${bad('✗')} HTTP ${res.status}`);
      problems.push(`${host}: ${bot.name} 收到 HTTP ${res.status}（非 200）`);
    } else if (res.ms > 5000) {
      console.log(`     ${bot.name.padEnd(12)} ${bad('!')} 200 但耗时 ${(res.ms / 1000).toFixed(1)}s —— 偏慢`);
      notes.push(`${host}: ${bot.name} 响应 ${(res.ms / 1000).toFixed(1)}s，超过 5s 会显著降低抓取频次`);
    } else {
      console.log(`     ${bot.name.padEnd(12)} ${ok('✓')} 200  ${(res.ms / 1000).toFixed(2)}s  ${(res.body.length / 1024).toFixed(0)}KB`);
    }
    results[bot.name] = res;
  }
  return results;
}

// ── 3. 索引指令 ───────────────────────────────────────────────────────
function checkDirectives(host, html, headers) {
  console.log(bold('\n  3) 索引指令'));
  const grab = (re) => (html.match(re) ?? [])[1] ?? null;

  const metaRobots = grab(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']*)["']/i)
    ?? grab(/<meta[^>]+content=["']([^"']*)["'][^>]*name=["']robots["']/i);
  const xRobots = headers?.get('x-robots-tag') ?? null;
  const canonical = grab(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)
    ?? grab(/<link[^>]+href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  const title = grab(/<title[^>]*>([\s\S]*?)<\/title>/i)?.trim() ?? null;

  const directiveText = [metaRobots, xRobots].filter(Boolean).join(' | ') || '(无)';
  console.log(`     meta robots / X-Robots-Tag : ${directiveText}`);

  const blocking = /noindex|none/i.test(`${metaRobots ?? ''} ${xRobots ?? ''}`);
  if (blocking) {
    console.log(`     ${bad('✗ 页面明确禁止收录')}`);
    problems.push(`${host}: 页面带 noindex —— 这是最硬的拦截，任何提交手段都无效`);
  }

  console.log(`     canonical                   : ${canonical ?? '(缺失)'}`);
  if (!canonical) {
    notes.push(`${host}: 缺 canonical，重复入口（http/https、尾斜杠）会分散信号`);
  } else if (!canonical.includes(host)) {
    problems.push(`${host}: canonical 指向别的主机（${canonical}）—— 爬虫会把收录算到那个地址上`);
  }

  console.log(`     title                       : ${title ?? '(缺失)'}`);
  if (!title) notes.push(`${host}: 首页缺 title`);
}

// ── 4. 入口文件 ───────────────────────────────────────────────────────
async function checkEntryPoints(host) {
  console.log(bold('\n  4) robots.txt / sitemap.xml'));
  const robots = await get(`https://${host}/robots.txt`);
  if (robots.ok && robots.status === 200) {
    const disallowAll = /^\s*Disallow:\s*\/\s*$/im.test(robots.body) && !/^\s*Allow:\s*\//im.test(robots.body);
    console.log(`     robots.txt   ${disallowAll ? bad('✗ 全站禁止抓取') : ok('✓')} 200 (${robots.body.length}B)`);
    if (disallowAll) problems.push(`${host}: robots.txt 里 Disallow: / 把整站挡了`);
  } else {
    console.log(`     robots.txt   ${bad('✗')} ${robots.status || robots.error}`);
    notes.push(`${host}: robots.txt 不可达（不是致命，但少了 sitemap 声明）`);
  }

  const sitemap = await get(`https://${host}/sitemap.xml`);
  if (sitemap.ok && sitemap.status === 200) {
    const isIndex = /<sitemapindex/i.test(sitemap.body);
    const count = (sitemap.body.match(/<url>/g) ?? []).length;
    console.log(`     sitemap.xml  ${ok('✓')} 200  ${isIndex ? '索引型（sitemapindex）' : `${count} 个 URL`}`);
    if (isIndex) notes.push(`${host}: sitemap.xml 是索引型，部分爬虫对嵌套 sitemap 支持不好，建议展平成单一 urlset`);
    // lastmod 是否全都一样：多条 URL 共用一个时间戳，通常意味着那是构建时间而非内容时间，
    // 爬虫会因此忽略整个字段。两条以内不足以判断（小站本来就一起改）。
    const lastmods = [...sitemap.body.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
    const distinct = new Set(lastmods.map((d) => d.slice(0, 16)));
    if (lastmods.length > 3 && distinct.size === 1) {
      notes.push(`${host}: ${lastmods.length} 条 lastmod 全是同一个时间戳，看起来像构建时间 —— 爬虫会忽略这个字段`);
    }
  } else {
    console.log(`     sitemap.xml  ${bad('✗')} ${sitemap.status || sitemap.error}`);
    problems.push(`${host}: sitemap.xml 不可达`);
  }
}

// ── 5. 协议跳转 ───────────────────────────────────────────────────────
async function checkProtocol(host) {
  console.log(bold('\n  5) http → https 跳转'));
  const res = await get(`http://${host}/`, { redirect: 'manual', timeout: 15000 });
  if (!res.ok) {
    console.log(`     ${ok('✓')} http 不响应，只有 https 可用`);
    return;
  }
  const location = res.headers?.get('location') ?? '';
  if ([301, 302, 307, 308].includes(res.status) && location.startsWith('https://')) {
    console.log(`     ${ok('✓')} ${res.status} → ${location}`);
  } else {
    console.log(`     ${bad('✗')} http 返回 ${res.status}，没有跳转到 https —— 等于两个入口提供同样内容`);
    notes.push(`${host}: http 未 301 到 https，重复入口。修法在 EdgeOne 控制台开「强制 HTTPS」，代码层改不了（_redirects 管不了协议）`);
  }
}

// ── 主流程 ────────────────────────────────────────────────────────────
console.log(bold(`\nSEO 可抓取性体检 —— ${new Date().toLocaleString('zh-CN')}`));

for (const host of hosts) {
  console.log(bold(`\n${'═'.repeat(60)}\n${host}\n${'═'.repeat(60)}`));
  await checkDns(host);
  const crawl = await checkCrawl(host);
  const sample = crawl.Googlebot ?? crawl.bingbot ?? crawl.Baiduspider;
  if (sample?.ok && sample.status === 200) {
    checkDirectives(host, sample.body, sample.headers);
  } else {
    console.log(bold('\n  3) 索引指令'));
    console.log(dim('     跳过：首页没抓下来'));
  }
  await checkEntryPoints(host);
  await checkProtocol(host);
}

console.log(bold(`\n${'═'.repeat(60)}\n结论\n${'═'.repeat(60)}`));
if (problems.length === 0) {
  console.log(ok('\n  没有发现硬性拦截。'));
  console.log(dim('  也就是说：抓取路径是通的，剩下的就是排队。'));
} else {
  console.log(bad('\n  发现硬性拦截，这些必须修，否则提交多少次都没用：'));
  for (const p of problems) console.log(bad(`    • ${p}`));
}
if (notes.length > 0) {
  console.log(bold('\n  建议改进（不致命，但会拖慢收录）：'));
  for (const n of notes) console.log(`    • ${n}`);
}

console.log(dim(`
  这个脚本查不了"是否已收录"——百度和 Bing 都没有公开接口，
  site: 查询是估算值且会被反爬拦截（百度直接跳图形验证码）。
  收录状态请看站长工具：Bing 用 URL 检查，百度用「索引量」。`));
