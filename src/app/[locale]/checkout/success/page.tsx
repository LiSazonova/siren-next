import { getOrderById } from '@/lib/orders/getOrderById';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import SuccessClient from './SuccessClient';

type Props = {
  params: {
    locale: string;
  };
  searchParams: {
    order?: string;
  };
};

export default async function SuccessPage({ params, searchParams }: Props) {
  const { locale } = params;
  const orderId = searchParams.order;

  if (!orderId) {
    redirect(`/${locale}/checkout/error`);
  }

  const orderData = await getOrderById(orderId);

  if (!orderData) {
    redirect(`/${locale}/checkout/error`);
  }

  if (orderData.paymentStatus === 'failed') {
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
