import { doc, runTransaction } from "firebase/firestore"
import { db } from "@/config/firebase"

export async function getNextOrderNumber() {

  const counterRef = doc(db, "counters", "orders")

  const nextNumber = await runTransaction(db, async (transaction) => {

    const counterDoc = await transaction.get(counterRef)

    const currentNumber = counterDoc.data()?.lastOrderNumber || 1000

    const newNumber = currentNumber + 1

    transaction.update(counterRef, {
      lastOrderNumber: newNumber
    })

    return newNumber
  })

  return nextNumber
}