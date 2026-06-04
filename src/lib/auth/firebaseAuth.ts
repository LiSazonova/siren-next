import {
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
  type AuthError,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase/client';

const GOOGLE_RETURN_KEY = 'auth.googleReturnUrl';
const GOOGLE_RETURN_BACKUP_KEY = 'auth.googleReturnUrl.backup';
const GOOGLE_REDIRECT_STARTED = 'auth.googleRedirectStarted';

export function resetRedirectResultCache() {
  redirectResultPromise = null;
}

let redirectResultPromise: Promise<void> | null = null;

function isLocalDevHost(): boolean {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1';
}

export function storeGoogleReturnUrl(url: string) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(GOOGLE_RETURN_KEY, url);
  localStorage.setItem(GOOGLE_RETURN_BACKUP_KEY, url);
  sessionStorage.setItem(GOOGLE_REDIRECT_STARTED, '1');
  localStorage.setItem(GOOGLE_REDIRECT_STARTED, '1');
}

function peekGoogleReturnUrl(): string | null {
  if (typeof window === 'undefined') return null;
  return (
    sessionStorage.getItem(GOOGLE_RETURN_KEY) ||
    localStorage.getItem(GOOGLE_RETURN_BACKUP_KEY)
  );
}

function clearGoogleReturnStorage() {
  sessionStorage.removeItem(GOOGLE_RETURN_KEY);
  sessionStorage.removeItem(GOOGLE_REDIRECT_STARTED);
  localStorage.removeItem(GOOGLE_RETURN_BACKUP_KEY);
  localStorage.removeItem(GOOGLE_REDIRECT_STARTED);
}

/** Resolve where to send the user after login (storage → ?returnUrl= → /locale). */
export function resolvePostLoginPath(locale: string): string {
  const stored = peekGoogleReturnUrl();
  clearGoogleReturnStorage();
  if (stored) return stored;

  if (typeof window !== 'undefined') {
    const fromQuery = new URLSearchParams(window.location.search).get(
      'returnUrl',
    );
    if (fromQuery?.startsWith('/')) return fromQuery;
  }

  return `/${locale}`;
}

export async function createSessionFromUser(): Promise<void> {
  const idToken = await auth.currentUser?.getIdToken(true);
  if (!idToken) throw new Error('no-id-token');

  const res = await fetch('/api/sessionLogin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ idToken }),
  });

  if (!res.ok) throw new Error('session-fail');
}

/**
 * Google sign-in: popup on localhost (reliable in dev), redirect on production.
 */
export async function signInWithGoogle(returnUrl: string, locale: string): Promise<void> {
  storeGoogleReturnUrl(returnUrl);

  if (isLocalDevHost()) {
    await signInWithPopup(auth, googleProvider);
    await createSessionFromUser();
    hardNavigate(resolvePostLoginPath(locale));
    return;
  }

  await signInWithRedirect(auth, googleProvider);
}

/** @deprecated use signInWithGoogle */
export async function startGoogleSignIn(returnUrl: string): Promise<void> {
  storeGoogleReturnUrl(returnUrl);
  await signInWithRedirect(auth, googleProvider);
}

/** Firebase requires getRedirectResult once after OAuth redirect. */
export async function completeFirebaseRedirect(): Promise<void> {
  if (!redirectResultPromise) {
    redirectResultPromise = (async () => {
      await auth.authStateReady();
      try {
        await getRedirectResult(auth);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('[auth] getRedirectResult failed:', err);
        }
      }
    })();
  }
  await redirectResultPromise;
}

export function getAuthErrorCode(err: unknown): string | undefined {
  return (err as AuthError)?.code;
}

export function hardNavigate(path: string) {
  if (typeof window === 'undefined') return;
  window.location.replace(path);
}

export function isAuthPath(pathname: string): boolean {
  return (
    /\/(ua|en)\/(signin|signup)(\/|$)/.test(pathname) ||
    /^\/(signin|signup)(\/|$)/.test(pathname)
  );
}
