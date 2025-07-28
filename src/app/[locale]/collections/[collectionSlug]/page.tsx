// // src/app/[locale]/collections/[collectionSlug]/page.tsx
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useTranslations, useLocale } from 'next-intl';
// import { useParams, useRouter, notFound } from 'next/navigation';
// import ProductList from '@/components/ProductList';
// import { fetchProductsByCollection, type Product } from '@/services/firebase';

// export default function CollectionPageClient() {
//   const { collectionSlug } = useParams() as { collectionSlug: string };
//   const locale = useLocale();
//   const t = useTranslations('Collections');
//   const router = useRouter();

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string>();

//   useEffect(() => {
//     fetchProductsByCollection(collectionSlug)
//       .then((data) => {
//         if (!data.length) {
//           // если пусто — перенаправим на 404
//           router.push(`/${locale}/not-found`);
//           return;
//         }
//         setProducts(data);
//       })
//       .catch((e) => {
//         console.error(e);
//         setError(t('error') || 'Error loading');
//       })
//       .finally(() => setLoading(false));
//   }, [collectionSlug, locale, router, t]);

//   if (loading) return <p className="text-center py-12">{t('loading')}</p>;
//   if (error) return <p className="text-center py-12 text-red-500">{error}</p>;

//   const titleMap: Record<string, string> = {
//     moon_crystal: 'Moon Crystal',
//     christmas_song: 'Christmas Song',
//     sleeping_beauty: 'Sleeping Beauty',
//     la_fleur: 'La Fleur',
//   };
//   const title = titleMap[collectionSlug] ?? t('defaultTitle');

//   return (
//     <main className="px-6 py-12">
//       <h1 className="text-[40px] md:text-[64px] uppercase font-lora text-center mb-10">
//         {title}
//       </h1>
//       <ProductList products={products} />
//     </main>
//   );
// }

// app/[locale]/collections/[collectionSlug]/page.tsx
import { fetchProductsByCollection } from '@/services/firebase';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductList from '@/components/ProductList';

const titleMap: Record<string, string> = {
  moon_crystal: 'Moon Crystal',
  christmas_song: 'Christmas Song',
  sleeping_beauty: 'Sleeping Beauty',
  la_fleur: 'La Fleur',
};

interface Props {
  params: {
    locale: string;
    collectionSlug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = titleMap[params.collectionSlug] ?? 'Collection';
  return {
    title: `${title} | Siren`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { locale, collectionSlug } = params;

  const products = await fetchProductsByCollection(collectionSlug);

  // если нет товаров — 404
  if (!products || products.length === 0) {
    notFound();
  }

  // Название коллекции из titleMap
  const pageTitle = titleMap[collectionSlug] ?? 'Collection';

  return (
    <main className="px-6 py-12">
      <h1 className="text-[40px] md:text-[64px] uppercase font-lora text-center mb-10">
        {pageTitle}
      </h1>
      <ProductList products={products} />
    </main>
  );
}
