import { Suspense } from 'react';
import LoginClient from './loginClient';

type SearchParamsPromise = Promise<
  Record<string, string | string[] | undefined>
>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsPromise;
}) {
  const sp = await searchParams;
  const returnUrl =
    (Array.isArray(sp?.returnUrl) ? sp.returnUrl[0] : sp?.returnUrl) ?? '';

  return (
    <Suspense fallback={null}>
      <LoginClient returnUrl={returnUrl} />
    </Suspense>
  );
}
