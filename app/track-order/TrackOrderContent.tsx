// app/track-order/TrackOrderContent.tsx
'use client';

import { useSearchParams } from 'next/navigation';

export default function TrackOrderContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');

  return (
    <div>
      {orderId ? <p>Order ID: {orderId}</p> : <p>No order number provided in URL.</p>}
    </div>
  );
}