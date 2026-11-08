import fs from 'node:fs';
import path from 'node:path';
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

type FaqItem = {q: string; a: string};

/**
 * Reads the FAQ markdown and turns each "### Question" block into a
 * Question/Answer pair, so the FAQPage JSON-LD always mirrors the page.
 */
function parseFaq(file: string): FaqItem[] {
  if (!fs.existsSync(file)) {
    return [];
  }
  const text = fs.readFileSync(file, 'utf8');
  const body = text.replace(/^---[\s\S]*?\r?\n---\r?\n/, '');
  const items: FaqItem[] = [];
  for (const block of body.split(/\r?\n(?=###\s)/).slice(1)) {
    const nl = block.indexOf('\n');
    if (nl === -1) continue;
    const q = block.slice(4, nl).trim();
    const answer = block
      .slice(nl + 1)
      .split(/\r?\n(?=##\s)/)[0]
      .replace(/\s*---\s*$/, '')
      .split(/\r?\n/)
      .map((line) =>
        line
          .replace(/^[-*]\s+/, '')
          .replace(/`/g, '')
          .replace(/\*\*/g, '')
          .trim(),
      )
      .filter(Boolean)
      .join(' ');
    if (q && answer) items.push({q, a: answer});
  }
  return items;
}

const faq = {
  zhHans: parseFaq(path.join(__dirname, 'docs', 'faq.md')),
  en: parseFaq(
    path.join(
      __dirname,
      'i18n',
      'en',
      'docusaurus-plugin-content-docs',
      'current',
      'faq.md',
    ),
  ),
};

const config: Config = {
  title: 'Sholarel 文档',
  tagline: 'Your other self in the AI era',
  favicon: 'img/favicon.ico',
  customFields: {faq},

  // Bing Webmaster Tools 域名验证。站点分主站与 /docs/ 两层，两边各放一份同一
  // 标签，分别验证互不冲突；验证通过后必须长期保留，所以写在配置里而不是构建产物。
  headTags: [
    {
      tagName: 'meta',
      attributes: {name: 'msvalidate.01', content: '4F7E04958E75B4572046A5BEC1D96432'},
    },
  ],

  // The docs ship on the product sub-domain, next to the pages they describe.
  // The old instarmony.com/docs/build/ paths are kept alive by 301 rules in
  // edgeone.json, so the two never compete in the index.
  url: process.env.DOCS_URL ?? 'https://sholarel.instarmony.com',
  baseUrl: process.env.DOCS_BASE_URL ?? '/docs/',

  organizationName: 'eliowang6',
  projectName: 'Sholarel',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
    format: 'mdx',
  },

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
  },

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['zh', 'en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchResultLimits: 8,
        docsRouteBasePath: '/',
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/eliowang6/Eidolon/tree/main/eidolon_github/docs/',
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'Sholarel',
      logo: {
        alt: 'Sholarel Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          label: '使用教程',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'featureSidebar',
          label: '功能详解',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'faqSidebar',
          label: '常见问题',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/eliowang6/Eidolon',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://sholarel.instarmony.com/login.html',
          label: '登录',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: '快速上手',
              to: '/quick-start',
            },
            {
              label: '功能详解',
              to: '/features/chat',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'QQ Group',
              href: 'https://qm.qq.com/q/oUgx5EwyVa',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/nKMe6vrkZD',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/eliowang6/Eidolon',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Official Website',
              href: 'https://sholarel.instarmony.com/',
            },
            {
              label: '登录 / 注册',
              href: 'https://sholarel.instarmony.com/login.html',
            },
            {
              label: 'Bilibili',
              href: 'https://space.bilibili.com/520926548',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Sholarel. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['json', 'bash'],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    tooltip: {
      delay: 300,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
