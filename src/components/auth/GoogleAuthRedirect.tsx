'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { isAuthPath } from '@/lib/auth/firebaseAuth';
import { useAuthSessionFinish } from '@/hooks/useAuthSessionFinish';

export default function GoogleAuthRedirect() {
  const pathname = usePathname() || '/';
  const t = useTranslations('authErrors');
  const { working, error } = useAuthSessionFinish(isAuthPath(pathname));

  if (!isAuthPath(pathname) || (!working && !error)) return null;

  return (
    <p
      role="status"
      className="fixed top-24 left-1/2 z-50 -translate-x-1/2 max-w-md px-4 py-2 text-center text-sm text-white bg-black/90"
    >
      {error === 'session-fail'
        ? t('sessionFailed')
        : error
          ? t('googleFailed')
          : t('completingSignIn')}
    </p>
  );
}
