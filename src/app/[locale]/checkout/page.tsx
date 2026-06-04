'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartItems, useCartSubtotal, useCart } from '@/stores/cart';
import { createOrder } from '@/lib/orders/createOrder';
import { reportPaymentFailed } from '@/lib/orders/reportPaymentFailed';
import { useLocale, useTranslations } from 'next-intl';
import useAuthUser from '@/hooks/useAuthUser';

import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import CheckoutButton from '@/components/CheckoutButton';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const tAuth = useTranslations('cart');
  const locale = useLocale();
  const router = useRouter();
  const { user, loading: authLoading } = useAuthUser();

  const checkoutReturn = encodeURIComponent(`/${locale}/checkout`);
  const signInHref = `/${locale}/signin?returnUrl=${checkoutReturn}`;
  const signUpHref = `/${locale}/signup?returnUrl=${checkoutReturn}`;

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
  const [liqPayCheckout, setLiqPayCheckout] = useState<{
    orderId: string;
    amount: number;
    description: string;
  } | null>(null);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const isFormValid =
    form.name &&
    form.email &&
    form.phone &&
    form.country &&
    form.address &&
    deliveryCountry &&
    payment &&
    (deliveryCountry === 'ua' ? form.postalCode : true);

  const placeOrder = async () => {
    if (isPlacingOrder || !isFormValid) return;

    if (!user) {
      router.push(signInHref);
      return;
    }

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

      // 💳 LiqPay
      if (payment === 'card') {
        setLiqPayCheckout({
          orderId: String(orderId),
          amount: subtotal,
          description: `Order #${orderId}`,
        });
        return;
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.message === 'Unauthorized') {
        router.push(`/${locale}/signin?returnUrl=/${locale}/checkout`);
        return;
      }
      router.push(`/${locale}/checkout/error`);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const needsAuth = !authLoading && !user;

  return (
    <main className="max-w-[1200px] mx-auto px-4 pb-16">
      <h1 className="text-center text-[28px] uppercase mb-8">{t('title')}</h1>

      {needsAuth && (
        <div
          role="status"
          className="mb-8 rounded border border-amber-600 bg-amber-50 px-4 py-4 text-[16px] md:text-[18px] text-neutral-900"
        >
          <p>{tAuth('authRequired')}</p>
          <p className="mt-3 flex flex-wrap gap-4 uppercase text-[16px]">
            <Link href={signInHref} className="underline hover:opacity-80">
              {tAuth('signIn')}
            </Link>
            <Link href={signUpHref} className="underline hover:opacity-80">
              {tAuth('signUp')}
            </Link>
          </p>
        </div>
      )}

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
          isLoading={isPlacingOrder || !!liqPayCheckout}
          isDisabled={!isFormValid || needsAuth}
        />
      </div>

      {liqPayCheckout && (
        <CheckoutButton
          orderId={liqPayCheckout.orderId}
          amount={liqPayCheckout.amount}
          description={liqPayCheckout.description}
          autoSubmit
          onError={async () => {
            await reportPaymentFailed(
              liqPayCheckout.orderId,
              'checkout_init_failed',
            );
            setLiqPayCheckout(null);
            router.push(`/${locale}/checkout/error`);
          }}
        />
      )}
    </main>
  );
}
