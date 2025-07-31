// src/app/[locale]/layout.tsx
// import '@/app/globals.css';
// import Header from '@/components/Header/Header';
// import { ReactNode } from 'react';
// import { routing } from '@/i18n/routing';
// import { notFound } from 'next/navigation';
// import { hasLocale, NextIntlClientProvider } from 'next-intl';
// import { setRequestLocale } from 'next-intl/server';

// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

// type Props = {
//   children: ReactNode;
//   params: {
//     locale: string;
//   };
// };

// export default async function LocaleLayout({ children, params }: Props) {
//   const { locale } = await params;

//   if (!hasLocale(routing.locales, locale)) {
//     notFound();
//   }

//   setRequestLocale(locale);

//   return (
//     <NextIntlClientProvider locale={locale}>
//       <Header />
//       {children}
//     </NextIntlClientProvider>
//   );
// }

// app/[locale]/layout.tsx
import '@/app/globals.css';
import Header from '@/components/Header/Header';
import { ReactNode } from 'react';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ToastContainer } from 'react-toastify';

type Props = {
  children: ReactNode;
  params: { locale: string }; // параметры приходят уже разобранными
};

// Чтобы Next.js знал, для каких локалей рендерить страницы
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  // Прямо здесь await, чтобы React знал, что это async-branch
  const { locale } = await params;

  // Пытаемся проверить локаль, если нет — 404
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Установить локаль для next-intl
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale}>
      <Header />
      {children}
      <ToastContainer position="top-right" />
    </NextIntlClientProvider>
  );
}
