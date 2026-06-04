const nextIntl = require('next-intl/plugin')(
  {
    locales: ['ua', 'en'],
    defaultLocale: 'ua',
    localeDetection: false,
    localePrefix: 'always'
  }
);

module.exports = nextIntl({
  experimental: { appDir: true }
});