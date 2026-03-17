import { NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/email/sendOrderEmail";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    await sendOrderEmail(body);

    return NextResponse.json({ ok: true });

  } catch (error) {

    console.error("EMAIL ERROR:", error);

    return NextResponse.json({ error: true });

  }

}