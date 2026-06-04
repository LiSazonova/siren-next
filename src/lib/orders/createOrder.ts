import { auth } from '@/lib/firebase/client';
import { ensureSessionCookie } from '@/lib/auth/ensureSession';

type PaymentMethod = 'card' | 'paypal' | 'cod';

type CreateOrderParams = {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    postalCode: string;
  };
  items: unknown[];
  total: number;
  paymentMethod: PaymentMethod;
  deliveryMethod: string;
  deliveryCountry: string;
};

export async function createOrder(params: CreateOrderParams): Promise<number> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Unauthorized');
  }

  await ensureSessionCookie();

  const idToken = await user.getIdToken();

  const res = await fetch('/api/orders/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    credentials: 'include',
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? 'Failed to create order');
  }

  const { orderNumber } = await res.json();
  return orderNumber;
}
