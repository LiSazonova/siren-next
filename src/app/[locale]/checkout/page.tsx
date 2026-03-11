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
  });

  const [deliveryCountry, setDeliveryCountry] = useState('');
  const [delivery, setDelivery] = useState('');
  const [payment, setPayment] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const placeOrder = async () => {
    if (isPlacingOrder) return;

    setIsPlacingOrder(true);

    if (!delivery || !payment) {
      alert('Select delivery and payment');
      setIsPlacingOrder(false);
      return;
    }

    try {
      const orderId = await createOrder({
        customer: form,
        items,
        total: subtotal,
        deliveryMethod: delivery,
        paymentMethod: payment,
      });

      try {
        await fetch('/api/send-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId,
            customer: form,
            items,
            total: subtotal,
          }),
        });
      } catch (e) {
        console.error('Email failed', e);
      }

      clearCart();

      localStorage.removeItem('siren-cart');

      router.push(`/${locale}/checkout/success?order=${orderId}`);
    } catch (e) {
      setIsPlacingOrder(false);
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
        {/* LEFT */}

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

          {/* COUNTRY */}

          <h2 className="uppercase text-xl">Delivery country</h2>

          <label className="flex gap-2">
            <input
              type="radio"
              checked={deliveryCountry === 'ua'}
              onChange={() => {
                setDeliveryCountry('ua');
                setDelivery('');
                setPayment('');
              }}
            />
            Ukraine
          </label>

          <label className="flex gap-2">
            <input
              type="radio"
              checked={deliveryCountry === 'world'}
              onChange={() => {
                setDeliveryCountry('world');
                setDelivery('');
                setPayment('');
              }}
            />
            International
          </label>

          {/* DELIVERY UA */}

          {deliveryCountry === 'ua' && (
            <>
              <h2 className="uppercase text-xl">Delivery</h2>

              <label>
                <input
                  type="radio"
                  checked={delivery === 'nova'}
                  onChange={() => setDelivery('nova')}
                />
                Nova Poshta
              </label>

              <label>
                <input
                  type="radio"
                  checked={delivery === 'ukr'}
                  onChange={() => setDelivery('ukr')}
                />
                Ukrposhta
              </label>

              <label>
                <input
                  type="radio"
                  checked={delivery === 'courier'}
                  onChange={() => setDelivery('courier')}
                />
                Courier
              </label>
            </>
          )}

          {/* DELIVERY WORLD */}

          {deliveryCountry === 'world' && (
            <>
              <h2 className="uppercase text-xl">Delivery</h2>

              <label>
                <input
                  type="radio"
                  checked={delivery === 'intl_ukr'}
                  onChange={() => setDelivery('intl_ukr')}
                />
                Ukrposhta International
              </label>

              <label>
                <input
                  type="radio"
                  checked={delivery === 'dhl'}
                  onChange={() => setDelivery('dhl')}
                />
                DHL
              </label>
            </>
          )}

          {/* PAYMENT */}

          {delivery && (
            <>
              <h2 className="uppercase text-xl">Payment</h2>

              <label>
                <input
                  type="radio"
                  checked={payment === 'card'}
                  onChange={() => setPayment('card')}
                />
                Card
              </label>

              {deliveryCountry === 'ua' && (
                <label>
                  <input
                    type="radio"
                    checked={payment === 'cod'}
                    onChange={() => setPayment('cod')}
                  />
                  Cash on delivery
                </label>
              )}

              {deliveryCountry === 'world' && (
                <label>
                  <input
                    type="radio"
                    checked={payment === 'paypal'}
                    onChange={() => setPayment('paypal')}
                  />
                  PayPal
                </label>
              )}
            </>
          )}
        </div>

        {/* RIGHT */}

        <div className="border-l pl-6">
          {items.map((it) => {
            const imageSrc =
              it.image ?? `/images/products/${it.slug}/${it.slug}.jpg`;

            return (
              <div key={it.key} className="flex justify-between py-6 border-b">
                <div>
                  <h3>{it.name}</h3>

                  <Image
                    src={imageSrc}
                    alt={it.name}
                    width={180}
                    height={240}
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
            disabled={!delivery || !payment || isPlacingOrder}
            className="w-full mt-6 py-4 bg-black text-white uppercase disabled:opacity-40"
          >
            {isPlacingOrder ? 'Processing...' : t('placeOrder')}
          </button>
        </div>
      </div>
    </main>
  );
}
