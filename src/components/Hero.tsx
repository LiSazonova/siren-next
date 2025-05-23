'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EmblaCarousel from './EmblaCarousel';
import { useTranslations } from 'next-intl';

const Hero: React.FC = () => {
  const t = useTranslations('Hero');

  return (
    <section className="text-center py-6 relative">
      <div className="max-w-[320px] md:max-w-[768px] xl:max-w-[1228px] mx-auto">
        <p className="font-lobster text-[38px]">{t('new')}</p>
        <h1 className="font-lora text-[40px] uppercase text-black mt-[-20px] mb-[-20px]">
          {t('collection')}
        </h1>
        <p className="font-kaushan text-[28px] text-black mb-6 md:mb-4 xl:mb-7">
          La fleur
        </p>

        <div className="hidden md:flex justify-between mb-4">
          <p className="font-normal text-[18px] w-[155px] text-left">
            {t('subtitle')}
          </p>
          <p className="font-normal text-[18px] w-[210px] text-right">
            {t('offer')}
          </p>
        </div>
      </div>

      <EmblaCarousel />

      <div className="max-w-[320px] md:max-w-[768px] xl:max-w-[1228px] mx-auto">
        <Link href="/collections">
          <button className="font-normal text-[24px] leading-[0.83333] uppercase px-[67px] py-[19px] bg-black text-white mt-[46px]">
            {t('button')}
          </button>
        </Link>

        <div className="flex justify-between mt-4 md:flex-row">
          <div className="text-left flex flex-col justify-start md:mt-[-120px] relative">
            <Image
              src="/Images/decorations/siren_1.svg"
              alt="Siren"
              width={188}
              height={443}
              className="w-[122px] h-[340px] md:w-[188px] md:h-[443px] md:absolute md:top-[130px] md:right-[-440px]"
            />
            <p className="font-normal text-[18px] w-[157px] md:hidden">
              {t('subtitle')}
            </p>
          </div>

          <div className="text-right flex flex-col justify-end items-end ml-[-50px] md:justify-start md:items-start md:mt-[-60px] relative">
            <p className="font-normal text-[18px] w-[210px] md:hidden">
              {t('offer')}
            </p>
            <Image
              src="/Images/decorations/siren_2.svg"
              alt="Siren"
              width={184}
              height={253}
              className="w-[150px] h-[203px] md:w-[184px] md:h-[253px] md:absolute md:top-[280px] md:left-[-440px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
