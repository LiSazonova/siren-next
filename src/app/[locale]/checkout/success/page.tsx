import { getOrderByIdAdmin } from '@/lib/orders/getOrderByIdAdmin';
import { Suspense } from 'react';
import SuccessClient from './SuccessClient';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const orderId = (await searchParams)?.order;

  if (!orderId) {
    return <div className="text-center py-20">No order ID</div>;
  }

  const orderData = await getOrderByIdAdmin(orderId);

  if (!orderData) {
    return <div className="text-center py-20">Order not found</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessClient
        order={{
          id: orderData.id,
          orderNumber: String(orderData.orderNumber),
          paymentStatus: orderData.paymentStatus,
          status: orderData.status,
        }}
      />
    </Suspense>
  );
}
