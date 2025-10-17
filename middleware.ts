
// import createMiddleware from 'next-intl/middleware';

// export default createMiddleware({
//   locales: ['en', 'ua'],
//   defaultLocale: 'en',
//   localePrefix: 'always', 
// });

// export const config = {
//   matcher: ['/((?!_next|.*\\..*|api).*)']
// };

// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { adminAuth } from '@/lib/firebaseAdmin';

const intl = createIntlMiddleware({
  locales: ['en', 'ua'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export async function middleware(req: NextRequest) {
  // Сначала i18n (локализация путей/редиректы локали)
  const intlRes = intl(req);
  if (intlRes) {
    // next-intl всегда возвращает Response; продолжаем работу с тем же req/url,
    // но нам нужен актуальный pathname
  }

  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Извлечь локаль из первого сегмента
  const [ , maybeLocale ] = pathname.split('/');
  const locale = (maybeLocale === 'en' || maybeLocale === 'ua') ? maybeLocale : 'en';

  // Страницы авторизации — нельзя редиректить на себя же
  const isAuthPage =
    pathname === `/${locale}/signin` ||
    pathname === `/${locale}/signup`;

  // Защищённые страницы (добавляй сюда при необходимости новые)
  const isCheckout =
    pathname === `/${locale}/checkout` ||
    pathname.startsWith(`/${locale}/checkout/`);

  if (!isAuthPage && isCheckout) {
    const cookie = req.cookies.get('__session')?.value;

    if (!cookie) {
      url.pathname = `/${locale}/signin`;
      url.searchParams.set('returnUrl', pathname);
      return NextResponse.redirect(url);
    }

    try {
      await adminAuth.verifySessionCookie(cookie, true);
      // всё ок — пускаем дальше
      return intlRes || NextResponse.next();
    } catch {
      url.pathname = `/${locale}/signin`;
      url.searchParams.set('returnUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  return intlRes || NextResponse.next();
}

// Совместимо с твоим matcher
export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)'],
};
