import { useTranslations } from 'next-intl';
import React from 'react';

const NotFound = () => {
  const t = useTranslations('Search');
  return (
    <div>
      <h1>{t('noResults')}</h1>
    </div>
  );
};

export default NotFound;
