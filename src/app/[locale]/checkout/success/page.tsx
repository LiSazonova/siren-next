import { getOrderById } from '@/lib/orders/getOrderById';
import { redirect } from 'next/navigation';
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
  const query = await searchParams;
  const orderId = query.order;

  if (!orderId) {
    redirect(`/${params.locale}/checkout/error`);
  }

  const order = await getOrderById(orderId);

  if (!order) {
    redirect(`/${params.locale}/checkout/error`);
  }

  if (order.paymentStatus === 'failed') {
    redirect(`/${params.locale}/checkout/error`);
  }

  return (
    <SuccessClient
      order={{
        id: order.id,
        orderNumber: order.orderNumber,
        paymentStatus: order.paymentStatus,
        status: order.status,
      }}
    />
  );
}
