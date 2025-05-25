import LocaleSwitcher from '../LocalSwitcher';
import Logo from '../Logo';
import NavigationLinks from '../NavigationLinks';
import SearchBar from '../SearchBar';
import DesktopIcons from './DesktopIcons';

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
