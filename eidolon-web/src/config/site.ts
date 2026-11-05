export const SITE = {
  url: 'https://sholarel.instarmony.com',
  status: 'waitlist' as 'closed-beta' | 'waitlist' | 'public-beta',
  waitlistEndpoint: 'https://api.freewaitlists.com/waitlists/cmp7tkfdd01o401qtuocoduii',
  downloads: {
    // 主线路：CDN 优选域名。国内走 Cloudflare 全球边缘（104.18/172.64 段），
    // 比 R2 默认分配的 IP 段稳定得多。
    windows: 'https://cdn.instarmony.com/Eidolon_latest.msi',
    android: 'https://cdn.instarmony.com/Eidolon_latest.apk',
  },
  // 备用线路：R2 直连域名，和主线路是同一个 bucket。主线路探测不通时自动切换。
  downloadsFallback: {
    windows: 'https://storage.instarmony.com/Eidolon_latest.msi',
    android: 'https://storage.instarmony.com/Eidolon_latest.apk',
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
    qqGroup: '',
  },
  contactEmail: 'support@instarmony.com',
  founder: {
    showCredentials: false,
  },
} as const;

export const GITHUB_ISSUES = `${SITE.social.github}/issues`;
