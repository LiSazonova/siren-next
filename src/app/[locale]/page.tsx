import Hero from '@/components/Hero/Hero';
import { Locale, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function Home({ params }: Props) {
  const { locale } = use(params);

  setRequestLocale(locale);

  const t = useTranslations('Home');

  return (
    <div>
      <h1 className="hidden">{t('title')}</h1>
      <Hero />
    </div>
  );
}
