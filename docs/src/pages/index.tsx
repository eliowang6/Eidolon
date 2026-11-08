import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import {
  organizationJsonLd,
  siteNameFor,
  websiteJsonLd,
} from '../seo/site-meta';
import FeatureIcon, { type FeatureIconName } from '../components/FeatureIcon';
import { LATEST_VERSION } from '../version';

const HOME_DESCRIPTION =
  'Sholarel 使用文档：从安装、注册到第一次对话，按章节讲清文字、语音与视频聊天、待办与习惯、长期记忆、AI 代理、小剧场与 AI 画图等功能的实际用法；常见问题按安装启动、账号、功能三类分组整理，方便逐项对照排查，也便于搜索直达具体条目。';

export default function Home(): React.JSX.Element {
  const {siteConfig, i18n} = useDocusaurusContext();
  const siteName = siteNameFor(i18n.currentLocale, siteConfig.title);
  const features: Array<{
    icon: FeatureIconName;
    title: string;
    desc: string;
    href: string;
  }> = [
    {
      icon: 'chat',
      title: '智能对话',
      desc: '文字、语音、视频，多种方式与 AI 自由交流',
      href: useBaseUrl('/features/chat'),
    },
    {
      icon: 'call',
      title: '语音 & 视频通话',
      desc: '像打电话一样和 AI 对话，面对面视频陪伴',
      href: useBaseUrl('/features/video-call'),
    },
    {
      icon: 'todo',
      title: '待办 & 习惯',
      desc: 'AI 帮你管理任务、养成好习惯、记录心情',
      href: useBaseUrl('/features/todo'),
    },
    {
      icon: 'theater',
      title: '小剧场',
      desc: '沉浸式互动剧情，与 AI 共创独特故事',
      href: useBaseUrl('/features/theater'),
    },
    {
      icon: 'image',
      title: 'AI 画图',
      desc: '用文字描述就能生成精美图片',
      href: useBaseUrl('/features/image-generation'),
    },
    {
      icon: 'memory',
      title: '长期记忆',
      desc: 'AI 记住你的每一个重要时刻，越聊越懂你',
      href: useBaseUrl('/features/memory'),
    },
    {
      icon: 'focus',
      title: '专注 & 提醒',
      desc: '番茄钟专注模式 + 闹钟提醒，AI 陪你一起',
      href: useBaseUrl('/features/focus-timer'),
    },
    {
      icon: 'agent',
      title: 'AI 代理',
      desc: '让 AI 帮你操作电脑、搜索信息、执行任务',
      href: useBaseUrl('/features/agent'),
    },
    {
      icon: 'theme',
      title: '主题 & 个性化',
      desc: '9 套精美主题、角色模型、声音定制',
      href: useBaseUrl('/features/theme'),
    },
  ];
  return (
    <Layout title={siteName} description={HOME_DESCRIPTION}>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta name="twitter:title" content={siteName} />
        <meta name="twitter:description" content={HOME_DESCRIPTION} />
        <script type="application/ld+json">
          {JSON.stringify(organizationJsonLd())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteJsonLd(i18n.currentLocale))}
        </script>
      </Head>
      <main className="eid-home">
        {/* ---- Hero ---- */}
        <section className="eid-hero">
          <div className="eid-hero__bg">
            <div className="eid-hero__orb eid-hero__orb--1" />
            <div className="eid-hero__orb eid-hero__orb--2" />
            <div className="eid-hero__orb eid-hero__orb--3" />
            <div className="eid-hero__grid" />
          </div>
          <div className="eid-hero__content">
            <div className="eid-hero__badge">
              <span className="eid-hero__badge-dot" />
              v{LATEST_VERSION} Open Beta
            </div>
            <h1 className="eid-hero__title">
              <span className="eid-hero__title-line">Sholarel</span>
              <span className="eid-hero__title-line eid-hero__title-gradient">
                使用文档
              </span>
            </h1>
            <p className="eid-hero__subtitle">
              你的 AI 时代另一个自己
              <br />
              <span className="eid-hero__subtitle-dim">
                从零开始，学会与 AI 伴侣的每一次对话
              </span>
            </p>
            <div className="eid-hero__actions">
              <a className="eid-btn eid-btn--primary" href={useBaseUrl('/quick-start')}>
                <span>快速上手</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a className="eid-btn eid-btn--ghost" href={useBaseUrl('/features/chat')}>
                功能详解
              </a>
              <a className="eid-btn eid-btn--ghost" href={useBaseUrl('/faq')}>
                常见问题
              </a>
            </div>
          </div>
        </section>

        {/* ---- Features Grid ---- */}
        <section className="eid-features">
          <div className="eid-features__container">
            <h2 className="eid-features__heading">
              探索全部功能
            </h2>
            <p className="eid-features__subheading">
              不只是聊天工具——Sholarel 是真正融入你生活的 AI 伴侣
            </p>
            <div className="eid-features__grid">
              {features.map((f, i) => (
                <a key={i} className="eid-feature-card" href={f.href}>
                  <span className="eid-feature-card__icon"><FeatureIcon name={f.icon} /></span>
                  <span className="eid-feature-card__title">{f.title}</span>
                  <span className="eid-feature-card__desc">{f.desc}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ---- CTA ---- */}
        <section className="eid-cta">
          <div className="eid-cta__container">
            <h2 className="eid-cta__title">准备好了吗？</h2>
            <p className="eid-cta__desc">5 分钟上手，开启你的 AI 伴侣之旅</p>
            <a className="eid-btn eid-btn--primary eid-btn--lg" href={useBaseUrl('/quick-start')}>
              <span>开始使用</span>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
