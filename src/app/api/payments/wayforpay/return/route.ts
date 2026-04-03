import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();

  const order = formData.get('orderReference');

  return NextResponse.redirect(
    `https://siren-serena.com/en/checkout/success?order=${order}`
  );
}