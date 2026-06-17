import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'quick-start',
    'install',
    'account',
  ],
  featureSidebar: [
    {
      type: 'category',
      label: '核心功能',
      items: [
        'features/chat',
        'features/voice-call',
        'features/video-call',
        'features/tools',
        'features/agent',
      ],
    },
    {
      type: 'category',
      label: '生活管理',
      items: [
        'features/life',
        'features/todo',
        'features/habit',
        'features/mood',
        'features/focus-timer',
        'features/alarm',
      ],
    },
    {
      type: 'category',
      label: '创意娱乐',
      items: [
        'features/theater',
        'features/image-generation',
        'features/emoji-sticker',
        'features/quick-prompts',
      ],
    },
    {
      type: 'category',
      label: '社交集成',
      items: [
        'features/wechat',
        'features/qqbot',
      ],
    },
    {
      type: 'category',
      label: '个性化',
      items: [
        'features/settings',
        'features/avatar',
        'features/theme',
        'features/tts',
        'features/memory',
        'features/mcp',
      ],
    },
    {
      type: 'category',
      label: '订阅与权益',
      items: [
        'features/subscription',
      ],
    },
  ],
  faqSidebar: [
    'faq',
  ],
};

export default sidebars;
