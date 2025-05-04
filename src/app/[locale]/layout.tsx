// import type { Metadata } from 'next';
// import { Inter, Lora, Lobster, Kaushan_Script } from 'next/font/google';

// import { NextIntlClientProvider, hasLocale } from 'next-intl';
// import { notFound } from 'next/navigation';
// import { routing } from '@/i18n/routing';
// import LocaleSwitcher from '@/components/LocalSwitcher';

// import '@/app/globals.css';

// const inter = Inter({
//   subsets: ['latin'],
//   weight: '400',
//   variable: '--font-inter',
// });

// const lora = Lora({
//   subsets: ['latin'],
//   weight: '400',
//   variable: '--font-lora',
// });

// const lobster = Lobster({
//   subsets: ['latin'],
//   weight: '400',
//   variable: '--font-lobster',
// });

// const kaushan = Kaushan_Script({
//   subsets: ['latin'],
//   weight: '400',
//   variable: '--font-kaushan',
// });

// export const metadata: Metadata = {
//   title: 'Siren',
//   icons: {
//     icon: '/favicon.ico',
//   },
// };

// export default async function LocaleLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: Promise<{ locale: string }>;
// }) {
//   // Ensure that the incoming `locale` is valid
//   const { locale } = await params;
//   if (!hasLocale(routing.locales, locale)) {
//     notFound();
//   }

//   return (
//     <html lang={locale}>
//       <body>
//         <NextIntlClientProvider>
//           <LocaleSwitcher />
//           {children}
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${inter.variable} ${lora.variable} ${lobster.variable} ${kaushan.variable}`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
import { notFound } from 'next/navigation';
import { Locale, hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import LocaleSwitcher from '@/components/LocalSwitcher';

import '@/app/globals.css';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

  return {
    title: t('title'),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <LocaleSwitcher />
          {/* <Navigation /> тут должен быть Header */}
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
