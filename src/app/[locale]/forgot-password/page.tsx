'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import { useLocale, useTranslations } from 'next-intl';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('forgotPassword');

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(null);
  //   setLoading(true);
  //   try {
  //     await sendPasswordResetEmail(auth, email);
  //     setSent(true);
  //   } catch (e: any) {
  //     if (e?.code === 'auth/user-not-found') {
  //       setError('Користувача з таким email не знайдено.');
  //     } else if (e?.code === 'auth/invalid-email') {
  //       setError('Невірний email.');
  //     } else {
  //       setError('Не вдалося надіслати лист. Спробуйте пізніше.');
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const origin =
        typeof window !== 'undefined' ? window.location.origin : '';
      // куда попадёт пользователь после клика по письму
      const url = `${origin}/${locale}/reset-password`;

      await sendPasswordResetEmail(auth, email, {
        url, // наш экран сброса пароля
        handleCodeInApp: true, // пусть обрабатывает наш фронт
      });

      setSent(true);
    } catch (e: any) {
      if (e?.code === 'auth/user-not-found') {
        setError('Користувача з таким email не знайдено.');
      } else if (e?.code === 'auth/invalid-email') {
        setError('Невірний email.');
      } else {
        setError('Не вдалося надіслати лист. Спробуйте пізніше.');
      }
    } finally {
      setLoading(false);
    }
  };

  // --------- Екран 2: "Перевірте пошту" ----------
  if (sent) {
    return (
      <section className="w-screen min-h-screen bg-black text-white flex items-center justify-center px-6 py-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-1 md:gap-12">
          {/* Мермайд */}
          <div className="max-w-[290px] md:max-w-[583px]">
            <Image
              src="/images/decorations/siren_3.svg"
              width={583}
              height={321}
              alt="Mermaid"
              className="max-w-[290px] md:max-w-[424px]"
              priority
            />
          </div>

          {/* Текст */}
          <div className="text-center">
            <h1 className="font-lora text-[40px] md:text-[64px] uppercase">
              {t('titleCheck')}
            </h1>
          </div>
        </div>
      </section>
    );
  }

  // --------- Екран 1: "Забули пароль?" ----------
  return (
    <section className="w-screen min-h-screen bg-black text-white flex items-center justify-center px-6 py-8">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-1">
        {/* Мермайд */}
        <div className="w-[175px] h-[290px] md:w-[350px] md:h-[583px]">
          <Image
            src="/images/decorations/siren_3.svg"
            width={583}
            height={583}
            alt="Mermaid"
            className="w-full h-auto"
            priority
          />
        </div>
        {/* Форма */}
        <div className="flex flex-col items-center w-[320px] md:w-[728px] lg:w-[460px]">
          <h1 className="font-lora text-[40px] md:text-[64px] uppercase mb-6">
            {t('title')}
          </h1>

          {error && (
            <p className="text-red-400 text-sm md:text-base mb-4">{error}</p>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-[320px] md:w-full"
          >
            <label htmlFor="email" className="text-[18px] text-left mb-3">
              {t('labelEmail')}
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder')}
              className="h-[58px] text-[20px] text-black px-[18px] mb-6 bg-white placeholder:text-[18px] placeholder:text-[#747474] outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="h-[58px] uppercase text-[24px] md:text-[28px] text-center"
            >
              {loading ? t('loading') : t('sendButton')}
            </button>

            <p className="text-[18px] text-center text-[#747474] mt-6">
              <Link href={`/${locale}/signup`} className="hover:opacity-80">
                {t('noProfile')}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
