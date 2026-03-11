import { getNextOrderNumber } from "@/lib/getNextOrderNumber";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
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

  const docRef = await addDoc(collection(db, "orders"), order)

  return {
    firebaseId: docRef.id,
    orderNumber
  }
}