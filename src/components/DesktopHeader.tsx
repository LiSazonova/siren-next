'use client';

import React, { useState, useEffect, useRef } from 'react';
// import styles from './Header.module.css';
// import Logo from '../Logo/Logo';
// import DesktopMenu from '../DesktopMenu/Desktop';
// import SearchBar from '../SearchBar/SearchBar';
// import DesktopIcons from '../DesktopIcons/DesktopIcons';
// import Icons from '../Icons/Icons';
// import MobileMenu from '../MobileMenu/MobileMenu';
// import { useAuth } from '@/context/AuthContext';
// import { useRouter } from 'next/navigation';
// import { useCart } from '@/context/CartContext';
import Link from 'next/link';

const Header: React.FC = () => {
  // const { user, logout } = useAuth();
  // const { cartItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAuthOptions, setShowAuthOptions] = useState(false);
  // const router = useRouter();
  const authOptionsRef = useRef<HTMLDivElement>(null);

  const handleSearchOpen = () => setIsSearchOpen(true);
  const handleSearchClose = () => setIsSearchOpen(false);
  const toggleAuthOptions = () => setShowAuthOptions(!showAuthOptions);

  // const handleLogout = () => {
  //   logout();
  //   setShowAuthOptions(false);
  //   router.push('/');
  // };

  // const handleCartClick = () => {
  //   router.push('/cart');
  // };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        authOptionsRef.current &&
        !authOptionsRef.current.contains(event.target as Node)
      ) {
        setShowAuthOptions(false);
      }
    };
    if (showAuthOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAuthOptions]);

  return (
    <header className="">
      <div className="">
        {/* Desktop версия */}
        <div className="">
          {/* <Logo />
          <DesktopMenu />
          <SearchBar isDesktop={true} />
          <DesktopIcons
            onUserClick={toggleAuthOptions}
            onCartClick={handleCartClick}
            cartItems={cartItems.length}
          /> */}
          {showAuthOptions && (
            <div className="" ref={authOptionsRef}>
              {/* {user ? (
                <>
                  <p>Привіт, {user.username}!</p>
                  <button onClick={handleLogout}>ВИЙТИ</button>
                </>
              ) : (
                <>
                  <Link href="/auth/login">ВХІД</Link>
                  <Link href="/auth/register">РЕЄСТРАЦІЯ</Link>
                </>
              )} */}
            </div>
          )}
        </div>

        {/* Mobile версия */}
        <div className="">
          {/* <Logo /> */}
          <div className="">
            {/* <SearchBar
              isDesktop={false}
              isSearchOpen={isSearchOpen}
              onOpen={handleSearchOpen}
              onClose={handleSearchClose}
            />
            {!isSearchOpen && (
              <>
                <Icons
                  onCartClick={handleCartClick}
                  cartCount={cartItems.length}
                />
                <MobileMenu />
              </>
            )} */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
