'use client';
import React from 'react';
import DesktopHeader from '@/components/DesktopHeader';
import MobileHeader from '@/components/MobileHeader';

const Header = () => {
  return (
    <header className="shadow-md border-b border-gray-200">
      <div className="">
        <DesktopHeader />
      </div>
      <div className="hidden">
        <MobileHeader />
      </div>
    </header>
  );
};

export default Header;
