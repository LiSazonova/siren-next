'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';

const LIQPAY_CHECKOUT_URL = 'https://www.liqpay.ua/api/3/checkout';

type CheckoutButtonProps = {
  orderId: string;
  amount: number;
  description: string;
  /** When true, redirects to LiqPay immediately on mount (e.g. after order creation). */
  autoSubmit?: boolean;
  onError?: () => void;
};

export default function CheckoutButton({
  orderId,
  amount,
  description,
  autoSubmit = false,
  onError,
}: CheckoutButtonProps) {
  const locale = useLocale();
  const submitted = useRef(false);

  const redirectToLiqPay = useCallback(async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        amount,
        description,
        locale,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(
        typeof err.error === 'string' ? err.error : 'Failed to initialize payment',
      );
    }

    const { data, signature } = await res.json();

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = LIQPAY_CHECKOUT_URL;

    for (const [name, value] of [
      ['data', data],
      ['signature', signature],
    ] as const) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  }, [orderId, amount, description, locale]);

  useEffect(() => {
    if (!autoSubmit || submitted.current) return;
    submitted.current = true;
    redirectToLiqPay().catch((err) => {
      console.error(err);
      submitted.current = false;
      onError?.();
    });
  }, [autoSubmit, redirectToLiqPay, onError]);

  if (autoSubmit) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => redirectToLiqPay()}
      className="w-full p-4 text-lg bg-black text-white hover:opacity-90 transition"
    >
      Pay with card
    </button>
  );
}
