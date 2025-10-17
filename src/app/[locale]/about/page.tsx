'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const About: React.FC = () => {
  const t = useTranslations('about');

  return (
    <main className="px-5 py-6">
      <div className="max-w-[320px] mx-auto md:max-w-[768px] xl:max-w-[1228px] relative">
        <h1 className="font-lora text-[40px] text-center uppercase mb-[34px] md:text-[64px] md:mb-[48px]">
          {t('title')}
        </h1>
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-between md:gap-[29px] xl:gap-[46px]">
          <Image
            src="/Images/about_foto.jpg"
            alt="О нас"
            width={474}
            height={712}
            className="block mx-auto w-[320px] h-[482px] md:w-[344px] md:h-[518px] xl:w-[474px] xl:h-[712px]"
          />
          <div className="flex flex-col gap-6">
            <p className="font-inter text-[18px] leading-[21.78px] text-сenter max-w-[355px] xl:max-w-[708px]">
              {t('description')}
            </p>
            <p className="font-inter text-[18px] leading-[21.78px] text-left  max-w-[355px] xl:max-w-[708px]">
              {t('description2')}
            </p>
            <p className="font-inter text-[18px] leading-[21.78px] text-left max-w-[355px] xl:max-w-[708px]">
              {t('description3')}
            </p>
          </div>
        </div>
        <div className="mt-[-30px] flex justify-end md:absolute md:bottom-40 md:left-40 xl:bottom-0 xl:right-0">
          <Image
            src="/Images/decorations/siren_2.svg"
            alt="Siren"
            width={184}
            height={253}
            className="w-[184px] h-[253px]"
          />
        </div>
      </div>
    </main>
  );
};

export default About;
