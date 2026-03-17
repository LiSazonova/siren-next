import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/client"

export async function updateOrderStatus(id: string, status: string) {

  const ref = doc(db, "orders", id)

  await updateDoc(ref, {
    status
  })

}