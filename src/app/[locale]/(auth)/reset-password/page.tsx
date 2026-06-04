import { Suspense } from 'react';
import ResetPasswordClient from './ResetPasswordClient';

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <section className="min-h-screen bg-black text-white flex items-center justify-center">
          <p>Loading…</p>
        </section>
      }
    >
      <ResetPasswordClient />
    </Suspense>
  );
}
