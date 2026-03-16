'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart, useCartItems, useCartSubtotal } from '@/stores/cart';
import Icon from '@/components/Icon';
import { useLocale, useTranslations } from 'next-intl';

export default function CartPage() {
  const locale = useLocale();
  const t = useTranslations('cart');

  const items = useCartItems();
  const subtotal = useCartSubtotal();

  const addItem = useCart((s) => s.addItem);
  const removeItem = useCart((s) => s.removeItem);
  const setQty = useCart((s) => s.setQty);

  const handleSizeChange = (it: any, newSize: string) => {
    if (!newSize || newSize === it.size) return;
    addItem({
      productId: it.productId,
      name: it.name,
      price: it.price,
      size: newSize,
      qty: it.qty,
      slug: it.slug,
      image: it.image,
    });
    removeItem(it.key);
  };

  if (items.length === 0) {
    return (
      <main className="max-w-[1280px] mx-auto px-4 py-20 text-center">
        <h1 className="font-lora text-[48px] md:text-[64px] uppercase mb-6">
          {t('emptyTitle')}
        </h1>
        <Link href={`/${locale}/collections`}>
          <button className="inline-block w-[220px] border border-black py-3 text-[18px] uppercase">
            {t('toCollections')}
          </button>
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-[1280px] mx-auto px-4 pt-6 pb-16">
      {/* HEADER tablet/desktop */}
      <div className="hidden md:grid grid-cols-[1fr_100px_120px_100px] items-center gap-4 border-b border-[#747474] pb-4 uppercase text-[13px] tracking-wide text-neutral-500">
        <div className="text-[18px]  text-black">{t('headers.name')}</div>
        <div className="text-center text-[18px]  text-black">
          {t('headers.size')}
        </div>
        <div className="text-center text-[18px] text-black">
          {t('headers.qty')}
        </div>
        <div className="text-right pr-8 text-[18px] text-black">
          {t('headers.price')}
        </div>
      </div>

      {/* HEADER mobile */}
      <div className="md:hidden">
        <div className="flex items-start justify-between text-[18px]">
          <div className="uppercase font-inter">{t('headers.name')}</div>
          <ul className="text-right uppercase font-inter">
            <li>{t('headers.size')}</li>
            <li>{t('headers.qty')}</li>
            <li>{t('headers.price')}</li>
          </ul>
        </div>
        <hr className="mt-1 border-[#747474]" />
      </div>

      <ul className="divide-y divide-[#747474]">
        {items.map((it) => {
          const sizeOptions: string[] = (it as any).availableSizes ?? [
            'S',
            'M',
            'L',
            'XL',
          ];

          return (
            <li
              key={it.key}
              className="relative grid gap-4 items-start pt-4 md:pt-12 not-last:pb-4 not-last:border-b not-last:border-[#747474] md:grid-cols-[1fr_100px_120px_100px]"
            >
              {/* Крестик удаления: всегда в правом верхнем углу */}
              <button
                className="absolute right-0 top-4 text-black/50 hover:text-black z-10"
                onClick={() => removeItem(it.key)}
                aria-label={t('remove')}
                title={t('remove')}
              >
                <Icon name="close" alt="Close" width={28} height={28} />
              </button>

              {/* COL 1: превью + название */}
              <div className="flex flex-col gap-3">
                <h5 className="text-[18px]">{it.name}</h5>
                <div className="flex justify-between gap-12">
                  <Image
                    src={
                      it.image ?? `/images/products/${it.slug}/${it.slug}.jpg`
                    }
                    alt={it.name}
                    width={188}
                    height={240}
                    className="w-[188px] h-[240px] md:w-[188px] md:h-[240px] object-cover"
                  />

                  {/* MOBILE правый столбец */}
                  <div className="flex flex-col items-end gap-4 md:hidden">
                    {/* SIZE select */}
                    <div className="relative inline-block">
                      <select
                        value={it.size}
                        onChange={(e) => handleSizeChange(it, e.target.value)}
                        className="w-[84px] h-[31px] border border-black px-1 pr-10 text-[28px] text-center uppercase appearance-none focus:outline-none leading-[1]"
                        aria-label={t('headers.size')}
                      >
                        {sizeOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <Icon
                          name="scroll"
                          alt="scroll"
                          width={16}
                          height={16}
                          className="block"
                        />
                      </div>
                    </div>

                    {/* QTY select */}
                    <div className="relative inline-block">
                      <select
                        value={it.qty}
                        onChange={(e) =>
                          setQty(it.key, Math.max(1, Number(e.target.value)))
                        }
                        className="w-[84px] h-[31px] border border-black px-1 pr-10 text-[28px] text-center uppercase appearance-none focus:outline-none leading-[1]"
                        aria-label={t('headers.qty')}
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                          (n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          )
                        )}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <Icon
                          name="scroll"
                          alt="scroll"
                          width={16}
                          height={16}
                          className="block"
                        />
                      </div>
                    </div>

                    {/* PRICE mobile */}
                    <p className="text-[18px] font-normal">
                      {it.price * it.qty} {t('currency')}
                    </p>
                  </div>
                </div>
              </div>

              {/* COL 2: SIZE (tablet/desktop) */}
              <div className="hidden md:flex justify-center items-start pt-14">
                <div className="relative w-[84px]">
                  <select
                    value={it.size}
                    onChange={(e) => handleSizeChange(it, e.target.value)}
                    className="w-[84px] h-[31px] border border-black px-1 pr-10 text-[28px] text-center uppercase appearance-none focus:outline-none leading-[1]"
                    aria-label={t('headers.size')}
                  >
                    {sizeOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <Icon
                      name="scroll"
                      alt="scroll"
                      width={14}
                      height={14}
                      className="block"
                    />
                  </div>
                </div>
              </div>

              {/* COL 3: QTY (tablet/desktop) */}
              <div className="hidden md:flex justify-center items-start pt-14">
                <div className="relative w-[80px]">
                  <select
                    value={it.qty}
                    onChange={(e) =>
                      setQty(it.key, Math.max(1, Number(e.target.value)))
                    }
                    className="w-[84px] h-[31px] border border-black px-1 pr-10 text-[28px] text-center uppercase appearance-none focus:outline-none leading-[1]"
                    aria-label={t('headers.qty')}
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <Icon
                      name="scroll"
                      alt="scroll"
                      width={14}
                      height={14}
                      className="block"
                    />
                  </div>
                </div>
              </div>

              {/* COL 4: PRICE (tablet/desktop) */}
              <div className="hidden md:flex pt-14 pr-10 md:pr-0 text-[18px]">
                {it.price * it.qty} {t('currency')}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Итоги */}
      <div className="mt-12 pt-6 border-t border-[#747474] flex flex-col lg:flex-row items-center md:items-start lg:items-center justify-between  gap-6">
        <div className="w-full flex flex-col md:flex-row gap-4 lg:w-auto uppercase text-[24px] md:text-[28px]">
          <p>{t('total')}:</p>
          <p>
            {subtotal} {t('currency')}
          </p>
        </div>
        <Link
          href={`/${locale}/checkout`}
          className="w-full md:w-auto inline-flex items-center justify-center px-6 md:px-10 py-4 bg-black text-white uppercase text-[28px]"
        >
          {t('checkout')}
        </Link>
      </div>
    </main>
  );
}
