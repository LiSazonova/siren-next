import { verifyLiqPaySignature } from '@/lib/liqpay';
import { adminDb } from '@/lib/firebase/admin';
import { sendOrderEmail } from '@/lib/email/sendOrderEmail';
import { sendTelegramMessage } from '@/lib/telegram/sendTelegramMessage';

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

  if ((status === 'success' || status === 'sandbox') && orderId) {
    const orderRef = adminDb.collection('orders').doc(String(orderId));
    const orderSnap = await orderRef.get();

    await orderRef.update({
      paymentStatus: 'paid',
      status: 'processing',
    });

    if (orderSnap.exists && !orderSnap.data()?.notificationsSent) {
      const orderPayload = {
        id: orderSnap.id,
        ...orderSnap.data(),
        paymentStatus: 'paid',
        status: 'processing',
        createdAt: new Date().toISOString(),
      };
      try {
        await sendOrderEmail(orderPayload);
        await sendTelegramMessage(orderPayload);
        await orderRef.update({ notificationsSent: true });
      } catch (notifyError) {
        console.error('LIQPAY NOTIFY ERROR:', notifyError);
      }
    }
  }

  return new Response('OK', { status: 200 });
}
