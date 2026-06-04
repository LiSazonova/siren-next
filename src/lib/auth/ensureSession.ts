import { auth } from '@/lib/firebase/client';

/** Sync Firebase login with httpOnly __session cookie (required by API routes). */
export async function ensureSessionCookie(): Promise<boolean> {
  const user = auth.currentUser;
  if (!user) return false;

  const idToken = await user.getIdToken(true);
  const res = await fetch('/api/sessionLogin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ idToken }),
  });

  return res.ok;
}
