export const SITE = {
  url: 'https://sholarel.instarmony.com',
  // Public beta since 2026-11-01 (see the changelog page).
  status: 'public-beta' as 'closed-beta' | 'waitlist' | 'public-beta',
  downloads: {
    // 主线路：storage 直链。中国大陆地区在前端自动切换至 ModelScope 国内优化线路。
    android: 'https://storage.instarmony.com/Sholarel_latest.apk',
  },
  // 备用线路：R2 直连域名，和主线路是同一个 bucket。主线路探测不通时自动切换。
  downloadsFallback: {
    android: 'https://storage.instarmony.com/Sholarel_latest.apk',
  },
  // 下载页版本号的唯一来源：应用服务端的 updater 端点。每次发版由发布管线写入
  // manifest，页面只读不写，所以发版不需要改文案、也不需要重新构建官网。
  // current_version 用 0.0.1：永远低于线上任何版本，端点才会返回最新清单本身；
  // 传真实版本且已是最新时会返回 204（空响应）。
  release: {
    windows: 'https://api.eidolon.instarmony.com/eidolon/api/updater/windows/x86_64/0.0.1',
    android: 'https://api.eidolon.instarmony.com/eidolon/api/updater/android/arm64-v8a/0.0.1',
  },
  // The documentation ships with the site, under /docs/. It used to live on
  // the lab host at /docs/build/, which made the two hosts compete for the
  // same documentation queries.
  docs: {
    home: '/docs/',
    quickStart: '/docs/quick-start/',
    agent: '/docs/features/agent/',
    faq: '/docs/faq/',
  },
  social: {
    github: 'https://github.com/eliowang6/Eidolon',
    xiaohongshu: '',
    bilibili: '',
    qqGroup: 'https://qm.qq.com/q/oUgx5EwyVa',
    discord: 'https://discord.gg/nKMe6vrkZD',
  },
  contactEmail: 'support@instarmony.com',
  studio: 'https://instarmony.com/',
  founder: {
    page: 'https://instarmony.com/team/eli0wang6/',
    email: 'eli0wang6@instarmony.com',
  },
} as const;

export const GITHUB_ISSUES = `${SITE.social.github}/issues`;
