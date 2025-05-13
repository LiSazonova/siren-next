import React, { useState } from 'react';
// import Logo from '@/components/Logo';
// import SearchBar from '@/components/SearchBar';
// import Icons from './MobileIcons';
// import MobileMenu from './MobileMenu';
// import { useCart } from '@/context/CartContext';

const MobileHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  //   const { cartItems } = useCart();

  return (
    <div className="flex items-center justify-between px-4 py-3">
      {/* <Logo /> */}
      <div className="flex items-center space-x-4">
        {/* <SearchBar
          isDesktop={false}
          isSearchOpen={isSearchOpen}
          onOpen={() => setIsSearchOpen(true)}
          onClose={() => setIsSearchOpen(false)}
        /> */}
        {/* {!isSearchOpen && (
          <>
            <Icons cartCount={cartItems.length} />
            <MobileMenu />
          </>
        )} */}
      </div>
      Я мобильное меню
    </div>
  );
};

export default MobileHeader;
