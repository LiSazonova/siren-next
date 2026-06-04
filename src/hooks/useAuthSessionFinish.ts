'use client';

import { useEffect, useRef, useState } from 'react';
import { type User } from 'firebase/auth';
import { useLocale } from 'next-intl';
import { auth } from '@/lib/firebase/client';
import {
  clearGoogleReturnStorage,
  completeFirebaseRedirect,
  createSessionFromUser,
  getAuthErrorCode,
  hardNavigate,
  isLocalDevHost,
  resolvePostLoginPath,
  wasGoogleRedirectStarted,
} from '@/lib/auth/firebaseAuth';

/**
 * Finishes Firebase OAuth redirect (popup-blocked fallback) + creates __session cookie.
 */
export function useAuthSessionFinish(enabled = true) {
  const locale = useLocale();
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const finishing = useRef(false);

  useEffect(() => {
    if (!enabled || isLocalDevHost()) return;

    let cancelled = false;

    const finishSession = async (user: User | null) => {
      if (cancelled || !user || finishing.current) return;

      finishing.current = true;
      setWorking(true);
      setError(null);

      try {
        await createSessionFromUser();
        if (cancelled) return;
        hardNavigate(resolvePostLoginPath(locale));
      } catch (err: unknown) {
        finishing.current = false;
        setWorking(false);
        if (cancelled) return;
        const code = getAuthErrorCode(err);
        if (code === 'auth/popup-closed-by-user') return;
        setError(
          code === 'session-fail' ? 'session-fail' : 'google-failed',
        );
      }
    };

    (async () => {
      if (!wasGoogleRedirectStarted()) return;

      setWorking(true);
      setError(null);

      await completeFirebaseRedirect();
      await auth.authStateReady();
      if (cancelled) return;

      const user = auth.currentUser;
      if (user) {
        await finishSession(user);
        return;
      }

      // Stale or failed redirect — clear flag, no banner (user can click Google again)
      clearGoogleReturnStorage();
      finishing.current = false;
      setWorking(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [enabled, locale]);

  return { working, error };
}
