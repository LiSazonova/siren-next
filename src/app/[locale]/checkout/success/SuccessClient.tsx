'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function SuccessClient() {
  const params = useSearchParams();
  const t = useTranslations('checkout.Success');
  const locale = useLocale();

  const order = params.get('order');

  return (
    <main className="max-w-[700px] mx-auto py-24 text-center">
      <h1 className="text-3xl uppercase mb-6">{t('title')}</h1>

      {order && (
        <p className="text-lg mb-6">
          {t('orderNumber')}: <b>#{order}</b>
        </p>
      )}

      <p className="mb-10 text-gray-600">{t('text')}</p>

      <Link
        href={`/${locale}`}
        className="inline-block px-8 py-4 bg-black text-white uppercase"
      >
        {t('continue')}
      </Link>
    </main>
  );
}
