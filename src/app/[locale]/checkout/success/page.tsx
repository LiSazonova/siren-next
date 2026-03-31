import { getOrderById } from '@/lib/orders/getOrderById';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import SuccessClient from './SuccessClient';

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { order?: string };
}) {
  const { locale } = params;
  const orderId = searchParams.order;

  if (!orderId) {
    redirect(`/${locale}/checkout/error`);
  }

  const orderData = await getOrderById(orderId);

  if (!orderData) {
    redirect(`/${locale}/checkout/error`);
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
