import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="max-w-[600px] mx-auto text-center py-32">
      <h1 className="text-3xl mb-6">Thank you for your order</h1>

      <p className="mb-8">Your order has been successfully placed.</p>

      <Link href="/" className="px-6 py-3 bg-black text-white">
        Continue shopping
      </Link>
    </main>
  );
}
