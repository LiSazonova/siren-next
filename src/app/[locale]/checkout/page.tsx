'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartItems, useCartSubtotal, useCart } from '@/stores/cart';
import { createOrder } from '@/lib/orders/createOrder';
import { useLocale, useTranslations } from 'next-intl';

import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const router = useRouter();

  const items = useCartItems();
  const subtotal = useCartSubtotal();
  const clearCart = useCart((s) => s.clear);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    postalCode: '',
  });

  const [deliveryCountry, setDeliveryCountry] = useState<'ua' | 'world' | ''>(
    '',
  );
  const [delivery, setDelivery] = useState('');
  const [payment, setPayment] = useState<'card' | 'paypal' | 'cod' | ''>('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ ВАЛИДАЦИЯ
  const isFormValid =
    form.name &&
    form.email &&
    form.phone &&
    form.country &&
    form.address &&
    deliveryCountry &&
    payment &&
    (deliveryCountry === 'ua' ? form.postalCode : true);

  // 🚀 SUBMIT
  const placeOrder = async () => {
    if (isPlacingOrder || !isFormValid) return;

    setIsPlacingOrder(true);

    try {
      const orderId = await createOrder({
        customer: form,
        items,
        total: subtotal,
        deliveryMethod: delivery,
        deliveryCountry,
        paymentMethod: payment,
      });

      // 🚚 COD
      if (payment === 'cod') {
        clearCart();
        router.push(`/${locale}/checkout/success?order=${orderId}`);
        return;
      }

      // 🌍 PAYPAL
      if (payment === 'paypal') {
        clearCart();
        router.push(`/${locale}/checkout/success?order=${orderId}`);
        return;
      }

      // 💳 WAYFORPAY
      if (payment === 'card') {
        const formEl = document.createElement('form');
        formEl.method = 'POST';
        formEl.action = 'https://secure.wayforpay.com/pay';

        const data = {
          merchantAccount: process.env.NEXT_PUBLIC_WAYFORPAY_MERCHANT!,
          merchantDomainName: window.location.hostname,
          orderReference: String(orderId),
          orderDate: Math.floor(Date.now() / 1000),
          amount: String(subtotal),
          currency: 'UAH',
          productName: items.map((i) => i.name),
          productCount: items.map(() => '1'),
          productPrice: items.map((i) => String(i.price)),
          returnUrl: `${window.location.origin}/${locale}/checkout/success?order=${orderId}`,
          serviceUrl: `${window.location.origin}/api/payment-callback`,
        };

        Object.entries(data).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => {
              const input = document.createElement('input');
              input.name = `${key}[]`;
              input.value = v;
              formEl.appendChild(input);
            });
          } else {
            const input = document.createElement('input');
            input.name = key;
            input.value = value as string;
            formEl.appendChild(input);
          }
        });

        document.body.appendChild(formEl);
        formEl.submit();
        return;
      }
    } catch (error) {
      console.error(error);
      router.push(`/${locale}/checkout/error`);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <main className="max-w-[1200px] mx-auto px-4 pb-16">
      <h1 className="text-center text-[28px] uppercase mb-8">{t('title')}</h1>

      <div className="grid lg:grid-cols-[1fr_460px] gap-12">
        <CheckoutForm
          form={form}
          update={update}
          deliveryCountry={deliveryCountry}
          setDeliveryCountry={setDeliveryCountry}
          setDelivery={setDelivery}
          payment={payment}
          setPayment={setPayment}
        />

        <OrderSummary
          items={items}
          subtotal={subtotal}
          onSubmit={placeOrder}
          isLoading={isPlacingOrder}
          isDisabled={!isFormValid}
        />
      </div>
    </main>
  );
}
