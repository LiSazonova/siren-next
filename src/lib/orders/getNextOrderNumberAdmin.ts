import { adminDb } from '@/lib/firebase/admin';

export async function getNextOrderNumberAdmin(): Promise<number> {
  const counterRef = adminDb.collection('counters').doc('orders');

  return adminDb.runTransaction(async (transaction) => {
    const counterDoc = await transaction.get(counterRef);
    const currentNumber = counterDoc.data()?.lastOrderNumber ?? 1000;
    const newNumber = currentNumber + 1;

    if (counterDoc.exists) {
      transaction.update(counterRef, { lastOrderNumber: newNumber });
    } else {
      transaction.set(counterRef, { lastOrderNumber: newNumber });
    }

    return newNumber;
  });
}
