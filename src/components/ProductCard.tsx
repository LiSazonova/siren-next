'use client';

import React from 'react';
import Image from 'next/image';
import Icon from './Icon';
import { toast } from 'react-toastify';
import type { Product } from '@/services/firebase';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toast.success('Товар добавлен в корзину!');
  };

  const handleNavigateToProduct = () => {
    window.location.href = `/products/${product.slug}`;
  };

  return (
    <div
      className="group cursor-pointer w-[292px] overflow-hidden"
      onClick={handleNavigateToProduct}
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
          onClick={handleAddToCart}
          className="absolute top-3 right-3 w-8 h-8 bg-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Icon name="basket" width={20} height={20} alt="Корзина" />
        </button>
      </div>
      <div className="flex justify-between mt-4">
        <h2 className="font-inter text-base font-normal leading-[21.78px] text-left max-w-[190px] truncate">
          {product.name}
        </h2>
        <p className="text-[18px] font-normal leading-[21.78px] text-right">
          {product.price} грн
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
