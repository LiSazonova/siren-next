'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useMemo } from 'react'; 

export type CartItem = {
  key: string;         // productId::size
  productId: string;
  name: string;
  price: number;       // грн
  size: string;
  qty: number;
  slug: string;
  image?: string;
};

type CartState = {
  items: Record<string, CartItem>;
  addItem: (item: Omit<CartItem, 'key'>) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

const makeKey = (p: { productId: string; size: string }) =>
  `${p.productId}::${p.size}`;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: {},

      addItem: (item) => {
        const key = makeKey(item);
        set((s) => {
          const exist = s.items[key];
          const nextQty = (exist?.qty ?? 0) + item.qty;
          return { items: { ...s.items, [key]: { ...item, key, qty: nextQty } } };
        });
      },

      removeItem: (key) =>
        set((s) => {
          const copy = { ...s.items };
          delete copy[key];
          return { items: copy };
        }),

      setQty: (key, qty) =>
        set((s) => {
          const it = s.items[key];
          if (!it) return s;
          return { items: { ...s.items, [key]: { ...it, qty: Math.max(1, qty) } } };
        }),

      clear: () => ({ items: {} }),
    }),
    {
      name: 'siren-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useCartItems = () => {
  const itemsObj = useCart((s) => s.items);
  return useMemo(() => Object.values(itemsObj), [itemsObj]);
};

export const useCartCount = () => {
  const itemsObj = useCart((s) => s.items);
  return useMemo(() => Object.values(itemsObj).reduce((n, it) => n + it.qty, 0), [itemsObj]);
};

export const useCartSubtotal = () => {
  const itemsObj = useCart((s) => s.items);
  return useMemo(
    () => Object.values(itemsObj).reduce((sum, it) => sum + it.price * it.qty, 0),
    [itemsObj]
  );
};

export default useCart;
