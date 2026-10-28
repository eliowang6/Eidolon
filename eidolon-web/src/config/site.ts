export const SITE = {
  url: 'https://eidolon.instarmony.com',
  status: 'waitlist' as 'closed-beta' | 'waitlist' | 'public-beta',
  waitlistEndpoint: 'https://api.freewaitlists.com/waitlists/cmp7tkfdd01o401qtuocoduii',
  downloads: {
    windows: 'https://storage.instarmony.com/Eidolon_latest.msi',
    android: 'https://storage.instarmony.com/Eidolon_latest.apk',
  },
  docs: {
    home: 'https://instarmony.com/docs/build/',
    quickStart: 'https://instarmony.com/docs/build/quick-start/',
    agent: 'https://instarmony.com/docs/build/features/agent/',
    faq: 'https://instarmony.com/docs/build/faq/',
  },
  social: {
    github: 'https://github.com/eliowang6/Eidolon',
    xiaohongshu: '',
    bilibili: '',
    qqGroup: '',
  },
  contactEmail: '',
  founder: {
    showCredentials: false,
  },
} as const;

export const GITHUB_ISSUES = `${SITE.social.github}/issues`;
