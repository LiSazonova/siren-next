import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const intl = createIntlMiddleware(routing);

export async function middleware(req: NextRequest) {
  const intlRes = intl(req);
  return intlRes || NextResponse.next();
}

// Совместимо с твоим matcher
export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)'],
};
