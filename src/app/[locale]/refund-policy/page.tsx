import React, { use } from 'react';
import { useTranslations } from 'next-intl';
import { EMAIL } from '@/lib/constants/contact';

type Props = {
  params: Promise<{ locale: string }>;
};

export default function RefundPolicyPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('RefundPolicy');

  return (
    <section className="max-w-[1228px] mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="font-lora text-[48px] md:text-[64px] uppercase text-black mb-4">
          {t('title')}
        </h1>
        <div className="w-24 h-1 bg-black mx-auto"></div>
      </div>

      <div className="space-y-8 text-[16px] leading-relaxed">
        <div>
          <h2 className="font-lora text-[28px] uppercase text-black mb-4">
            {t('section1.title')}
          </h2>
          <p>{t('section1.content')}</p>
        </div>

        <div>
          <h2 className="font-lora text-[28px] uppercase text-black mb-4">
            {t('section2.title')}
          </h2>
          <p>{t('section2.content')}</p>
        </div>

        <div>
          <h2 className="font-lora text-[28px] uppercase text-black mb-4">
            {t('section3.title')}
          </h2>
          <p className="mb-4">{t('section3.content')}</p>
          <ol className="list-decimal pl-6 space-y-3">
            <li>{t('section3.step1')}</li>
            <li>{t('section3.step2')}</li>
            <li>{t('section3.step3')}</li>
          </ol>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-8">
          <h3 className="font-lora text-[20px] uppercase text-black mb-3">
            {t('contact.title')}
          </h3>
          <p className="mb-2">{t('contact.content')}</p>
          <p className="font-semibold mb-1">
            {t('contact.phone')}:{' '}
            <a href="tel:+380977099015" className="hover:underline">
              +380 97 709 90 15
            </a>
          </p>
          <p className="font-semibold">
            {t('contact.email')}:{' '}
            <a
              href={`mailto:${EMAIL}`}
              className="hover:underline"
            >
              {EMAIL}
            </a>
          </p>
        </div>

        <div className="border-t border-gray-300 pt-8 mt-8">
          <p className="text-sm text-gray-600">{t('lastUpdated')}</p>
        </div>
      </div>
    </section>
  );
}
