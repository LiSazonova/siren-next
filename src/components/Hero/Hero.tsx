// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import EmblaCarousel from './EmblaCarousel';
// import { useTranslations } from 'next-intl';

// const Hero: React.FC = () => {
//   const t = useTranslations('Hero');

//   return (
//     <section className="text-center py-6 relative">
//       <div className="max-w-[320px] md:max-w-[768px] xl:max-w-[1228px] mx-auto">
//         <p className="font-lobster text-[38px]">{t('new')}</p>
//         <h1 className="font-lora text-[40px] uppercase text-black mt-[-20px] mb-[-20px]">
//           {t('collection')}
//         </h1>
//         <p className="font-kaushan text-[28px] text-black">La fleur</p>

//         <div className="hidden md:flex justify-between">
//           <div>
//             <p className="lg:block md:hidden font-normal text-[18px] w-[155px] text-left">
//               {t('subtitle')}
//             </p>
//             <Image
//               src="/Images/decorations/siren_1.svg"
//               alt="Siren"
//               width={188}
//               height={443}
//               className="w-[122px] h-[340px] md:w-[188px] md:h-[443px] md:absolute md:bottom-[-200px] lg:bottom-[150px]"
//             />
//           </div>
//           <EmblaCarousel />
//           <div>
//             <p className="lg:block md:hidden font-normal text-[18px] w-[210px] text-right">
//               {t('offer')}
//             </p>
//             <Image
//               src="/Images/decorations/siren_2.svg"
//               alt="Siren"
//               width={184}
//               height={253}
//               className="w-[150px] h-[203px] md:w-[184px] md:h-[253px] md:absolute md:bottom-[-160px] md:right-[110px] lg:right-[230px] lg:bottom-[220px]"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="max-w-[320px] md:max-w-[768px] xl:max-w-[1228px] mx-auto">
//         <Link href="/collections">
//           <button className="font-normal text-[24px] leading-[0.83333] uppercase px-[67px] py-[19px] bg-black text-white mt-[46px]">
//             {t('button')}
//           </button>
//         </Link>

//         <div className="flex justify-between mt-4 md:flex-row">
//           <div className="text-left flex flex-col justify-start md:mt-[-120px] relative">
//             <Image
//               src="/Images/decorations/siren_1.svg"
//               alt="Siren"
//               width={188}
//               height={443}
//               className="w-[122px] h-[340px] md:w-[188px] md:h-[443px] md:absolute"
//             />
//             <p className="font-normal text-[18px] w-[157px] md:hidden">
//               {t('subtitle')}
//             </p>
//           </div>

//           <div className="text-right flex flex-col justify-end items-end ml-[-50px] md:justify-start md:items-start md:mt-[-60px] relative">
//             <p className="font-normal text-[18px] w-[210px] md:hidden">
//               {t('offer')}
//             </p>
//             <Image
//               src="/Images/decorations/siren_2.svg"
//               alt="Siren"
//               width={184}
//               height={253}
//               className="w-[150px] h-[203px] md:w-[184px] md:h-[253px] md:absolute"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import EmblaCarousel from './EmblaCarousel';
// import { useTranslations } from 'next-intl';

// const Hero: React.FC = () => {
//   const t = useTranslations('Hero');

//   return (
//     <section className="text-center py-6 relative">
//       <div className="max-w-[320px] md:max-w-[768px] xl:max-w-[1228px] mx-auto">
//         <p className="font-lobster text-[38px]">{t('new')}</p>
//         <h1 className="font-lora text-[40px] uppercase text-black mt-[-20px] mb-[-20px]">
//           {t('collection')}
//         </h1>
//         <p className="font-kaushan text-[28px] text-black">La fleur</p>
//       </div>

//       {/* === Desktop sirens (sides of carousel) === */}
//       <div className="hidden xl:flex justify-between items-center max-w-[1228px] mx-auto relative z-10">
//         <div className="">
//           <p className="font-normal text-[18px] w-[155px] text-left">
//             {t('subtitle')}
//           </p>
//           <Image
//             src="/Images/decorations/siren_1.svg"
//             alt="Siren"
//             width={188}
//             height={443}
//             className="w-[188px] h-[443px]"
//           />
//         </div>

//         <EmblaCarousel />

//         <div className="">
//           <p className="font-normal text-[18px] w-[210px] text-right">
//             {t('offer')}
//           </p>
//           <Image
//             src="/Images/decorations/siren_2.svg"
//             alt="Siren"
//             width={184}
//             height={253}
//             className="w-[184px] h-[253px]"
//           />
//         </div>
//       </div>

//       {/* === Tablet sirens (below carousel) === */}
//       <div className="hidden md:flex xl:hidden justify-between mt-4 max-w-[768px] mx-auto">
//         <div className="text-left flex flex-col items-start">
//           <Image
//             src="/Images/decorations/siren_1.svg"
//             alt="Siren"
//             width={188}
//             height={443}
//             className="w-[188px] h-[443px]"
//           />
//           <p className="font-normal text-[18px] w-[155px] text-left">
//             {t('subtitle')}
//           </p>
//         </div>

//         <div className="text-right flex flex-col items-end">
//           <Image
//             src="/Images/decorations/siren_2.svg"
//             alt="Siren"
//             width={184}
//             height={253}
//             className="w-[184px] h-[253px]"
//           />
//           <p className="font-normal text-[18px] w-[210px] text-right">
//             {t('offer')}
//           </p>
//         </div>
//       </div>

//       {/* === Mobile version === */}
//       <div className="md:hidden max-w-[320px] mx-auto">
//         <EmblaCarousel />

//         <Link href="/collections">
//           <button className="font-normal text-[24px] leading-[0.83333] uppercase px-[67px] py-[19px] bg-black text-white mt-[46px]">
//             {t('button')}
//           </button>
//         </Link>

//         <div className="flex justify-between mt-4">
//           <div className="text-left flex flex-col justify-start">
//             <Image
//               src="/Images/decorations/siren_1.svg"
//               alt="Siren"
//               width={122}
//               height={340}
//               className="w-[122px] h-[340px]"
//             />
//             <p className="font-normal text-[18px] w-[157px]">{t('subtitle')}</p>
//           </div>

//           <div className="text-right flex flex-col justify-end items-end ml-[-50px]">
//             <Image
//               src="/Images/decorations/siren_2.svg"
//               alt="Siren"
//               width={150}
//               height={203}
//               className="w-[150px] h-[203px]"
//             />
//             <p className="font-normal text-[18px] w-[210px]">{t('offer')}</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useBreakpoint } from '@/hooks/useBreakpoints';
import HeroDesktop from './HeroDesktop';
import HeroTablet from './HeroTablet';
import HeroMobile from './HeroMobile';

const Hero: React.FC = () => {
  const t = useTranslations('Hero');
  const breakpoint = useBreakpoint();

  if (!breakpoint) return null; // пока не знаем ширину — ничего не рендерим

  return (
    <>
      {breakpoint === 'mobile' && <HeroMobile />}
      {breakpoint === 'tablet' && <HeroTablet />}
      {breakpoint === 'desktop' && <HeroDesktop />}
    </>
  );
};

export default Hero;
