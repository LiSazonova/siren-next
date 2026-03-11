import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {

  try {

    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await req.json();

    const { orderId, customer, items, total } = body;

    const itemsHtml = items.map((item: any) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee">${item.name}</td>
        <td style="padding:8px;border-bottom:1px solid #eee">${item.size}</td>
        <td style="padding:8px;border-bottom:1px solid #eee">${item.qty}</td>
        <td style="padding:8px;border-bottom:1px solid #eee">${item.price}</td>
      </tr>
    `).join("");

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "lilissazonova@gmail.com",
      subject: `New order #${orderId}`,
      html: `
      <div style="font-family:Arial;padding:40px">

        <h2>SIREN STORE</h2>

        <p>New order received</p>

        <h3>Order #${orderId}</h3>

        <table width="100%" style="border-collapse:collapse;margin-top:20px">

          <tr>
            <th align="left">Product</th>
            <th align="left">Size</th>
            <th align="left">Qty</th>
            <th align="left">Price</th>
          </tr>

          ${itemsHtml}

        </table>

        <h3 style="margin-top:20px">Total: ${total}</h3>

        <p>
        Customer:<br/>
        ${customer.name}<br/>
        ${customer.email}<br/>
        ${customer.phone}
        </p>

      </div>
      `
    });

    return NextResponse.json({ ok: true });

  } catch (error) {

    console.error("EMAIL ERROR:", error);

    return NextResponse.json({ error: true });

  }

}