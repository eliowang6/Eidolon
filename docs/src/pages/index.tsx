import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const features = [
    {
      icon: '💬',
      title: '智能对话',
      desc: '文字、语音、视频，多种方式与 AI 自由交流',
      href: useBaseUrl('/features/chat'),
    },
    {
      icon: '🎙️',
      title: '语音 & 视频通话',
      desc: '像打电话一样和 AI 对话，面对面视频陪伴',
      href: useBaseUrl('/features/video-call'),
    },
    {
      icon: '✅',
      title: '待办 & 习惯',
      desc: 'AI 帮你管理任务、养成好习惯、记录心情',
      href: useBaseUrl('/features/todo'),
    },
    {
      icon: '🎭',
      title: '小剧场',
      desc: '沉浸式互动剧情，与 AI 共创独特故事',
      href: useBaseUrl('/features/theater'),
    },
    {
      icon: '🎨',
      title: 'AI 画图',
      desc: '用文字描述就能生成精美图片',
      href: useBaseUrl('/features/image-generation'),
    },
    {
      icon: '🧠',
      title: '长期记忆',
      desc: 'AI 记住你的每一个重要时刻，越聊越懂你',
      href: useBaseUrl('/features/memory'),
    },
    {
      icon: '⏰',
      title: '专注 & 提醒',
      desc: '番茄钟专注模式 + 闹钟提醒，AI 陪你一起',
      href: useBaseUrl('/features/focus-timer'),
    },
    {
      icon: '🤖',
      title: 'AI 代理',
      desc: '让 AI 帮你操作电脑、搜索信息、执行任务',
      href: useBaseUrl('/features/agent'),
    },
    {
      icon: '🎨',
      title: '主题 & 个性化',
      desc: '9 套精美主题、角色模型、声音定制',
      href: useBaseUrl('/features/theme'),
    },
  ];
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Eidolon 使用文档 - 你的 AI 时代另一个自己">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
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
              v2.0 Open Beta
            </div>
            <h1 className="eid-hero__title">
              <span className="eid-hero__title-line">Eidolon</span>
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
              不只是聊天工具——Eidolon 是真正融入你生活的 AI 伴侣
            </p>
            <div className="eid-features__grid">
              {features.map((f, i) => (
                <a key={i} className="eid-feature-card" href={f.href}>
                  <span className="eid-feature-card__icon">{f.icon}</span>
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
