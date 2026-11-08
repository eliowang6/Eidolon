/**
 * Locale-aware site name and shared JSON-LD (Organization + WebSite).
 * Doc pages and the docs landing page both read from here so the
 * structured data never drifts between them.
 */

const SITE_ORIGIN = 'https://sholarel.instarmony.com';

export const SITE_NAME: Record<string, string> = {
  'zh-Hans': 'Sholarel 文档',
  en: 'Sholarel Docs',
};

export function siteNameFor(locale: string, fallback: string): string {
  return SITE_NAME[locale] ?? fallback;
}

export function inLanguage(locale: string): string {
  return locale === 'en' ? 'en' : 'zh-Hans';
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sholarel',
    alternateName: 'Eidolon',
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/docs/img/logo.svg`,
  };
}

export function websiteJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteNameFor(locale, 'Sholarel 文档'),
    url: locale === 'en' ? `${SITE_ORIGIN}/docs/en/` : `${SITE_ORIGIN}/docs/`,
    inLanguage: inLanguage(locale),
  };
}

export function faqPageJsonLd(
  locale: string,
  items: readonly {q: string; a: string}[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: inLanguage(locale),
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {'@type': 'Answer', text: item.a},
    })),
  };
}
