import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

export async function POST(req: Request) {
  const data = await req.json();

  console.log('🔥 WAYFORPAY CALLBACK HIT');
  console.log('📦 DATA:', JSON.stringify(data, null, 2));

  const {
    orderReference,
    transactionStatus,
    amount,
    currency,
    merchantSignature,
  } = data;

  const secret = process.env.WAYFORPAY_SECRET!;
  const merchant = process.env.WAYFORPAY_MERCHANT!;

  const signatureString = [
    merchant,
    orderReference,
    amount,
    currency,
    transactionStatus,
  ].join(';');

  const checkSignature = crypto
    .createHmac('md5', secret)
    .update(signatureString)
    .digest('hex');

  console.log('🔐 SIGNATURE STRING:', signatureString);
  console.log('🔐 GENERATED:', checkSignature);
  console.log('🔐 RECEIVED:', merchantSignature);

  if (checkSignature !== merchantSignature) {
    console.error('❌ INVALID SIGNATURE');
    return NextResponse.json({ status: 'error' });
  }

  const isPaid = transactionStatus === 'Approved';

  const orderRef = doc(db, 'orders', String(orderReference));

  await updateDoc(orderRef, {
    paymentStatus: isPaid ? 'paid' : 'failed',
    status: isPaid ? 'processing' : 'cancelled',
  });

  console.log('✅ ORDER UPDATED:', orderReference);

  return NextResponse.json({
    orderReference,
    status: 'accept',
    time: Date.now(),
  });
}