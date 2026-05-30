'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

export default function ErrorPage() {
  const t = useTranslations('error');
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-black font-lora text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 flex justify-center">
          <Image
            src="/Images/decorations/login_siren.svg"
            width={583}
            height={321}
            alt="Siren decoration"
            className="w-full h-auto max-w-[280px] md:max-w-[583px]"
            priority
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="font-lora text-[36px] md:text-[56px] font-normal uppercase leading-tight mb-6">
            {t('title')}
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href={`/${locale}/checkout`}
              className="px-8 py-4 border border-white uppercase text-sm tracking-wider hover:bg-white hover:text-black transition text-center"
            >
              {t('retry')}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
