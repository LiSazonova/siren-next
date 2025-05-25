import { Inter, Lora, Lobster, Kaushan_Script } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { routing } from '@/i18n/routing';

import '@/app/globals.css';
import Header from '@/components/Header/Header';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: 'Siren',
  icons: {
    icon: '/favicon.ico',
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

const lobster = Lobster({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lobster',
});

const kaushan = Kaushan_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-kaushan',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${lora.variable} ${lobster.variable} ${kaushan.variable}`}
      >
        <NextIntlClientProvider locale={locale}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
