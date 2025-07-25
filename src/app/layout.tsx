import './globals.css';
import type { ReactNode } from 'react';
import { Inter, Lora, Lobster, Kaushan_Script } from 'next/font/google';

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

type RootProps = { children: ReactNode };

export default function RootLayout({ children }: RootProps) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} ${lobster.variable} ${kaushan.variable}`}
    >
      <head />
      <body>{children}</body>
    </html>
  );
}
