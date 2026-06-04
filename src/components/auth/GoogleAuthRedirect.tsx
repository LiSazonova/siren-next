'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
  completeGoogleRedirectSignIn,
  consumeGoogleReturnUrl,
  createSessionFromUser,
  getAuthErrorCode,
} from '@/lib/auth/firebaseAuth';

export default function GoogleAuthRedirect() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('authErrors');
  const [error, setError] = useState<string | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    (async () => {
      try {
        const user = await completeGoogleRedirectSignIn();
        if (!user) return;

        await createSessionFromUser();
        const stored = consumeGoogleReturnUrl();
        router.replace(stored || `/${locale}`);
      } catch (err: unknown) {
        const code = getAuthErrorCode(err);
        if (code === 'auth/popup-closed-by-user') return;
        setError(t('googleFailed'));
      }
    })();
  }, [locale, router, t]);

  if (!error) return null;

  return (
    <p
      role="alert"
      className="fixed top-24 left-1/2 z-50 -translate-x-1/2 max-w-md px-4 py-2 text-center text-sm text-red-400 bg-black/90"
    >
      {error}
    </p>
  );
}
