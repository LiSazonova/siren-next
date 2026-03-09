import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function createOrder({
  customer,
  items,
  total,
  paymentMethod,
  deliveryMethod
}: any) {

  const order = {
    customer,
    items,
    total,
    paymentMethod,
    deliveryMethod,
    paymentStatus: paymentMethod === "cod" ? "unpaid" : "pending",
    createdAt: serverTimestamp()
  };

  const docRef = await addDoc(collection(db, "orders"), order);

  return docRef.id;
}