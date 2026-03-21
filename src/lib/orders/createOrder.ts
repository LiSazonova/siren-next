import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getNextOrderNumber } from "./getNextOrderNumber";
import { db } from "../firebase/client";

type PaymentMethod = "card" | "paypal" | "cod";
type PaymentStatus = "pending" | "paid" | "failed";
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

  const order = {
    id: String(orderNumber), // удобно для фронта

    orderNumber,
    customer,
    items,
    total,

    paymentMethod,
    paymentStatus: "pending" as PaymentStatus,

    status: "new" as OrderStatus,

    deliveryMethod,
    deliveryCountry,

    createdAt: serverTimestamp(),
  };

  await setDoc(doc(db, "orders", String(orderNumber)), order);

  return orderNumber;
}