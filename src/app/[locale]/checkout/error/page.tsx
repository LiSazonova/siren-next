'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function ErrorPage() {
  const t = useTranslations('error');
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-12">
        {/* 🧜‍♀️ Левая часть */}
        <div className="flex-1 flex justify-center">
          <img
            src="/images/decorations/login_siren.svg"
            alt="Siren"
            className="max-w-[300px] opacity-80"
          />
        </div>

        {/* ❌ Правая часть */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl uppercase leading-tight mb-6">
            {t('title')}
          </h1>

          <p className="text-gray-400 mb-10">{t('text')}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href={`/${locale}/checkout`}
              className="px-8 py-4 border border-white uppercase hover:bg-white hover:text-black transition"
            >
              {t('retry')}
            </Link>

            <Link
              href={`/${locale}`}
              className="px-8 py-4 bg-white text-black uppercase hover:opacity-80 transition"
            >
              {t('home')}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
