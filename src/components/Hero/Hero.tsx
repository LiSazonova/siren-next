'use client';

import React from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoints';
import HeroDesktop from './HeroDesktop';
import HeroTablet from './HeroTablet';
import HeroMobile from './HeroMobile';

const Hero: React.FC = () => {
  const breakpoint = useBreakpoint();

  if (!breakpoint) return null;

  return (
    <>
      {breakpoint === 'mobile' && <HeroMobile />}
      {breakpoint === 'tablet' && <HeroTablet />}
      {breakpoint === 'desktop' && <HeroDesktop />}
    </>
  );
};

export default Hero;
