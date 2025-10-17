'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebaseClient';
import { useLocale, useTranslations } from 'next-intl';

export default function RegisterPage() {
  const router = useRouter();
  const params = useSearchParams();
  const locale = useLocale();

  const t = useTranslations('registerPage');

  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Не возвращаем на /signin|/signup (чтобы не прыгало назад)
  const getSafeReturn = () => {
    const raw = params.get('returnUrl') || '';
    const isAuth = /\/(en|ua)\/(signin|signup)(\/|$)/.test(raw);
    // Для реєстрації логичнее дефолт на checkout
    return isAuth ? `/${locale}/checkout` : raw || `/${locale}/checkout`;
  };

  const finishLogin = async () => {
    const idToken = await auth.currentUser?.getIdToken(true);
    if (!idToken) throw new Error('no-id-token');
    const res = await fetch('/api/sessionLogin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });
    if (!res.ok) throw new Error('session-fail');
    router.push(getSafeReturn());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // Сохраняем ім’я в профиле — понадобится для приветствия
      if (user && form.username.trim()) {
        await updateProfile(user, { displayName: form.username.trim() });
      }

      await finishLogin();
    } catch (err: any) {
      if (err?.code === 'auth/weak-password')
        setError('Занадто простий пароль (мінімум 6 символів).');
      else if (err?.code === 'auth/email-already-in-use')
        setError('Цей email вже використовується.');
      else if (err?.code === 'session-fail')
        setError('Не вдається створити сесію. Спробуйте ще раз.');
      else setError('Помилка реєстрації. Спробуйте пізніше.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      await finishLogin();
    } catch {
      setError('Не вдалося увійти через Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-screen min-h-screen bg-black text-white px-5 py-6">
      <div className="flex flex-col-reverse items-center lg:flex-row lg:justify-center lg:gap-[138px]">
        {/* Декорація */}
        <div className="w-[175px] h-[290px] md:w-[350px] md:h-[583px]">
          <Image
            src="/images/decorations/registr_siren.svg"
            width={583}
            height={583}
            alt="Registration Decoration"
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Форма */}
        <div className="flex flex-col items-center">
          <h1 className="font-[var(--font-lora)] text-[40px] md:text-[64px] leading-[51.2px] md:leading-[81.92px] text-center uppercase text-[var(--white-color)] mb-6">
            {t('title')}
          </h1>

          {error && (
            <p
              aria-live="assertive"
              className="text-[16px] md:text-[18px] text-center text-[var(--red-color)] mb-4"
            >
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-[320px] md:w-[728px] lg:w-[401px]"
          >
            <label
              htmlFor="username"
              className="w-full max-w-[728px] font-[var(--font-inter)] text-[18px] leading-[21.78px] text-left text-[var(--white-color)] mb-3"
            >
              {t('username')}
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
              placeholder={t('usernamePlaceholder')}
              autoComplete="name"
              className="w-[320px] md:w-[728px] lg:w-[401px] h-[58px] text-[20px] leading-[24.2px] text-black placeholder:text-[18px] placeholder:leading-[21.78px] placeholder:text-[var(--primary-color)] bg-white rounded-md outline-none px-[18px] mb-6"
            />

            <label
              htmlFor="email"
              className="w-full max-w-[728px] font-[var(--font-inter)] text-[18px] leading-[21.78px] text-left text-[var(--white-color)] mb-3"
            >
              {t('email')}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t('emailPlaceholder')}
              required
              autoComplete="email"
              className="w-[320px] md:w-[728px] lg:w-[401px] h-[58px] text-[20px] leading-[24.2px] text-black placeholder:text-[18px] placeholder:leading-[21.78px] placeholder:text-[var(--primary-color)] bg-white rounded-md outline-none px-[18px] mb-6"
            />

            <label
              htmlFor="password"
              className="w-full max-w-[728px] font-[var(--font-inter)] text-[18px] leading-[21.78px] text-left text-[var(--white-color)] mb-3"
            >
              {t('password')}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              placeholder={t('passwordPlaceholder')}
              required
              autoComplete="new-password"
              minLength={6}
              className="w-[320px] md:w-[728px] lg:w-[401px] h-[58px] text-[20px] leading-[24.2px] text-black placeholder:text-[18px] placeholder:leading-[21.78px] placeholder:text-[var(--primary-color)] bg-white rounded-md outline-none px-[18px] mb-6"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-[320px] md:w-[728px] lg:w-[401px] h-[58px] font-[var(--font-lora)] text-[24px] md:text-[28px] leading-5 uppercase text-[var(--white-color)] text-center bg-[var(--primary-color)] rounded-md cursor-pointer mt-0 md:mt-6 mb-3 transition hover:opacity-90 active:opacity-80 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 focus:ring-offset-[var(--black-color)] disabled:opacity-60"
            >
              {loading ? t('loading') : t('signupButton')}
            </button>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="w-[320px] md:w-[728px] lg:w-[401px] h-[48px] text-[16px] uppercase text-black bg-white rounded-md border border-neutral-200 hover:border-black disabled:opacity-60"
            >
              {t('googleButton')}
            </button>

            <p className="text-[18px] leading-[21.78px] text-center text-[var(--primary-color)] mb-8 md:mb-[38px]">
              <Link href={`/${locale}/signin`}>{t('haveProfile')}</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
