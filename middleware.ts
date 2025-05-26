import createMiddleware from 'next-intl/middleware';

const locales = ['en', 'ua'];
const defaultLocale = 'en';

export default createMiddleware({
  locales,
  defaultLocale
});

export const config = {
  matcher: [
    '/((?!_next|.\..|api).*)'
    ]
};