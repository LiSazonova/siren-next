import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  const body = await req.json();

    const merchantDomainName = 'siren-serena.com';
  const merchantAccount = process.env.WAYFORPAY_MERCHANT!;
  const secret = process.env.WAYFORPAY_SECRET!;

  const locale = body.locale || 'en';
  const orderReference = String(body.orderNumber);
  const orderDate = Math.floor(Date.now() / 1000);
  const amount = Number(body.amount);
  const currency = 'UAH'; // ✅ ВАЖНО

  const productName = body.productName;
  const productCount = body.productCount.map((c: any) => Number(c));
  const productPrice = body.productPrice.map((p: any) => Number(p));

  // ✅ ПОДПИСЬ
  const signatureString = [
  merchantAccount,
  merchantDomainName, // 🔥 ВЕРНУТЬ
  orderReference,
  orderDate,
  amount,
  currency,
  ...productName,
  ...productCount,
  ...productPrice,
].join(';');

  const merchantSignature = crypto
    .createHmac('md5', secret)
    .update(signatureString)
    .digest('hex');

  // 🔥 ЛОГИ (оставь пока!)
  console.log('SIGN STRING:', signatureString);
  console.log('SIGN:', merchantSignature);

  const responseData = {
    merchantAccount,
    merchantDomainName: 'siren-serena.com',
    orderReference,
    orderDate,
    amount,
    currency,
    productName,
    productCount,
    productPrice,
    merchantSignature,
    returnUrl: 'https://siren-serena.com/api/payments/wayforpay/return',
    serviceUrl: `https://siren-serena.com/api/payments/wayforpay/callback`,
  };

  return NextResponse.json(responseData);
}