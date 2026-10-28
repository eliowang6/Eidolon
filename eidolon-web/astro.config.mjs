import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://eidolon.instarmony.com';

const withHtml = (raw) => {
  if (!raw) return raw;
  const url = new URL(raw);
  if (url.pathname === '/') return url.href;
  if (url.pathname === '/en' || url.pathname === '/en/') {
    url.pathname = '/en/';
    return url.href;
  }
  if (!/\.(html|xml)$/.test(url.pathname)) url.pathname = `${url.pathname}.html`;
  return url.href;
};

export default defineConfig({
  site: SITE,
  outDir: '../eidolon-site',
  build: {
    format: 'preserve',
    inlineStylesheets: 'auto',
  },
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => !/\/(404|login|contact)\/?$/.test(new URL(page).pathname),
      i18n: {
        defaultLocale: 'zh',
        locales: { zh: 'zh-CN', en: 'en' },
      },
      serialize(item) {
        item.url = withHtml(item.url);
        if (item.links) {
          item.links = item.links.map((link) => ({ ...link, url: withHtml(link.url) }));
        }
        if (item.url === `${SITE}/` || item.url === `${SITE}/en/`) {
          item.changefreq = 'weekly';
          item.priority = 1.0;
        } else if (/\/privacy\.html$|\/terms\.html$/.test(item.url)) {
          item.changefreq = 'yearly';
          item.priority = 0.2;
        } else if (/\/docs\.html$|\/about\.html$/.test(item.url)) {
          item.changefreq = 'monthly';
          item.priority = 0.6;
        } else {
          item.changefreq = 'monthly';
          item.priority = 0.8;
        }
        return item;
      },
    }),
  ],
});
