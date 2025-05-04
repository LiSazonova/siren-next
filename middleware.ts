import createMiddleware from 'next-intl/middleware';

const locales = ['en', 'uk'];
const defaultLocale = 'en';

export default createMiddleware({
  locales,
  defaultLocale
});

export const config = {
  matcher: ['/', '/(en|uk)/:path*']
};