import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderEmail(order: any) {
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

  const itemsHtml = items
    ?.map(
      (item: any) => `
<tr>
  <td style="padding:10px;border-bottom:1px solid #eee">${item.name}</td>
  <td style="padding:10px;border-bottom:1px solid #eee">${item.size || "-"}</td>
  <td style="padding:10px;border-bottom:1px solid #eee">${item.price} × ${item.qty}</td>
</tr>
`
    )
    .join("") || "";

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: [process.env.EMAIL_OWNER!, customer?.email],
    subject: `Order #${safeOrderNumber}`,

    html: `
<div style="font-family:Arial, sans-serif;padding:40px;max-width:600px;margin:auto">

<h2 style="margin-bottom:20px">SIREN</h2>

<p>Thank you for your order 💫</p>

<p>
Order number: <b>#${safeOrderNumber}</b>
</p>

<h3 style="margin-top:30px">Customer</h3>
<p>
${customer?.name || "-"}<br>
${customer?.email || "-"}<br>
${customer?.phone || "-"}
</p>

<h3 style="margin-top:30px">Delivery</h3>
<p>
Country: ${deliveryCountry || "-"}<br>
Method: ${deliveryMethod || "-"}<br>
Address: ${customer?.address || "-"}<br>
Postal code: ${customer?.postalCode || "-"}
</p>

<h3 style="margin-top:30px">Payment</h3>
<p>${paymentMethod || "-"}</p>

<h3 style="margin-top:30px">Items</h3>

<table width="100%" style="border-collapse:collapse;margin-top:10px">
<tr>
  <th align="left" style="padding:10px;border-bottom:1px solid #ccc">Product</th>
  <th align="left" style="padding:10px;border-bottom:1px solid #ccc">Size</th>
  <th align="left" style="padding:10px;border-bottom:1px solid #ccc">Price</th>
</tr>

${itemsHtml}

</table>

<h2 style="margin-top:30px">
Total: ${total} грн
</h2>

</div>
`
  });
}