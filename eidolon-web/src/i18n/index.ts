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

/**
 * Copy is written once for both companions. `⟨她|他⟩` keeps both forms and the
 * companion script paints the variant matching html[data-companion]; `{name}`
 * becomes Fea / Ael the same way. Only for trusted strings from our own
 * dictionaries.
 *
 * The two variants used to be sibling <span>s toggled by CSS, which glued them
 * together in the raw HTML text node: "FeaAel", "她他", "SheHe". Copy is now a
 * single span carrying both variants in data-* attributes, so the markup
 * already reads with one name and scripts/site.ts swaps it on a switch.
 */
const escapeHtml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Values land in an attribute; & < > are already escaped, quotes are not.
const attr = (text: string) => text.replace(/"/g, '&quot;');

const whoSpan = (fea: string, ael: string) =>
  `<span class="who" data-fea="${attr(fea)}" data-ael="${attr(ael)}">${fea}</span>`;

export function pr(text: string): string {
  return escapeHtml(text)
    .replace(/⟨([^|⟩]*)\|([^⟩]*)⟩/g, (_match, fea: string, ael: string) => whoSpan(fea, ael))
    .replace(/\{name\}/g, whoSpan('Fea', 'Ael'))
    .replace(/\*\*([^*]+)\*\*/g, '<em>$1</em>');
}

/** Same strings, flattened for attributes (alt, aria-label) where markup can't live. */
export function prPlain(text: string, who: 'fea' | 'ael' = 'fea'): string {
  return text
    .replace(/⟨([^|⟩]*)\|([^⟩]*)⟩/g, (_, a: string, b: string) => (who === 'fea' ? a : b))
    .replace(/\{name\}/g, who === 'fea' ? 'Fea' : 'Ael')
    .replace(/\*\*([^*]+)\*\*/g, '$1');
}
