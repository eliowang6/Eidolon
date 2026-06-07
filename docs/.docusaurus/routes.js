import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/en/',
    component: ComponentCreator('/en/', '6c2'),
    exact: true
  },
  {
    path: '/en/',
    component: ComponentCreator('/en/', '760'),
    routes: [
      {
        path: '/en/',
        component: ComponentCreator('/en/', '2bf'),
        routes: [
          {
            path: '/en/',
            component: ComponentCreator('/en/', 'cf3'),
            routes: [
              {
                path: '/en/account',
                component: ComponentCreator('/en/account', 'ccd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/en/faq',
                component: ComponentCreator('/en/faq', '3df'),
                exact: true,
                sidebar: "faqSidebar"
              },
              {
                path: '/en/features/agent',
                component: ComponentCreator('/en/features/agent', 'e45'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/alarm',
                component: ComponentCreator('/en/features/alarm', 'fe0'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/avatar',
                component: ComponentCreator('/en/features/avatar', 'fb8'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/chat',
                component: ComponentCreator('/en/features/chat', '204'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/emoji-sticker',
                component: ComponentCreator('/en/features/emoji-sticker', 'f8d'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/focus-timer',
                component: ComponentCreator('/en/features/focus-timer', 'b14'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/habit',
                component: ComponentCreator('/en/features/habit', '21c'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/image-generation',
                component: ComponentCreator('/en/features/image-generation', '60d'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/mcp',
                component: ComponentCreator('/en/features/mcp', 'dd4'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/memory',
                component: ComponentCreator('/en/features/memory', '901'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/mood',
                component: ComponentCreator('/en/features/mood', 'e15'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/qqbot',
                component: ComponentCreator('/en/features/qqbot', '9ab'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/quick-prompts',
                component: ComponentCreator('/en/features/quick-prompts', 'f3c'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/subscription',
                component: ComponentCreator('/en/features/subscription', 'e82'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/theater',
                component: ComponentCreator('/en/features/theater', 'e00'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/theme',
                component: ComponentCreator('/en/features/theme', '989'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/todo',
                component: ComponentCreator('/en/features/todo', '50b'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/tools',
                component: ComponentCreator('/en/features/tools', '548'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/tts',
                component: ComponentCreator('/en/features/tts', 'fa8'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/video-call',
                component: ComponentCreator('/en/features/video-call', '418'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/voice-call',
                component: ComponentCreator('/en/features/voice-call', '915'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/features/wechat',
                component: ComponentCreator('/en/features/wechat', 'e23'),
                exact: true,
                sidebar: "featureSidebar"
              },
              {
                path: '/en/install',
                component: ComponentCreator('/en/install', 'e8c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/en/quick-start',
                component: ComponentCreator('/en/quick-start', '135'),
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
