import { getNextOrderNumber } from "@/lib/getNextOrderNumber";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function createOrder({
  customer,
  items,
  total,
  paymentMethod,
  deliveryMethod
}: any) {

  const orderNumber = await getNextOrderNumber()

  const order = {
    orderNumber,
    customer,
    items,
    total,
    paymentMethod,
    deliveryMethod,
    paymentStatus: paymentMethod === "cod" ? "unpaid" : "pending",
    status: "new",
    createdAt: serverTimestamp()
  }

  await setDoc(doc(db, "orders", String(orderNumber)), order)

  return orderNumber
}