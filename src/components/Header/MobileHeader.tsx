'use client';

import React, { useState, useRef, useEffect } from 'react';
import Icon from '@/components/Icon';
import MobileIcons from './MobileIcons';
import Logo from '../Logo';
import NavigationLinks from '../NavigationLinks';
import AuthLinks from '../AuthLinks';
import LocaleSwitcher from '../LocalSwitcher';

const MobileHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = (event: React.MouseEvent): void => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between px-5 py-6 relative z-40">
      <Logo />
      {!isOpen && (
        <MobileIcons
          isSearchOpen={isSearchOpen}
          toggleSearch={() => setIsSearchOpen((prev) => !prev)}
        />
      )}
      {!isSearchOpen && (
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          className="z-50 ml-8"
        >
          <Icon
            name={isOpen ? 'close' : 'menu'}
            width={24}
            height={24}
            alt={isOpen ? 'Close Menu' : 'Open Menu'}
          />
        </button>
      )}

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-[126px] right-0 h-full w-screen bg-white shadow-lg transition-transform duration-300 ease-in-out z-30 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <NavigationLinks onClick={() => setIsOpen(false)} variant="mobile" />
        <AuthLinks onClick={() => setIsOpen(false)} />
        <LocaleSwitcher />
      </div>
    </div>
  );
};

export default MobileHeader;
