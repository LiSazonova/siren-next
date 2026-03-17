import { statusColor } from '@/components/admin/statusColor';
import { getOrders } from '@/lib/orders/getOrders';
import Link from 'next/link';

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div style={{ padding: '40px' }}>
      <h1>Orders</h1>

      <table style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th align="left">Order</th>
            <th align="left">Customer</th>
            <th align="left">Total</th>
            <th align="left">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order: any) => (
            <tr key={order.id}>
              <td>
                <Link href={`/admin/orders/${order.id}`}>
                  #{order.orderNumber}
                </Link>
              </td>

              <td>{order.customer?.name}</td>

              <td>{order.total}</td>

              <td>
                <span
                  style={{
                    color: 'white',
                    background: statusColor(order.status || 'new'),
                    padding: '4px 10px',
                    borderRadius: '6px',
                  }}
                >
                  {order.status || 'new'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
