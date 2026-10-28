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

export function absoluteUrl(path: string): string {
  return `https://eidolon.instarmony.com${path}`;
}
