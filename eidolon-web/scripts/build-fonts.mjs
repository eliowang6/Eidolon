#!/usr/bin/env node
/**
 * Regenerates the self-hosted font payload in public/fonts.
 *
 * Chinese display type (Noto Serif SC 700) and the handwriting face
 * (LXGW WenKai) are subset to the characters this site actually renders, so the
 * whole CJK payload stays in the low hundreds of KB instead of tens of MB.
 * Re-run after any copy change in src/i18n/zh.json.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = resolve(ROOT, 'scripts/.cache');
const OUT = resolve(ROOT, 'public/fonts');
mkdirSync(CACHE, { recursive: true });
mkdirSync(OUT, { recursive: true });

const NOTO_URL = 'https://raw.githubusercontent.com/googlefonts/noto-cjk/main/Serif/SubsetOTF/SC/NotoSerifSC-Bold.otf';
const LXGW_URL = 'https://github.com/lxgw/LxgwWenKai/releases/download/v1.530/LXGWWenKai-Regular.ttf';

function walkStrings(value, out) {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => walkStrings(v, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => walkStrings(v, out));
  return out;
}

const dict = JSON.parse(readFileSync(resolve(ROOT, 'src/i18n/zh.json'), 'utf8'));
const strings = walkStrings(dict, []);

const symbols = 'αβγδΩ∞—–·…“”‘’「」『』〔〕≈×✓←→↑↓°';
const ascii = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join('');
const displayChars = new Set([...(strings.join('') + ascii + symbols)]);
const handwriting = [
  ...walkStrings(dict.mnote, []),
  dict.waitlist.hand,
  dict.waitlist.success,
  dict.footer.forgot,
  dict.notFound.note,
  dict.aboutPage.polaCaption,
  dict.downloadPage.previewNote,
  dict.featuresPage.demos.voice.note,
].join('');
const annotationChars = new Set([...(handwriting + '——～·…“”‘’「」' + ascii)]);

const displayText = [...displayChars].join('');
const annotationText = [...annotationChars].join('');

async function fetchTo(url, file) {
  if (existsSync(file)) return;
  console.log(`[GET] ${url}`);
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
}

function subset(input, text, output) {
  const textFile = resolve(CACHE, `${output}.txt`);
  writeFileSync(textFile, text, 'utf8');
  execFileSync('python', ['-m', 'fontTools.subset', input,
    `--text-file=${textFile}`,
    '--flavor=woff2',
    '--no-hinting',
    '--desubroutinize',
    '--layout-features=kern,liga,clig,calt',
    `--output-file=${resolve(OUT, output)}`], { stdio: 'inherit' });
  const size = readFileSync(resolve(OUT, output)).length;
  console.log(`[OK] ${output}: ${(size / 1024).toFixed(1)} KB, ${text.length} chars`);
}

const noto = resolve(CACHE, 'NotoSerifSC-Bold.otf');
const lxgw = resolve(CACHE, 'LXGWWenKai-Regular.ttf');
await fetchTo(NOTO_URL, noto);
await fetchTo(LXGW_URL, lxgw);

subset(noto, displayText, 'noto-serif-sc-700.woff2');
subset(lxgw, annotationText, 'lxgw-wenkai-400.woff2');

const latin = [
  ['@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2', 'instrument-serif-400.woff2'],
  ['@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2', 'instrument-serif-400-italic.woff2'],
  ['@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', 'inter-var-latin.woff2'],
  ['@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2', 'jetbrains-mono-500.woff2'],
];
for (const [from, to] of latin) {
  copyFileSync(resolve(ROOT, 'node_modules', from), resolve(OUT, to));
  console.log(`[OK] ${to}`);
}
