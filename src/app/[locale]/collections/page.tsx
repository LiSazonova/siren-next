'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchCollections } from '../../../services/firebase';
import { useTranslations } from 'next-intl';

interface Collection {
  title: string;
  image: string;
  slug: string;
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const t = useTranslations('Collections');

  useEffect(() => {
    fetchCollections().then(setCollections).catch(console.error);
  }, []);

  return (
    <main>
      <section className="px-6 py-6">
        <div className="max-w-[320px] md:max-w-[768px] xl:max-w-[1228px] mx-auto">
          <h1 className="text-[40px] uppercase font-lora text-center mb-[34px] md:mb-12">
            {t('title')}
          </h1>
          <div className="flex flex-col items-center gap-12 md:flex-row md:flex-wrap md:justify-center md:gap-5 xl:justify-start">
            {collections.map((collection) => (
              <div key={collection.slug} className="text-left">
                <Link href={`/collections/${collection.slug}`}>
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    width={292}
                    height={374}
                    className="object-cover w-[292px] h-[374px]"
                  />
                  <h2 className="mt-4 text-[24px] leading-5 font-normal font-inter">
                    {collection.title}
                  </h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
