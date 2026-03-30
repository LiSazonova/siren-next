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
  const [agree, setAgree] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const placeOrder = async () => {
    if (isPlacingOrder) return;

    setIsPlacingOrder(true);

    if (!form.name || !form.email || !form.phone) {
      alert('Fill required fields');
      setIsPlacingOrder(false);
      return;
    }

    if (!deliveryCountry || !payment || !form.postalCode) {
      alert('Fill delivery & payment');
      setIsPlacingOrder(false);
      return;
    }

    if (!agree) {
      alert('Agree with terms');
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
        paymentMethod: payment,
      });

      if (payment === 'cod') {
        clearCart();
        router.push(`/${locale}/checkout/success?order=${orderId}`);
        return;
      }

      // 🔥 позже сюда WayForPay
      router.push(`/${locale}/checkout/success?order=${orderId}`);
    } catch {
      setIsPlacingOrder(false);
      router.push(`/${locale}/checkout/error`);
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
          agree={agree}
          setAgree={setAgree}
        />

        <OrderSummary
          items={items}
          subtotal={subtotal}
          onSubmit={placeOrder}
          isLoading={isPlacingOrder}
        />
      </div>
    </main>
  );
}
