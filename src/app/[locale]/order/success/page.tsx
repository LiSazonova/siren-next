import { getOrderByIdAdmin } from '@/lib/orders/getOrderByIdAdmin';
import { Suspense } from 'react';
import SuccessClient from '@/app/[locale]/checkout/success/SuccessClient';

export default async function OrderSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ order?: string }>;
}) {
  const { locale } = await params;
  const { order: orderId } = await searchParams;

  if (!orderId) {
    return <div className="text-center py-20">No order ID</div>;
  }

  const orderData = await getOrderByIdAdmin(orderId);

  if (!orderData) {
    return (
      <div className="text-center py-20">
        Order not found ({locale})
      </div>
    );
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
