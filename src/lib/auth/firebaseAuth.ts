import {
  getRedirectResult,
  signInWithRedirect,
  type AuthError,
  type User,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase/client';

const GOOGLE_RETURN_KEY = 'auth.googleReturnUrl';

export function storeGoogleReturnUrl(url: string) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(GOOGLE_RETURN_KEY, url);
  }
}

export function consumeGoogleReturnUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const value = sessionStorage.getItem(GOOGLE_RETURN_KEY);
  sessionStorage.removeItem(GOOGLE_RETURN_KEY);
  return value;
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

/** Redirect-based Google sign-in (reliable on production; avoids popup handler errors). */
export async function startGoogleSignIn(returnUrl: string): Promise<void> {
  storeGoogleReturnUrl(returnUrl);
  await signInWithRedirect(auth, googleProvider);
}

/** Call once after returning from Google OAuth redirect. */
export async function completeGoogleRedirectSignIn(): Promise<User | null> {
  const result = await getRedirectResult(auth);
  return result?.user ?? null;
}

export function getAuthErrorCode(err: unknown): string | undefined {
  return (err as AuthError)?.code;
}
