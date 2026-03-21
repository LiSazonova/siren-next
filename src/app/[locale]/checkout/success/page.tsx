import { getOrderById } from '@/lib/orders/getOrderById';
import { redirect } from 'next/navigation';
import SuccessClient from './SuccessClient';

type Props = {
  params: {
    locale: string;
  };
  searchParams: Promise<{
    order?: string;
  }>;
};

export default async function SuccessPage({ params, searchParams }: Props) {
  const { order } = await searchParams;

  if (!order) {
    redirect(`/${params.locale}/checkout/error`);
  }

  const orderData = await getOrderById(order);

  if (!orderData) {
    redirect(`/${params.locale}/checkout/error`);
  }

  if (orderData.paymentStatus === 'failed') {
    redirect(`/${params.locale}/checkout/error`);
  }

  return (
    <SuccessClient
      order={{
        id: orderData.id,
        orderNumber: String(orderData.orderNumber),
        paymentStatus: orderData.paymentStatus,
        status: orderData.status,
      }}
    />
  );
}
