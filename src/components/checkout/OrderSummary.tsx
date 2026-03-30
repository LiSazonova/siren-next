import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCart } from '@/stores/cart';

export default function OrderSummary({
  items,
  subtotal,
  onSubmit,
  isLoading,
}: any) {
  const t = useTranslations('checkout');

  const removeItem = useCart((s) => s.removeItem);
  const setQty = useCart((s) => s.setQty);

  return (
    <div className="border-l pl-6">
      {items.map((it: any) => (
        <div key={it.key} className="flex justify-between py-6 border-b">
          <div>
            <h3>{it.name}</h3>
            <Image src={it.image} alt={it.name} width={180} height={240} />
          </div>

          <div className="flex flex-col items-end gap-3">
            <button onClick={() => removeItem(it.key)}>✕</button>

            <select
              value={it.qty}
              onChange={(e) => setQty(it.key, Number(e.target.value))}
            >
              {[1, 2, 3].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>

            <p>
              {it.price * it.qty} {t('currency')}
            </p>
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-6 text-xl">
        <span>{t('total')}</span>
        <span>
          {subtotal} {t('currency')}
        </span>
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full mt-6 py-4 bg-black text-white"
      >
        {isLoading ? 'Processing...' : t('placeOrder')}
      </button>
    </div>
  );
}
