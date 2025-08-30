'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import Icon from './Icon';
import type { Product } from '@/services/firebase';
import useCart from '@/stores/cart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const locale = useLocale();
  const t = useTranslations('products');
  const addItem = useCart((s) => s.addItem);

  const pickDefaultSize = () => {
    const sizes = Array.isArray(product.sizes) ? product.sizes : [];
    if (sizes.includes('S')) return 'S';
    if (sizes.length > 0) return sizes[0];
    return 'default';
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.slug,
      name: product.name,
      price: product.price,
      size: pickDefaultSize(),
      qty: 1,
      slug: product.slug,
      image: product.imageTitle,
    });
  };

  return (
    <Link
      href={`/${locale}/products/${product.slug}`}
      className="group block cursor-pointer w-[292px] overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <Image
          src={product.imageTitle}
          alt={product.name}
          width={292}
          height={374}
          className="object-cover w-[292px] h-[374px] transition-transform duration-200 group-hover:scale-105"
        />

        <button
          type="button"
          onClick={handleAddToCart}
          aria-label={t('addToCart')}
          className="absolute top-3 right-3 w-8 h-8 bg-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Icon name="basket" width={20} height={20} alt="Корзина" />
        </button>
      </div>

      <div className="flex justify-between mt-4">
        <h2
          title={product.name}
          className="font-inter text-base font-normal leading-[21.78px] text-left max-w-[190px] truncate"
        >
          {product.name}
        </h2>
        <p className="text-[18px] font-normal leading-[21.78px] text-right">
          {product.price} грн
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
