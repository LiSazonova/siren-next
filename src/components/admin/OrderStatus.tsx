'use client';

import { useState } from 'react';

const statuses = [
  'new',
  'paid',
  'processing',
  'shipped',
  'completed',
  'cancelled',
];

export default function OrderStatus({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);

  async function changeStatus(e: any) {
    const newStatus = e.target.value;

    setStatus(newStatus);

    await fetch('/api/orders/update-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        status: newStatus,
      }),
    });

    location.reload();
  }

  return (
    <select
      value={status}
      onChange={changeStatus}
      style={{
        padding: '8px',
        marginTop: '10px',
      }}
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
