import { rmSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, '..', 'eidolon-site');

if (basename(OUT) !== 'eidolon-site') {
  throw new Error(`Refusing to clean unexpected output directory: ${OUT}`);
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
console.log(`[OK] cleaned ${OUT}`);
