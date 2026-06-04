import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from '@/lib/firebase/admin';
import { verifyApiAuth } from '@/lib/auth/verifyApiAuth';
import { getNextOrderNumberAdmin } from '@/lib/orders/getNextOrderNumberAdmin';
import { notifyOrderOwners } from '@/lib/orders/notifyOrderOwners';

type PaymentMethod = 'card' | 'paypal' | 'cod';
type PaymentStatus = 'pending' | 'paid' | 'failed' | 'unpaid';

export async function POST(req: Request) {
  if (!(await verifyApiAuth(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const {
    customer,
    items,
    total,
    paymentMethod,
    deliveryMethod,
    deliveryCountry,
  } = body;

  if (!customer || !items?.length || total == null || !paymentMethod) {
    return NextResponse.json({ error: 'Invalid order data' }, { status: 400 });
  }

  try {
    const orderNumber = await getNextOrderNumberAdmin();

    let paymentStatus: PaymentStatus = 'pending';
    if (paymentMethod === 'cod') {
      paymentStatus = 'unpaid';
    }

    const order = {
      id: String(orderNumber),
      orderNumber,
      customer,
      items: JSON.parse(JSON.stringify(items)),
      total: Number(total),
      paymentMethod: paymentMethod as PaymentMethod,
      paymentStatus,
      status: 'new',
      deliveryMethod: deliveryMethod ?? '',
      deliveryCountry: deliveryCountry ?? '',
      createdAt: FieldValue.serverTimestamp(),
    };

    const orderRef = adminDb.collection('orders').doc(String(orderNumber));
    await orderRef.set({
      ...order,
      notificationsSent: false,
      paymentFailedNotified: false,
      paidNotificationSent: false,
    });

    // Card: notify immediately (pending) so we keep customer if LiqPay fails
    try {
      const orderPayload = { ...order, createdAt: new Date().toISOString() };
      await notifyOrderOwners(orderPayload);
      await orderRef.update({ notificationsSent: true });
    } catch (notifyError) {
      console.error('ORDER NOTIFY ERROR:', notifyError);
    }

    return NextResponse.json({ orderNumber });
  } catch (error) {
    console.error('CREATE ORDER ERROR:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
