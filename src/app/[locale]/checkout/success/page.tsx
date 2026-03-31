import { getOrderById } from '@/lib/orders/getOrderById';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import SuccessClient from './SuccessClient';

export default async function SuccessPage({ params, searchParams }: any) {
  const locale = params?.locale;
  const orderId = searchParams?.order;

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
