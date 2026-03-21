'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartItems, useCartSubtotal, useCart } from '@/stores/cart';
import { createOrder } from '@/lib/orders/createOrder';
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
  const [agree, setAgree] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const placeOrder = async () => {
    if (isPlacingOrder) return;

    setIsPlacingOrder(true);

    // ✅ ВАЛИДАЦИЯ
    if (!form.name || !form.email || !form.phone) {
      alert('Fill required fields');
      setIsPlacingOrder(false);
      return;
    }

    if (!deliveryCountry || !payment) {
      alert('Select delivery and payment');
      setIsPlacingOrder(false);
      return;
    }

    if (!agree) {
      alert('You must agree with terms');
      setIsPlacingOrder(false);
      return;
    }

    try {
      const orderId = await createOrder({
        customer: form,
        items,
        total: subtotal,
        deliveryMethod: delivery,
        deliveryCountry,
        paymentMethod: payment as 'card' | 'paypal' | 'cod',
      });

      // 📩 EMAIL (оставляем как есть)
      try {
        await fetch('/api/send-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            customer: form,
            items,
            total: subtotal,
            deliveryMethod: delivery,
            paymentMethod: payment,
            deliveryCountry,
          }),
        });
      } catch (e) {
        console.error('Email failed', e);
      }

      // 🔥 ЛОГИКА ОПЛАТЫ

      // 1. НАЛОЖКА → сразу success
      if (payment === 'cod') {
        clearCart();
        localStorage.removeItem('siren-cart');

        router.push(`/${locale}/checkout/success?order=${orderId}`);
        return;
      }

      // 2. CARD → (пока имитация)
      if (payment === 'card') {
        // тут позже будет WayForPay

        // пока просто редирект как будто успешно
        clearCart();
        localStorage.removeItem('siren-cart');

        router.push(`/${locale}/checkout/success?order=${orderId}`);
        return;
      }

      // 3. PAYPAL → редирект
      if (payment === 'paypal') {
        // 🔥 ВРЕМЕННО:
        // потом будет реальный PayPal redirect

        window.location.href = `/${locale}/checkout/success?order=${orderId}`;
        return;
      }
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

          {/* DELIVERY */}

          <h2 className="uppercase text-xl">{t('delivery')}</h2>

          {/* UA */}

          <label className="flex gap-2">
            <input
              type="radio"
              checked={deliveryCountry === 'ua'}
              onChange={() => {
                setDeliveryCountry('ua');
                setDelivery('nova'); // default
                setPayment('');
              }}
            />
            {t('ua')}
          </label>

          {deliveryCountry === 'ua' && (
            <div className="pl-6 flex flex-col gap-4">
              <p className="text-sm text-gray-500">
                Доставка здійснюється Новою Поштою.
              </p>

              <input
                className="border p-4"
                placeholder="Поштовий індекс"
                value={form.postalCode}
                onChange={(e) => update('postalCode', e.target.value)}
              />
            </div>
          )}

          {/* WORLD */}

          <label className="flex gap-2 mt-4">
            <input
              type="radio"
              checked={deliveryCountry === 'world'}
              onChange={() => {
                setDeliveryCountry('world');
                setDelivery('intl');
                setPayment('');
              }}
            />
            {t('world')}
          </label>

          {deliveryCountry === 'world' && (
            <div className="pl-6 flex flex-col gap-4">
              <p className="text-sm text-gray-500">Please enter ZIP code</p>

              <input
                className="border p-4"
                placeholder="ZIP code"
                value={form.postalCode}
                onChange={(e) => update('postalCode', e.target.value)}
              />
            </div>
          )}

          {/* PAYMENT */}

          {deliveryCountry && (
            <>
              <h2 className="uppercase text-xl mt-6">Payment</h2>

              {/* CARD */}

              <label className="flex gap-2">
                <input
                  type="radio"
                  checked={payment === 'card'}
                  onChange={() => setPayment('card')}
                />
                {t('card')}
              </label>

              {payment === 'card' && (
                <div className="pl-6 flex flex-col gap-4">
                  <input className="border p-4" placeholder="Номер карти" />
                  <input className="border p-4" placeholder="MM/YY" />
                  <input className="border p-4" placeholder="CVV" />
                </div>
              )}

              {/* COD (UA ONLY) */}

              {deliveryCountry === 'ua' && (
                <label className="flex gap-2 mt-2">
                  <input
                    type="radio"
                    checked={payment === 'cod'}
                    onChange={() => setPayment('cod')}
                  />
                  {t('cod')} (тільки Україна)
                </label>
              )}

              {/* PAYPAL */}

              <label className="flex gap-2 mt-2">
                <input
                  type="radio"
                  checked={payment === 'paypal'}
                  onChange={() => setPayment('paypal')}
                />
                PayPal
              </label>

              {payment === 'paypal' && (
                <p className="pl-6 text-sm text-gray-500">
                  Після оформлення вас буде перенаправлено на PayPal
                </p>
              )}
            </>
          )}

          {/* ✅ AGREEMENT */}

          <label className="flex gap-2 mt-4">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            I agree with terms
          </label>
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
            disabled={!deliveryCountry || !payment || !agree || isPlacingOrder}
            className="w-full mt-6 py-4 bg-black text-white uppercase disabled:opacity-40"
          >
            {isPlacingOrder ? 'Processing...' : t('placeOrder')}
          </button>
        </div>
      </div>
    </main>
  );
}
