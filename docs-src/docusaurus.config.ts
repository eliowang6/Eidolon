import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Eidolon Docs',
  tagline: 'Your other self in the AI era',
  favicon: 'img/favicon.ico',

  url: 'https://docs.eidolon.ai',
  baseUrl: '/',

  organizationName: 'eliowang6',
  projectName: 'Eidolon',

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
      title: 'Eidolon',
      logo: {
        alt: 'Eidolon Logo',
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
              href: 'https://discord.gg/uBFgfV7y',
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
              href: 'https://eliowang6.github.io/Eidolon/',
            },
            {
              label: 'Bilibili',
              href: 'https://space.bilibili.com/520926548',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Eidolon. Built with Docusaurus.`,
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
