import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log('WAYFORPAY CALLBACK:', data);

    const {
      orderReference,
      transactionStatus,
      merchantSignature,
      amount,
      currency,
    } = data;

    // 🔐 Проверка подписи
    const secret = process.env.WAYFORPAY_SECRET!;

    const signatureString = [
      process.env.NEXT_PUBLIC_WAYFORPAY_MERCHANT,
      orderReference,
      amount,
      currency,
      transactionStatus,
    ].join(';');

    const generatedSignature = crypto
      .createHash('md5')
      .update(signatureString + secret)
      .digest('hex');

    if (generatedSignature !== merchantSignature) {
      console.error('INVALID SIGNATURE');
      return NextResponse.json({ status: 'error' });
    }

    // 📦 Определяем статус
    const isPaid = transactionStatus === 'Approved';

    // 🔄 Обновляем заказ в Firestore
    const orderRef = doc(db, 'orders', String(orderReference));

    await updateDoc(orderRef, {
      paymentStatus: isPaid ? 'paid' : 'failed',
      status: isPaid ? 'processing' : 'cancelled',
    });

    console.log('ORDER UPDATED:', orderReference);

    // ✅ Ответ WayForPay (ОБЯЗАТЕЛЬНО)
    return NextResponse.json({
      orderReference,
      status: 'accept',
      time: Date.now(),
    });
  } catch (error) {
    console.error('CALLBACK ERROR:', error);

    return NextResponse.json({
      status: 'error',
    });
  }
}