import { getOrderById } from '@/lib/orders/getOrderById';
import { redirect } from 'next/navigation';
import SuccessClient from './SuccessClient';

type Props = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    order?: string;
  }>;
};

export default async function SuccessPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { order } = await searchParams;

  if (!order) {
    redirect(`/${locale}/checkout/error`);
  }

  const orderData = await getOrderById(order);

  if (!orderData) {
    redirect(`/${locale}/checkout/error`);
  }

  if (orderData.paymentStatus === 'failed') {
    redirect(`/${locale}/checkout/error`);
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
