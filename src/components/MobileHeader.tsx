'use client';

import React, { useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import Icon from '@/components/Icon';
import NavigationLinks from './NavigationLinks';
import LocaleSwitcher from './LocalSwitcher';
import Link from 'next/link';

const MobileHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        className="z-50"
      >
        <Icon
          name={isOpen ? 'close' : 'menu'}
          width={24}
          height={24}
          alt={isOpen ? 'Close Menu' : 'Open Menu'}
        />
      </button>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-[126px] right-0 h-full w-screen bg-white shadow-lg transition-transform duration-300 ease-in-out z-30 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <NavigationLinks onClick={() => setIsOpen(false)} />

        <div className="flex flex-row items-center justify-end gap-8 py-8 px-6 text-[18px] border-b border-[#747474] uppercase">
          <Link href="/signin" onClick={() => setIsOpen(false)}>
            Вхід
          </Link>
          <Link href="/signup" onClick={() => setIsOpen(false)}>
            Реєстрація
          </Link>
        </div>

        <LocaleSwitcher />
      </div>
    </div>
  );
};

export default MobileHeader;
