import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

export async function POST(req: Request) {
  const formData = await req.formData();

  const order = formData.get('orderReference') as string;
  const transactionStatus = formData.get('transactionStatus') as string;

  console.log('🔄 RETURN HIT, order:', order, 'status:', transactionStatus);

  if (order) {
    try {
      const isPaid = transactionStatus === 'Approved';
      const orderRef = doc(db, 'orders', order);
      await updateDoc(orderRef, {
        paymentStatus: isPaid ? 'paid' : 'failed',
        status: isPaid ? 'processing' : 'cancelled',
      });
      console.log('✅ ORDER UPDATED:', order, isPaid ? 'paid' : 'failed');
    } catch (e) {
      console.error('❌ FIRESTORE ERROR:', e);
    }
  }

  return new Response(null, {
    status: 303,
    headers: {
      Location: `https://siren-serena.com/en/checkout/success?order=${order}`,
    },
  });
}