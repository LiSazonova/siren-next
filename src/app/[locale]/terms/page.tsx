import React, { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import InternationalDeliveryBlock from '@/components/InternationalDeliveryBlock';
import { EMAIL } from '@/lib/constants/contact';

type Props = {
  params: Promise<{ locale: string }>;
};

export default function TermsPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('Terms');

  return (
    <section className="max-w-[1228px] mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="font-lora text-[48px] md:text-[64px] uppercase text-black mb-4">
          {t('title')}
        </h1>
        <div className="w-24 h-1 bg-black mx-auto"></div>
      </div>

      <div className="space-y-8 text-[16px] leading-relaxed">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="font-lora text-[22px] uppercase text-black mb-3">
            {t('seller.title')}
          </h2>
          <p>
            <span className="font-semibold">{t('seller.name')}:</span>{' '}
            {t('seller.fullName')}
          </p>
          <p>
            <span className="font-semibold">{t('seller.inn')}:</span> 3669711966
          </p>
          <p>
            <span className="font-semibold">{t('seller.email')}:</span>{' '}
            <a href={`mailto:${EMAIL}`} className="hover:underline">
              {EMAIL}
            </a>
          </p>
        </div>

        <p>{t('intro')}</p>

        <div>
          <h2 className="font-lora text-[28px] uppercase text-black mb-4">
            {t('novaPoshta.title')}
          </h2>
          <p className="mb-3">{t('novaPoshta.description')}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('novaPoshta.item1')}</li>
            <li>{t('novaPoshta.item2')}</li>
            <li>{t('novaPoshta.item3')}</li>
          </ul>
        </div>

        <div>
          <h2 className="font-lora text-[28px] uppercase text-black mb-4">
            {t('ukrposhta.title')}
          </h2>
          <p className="mb-3">{t('ukrposhta.description')}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('ukrposhta.item1')}</li>
            <li>{t('ukrposhta.item2')}</li>
          </ul>
        </div>

        <div>
          <h2 className="font-lora text-[28px] uppercase text-black mb-4">
            {t('shippingSchedule.title')}
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('shippingSchedule.item1')}</li>
            <li>{t('shippingSchedule.item2')}</li>
            <li>{t('shippingSchedule.item3')}</li>
          </ul>
        </div>

        <div>
          <h2 className="font-lora text-[28px] uppercase text-black mb-4">
            {t('payment.title')}
          </h2>
          <p className="mb-4">{t('payment.intro')}</p>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">{t('payment.onlineTitle')}</p>
              <p>{t('payment.onlineContent')}</p>
            </div>
            <div>
              <p className="font-semibold mb-1">{t('payment.ibanTitle')}</p>
              <p>{t('payment.ibanContent')}</p>
            </div>
            <div>
              <p className="font-semibold mb-1">{t('payment.codTitle')}</p>
              <p className="mb-2">{t('payment.codContent')}</p>
              <p>{t('payment.codNote')}</p>
            </div>
            <p>{t('payment.prepayment')}</p>
          </div>
        </div>

        <div>
          <h2 className="font-lora text-[28px] uppercase text-black mb-4">
            {t('receiving.title')}
          </h2>
          <p className="mb-4">{t('receiving.content')}</p>
          <p className="mb-3">{t('receiving.ifDamaged')}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('receiving.step1')}</li>
            <li>{t('receiving.step2')}</li>
            <li>{t('receiving.step3')}</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="mb-3">{t('support.intro')}</p>
          <div className="space-y-2">
            <p>{t('support.phone')}</p>
            <p>
              {t('support.emailLabel')}{' '}
              <a href={`mailto:${EMAIL}`} className="hover:underline">
                {EMAIL}
              </a>
            </p>
            <p>{t('support.schedule')}</p>
          </div>
        </div>

        <InternationalDeliveryBlock />

        <div className="border-t border-gray-300 pt-8 mt-8">
          <p className="text-sm text-gray-600">{t('lastUpdated')}</p>
        </div>
      </div>
    </section>
  );
}
