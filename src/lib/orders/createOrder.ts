import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getNextOrderNumber } from "./getNextOrderNumber";
import { db } from "../firebase/client";

type PaymentMethod = "card" | "paypal" | "cod";
type PaymentStatus = "pending" | "paid" | "failed" | "unpaid";
type OrderStatus = "new" | "processing" | "shipped" | "delivered" | "cancelled";

type CreateOrderParams = {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    postalCode: string;
  };
  items: any[];
  total: number;
  paymentMethod: PaymentMethod;
  deliveryMethod: string;
  deliveryCountry: string;
};

export async function createOrder({
  customer,
  items,
  total,
  paymentMethod,
  deliveryMethod,
  deliveryCountry,
}: CreateOrderParams) {

  const orderNumber = await getNextOrderNumber();

  // 🔥 правильная логика статусов
  let paymentStatus: PaymentStatus = "pending";

  if (paymentMethod === "cod") {
    paymentStatus = "unpaid";
  }

  const order = {
    id: String(orderNumber),

    orderNumber,
    customer,
    items,
    total,

    paymentMethod,
    paymentStatus,

    status: "new" as OrderStatus,

    deliveryMethod,
    deliveryCountry,

    createdAt: serverTimestamp(),
  };

  // ✅ сохраняем заказ
  await setDoc(doc(db, "orders", String(orderNumber)), order);

  // 📩 уведомления (email + telegram)
  try {
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
  } catch (error) {
    console.error('SEND ORDER API ERROR:', error);
  }

  return orderNumber;
}