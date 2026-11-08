import { readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, '..', 'eidolon-site');

const BANNED = [
  '首款', '第一款', '最强', '最好', '最佳', '最先进', '最高', '顶级', '毫秒级',
  '全球领先', '唯一', '融资', '留存', '单位经济', '毛利', '付费推流', '估值', '飞轮',
  '人机共生时代', '381', '1,731', '6,055', '¥100', '大肥鱼',
];
const BANNED_UPPER = ['ARR', 'CAC', 'DSH'];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

function visibleParts(html) {
  const withoutCode = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const attrs = [...withoutCode.matchAll(/(?:content|title|alt|aria-label|placeholder)="([^"]*)"/gi)]
    .map((m) => m[1]);
  const text = withoutCode.replace(/<[^>]+>/g, ' ');
  return [text, ...attrs].join('\n');
}

const files = walk(OUT);
const hits = [];
for (const file of files) {
  const content = visibleParts(readFileSync(file, 'utf8'));
  for (const word of BANNED) {
    if (content.includes(word)) hits.push(`${relative(OUT, file)}: “${word}”`);
  }
  for (const word of BANNED_UPPER) {
    if (new RegExp(`\\b${word}\\b`).test(content)) hits.push(`${relative(OUT, file)}: “${word}”`);
  }
}

if (hits.length) {
  console.error(`[FAIL] banned copy found (${hits.length})`);
  for (const hit of hits.slice(0, 40)) console.error(`  - ${hit}`);
  process.exit(1);
}
console.log(`[OK] copy check: ${files.length} HTML files, no banned phrasing`);
