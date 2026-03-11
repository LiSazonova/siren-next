import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderEmail(order:any) {

const itemsHtml = order.items.map((item:any)=>`

<tr>
<td style="padding:10px;border-bottom:1px solid #eee;">
${item.name}
</td>

<td style="padding:10px;border-bottom:1px solid #eee;">
${item.size}
</td>

<td style="padding:10px;border-bottom:1px solid #eee;">
${item.price}
</td>
</tr>

`).join("")

await resend.emails.send({

from: process.env.EMAIL_FROM!,

to: [
process.env.EMAIL_OWNER!,
order.customer.email
],

subject: `Order #${order.orderNumber}`,

html: `

<div style="font-family:Arial;padding:40px">

<h2>SIREN</h2>

<p>Thank you for your order</p>

<p>
Order number: <b>#${order.orderNumber}</b>
</p>

<table width="100%" style="border-collapse:collapse;margin-top:20px">

<tr>
<th align="left">Product</th>
<th align="left">Size</th>
<th align="left">Price</th>
</tr>

${itemsHtml}

</table>

<h3 style="margin-top:20px">
Total: ${order.total}
</h3>

<p>
Shipping address:<br>
${order.customer.address}
</p>

</div>

`

})

}