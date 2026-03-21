'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/stores/cart';
import Image from 'next/image';

type Props = {
  order: {
    id: string;
    orderNumber: string;
    paymentStatus: string;
    status: string;
  };
};

export default function SuccessClient({ order }: Props) {
  const t = useTranslations('success');
  const locale = useLocale();
  const { clear } = useCart();

  // 🧹 очищаем корзину после успешного заказа
  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-12">
        {/* 🧜‍♀️ Левая часть */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/images/decorations/login_siren.svg"
            width={583}
            height={321}
            alt="Login Decoration"
            className="w-full h-auto"
            priority
          />
        </div>

        {/* ✨ Правая часть */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl uppercase leading-tight mb-6">
            {t('title')}
          </h1>

          <p className="text-lg mb-4">
            {t('orderNumber')}:{' '}
            <span className="font-semibold">#{order.orderNumber}</span>
          </p>

          {/* 🧾 статусы */}
          <p className="text-sm text-gray-400 mb-1">
            {t('paymentStatus')}: {order.paymentStatus}
          </p>

          <p className="text-sm text-gray-400 mb-6">
            {t('orderStatus')}: {order.status}
          </p>

          <p className="text-gray-400 mb-10">{t('text')}</p>

          <Link
            href={`/${locale}`}
            className="inline-block px-8 py-4 border border-white uppercase hover:bg-white hover:text-black transition"
          >
            {t('continue')}
          </Link>
        </div>
      </div>
    </main>
  );
}
