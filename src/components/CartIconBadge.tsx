'use client';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useCartCount } from '@/stores/cart';
import Icon from './Icon';

export default function CartIconBadge() {
  const locale = useLocale();
  const count = useCartCount();
  return (
    <Link href={`/${locale}/cart`} aria-label="Кошик" className="relative">
      <Icon name="basket" alt="Basket" width={24} height={24} />

      {count > 0 && (
        <span
          className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full
                         bg-red-600 text-white text-xs flex items-center justify-center"
        >
          {count}
        </span>
      )}
    </Link>
  );
}
