import { auth } from '@/lib/firebase/client';
import { createSessionFromUser } from '@/lib/auth/firebaseAuth';

/** Sync Firebase login with httpOnly __session cookie (required by API routes). */
export async function ensureSessionCookie(): Promise<boolean> {
  if (!auth.currentUser) return false;
  try {
    await createSessionFromUser();
    return true;
  } catch {
    return false;
  }
}
