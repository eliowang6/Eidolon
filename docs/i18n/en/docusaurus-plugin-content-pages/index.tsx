import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {
  organizationJsonLd,
  siteNameFor,
  websiteJsonLd,
} from '../../../src/seo/site-meta';
import FeatureIcon, { type FeatureIconName } from '../../../src/components/FeatureIcon';
import { LATEST_VERSION } from '../../../src/version';

const HOME_DESCRIPTION =
  'Sholarel docs: install, sign up and your first chat, then guides on text, voice and video calls, to-dos, memory, AI agents and theater, and a FAQ by topic.';

const features: Array<{
  icon: FeatureIconName;
  title: string;
  desc: string;
  to: string;
}> = [
  {
    icon: 'chat',
    title: 'Smart Chat',
    desc: 'Text, voice, video — communicate with AI your way',
    to: '/features/chat',
  },
  {
    icon: 'call',
    title: 'Voice & Video Calls',
    desc: 'Talk to AI like a phone call, or go face-to-face with video',
    to: '/features/video-call',
  },
  {
    icon: 'todo',
    title: 'To-Do & Habits',
    desc: 'AI helps manage tasks, build habits, and track your mood',
    to: '/features/todo',
  },
  {
    icon: 'theater',
    title: 'Theater',
    desc: 'Immersive interactive stories — co-create with AI',
    to: '/features/theater',
  },
  {
    icon: 'image',
    title: 'AI Image Generation',
    desc: 'Generate beautiful images from text descriptions',
    to: '/features/image-generation',
  },
  {
    icon: 'memory',
    title: 'Long-Term Memory',
    desc: 'AI remembers every important moment — the more you chat, the better it knows you',
    to: '/features/memory',
  },
  {
    icon: 'focus',
    title: 'Focus & Reminders',
    desc: 'Pomodoro timer + alarm reminders — AI stays with you',
    to: '/features/focus-timer',
  },
  {
    icon: 'agent',
    title: 'AI Agent',
    desc: 'Let AI operate your computer, search the web, and execute tasks',
    to: '/features/agent',
  },
  {
    icon: 'theme',
    title: 'Themes & Personalization',
    desc: '9 beautiful themes, character models, voice customization',
    to: '/features/theme',
  },
];

export default function Home(): React.JSX.Element {
  const {siteConfig, i18n} = useDocusaurusContext();
  const siteName = siteNameFor(i18n.currentLocale, siteConfig.title);
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
              <Link className="eid-btn eid-btn--primary" to="/quick-start">
                <span>Quick Start</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link className="eid-btn eid-btn--ghost" to="/features/chat">
                Features
              </Link>
              <Link className="eid-btn eid-btn--ghost" to="/faq">
                FAQ
              </Link>
            </div>
          </div>
        </section>

        <section className="eid-features">
          <div className="eid-features__container">
            <h2 className="eid-features__heading">
              Explore All Features
            </h2>
            <p className="eid-features__subheading">
              Not just a chat tool — Sholarel is an AI companion that truly integrates into your life
            </p>
            <div className="eid-features__grid">
              {features.map((f, i) => (
                <Link key={i} className="eid-feature-card" to={f.to}>
                  <span className="eid-feature-card__icon"><FeatureIcon name={f.icon} /></span>
                  <span className="eid-feature-card__title">{f.title}</span>
                  <span className="eid-feature-card__desc">{f.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="eid-cta">
          <div className="eid-cta__container">
            <h2 className="eid-cta__title">Ready to begin?</h2>
            <p className="eid-cta__desc">Get started in 5 minutes — begin your AI companion journey</p>
            <Link className="eid-btn eid-btn--primary eid-btn--lg" to="/quick-start">
              <span>Get Started</span>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
