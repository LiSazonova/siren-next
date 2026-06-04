import { verifyLiqPaySignature } from '@/lib/liqpay';
import { adminDb } from '@/lib/firebase/admin';

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
    await adminDb.collection('orders').doc(String(orderId)).update({
      paymentStatus: 'paid',
      status: 'processing',
    });
  }

  return new Response('OK', { status: 200 });
}
