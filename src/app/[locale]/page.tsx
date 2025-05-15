import { Locale, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function Home({ params }: Props) {
  const { locale } = use(params);

  setRequestLocale(locale);

  const t = useTranslations('HomePage');

  return (
    <div>
      {/* <h1 className="text-amber-700">{t('title')}</h1> */}
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl">Its HomePage</p>
      </div>
    </div>
  );
}
