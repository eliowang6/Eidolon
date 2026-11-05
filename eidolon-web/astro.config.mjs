import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://sholarel.instarmony.com';
const PROJECT_ROOT = dirname(fileURLToPath(import.meta.url));
const BUILD_TIME = new Date().toISOString();

/**
 * <lastmod> for a sitemap entry, taken from the mtime of the .astro source that
 * renders it. Baidu and Bing both use lastmod to decide whether a page is worth
 * re-crawling, and a build-time stamp would claim "everything changed" on every
 * deploy — which trains crawlers to ignore the field.
 */
const lastmodFor = (url) => {
  const pathname = new URL(url).pathname.replace(/\.html$/, '');
  const rel = pathname.replace(/^\//, '').replace(/\/$/, '');
  // trailingSlash: 'ignore' means a directory route can arrive as either `/en`
  // or `/en/`, so a bare `src/pages/en.astro` lookup misses `en/index.astro` and
  // silently falls back to BUILD_TIME — which would restamp that URL on every
  // deploy and teach crawlers to distrust lastmod for the whole sitemap.
  const candidates = rel === '' ? ['index'] : [rel, `${rel}/index`];
  for (const candidate of candidates) {
    try {
      return statSync(resolve(PROJECT_ROOT, 'src/pages', `${candidate}.astro`)).mtime.toISOString();
    } catch {
      // try the next shape
    }
  }
  return BUILD_TIME;
};

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
        const lastmod = lastmodFor(item.url);
        item.url = withHtml(item.url);
        item.lastmod = lastmod;
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
