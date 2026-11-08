import React, {type ComponentProps, type ReactNode} from 'react';
import {TitleFormatterProvider} from '@docusaurus/theme-common/internal';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type {Props} from '@theme/ThemeProvider/TitleFormatter';
import {siteNameFor} from '../../../seo/site-meta';

type FormatterProp = ComponentProps<typeof TitleFormatterProvider>['formatter'];

export default function ThemeProviderTitleFormatter({
  children,
}: Props): ReactNode {
  const {i18n} = useDocusaurusContext();

  // siteConfig.title is the Chinese name; English pages get their own suffix
  // instead of falling back to "Sholarel 文档".
  const formatter: FormatterProp = (params) =>
    params.defaultFormatter({
      ...params,
      siteTitle: siteNameFor(i18n.currentLocale, params.siteTitle),
    });

  return (
    <TitleFormatterProvider formatter={formatter}>
      {children}
    </TitleFormatterProvider>
  );
}
