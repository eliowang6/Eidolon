import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

const features = [
  {
    icon: '💬',
    title: 'Smart Chat',
    desc: 'Text, voice, video — communicate with AI your way',
    href: '/features/chat',
  },
  {
    icon: '🎙️',
    title: 'Voice & Video Calls',
    desc: 'Talk to AI like a phone call, or go face-to-face with video',
    href: '/features/video-call',
  },
  {
    icon: '✅',
    title: 'To-Do & Habits',
    desc: 'AI helps manage tasks, build habits, and track your mood',
    href: '/features/todo',
  },
  {
    icon: '🎭',
    title: 'Theater',
    desc: 'Immersive interactive stories — co-create with AI',
    href: '/features/theater',
  },
  {
    icon: '🎨',
    title: 'AI Image Generation',
    desc: 'Generate beautiful images from text descriptions',
    href: '/features/image-generation',
  },
  {
    icon: '🧠',
    title: 'Long-Term Memory',
    desc: 'AI remembers every important moment — the more you chat, the better it knows you',
    href: '/features/memory',
  },
  {
    icon: '⏰',
    title: 'Focus & Reminders',
    desc: 'Pomodoro timer + alarm reminders — AI stays with you',
    href: '/features/focus-timer',
  },
  {
    icon: '🤖',
    title: 'AI Agent',
    desc: 'Let AI operate your computer, search the web, and execute tasks',
    href: '/features/agent',
  },
  {
    icon: '🎨',
    title: 'Themes & Personalization',
    desc: '9 beautiful themes, character models, voice customization',
    href: '/features/theme',
  },
];

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Eidolon Docs — Your other self in the AI era">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="eid-home">
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
                Docs
              </span>
            </h1>
            <p className="eid-hero__subtitle">
              Your other self in the AI era
              <br />
              <span className="eid-hero__subtitle-dim">
                From zero to every conversation with your AI companion
              </span>
            </p>
            <div className="eid-hero__actions">
              <a className="eid-btn eid-btn--primary" href="/quick-start">
                <span>Quick Start</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a className="eid-btn eid-btn--ghost" href="/features/chat">
                Features
              </a>
              <a className="eid-btn eid-btn--ghost" href="/faq">
                FAQ
              </a>
            </div>
          </div>
        </section>

        <section className="eid-features">
          <div className="eid-features__container">
            <h2 className="eid-features__heading">
              Explore All Features
            </h2>
            <p className="eid-features__subheading">
              Not just a chat tool — Eidolon is an AI companion that truly integrates into your life
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

        <section className="eid-cta">
          <div className="eid-cta__container">
            <h2 className="eid-cta__title">Ready to begin?</h2>
            <p className="eid-cta__desc">Get started in 5 minutes — begin your AI companion journey</p>
            <a className="eid-btn eid-btn--primary eid-btn--lg" href="/quick-start">
              <span>Get Started</span>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
