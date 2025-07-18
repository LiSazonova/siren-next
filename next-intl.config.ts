// const config = {
//   locales: ['en', 'uk'],
//   defaultLocale: 'en',
//   localePrefix: 'always'
// };

// export default config;

const nextIntl = require('next-intl/plugin')(
  {
    locales: ['en', 'ua'],
    defaultLocale: 'en',
    localePrefix: 'always'
  }
);

module.exports = nextIntl({
  experimental: { appDir: true }
});