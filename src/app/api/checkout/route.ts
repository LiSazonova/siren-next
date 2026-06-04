import { NextResponse } from 'next/server';
import { createLiqPayCheckout } from '@/lib/liqpay';

export async function POST(req: Request) {
  const body = await req.json();
  const { orderId, amount, description, locale } = body;

  if (!orderId || amount == null || !description) {
    return NextResponse.json(
      { error: 'orderId, amount, and description are required' },
      { status: 400 },
    );
  }

  const publicKey = process.env.LIQPAY_PUBLIC_KEY;
  const privateKey = process.env.LIQPAY_PRIVATE_KEY;
  const baseUrl =
    process.env.NEXT_PUBLIC_URL ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL;

  if (!publicKey || !privateKey || !baseUrl) {
    return NextResponse.json(
      { error: 'Payment configuration is missing' },
      { status: 500 },
    );
  }

  const resolvedLocale = locale === 'ua' ? 'ua' : 'en';
  const orderIdStr = String(orderId);
  const useSandbox =
    process.env.LIQPAY_SANDBOX === '1' || publicKey.startsWith('sandbox_');

  const { data, signature } = createLiqPayCheckout(
    {
      action: 'pay',
      amount: Number(amount),
      currency: 'UAH',
      description: String(description),
      order_id: orderIdStr,
      result_url: `${baseUrl}/${resolvedLocale}/order/success?order=${orderIdStr}`,
      server_url: `${baseUrl}/api/liqpay/callback`,
      ...(useSandbox ? { sandbox: 1 } : {}),
    },
    publicKey,
    privateKey,
  );

  return NextResponse.json({ data, signature });
}
