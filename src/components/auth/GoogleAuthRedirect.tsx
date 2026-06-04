'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
  consumeGoogleReturnUrl,
  createSessionFromUser,
  getAuthErrorCode,
  hasPendingGoogleSignIn,
  resolveGoogleRedirectUser,
} from '@/lib/auth/firebaseAuth';

export default function GoogleAuthRedirect() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('authErrors');
  const [status, setStatus] = useState<'idle' | 'working' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasPendingGoogleSignIn()) return;

    setStatus('working');

    (async () => {
      try {
        const user = await resolveGoogleRedirectUser();
        if (!user) {
          setStatus('idle');
          return;
        }

        await createSessionFromUser();
        const stored = consumeGoogleReturnUrl();
        const path = stored || `/${locale}`;
        router.replace(path);
        router.refresh();
        setTimeout(() => {
          if (window.location.pathname.includes('/signin')) {
            window.location.assign(path);
          }
        }, 800);
      } catch (err: unknown) {
        const code = getAuthErrorCode(err);
        if (code === 'auth/popup-closed-by-user') {
          consumeGoogleReturnUrl();
          setStatus('idle');
          return;
        }
        setError(t('googleFailed'));
        setStatus('error');
      }
    })();
  }, [locale, router, t]);

  if (status !== 'working' && !error) return null;

  return (
    <p
      role="status"
      className="fixed top-24 left-1/2 z-50 -translate-x-1/2 max-w-md px-4 py-2 text-center text-sm text-white bg-black/90"
    >
      {error ?? t('completingSignIn')}
    </p>
  );
}
