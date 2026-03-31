import { NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/email/sendOrderEmail";
import { sendTelegramMessage } from "@/lib/telegram/sendTelegramMessage";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await sendOrderEmail(body);
    await sendTelegramMessage(body);

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("ORDER ERROR:", error);
    return NextResponse.json({ error: true });
  }
}