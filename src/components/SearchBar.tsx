'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Icon from './Icon';

const SearchBar = ({ onClose }: { onClose?: () => void }) => {
  const t = useTranslations('Search');
  const locale = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    router.push(`/${locale}/not-found`);
    setQuery('');
    if (onClose) onClose();
  };

  return (
    <div className="flex items-center border border-gray px-[18px] py-[17px] w-[220px] md:w-[587px] lg:w-[396px] h-[58px]">
      <input
        type="text"
        placeholder={t('placeholder')}
        className="flex-grow outline-none text-base placeholder-gray"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Icon
        name="search_grey"
        alt="Search"
        width={25}
        height={24}
        className="ml-2"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;

// очистка строки поиска после нажатия на иконку поиска
// поиск по всему сайту по имени платья или коллекции
