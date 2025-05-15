import React from 'react';
import Logo from './Logo';

const DesktopHeader = () => {
  return (
    <div className="flex items-center justify-between px-8 py-4">
      <Logo />
      {/* Добавь здесь DesktopMenu, SearchBar, DesktopIcons и другие компоненты */}
      <h2>десктопная версия</h2>
    </div>
  );
};

export default DesktopHeader;
