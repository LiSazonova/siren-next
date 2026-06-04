import { adminDb } from '@/lib/firebase/admin';
import type { Order } from '@/types/order';

/** Server-only: read order written by Admin SDK in API routes. */
export async function getOrderByIdAdmin(id: string): Promise<Order | null> {
  const snap = await adminDb.collection('orders').doc(id).get();
  if (!snap.exists) return null;

  const data = snap.data()!;
  const createdAt = data.createdAt;
  const createdAtSerialized =
    createdAt && typeof createdAt.toDate === 'function'
      ? createdAt.toDate().toISOString()
      : createdAt;

  return {
    id: snap.id,
    ...(data as Omit<Order, 'id'>),
    createdAt: createdAtSerialized,
  };
}
