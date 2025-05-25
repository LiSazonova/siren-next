import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import EmblaCarousel from '@/components/EmblaCarousel';
import { useTranslations } from 'next-intl';

const HeroDesktop: React.FC = () => {
  const t = useTranslations('Hero');

  return (
    <section className="pb-6">
      <div className="flex flex-col items-center">
        <p className="font-lobster text-[38px]">{t('new')}</p>
        <h1 className="font-lora text-[40px] uppercase text-black mt-[-20px] mb-[-20px]">
          {t('collection')}
        </h1>
        <p className="font-kaushan text-[28px] text-black">La fleur</p>

        <EmblaCarousel />

        <Link href="/collections">
          <button className="w-[320px] text-[24px] leading-[0.83333] uppercase px-[67px] py-[19px] bg-black text-white mt-[46px]">
            {t('button')}
          </button>
        </Link>

        <div className="max-w-[320px] flex justify-between">
          <div className="text-left flex flex-col justify-start">
            <Image
              src="/Images/decorations/siren_1.svg"
              alt="Siren"
              width={188}
              height={443}
              className="w-[122px] h-[340px]"
            />
            <p className="font-normal text-[18px] w-[157px]">{t('subtitle')}</p>
          </div>

          <div className="text-right flex flex-col justify-end items-end ml-[-50px]">
            <p className="font-normal text-[18px] w-[210px]">{t('offer')}</p>
            <Image
              src="/Images/decorations/siren_2.svg"
              alt="Siren"
              width={184}
              height={253}
              className="w-[150px] h-[203px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroDesktop;
