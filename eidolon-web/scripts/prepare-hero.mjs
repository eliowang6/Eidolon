#!/usr/bin/env node
/**
 * The only hero artwork we have is 1280×720. At full-bleed widths it softens,
 * so we do one careful 2× Lanczos resample with a light unsharp pass and ship
 * the 2560×1440 master. Astro's <Picture> derives every responsive size from it.
 * Replace src/assets/hero/focus-cabin-2560.png with a native 2560 render when
 * new art exists.
 */
import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(ROOT, 'public/assets/focus-cabin-poster.png');
const OUT = resolve(ROOT, 'src/assets/hero/focus-cabin-2560.png');
mkdirSync(resolve(ROOT, 'src/assets/hero'), { recursive: true });

const meta = await sharp(SRC).metadata();
const info = await sharp(SRC)
  .resize(2560, 1440, { kernel: 'lanczos3', fit: 'cover' })
  .sharpen({ sigma: 0.55, m1: 0.8, m2: 1.4 })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(OUT);

console.log(`[OK] ${meta.width}×${meta.height} -> ${info.width}×${info.height} ${(info.size / 1024 / 1024).toFixed(2)} MB`);
