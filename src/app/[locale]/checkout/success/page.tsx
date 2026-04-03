import { getOrderById } from '@/lib/orders/getOrderById';
import { Suspense } from 'react';
import SuccessClient from './SuccessClient';

export default async function SuccessPage({ params, searchParams }: any) {
  const locale = params?.locale;
  const orderId = searchParams?.order;

  if (!orderId) {
    return <div className="text-center py-20">No order ID</div>;
  }

  const orderData = await getOrderById(orderId);

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
