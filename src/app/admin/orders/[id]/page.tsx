interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;

  return (
    <div style={{ padding: '40px' }}>
      <h1>Order #{id}</h1>
    </div>
  );
}
