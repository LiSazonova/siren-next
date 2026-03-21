import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderEmail(order: any) {
  try {
    const {
      orderId,
      orderNumber,
      customer,
      items,
      total,
      deliveryMethod,
      deliveryCountry,
      paymentMethod,
    } = order;

    const safeOrderNumber = orderNumber || orderId || "—";

    console.log("📩 EMAIL DEBUG:");
    console.log("customer email:", customer?.email);

    // 🧾 товары
    const itemsHtml =
      items
        ?.map(
          (item: any) => `
<tr>
  <td style="padding:12px 0;border-bottom:1px solid #333">${item.name}</td>
  <td style="padding:12px 0;border-bottom:1px solid #333">${item.size || "-"}</td>
  <td style="padding:12px 0;border-bottom:1px solid #333">${item.qty}</td>
  <td style="padding:12px 0;border-bottom:1px solid #333">${item.price} грн</td>
</tr>
`
        )
        .join("") || "";

    // 📩 письмо админу
    const adminHtml = `
<div style="margin:0;padding:0;background:#000;color:#fff;font-family:Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px">

    <h1 style="text-align:center;letter-spacing:4px;margin-bottom:30px">
      SIREN
    </h1>

    <h2>Нове замовлення</h2>

    <p>Номер: <b>#${safeOrderNumber}</b></p>

    <h3 style="margin-top:30px">Клієнт</h3>
    <p>${customer?.name || "-"}</p>
    <p>${customer?.email || "-"}</p>
    <p>${customer?.phone || "-"}</p>

    <h3 style="margin-top:30px">Доставка</h3>
    <p>Країна: ${deliveryCountry || "-"}</p>
    <p>Метод: ${deliveryMethod || "-"}</p>
    <p>Адреса: ${customer?.address || "-"}</p>
    <p>Індекс: ${customer?.postalCode || "-"}</p>

    <h3 style="margin-top:30px">Оплата</h3>
    <p>${paymentMethod || "-"}</p>

    <h3 style="margin-top:30px">Товари</h3>

    <table width="100%" style="border-collapse:collapse">
      <thead>
        <tr style="border-bottom:1px solid #444">
          <th align="left">Товар</th>
          <th align="left">Розмір</th>
          <th align="left">К-сть</th>
          <th align="left">Ціна</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <h2 style="margin-top:30px">Сума: ${total} грн</h2>

  </div>
</div>
`;

    // 💌 письмо клиенту
    const customerHtml = `
<div style="margin:0;padding:0;background:#000;color:#fff;font-family:Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;text-align:center">

    <h1 style="letter-spacing:4px;margin-bottom:30px">SIREN</h1>

    <h2 style="margin-bottom:20px">
      Дякуємо за замовлення 💙
    </h2>

    <p style="margin-bottom:10px">
      Ваше замовлення <b>#${safeOrderNumber}</b> успішно оформлено
    </p>

    <p style="color:#aaa;margin-bottom:30px">
      Ми вже обробляємо його та зв’яжемось з вами найближчим часом
    </p>

    <div style="font-size:18px;margin-bottom:30px">
      Сума: <b>${total} грн</b>
    </div>

    <a href="${process.env.NEXT_PUBLIC_SITE_URL || '#'}"
      style="display:inline-block;padding:14px 30px;border:1px solid #fff;color:#fff;text-decoration:none">
      Перейти в магазин
    </a>

    <p style="margin-top:50px;font-size:12px;color:#777">
      Siren Store
    </p>

  </div>
</div>
`;

    // 📩 отправка админу
    const adminRes = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: [process.env.EMAIL_OWNER!],
      subject: `SIREN — Order #${safeOrderNumber}`,
      html: adminHtml,
    });

    console.log("ADMIN EMAIL RESULT:", adminRes);

    // 💌 отправка клиенту
    if (customer?.email) {
      const customerRes = await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: [customer.email],
        subject: `Ваше замовлення #${safeOrderNumber} оформлено`,
        html: customerHtml,
      });

      console.log("CUSTOMER EMAIL RESULT:", customerRes);
    }

  } catch (error) {
    console.error("❌ EMAIL ERROR:", error);
  }
}