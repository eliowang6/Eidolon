import zh from './zh.json';
import en from './en.json';

export type Lang = 'zh' | 'en';

export const dicts = { zh, en } as const;

export const t = (lang: Lang) => dicts[lang];

/** zh paths are canonical; English lives under /en/. */
export function localizePath(lang: Lang, zhPath: string): string {
  if (lang === 'zh') return zhPath;
  if (zhPath === '/') return '/en/';
  return `/en${zhPath}`;
}

export function otherLang(lang: Lang): Lang {
  return lang === 'zh' ? 'en' : 'zh';
}

/** Where the Docusaurus build lands on the product sub-domain. */
const DOCS_BASE = '/docs/';

export function absoluteUrl(path: string): string {
  return `https://sholarel.instarmony.com${path}`;
}

/**
 * Localize a documentation path.
 *
 * Docusaurus nests the localized builds under <baseUrl>/<locale>/ — the
 * English tree is /docs/en/..., not /en/docs/... — so the locale segment
 * goes inside the docs base, not in front of it.
 */
export function localizeDocsPath(lang: Lang, zhPath: string): string {
  if (lang === 'zh') return zhPath;
  if (!zhPath.startsWith(DOCS_BASE)) return zhPath;
  return `/docs/en/${zhPath.slice(DOCS_BASE.length)}`;
}
