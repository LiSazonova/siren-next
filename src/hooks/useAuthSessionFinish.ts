'use client';

import { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useLocale } from 'next-intl';
import { auth } from '@/lib/firebase/client';
import {
  completeFirebaseRedirect,
  createSessionFromUser,
  getAuthErrorCode,
  hardNavigate,
  resetRedirectResultCache,
  resolvePostLoginPath,
} from '@/lib/auth/firebaseAuth';

/**
 * On sign-in/sign-up pages: finish Firebase OAuth redirect + create __session cookie.
 */
export function useAuthSessionFinish(enabled = true) {
  const locale = useLocale();
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const finishing = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    resetRedirectResultCache();
    finishing.current = false;
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
          code === 'session-fail'
            ? 'session-fail'
            : 'google-failed',
        );
      }
    };

    const unsub = onAuthStateChanged(auth, finishSession);

    (async () => {
      await completeFirebaseRedirect();
      await auth.authStateReady();
      await finishSession(auth.currentUser);
    })();

    return () => {
      cancelled = true;
      unsub();
    };
  }, [enabled, locale]);

  return { working, error };
}
