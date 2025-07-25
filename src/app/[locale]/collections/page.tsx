// src/app/[locale]/collections/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl'; // нужен только для формирования URL с локалью
import { fetchCollections } from '@/services/firebase';

interface Collection {
  title: string;
  image: string;
  slug: string;
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const locale = useLocale(); // только для формирования пути с префиксом локали

  useEffect(() => {
    fetchCollections()
      .then(setCollections)
      .catch((err) => {
        console.error('Ошибка загрузки коллекций:', err);
      });
  }, []);

  return (
    <main>
      <section className="px-6 py-6">
        <div className="max-w-[320px] md:max-w-[768px] xl:max-w-[1228px] mx-auto">
          {/* Заголовок без перевода */}
          <h1 className="text-[40px] md:text-[64px] uppercase font-lora text-center mb-[34px] md:mb-12">
            Collections
          </h1>

          <div className="flex flex-col items-center gap-12 md:flex-row md:flex-wrap md:justify-center md:gap-5 xl:justify-start">
            {collections.map((c) => (
              <div key={c.slug} className="text-left">
                <Link
                  href={`/${locale}/collections/${c.slug}`}
                  className="block group"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.title}
                      width={292}
                      height={374}
                      className="object-cover w-[292px] h-[374px] transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                  <h2 className="mt-4 text-[24px] leading-5 font-inter text-gray-800">
                    {c.title}
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
