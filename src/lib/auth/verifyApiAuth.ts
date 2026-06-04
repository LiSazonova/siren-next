import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';

export async function verifyApiAuth(req: Request): Promise<boolean> {
  const session = (await cookies()).get('__session')?.value;
  if (session) {
    try {
      await adminAuth.verifySessionCookie(session, true);
      return true;
    } catch {
      // try Bearer token below
    }
  }

  const header = req.headers.get('Authorization');
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return false;

  try {
    await adminAuth.verifyIdToken(token);
    return true;
  } catch {
    return false;
  }
}
