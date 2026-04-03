import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();

  const order = formData.get('orderReference');

  return NextResponse.redirect(
    `/en/checkout/success?order=${order}`
  );
}