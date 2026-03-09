'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartItems, useCartSubtotal, useCart } from '@/stores/cart';
import { createOrder } from '@/services/orders';
import { useLocale, useTranslations } from 'next-intl';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const router = useRouter();

  const items = useCartItems();
  const subtotal = useCartSubtotal();

  const clearCart = useCart((s) => s.clear);
  const removeItem = useCart((s) => s.removeItem);
  const setQty = useCart((s) => s.setQty);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    postalCode: '',
    delivery: '',
    payment: '',
  });

  const update = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const placeOrder = async () => {
    if (!form.payment || !form.delivery) {
      alert('Please select delivery and payment method');
      return;
    }

    try {
      const orderId = await createOrder({
        customer: form,
        items,
        total: subtotal,
        paymentMethod: form.payment,
        deliveryMethod: form.delivery,
      });

      clearCart();

      router.push(`/${locale}/checkout/success?order=${orderId}`);
    } catch (error) {
      console.error(error);

      router.push(`/${locale}/checkout/error`);
    }
  };

  if (!items.length) {
    return (
      <main className="max-w-6xl mx-auto py-20 text-center text-xl">
        Cart empty
      </main>
    );
  }

  return (
    <main className="max-w-[1200px] mx-auto px-4 pb-16">
      <h1 className="text-center text-[28px] uppercase mb-8">{t('title')}</h1>

      <div className="grid lg:grid-cols-[1fr_460px] gap-12">
        {/* LEFT FORM */}

        <div className="flex flex-col gap-6">
          <input
            className="border p-4"
            placeholder={t('placeholders.name')}
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
          />

          <input
            className="border p-4"
            placeholder={t('placeholders.email')}
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
          />

          <input
            className="border p-4"
            placeholder={t('placeholders.phone')}
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
          />

          <input
            className="border p-4"
            placeholder={t('placeholders.country')}
            value={form.country}
            onChange={(e) => update('country', e.target.value)}
          />

          <input
            className="border p-4"
            placeholder={t('placeholders.address')}
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
          />

          <input
            className="border p-4"
            placeholder={t('placeholders.postalCode')}
            value={form.postalCode}
            onChange={(e) => update('postalCode', e.target.value)}
          />

          {/* DELIVERY */}

          <h2 className="uppercase text-xl">{t('delivery.title')}</h2>

          <label className="flex gap-2">
            <input
              type="radio"
              checked={form.delivery === 'ukraine'}
              onChange={() => update('delivery', 'ukraine')}
            />
            {t('delivery.ukraine')}
          </label>

          <label className="flex gap-2">
            <input
              type="radio"
              checked={form.delivery === 'world'}
              onChange={() => update('delivery', 'world')}
            />
            {t('delivery.world')}
          </label>

          {/* PAYMENT */}

          <h2 className="uppercase text-xl">{t('payment.title')}</h2>

          <label className="flex gap-2">
            <input
              type="radio"
              checked={form.payment === 'card'}
              onChange={() => update('payment', 'card')}
            />
            {t('payment.card')}
          </label>

          <label className="flex gap-2">
            <input
              type="radio"
              checked={form.payment === 'cod'}
              onChange={() => update('payment', 'cod')}
            />
            {t('payment.cod')}
          </label>

          <label className="flex gap-2">
            <input
              type="radio"
              checked={form.payment === 'paypal'}
              onChange={() => update('payment', 'paypal')}
            />
            PayPal
          </label>
        </div>

        {/* RIGHT SUMMARY */}

        <div className="border-l pl-6">
          {items.map((it) => {
            const imageSrc =
              it.image ?? `/images/products/${it.slug}/${it.slug}.jpg`;

            return (
              <div key={it.key} className="flex justify-between py-6 border-b">
                <div>
                  <h3 className="text-[18px]">{it.name}</h3>

                  <Image
                    src={imageSrc}
                    alt={it.name}
                    width={188}
                    height={240}
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col items-end gap-3">
                  <button onClick={() => removeItem(it.key)}>✕</button>

                  <select
                    value={it.qty}
                    onChange={(e) => setQty(it.key, Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>

                  <p>
                    {it.price * it.qty} {t('currency')}
                  </p>
                </div>
              </div>
            );
          })}

          <div className="flex justify-between mt-6 text-xl uppercase">
            <span>{t('total')}</span>

            <span>
              {subtotal} {t('currency')}
            </span>
          </div>

          <button
            onClick={placeOrder}
            className="w-full mt-6 py-4 bg-black text-white uppercase"
          >
            {t('placeOrder')}
          </button>
        </div>
      </div>
    </main>
  );
}
