import { SITE } from './site';

export function softwareAppSchema(lang: 'zh' | 'en') {
  const isZh = lang === 'zh';
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE.url}/#software-application`,
    name: 'Sholarel',
    alternateName: ['Eidolon', 'Sholarel AI'],
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Windows 10, Windows 11, Android 7.0+',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: isZh ? '免费体验版与多种订阅方案' : 'Free tier with optional subscriptions',
    },
    description: isZh
      ? 'Sholarel 是由 Instarmony 出品的数字生命伴侣与 Personal AI Agent，具备跨端长期记忆、主动问候、桌面常驻以及 Windows 与 Android 跨平台任务执行能力。'
      : 'Sholarel is a digital life companion and personal AI agent featuring persistent long-term memory, proactive engagement, desktop presence, and cross-device actions on Windows and Android.',
    screenshot: `${SITE.url}/assets/shots/d-home.webp`,
    publisher: {
      '@id': 'https://instarmony.com/#organization',
    },
    downloadUrl: `${SITE.url}/download.html`,
    inLanguage: ['zh-Hans', 'en'],
  };
}

export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q.replace(/<[^>]+>/g, ''),
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a.replace(/<[^>]+>/g, ''),
      },
    })),
  };
}

export function breadcrumbListSchema(items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const entry: Record<string, unknown> = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
      };
      if (item.url) {
        entry.item = item.url.startsWith('http') ? item.url : `${SITE.url}${item.url}`;
      }
      return entry;
    }),
  };
}

export function blogArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  lang: 'zh' | 'en';
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url.startsWith('http') ? article.url : `${SITE.url}${article.url}`,
    },
    url: article.url.startsWith('http') ? article.url : `${SITE.url}${article.url}`,
    image: article.image ?? `${SITE.url}/assets/og-${article.lang}.png`,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: {
      '@type': 'Organization',
      name: 'Instarmony AI Lab',
      url: 'https://instarmony.com/',
    },
    publisher: {
      '@id': 'https://instarmony.com/#organization',
    },
    inLanguage: article.lang === 'zh' ? 'zh-Hans' : 'en',
  };
}
