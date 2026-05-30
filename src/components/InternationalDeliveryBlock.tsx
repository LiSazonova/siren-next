import React from 'react';
import { useTranslations } from 'next-intl';
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  TRACKING_URL,
} from '@/lib/constants/contact';

export default function InternationalDeliveryBlock() {
  const t = useTranslations('Terms.international');

  return (
    <div className="border-t border-gray-300 pt-8 mt-8 space-y-6">
      <h2 className="font-lora text-[28px] uppercase text-black mb-4">
        {t('title')}
      </h2>

      <p>{t('intro')}</p>

      <div>
        <h3 className="font-lora text-[20px] uppercase text-black mb-3">
          {t('methodsTitle')}
        </h3>
        <p className="mb-4">{t('methodsIntro')}</p>

        <div className="space-y-6">
          <div>
            <p className="font-semibold mb-2">{t('ukrposhtaTitle')}</p>
            <p className="mb-3">{t('ukrposhtaDescription')}</p>
            <p className="mb-2">{t('ukrposhtaGeography')}</p>
            <p className="font-semibold mb-1">{t('ukrposhtaDeliveryTitle')}</p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>{t('ukrposhtaDelivery1')}</li>
              <li>{t('ukrposhtaDelivery2')}</li>
              <li>{t('ukrposhtaDelivery3')}</li>
            </ul>
            <p>{t('ukrposhtaCost')}</p>
          </div>

          <div>
            <p className="font-semibold mb-2">{t('novaPostTitle')}</p>
            <p className="mb-3">{t('novaPostDescription')}</p>
            <p className="mb-2">{t('novaPostGeography')}</p>
            <p className="mb-2">{t('novaPostDelivery')}</p>
            <p>{t('novaPostCost')}</p>
          </div>

          <div>
            <p className="font-semibold mb-2">{t('expressTitle')}</p>
            <p className="mb-2">{t('expressDescription')}</p>
            <p className="mb-2">{t('expressDelivery')}</p>
            <p>{t('expressCost')}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-lora text-[20px] uppercase text-black mb-3">
          {t('paymentTitle')}
        </h3>
        <p className="mb-2">{t('paymentContent1')}</p>
        <p className="mb-3">{t('paymentContent2')}</p>
        <p className="font-semibold mb-1">{t('paymentOnlineTitle')}</p>
        <p>{t('paymentOnlineContent')}</p>
      </div>

      <div>
        <h3 className="font-lora text-[20px] uppercase text-black mb-3">
          {t('customsTitle')}
        </h3>
        <div className="space-y-3">
          <p>{t('customsContent1')}</p>
          <p>{t('customsContent2')}</p>
          <p>{t('customsContent3')}</p>
          <p>{t('customsContent4')}</p>
        </div>
      </div>

      <div>
        <h3 className="font-lora text-[20px] uppercase text-black mb-3">
          {t('trackingTitle')}
        </h3>
        <p>
          {t('trackingContentBefore')}{' '}
          <a
            href={TRACKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-medium"
          >
            17track.net
          </a>
          {t('trackingContentAfter')}
        </p>
      </div>

      <div>
        <h3 className="font-lora text-[20px] uppercase text-black mb-3">
          {t('returnsTitle')}
        </h3>
        <p className="mb-3">{t('returnsContent1')}</p>
        <p>{t('returnsContent2')}</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="font-lora text-[20px] uppercase text-black mb-3">
          {t('contactsTitle')}
        </h3>
        <p className="mb-3">{t('contactsIntro')}</p>
        <div className="space-y-2">
          <p>{t('contactsEmail')}</p>
          <p>{t('contactsMessengers')}</p>
          <p>
            {t('contactsInstagramLabel')}{' '}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-medium"
            >
              {INSTAGRAM_HANDLE}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
