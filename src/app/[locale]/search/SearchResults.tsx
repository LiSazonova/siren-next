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
      const filtered = all.filter((p) => p.name.toLowerCase().includes(lower));

      setResults(filtered);
      setLoading(false);
    };

    search();
  }, [q]);

  return (
    <div className="px-8 py-12">
      <h1 className="text-2xl uppercase mb-2">{t('title')}</h1>
      <p className="text-gray-500 mb-10">"{q}"</p>

      {loading && <p className="text-gray-400">{t('loading')}</p>}

      {!loading && results.length === 0 && (
        <p className="text-gray-400">{t('noResults')}</p>
      )}

      <div className="flex flex-wrap gap-6">
        {results.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}