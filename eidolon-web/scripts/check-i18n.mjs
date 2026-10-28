import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const zh = JSON.parse(readFileSync(resolve(ROOT, 'src/i18n/zh.json'), 'utf8'));
const en = JSON.parse(readFileSync(resolve(ROOT, 'src/i18n/en.json'), 'utf8'));

const problems = [];

function compare(a, b, path) {
  const ta = Array.isArray(a) ? 'array' : a === null ? 'null' : typeof a;
  const tb = Array.isArray(b) ? 'array' : b === null ? 'null' : typeof b;
  if (ta !== tb) {
    problems.push(`${path}: type ${ta} (zh) vs ${tb} (en)`);
    return;
  }
  if (ta === 'array') {
    if (a.length !== b.length) {
      problems.push(`${path}: length ${a.length} (zh) vs ${b.length} (en)`);
    }
    for (let i = 0; i < Math.min(a.length, b.length); i++) compare(a[i], b[i], `${path}[${i}]`);
    return;
  }
  if (ta === 'object') {
    const ka = Object.keys(a).sort();
    const kb = Object.keys(b).sort();
    for (const k of ka) if (!(k in b)) problems.push(`${path}.${k}: missing in en`);
    for (const k of kb) if (!(k in a)) problems.push(`${path}.${k}: missing in zh`);
    for (const k of ka) if (k in b) compare(a[k], b[k], `${path}.${k}`);
    return;
  }
  if (ta === 'string' && a.trim() === '' && b.trim() !== '') {
    problems.push(`${path}: empty zh but non-empty en`);
  }
}

compare(zh, en, 'root');

if (problems.length) {
  console.error(`[FAIL] i18n key mismatch (${problems.length})`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log('[OK] i18n: zh/en keys and shapes match');
