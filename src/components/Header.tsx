'use client';

import React, { useState, useEffect, useRef } from 'react';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

const Header: React.FC = () => {
  return (
    <header className="">
      {/* Десктопная версия: отображается на экранах ≥ 1024px */}
      {/* <div className="hidden lg:block bg-red-100">
        <DesktopHeader />
      </div> */}
      <div className="block lg:hidden">
        <MobileHeader />
      </div>
    </header>
  );
};

export default Header;
