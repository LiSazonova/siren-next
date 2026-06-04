import { sendOrderEmail } from '@/lib/email/sendOrderEmail';
import { sendTelegramMessage } from '@/lib/telegram/sendTelegramMessage';

/** Notify shop owner (email + Telegram) about an order. */
export async function notifyOrderOwners(order: Record<string, unknown>) {
  await sendOrderEmail(order);
  await sendTelegramMessage(order);
}
