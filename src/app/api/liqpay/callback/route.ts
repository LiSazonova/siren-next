import { verifyLiqPaySignature } from '@/lib/liqpay';
import { adminDb } from '@/lib/firebase/admin';
import { notifyOrderOwners } from '@/lib/orders/notifyOrderOwners';

const LIQPAY_FAILURE_STATUSES = new Set([
  'failure',
  'error',
  'reversed',
  'expired',
  'tryagain',
]);

export async function POST(req: Request) {
  const formData = await req.formData();
  const data = formData.get('data');
  const signature = formData.get('signature');

  if (typeof data !== 'string' || typeof signature !== 'string') {
    return new Response('Bad Request', { status: 400 });
  }

  const privateKey = process.env.LIQPAY_PRIVATE_KEY;
  if (!privateKey) {
    return new Response('Server Error', { status: 500 });
  }

  if (!verifyLiqPaySignature(data, signature, privateKey)) {
    return new Response('Invalid signature', { status: 400 });
  }

  const payload = JSON.parse(Buffer.from(data, 'base64').toString('utf8'));
  const { status, order_id: orderId } = payload;

  if (!orderId) {
    return new Response('OK', { status: 200 });
  }

  const orderRef = adminDb.collection('orders').doc(String(orderId));
  const orderSnap = await orderRef.get();
  if (!orderSnap.exists) {
    return new Response('OK', { status: 200 });
  }

  const orderData = orderSnap.data();

  if (status === 'success' || status === 'sandbox') {
    await orderRef.update({
      paymentStatus: 'paid',
      status: 'processing',
    });

    if (!orderData?.paidNotificationSent) {
      try {
        await notifyOrderOwners({
          id: orderSnap.id,
          ...orderData,
          paymentStatus: 'paid',
          status: 'processing',
          createdAt: new Date().toISOString(),
        });
        await orderRef.update({
          paidNotificationSent: true,
          notificationsSent: true,
        });
      } catch (notifyError) {
        console.error('LIQPAY NOTIFY ERROR:', notifyError);
      }
    }
  } else if (LIQPAY_FAILURE_STATUSES.has(status) && !orderData?.paymentFailedNotified) {
    await orderRef.update({
      paymentStatus: 'failed',
      paymentFailedNotified: true,
    });

    try {
      await notifyOrderOwners({
        id: orderSnap.id,
        ...orderData,
        paymentStatus: 'failed',
        paymentNote: `liqpay:${status}`,
        createdAt: new Date().toISOString(),
      });
    } catch (notifyError) {
      console.error('LIQPAY FAILED NOTIFY ERROR:', notifyError);
    }
  }

  return new Response('OK', { status: 200 });
}
