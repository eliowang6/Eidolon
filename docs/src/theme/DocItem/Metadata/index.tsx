import React, {type ReactNode} from 'react';
import {PageMetadata} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  faqPageJsonLd,
  organizationJsonLd,
  siteNameFor,
  websiteJsonLd,
} from '../../../seo/site-meta';

export default function DocItemMetadata(): ReactNode {
  const {metadata, frontMatter, assets} = useDoc();
  const {i18n, siteConfig} = useDocusaurusContext();
  const locale = i18n.currentLocale;
  const siteName = siteNameFor(locale, siteConfig.title);

  const faqItems = (
    siteConfig.customFields?.faq as
      | Record<string, {q: string; a: string}[]>
      | undefined
  )?.[locale === 'en' ? 'en' : 'zhHans'];

  return (
    <PageMetadata
      title={metadata.title}
      description={metadata.description}
      keywords={frontMatter.keywords}
      image={assets.image ?? frontMatter.image}>
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <script type="application/ld+json">
        {JSON.stringify(organizationJsonLd())}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteJsonLd(locale))}
      </script>
      {metadata.id === 'faq' && faqItems && faqItems.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(faqPageJsonLd(locale, faqItems))}
        </script>
      )}
    </PageMetadata>
  );
}
