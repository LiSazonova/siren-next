interface Props {
  params: {
    id: string;
  };
}

export default function OrderPage({ params }: Props) {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Order #{params.id}</h1>
    </div>
  );
}
