'use client'; // React hooks used

import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '@/services/firebase';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (!products.length) {
    return (
      <p className="text-center text-gray-500 py-12">
        Нет доступных продуктов.
      </p>
    );
  }

  return (
    <main>
      <section className="px-6 py-6">
        <div className="max-w-[320px] md:max-w-[768px] xl:max-w-[1228px] mx-auto">
          <h1 className="hidden"> {/* Чтобы SEO */} </h1>
          <div className="flex flex-col items-center gap-12 md:flex-row md:flex-wrap md:justify-center md:gap-5">
            {products.map((p) => (
              <div key={p.slug} className="text-left w-[292px]">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductList;
