import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import EmblaCarousel from '@/components/EmblaCarousel';
import { useTranslations } from 'next-intl';

const HeroDesktop: React.FC = () => {
  const t = useTranslations('Hero');

  return (
    <section className="text-center py-6 relative">
      <div className="max-w-[1228px] mx-auto">
        <div className="flex flex-col items-center justify-center">
          <p className="font-lobster text-[54px]">{t('new')}</p>
          <h1 className="font-lora text-[64px] uppercase text-black mt-[-20px] mb-[-20px]">
            {t('collection')}
          </h1>
          <p className="font-kaushan text-[34px] text-black">La fleur</p>
        </div>

        <div className="flex justify-between">
          <p className="block text-[18px] w-[155px] text-left">
            {t('subtitle')}
          </p>
          <p className="block text-[18px] w-[210px] text-right">{t('offer')}</p>
        </div>

        <div className="flex justify-between items-center">
          <Image
            src="/Images/decorations/siren_1.svg"
            alt="Siren"
            width={188}
            height={443}
            className="w-[122px] h-[340px]"
          />
          <EmblaCarousel />
          <Image
            src="/Images/decorations/siren_2.svg"
            alt="Siren"
            width={184}
            height={253}
            className="w-[150px] h-[203px]"
          />
        </div>
      </div>

      <Link href="/collections">
        <button className="w-[292px] text-[28px] leading-[0.83333] uppercase px-[40px] py-[19px] bg-black text-white mt-[46px] mr-[30px]">
          {t('button')}
        </button>
      </Link>
    </section>
  );
};
export default HeroDesktop;
