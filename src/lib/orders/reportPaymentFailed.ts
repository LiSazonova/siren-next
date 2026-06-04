import { auth } from '@/lib/firebase/client';
import { ensureSessionCookie } from '@/lib/auth/ensureSession';

export async function reportPaymentFailed(
  orderId: string,
  reason = 'checkout_init_failed',
): Promise<void> {
  const user = auth.currentUser;
  if (!user) return;

  await ensureSessionCookie();
  const idToken = await user.getIdToken();

  await fetch('/api/orders/payment-failed', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    credentials: 'include',
    body: JSON.stringify({ orderId, reason }),
  });
}
