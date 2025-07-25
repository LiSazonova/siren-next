// src/app/[locale]/layout.tsx
import '@/app/globals.css';
import Header from '@/components/Header/Header';
import { ReactNode } from 'react';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

// Генерация путей для статической предгенерации
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  // Обратите внимание: params всё ещё описываем как объект,
  // но фактически Next.js передаёт его как Promise.
  params: {
    locale: string;
  };
};

// Делаем компонент async, чтобы распаковать params:
export default async function LocaleLayout({ children, params }: Props) {
  // <- вот эта строка ключевая:
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Устанавливаем локаль на сервере
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale}>
      <Header />
      {children}
    </NextIntlClientProvider>
  );
}
