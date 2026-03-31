export async function sendTelegramMessage(order: any, chatId?: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  const chatIds = chatId
    ? [chatId]
    : (process.env.TELEGRAM_CHAT_IDS || '').split(',');

  function getPaymentLabel(method: string) {
    switch (method) {
      case "cod":
        return "Післяплата";
      case "paypal":
        return "PayPal";
      case "card":
        return "Оплата карткою";
      default:
        return method;
    }
  }

  const itemsText = order.items
    ?.map(
      (item: any) => `
<b>${item.name}</b>
Розмір: ${item.size || "-"}
К-сть: ${item.qty}
Ціна: ${item.price} грн
`
    )
    .join("\n");

  const text = `
🛒 <b>Нове замовлення</b>

Номер: <b>#${order.orderNumber}</b>

━━━━━━━━━━━━━━━

<b>Клієнт</b>
${order.customer?.name}
${order.customer?.email}
${order.customer?.phone}

━━━━━━━━━━━━━━━

<b>Доставка</b>
Країна: ${order.deliveryCountry}
Метод: ${order.deliveryMethod}
Адреса: ${order.customer?.address}
Індекс: ${order.customer?.postalCode}

━━━━━━━━━━━━━━━

<b>Оплата</b>
${getPaymentLabel(order.paymentMethod)}

━━━━━━━━━━━━━━━

<b>Товари</b>
${itemsText}

━━━━━━━━━━━━━━━

💰 <b>Сума:</b> ${order.total} грн
`;

  for (const id of chatIds) {
    if (!id) continue;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: id,
        text,
        parse_mode: 'HTML',
      }),
    });
  }
}