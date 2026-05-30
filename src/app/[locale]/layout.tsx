import '@/app/globals.css';
import Header from '@/components/Header/Header';
import { ReactNode, Suspense } from 'react';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { ToastContainer } from 'react-toastify';
import Link from 'next/link';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      {children}

      <div className="border-t border-gray-200 py-6 mt-12">
        <div className="max-w-[1228px] mx-auto px-4">
          <div className="flex justify-center gap-8 text-sm">
            <Link href={`/${locale}/terms`} className="hover:underline">
              {locale === 'ua' ? 'Правила та Умови' : 'Terms and Conditions'}
            </Link>
            <Link href={`/${locale}/refund-policy`} className="hover:underline">
              {locale === 'ua' ? 'Політика Повернення' : 'Refund Policy'}
            </Link>
            <Link href={`/${locale}/contacts`} className="hover:underline">
              {locale === 'ua' ? 'Контакти' : 'Contacts'}
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </NextIntlClientProvider>
  );
}
