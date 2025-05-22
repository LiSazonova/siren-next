import React from 'react';
import Logo from './Logo';
import LocaleSwitcher from './LocalSwitcher';
import SearchBar from './SearchBar';
import DesktopIcons from './DesktopIcons';
import NavigationLinks from './NavigationLinks';

const DesktopHeader = () => {
  return (
    <div className="flex items-center justify-between px-8 py-4">
      <Logo />
      <NavigationLinks variant="desktop" />
      <LocaleSwitcher />
      <SearchBar />
      <DesktopIcons />
    </div>
  );
};

export default DesktopHeader;
