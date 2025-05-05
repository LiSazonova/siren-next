import { Locale, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function IndexPage({ params }: Props) {
  const { locale } = use(params);

  setRequestLocale(locale);

  const t = useTranslations('HomePage');

  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  );
}
