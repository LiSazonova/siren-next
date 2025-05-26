'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

const CollectionPage = () => {
  const t = useTranslations('Collections');
  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  );
};

export default CollectionPage;
