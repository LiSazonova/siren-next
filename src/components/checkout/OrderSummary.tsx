'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCart } from '@/stores/cart';

export default function OrderSummary({
  items,
  subtotal,
  onSubmit,
  isLoading,
  isDisabled,
}: any) {
  const t = useTranslations('checkout');

  const removeItem = useCart((s) => s.removeItem);
  const setQty = useCart((s) => s.setQty);

  return (
    <div className="border-l pl-6 flex flex-col gap-6">
      {items.map((it: any) => (
        <div key={it.key} className="flex justify-between py-6 border-b gap-4">
          {/* LEFT */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg">{it.name}</h3>

            <Image
              src={it.image}
              alt={it.name}
              width={180}
              height={240}
              className="object-cover"
            />
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-end gap-3">
            <button
              onClick={() => removeItem(it.key)}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <select
              value={it.qty}
              onChange={(e) => setQty(it.key, Number(e.target.value))}
              className="border p-2"
            >
              {[1, 2, 3].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>

            <p className="text-lg">
              {it.price * it.qty} {t('currency')}
            </p>
          </div>
        </div>
      ))}

      {/* TOTAL */}
      <div className="flex justify-between text-xl mt-4">
        <span>{t('total')}</span>
        <span>
          {subtotal} {t('currency')}
        </span>
      </div>

      {/* BUTTON */}
      <button
        onClick={onSubmit}
        disabled={isDisabled || isLoading}
        className={`w-full p-4 text-lg transition ${
          isDisabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-black text-white hover:opacity-90'
        }`}
      >
        {isLoading ? t('processing') : t('placeOrder')}
      </button>
    </div>
  );
}
