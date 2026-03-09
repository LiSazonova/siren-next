import Link from 'next/link';

export default function ErrorPage() {
  return (
    <main className="max-w-[600px] mx-auto text-center py-32">
      <h1 className="text-3xl mb-6">Order error</h1>

      <p className="mb-8">Something went wrong while placing your order.</p>

      <Link href="/checkout" className="px-6 py-3 bg-black text-white">
        Try again
      </Link>
    </main>
  );
}
