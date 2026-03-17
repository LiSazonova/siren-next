import OrderStatus from '@/components/admin/OrderStatus';
import { getOrderById } from '@/lib/orders/getOrderById';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;

  const order = await getOrderById(id);

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>Order #{order.orderNumber}</h1>
      <OrderStatus id={order.id} currentStatus={order.status || 'new'} />

      <h3>Customer</h3>

      <p>{order.customer.name}</p>
      <p>{order.customer.email}</p>
      <p>{order.customer.phone}</p>

      <h3 style={{ marginTop: '20px' }}>Items</h3>

      <ul>
        {order.items.map((item: any) => (
          <li key={item.productId}>
            {item.name} — {item.size} — {item.price}
          </li>
        ))}
      </ul>

      <h3 style={{ marginTop: '20px' }}>Total: {order.total}</h3>
    </div>
  );
}
