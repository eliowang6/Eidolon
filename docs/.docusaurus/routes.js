import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/Eidolon/docs/build/en/',
    component: ComponentCreator('/Eidolon/docs/build/en/', '2ad'),
    exact: true
  },
  {
    path: '/Eidolon/docs/build/en/',
    component: ComponentCreator('/Eidolon/docs/build/en/', 'afb'),
    routes: [
      {
        path: '/Eidolon/docs/build/en/',
        component: ComponentCreator('/Eidolon/docs/build/en/', 'a7f'),
        routes: [
          {
            path: '/Eidolon/docs/build/en/',
            component: ComponentCreator('/Eidolon/docs/build/en/', 'b24'),
            routes: [
              {
                path: '/Eidolon/docs/build/en/account',
                component: ComponentCreator('/Eidolon/docs/build/en/account', '9dd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/faq',
                component: ComponentCreator('/Eidolon/docs/build/en/faq', 'bc2'),
                exact: true,
                sidebar: "faqSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/agent',
                component: ComponentCreator('/Eidolon/docs/build/en/features/agent', '402'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/alarm',
                component: ComponentCreator('/Eidolon/docs/build/en/features/alarm', '320'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/avatar',
                component: ComponentCreator('/Eidolon/docs/build/en/features/avatar', '67b'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/chat',
                component: ComponentCreator('/Eidolon/docs/build/en/features/chat', '56f'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/emoji-sticker',
                component: ComponentCreator('/Eidolon/docs/build/en/features/emoji-sticker', 'a8f'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/focus-timer',
                component: ComponentCreator('/Eidolon/docs/build/en/features/focus-timer', '52a'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/habit',
                component: ComponentCreator('/Eidolon/docs/build/en/features/habit', 'eb4'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/image-generation',
                component: ComponentCreator('/Eidolon/docs/build/en/features/image-generation', 'ca1'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/life',
                component: ComponentCreator('/Eidolon/docs/build/en/features/life', 'fde'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/mcp',
                component: ComponentCreator('/Eidolon/docs/build/en/features/mcp', '251'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/memory',
                component: ComponentCreator('/Eidolon/docs/build/en/features/memory', 'fb8'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/mood',
                component: ComponentCreator('/Eidolon/docs/build/en/features/mood', '079'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/qqbot',
                component: ComponentCreator('/Eidolon/docs/build/en/features/qqbot', 'aeb'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/quick-prompts',
                component: ComponentCreator('/Eidolon/docs/build/en/features/quick-prompts', 'd87'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/settings',
                component: ComponentCreator('/Eidolon/docs/build/en/features/settings', '4ac'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/subscription',
                component: ComponentCreator('/Eidolon/docs/build/en/features/subscription', '326'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/theater',
                component: ComponentCreator('/Eidolon/docs/build/en/features/theater', '731'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/theme',
                component: ComponentCreator('/Eidolon/docs/build/en/features/theme', '333'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/todo',
                component: ComponentCreator('/Eidolon/docs/build/en/features/todo', '33e'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/tools',
                component: ComponentCreator('/Eidolon/docs/build/en/features/tools', '039'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/tts',
                component: ComponentCreator('/Eidolon/docs/build/en/features/tts', '93e'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/video-call',
                component: ComponentCreator('/Eidolon/docs/build/en/features/video-call', '826'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/voice-call',
                component: ComponentCreator('/Eidolon/docs/build/en/features/voice-call', '7ef'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/features/wechat',
                component: ComponentCreator('/Eidolon/docs/build/en/features/wechat', '6be'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/install',
                component: ComponentCreator('/Eidolon/docs/build/en/install', 'eb2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Eidolon/docs/build/en/quick-start',
                component: ComponentCreator('/Eidolon/docs/build/en/quick-start', '53b'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
