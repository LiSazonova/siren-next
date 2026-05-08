'use client';

import { useTranslations, useLocale } from 'next-intl';
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
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <main className="min-h-screen bg-black font-lora text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 flex justify-center">
          <Image
            src="/images/decorations/login_siren.svg"
            width={583}
            height={321}
            alt="Siren decoration"
            className="w-full h-auto max-w-[280px] md:max-w-[583px]"
            priority
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="font-lora text-[36px] md:text-[56px] font-normal uppercase leading-tight tracking-wide">
            {t('title')}
          </h1>
        </div>
      </div>
    </main>
  );
}
