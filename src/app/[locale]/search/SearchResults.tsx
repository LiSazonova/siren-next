'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Product } from '@/lib/firebase/products';
import ProductCard from '@/components/ProductCard';
import { useTranslations } from 'next-intl';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const t = useTranslations('Search');

  useEffect(() => {
    if (!q.trim()) return;

    const search = async () => {
      setLoading(true);
      const snapshot = await getDocs(collection(db, 'products'));
      const all = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          slug: data.slug,
          name: data.name,
          price: data.price,
          description: data.description,
          sizes: data.sizes,
          images: data.images,
          imageTitle: data.imageTitle || '',
        } as Product;
      });

      const lower = q.toLowerCase();
      const filtered = all.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(lower);
        const descEn = p.description?.en?.toLowerCase().includes(lower);
        const descUa = p.description?.ua?.toLowerCase().includes(lower);
        return nameMatch || descEn || descUa;
      });

      setResults(filtered);
      setLoading(false);
    };

    search();
  }, [q]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-400">{t('loading')}</p>
      </div>
    );
  }

  if (!q.trim()) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8">
        <h1 className="text-4xl font-light mb-4">{t('title')}</h1>
        <p className="text-gray-400">{t('enterQuery')}</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8">
        <h1 className="text-6xl font-light mb-8 tracking-wider uppercase">
          {t('notFound')}
        </h1>
        <p className="text-xl text-gray-500 mb-2">{t('searchedFor')}</p>
        <p className="text-2xl font-medium mb-8">"{q}"</p>
        <p className="text-gray-400 max-w-md text-center">
          {t('tryDifferent')}
        </p>
      </div>
    );
  }

  return (
    <div className="px-8 py-12 min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-light mb-4 uppercase tracking-wide">
          {t('resultsFor')}
        </h1>
        <p className="text-xl text-gray-600">"{q}"</p>
        <p className="text-sm text-gray-400 mt-2">
          {results.length} {results.length === 1 ? t('result') : t('results')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
