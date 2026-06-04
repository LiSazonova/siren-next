import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { verifyApiAuth } from '@/lib/auth/verifyApiAuth';
import { notifyOrderOwners } from '@/lib/orders/notifyOrderOwners';

export async function POST(req: Request) {
  if (!(await verifyApiAuth(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const orderId = body?.orderId != null ? String(body.orderId) : '';
  if (!orderId) {
    return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
  }

  const orderRef = adminDb.collection('orders').doc(orderId);
  const snap = await orderRef.get();
  if (!snap.exists) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const data = snap.data();
  if (data?.paymentFailedNotified) {
    return NextResponse.json({ ok: true });
  }

  await orderRef.update({
    paymentStatus: 'failed',
    paymentFailedNotified: true,
  });

  try {
    await notifyOrderOwners({
      id: snap.id,
      ...data,
      paymentStatus: 'failed',
      paymentNote:
        typeof body.reason === 'string' ? body.reason : 'checkout_init_failed',
      createdAt: new Date().toISOString(),
    });
  } catch (notifyError) {
    console.error('PAYMENT FAILED NOTIFY ERROR:', notifyError);
  }

  return NextResponse.json({ ok: true });
}
