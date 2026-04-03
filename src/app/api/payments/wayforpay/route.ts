import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  const body = await req.json();

  const merchantAccount = process.env.WAYFORPAY_MERCHANT!;
  const secret = process.env.WAYFORPAY_SECRET!;

  const locale = body.locale;
  const orderReference = body.orderNumber;
  const orderDate = Math.floor(Date.now() / 1000);
  const amount = body.amount;
  const currency = 'UAH';

  const productName = body.productName;
  const productCount = body.productCount;
  const productPrice = body.productPrice;

  const signatureString = [
  merchantAccount,
  'siren-serena.com',
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
    returnUrl: `https://siren-serena.com/${locale}/checkout/success?order=${orderReference}`,
    serviceUrl: `https://siren-serena.com/api/payments/wayforpay/callback`,
  };

  return NextResponse.json(responseData);
}