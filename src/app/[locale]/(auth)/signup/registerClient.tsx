'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  createSessionFromUser,
  getAuthErrorCode,
  hardNavigate,
  isCheckoutReturnUrl,
  registerWithEmailOrSignIn,
  signInWithGoogle,
} from '@/lib/auth/firebaseAuth';
import { useAuthSessionFinish } from '@/hooks/useAuthSessionFinish';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import { useLocale, useTranslations } from 'next-intl';

type Props = { returnUrl?: string };

export default function RegisterClient({ returnUrl = '' }: Props) {
  const locale = useLocale();
  const t = useTranslations('registerPage');
  const tErr = useTranslations('authErrors');
  const { working: googleWorking, error: googleError } =
    useAuthSessionFinish(true);

  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const getSafeReturn = () => {
    const raw = returnUrl;
    const isAuth = /\/(en|ua)\/(signin|signup)(\/|$)/.test(raw);
    return isAuth ? `/${locale}` : raw || `/${locale}`;
  };

  const signinHref = returnUrl
    ? `/${locale}/signin?returnUrl=${encodeURIComponent(returnUrl)}`
    : `/${locale}/signin`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await registerWithEmailOrSignIn(
        form.email,
        form.password,
        form.username,
      );
      await createSessionFromUser();
      hardNavigate(getSafeReturn());
    } catch (err: unknown) {
      const code = getAuthErrorCode(err);
      if (code === 'auth/weak-password') setError(tErr('weakPassword'));
      else if (
        code === 'auth/invalid-credential' ||
        code === 'auth/wrong-password'
      ) {
        setError(tErr('emailInUseWrongPassword'));
      } else if ((err as Error)?.message?.includes('session-fail')) {
        setError(tErr('sessionFailed'));
      } else setError(tErr('registerFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle(getSafeReturn(), locale);
    } catch (err: unknown) {
      const code = getAuthErrorCode(err);
      if (code === 'auth/popup-closed-by-user') {
        setLoading(false);
        return;
      }
      if (code === 'auth/popup-blocked') setError(tErr('popupBlocked'));
      else if (code === 'session-fail') setError(tErr('sessionFailed'));
      else setError(tErr('googleFailed'));
      setLoading(false);
    }
  };

  const displayError =
    error ||
    (googleError === 'session-fail'
      ? tErr('sessionFailed')
      : googleError
        ? tErr('googleFailed')
        : null);

  return (
    <section className="w-screen min-h-screen bg-black text-white px-5 py-6">
      <div className="flex flex-col-reverse items-center lg:flex-row lg:justify-center lg:gap-[138px]">
        <div className="w-[175px] h-[290px] md:w-[350px] md:h-[583px]">
          <Image
            src="/Images/decorations/registr_siren.svg"
            width={583}
            height={583}
            alt="Registration Decoration"
            className="w-full h-auto"
            priority
          />
        </div>

        <div className="flex flex-col items-center w-full max-w-[401px]">
          <h1 className="font-lora text-[40px] md:text-[64px] leading-tight text-center uppercase mb-6">
            {t('title')}
          </h1>

          {isCheckoutReturnUrl(returnUrl) && (
            <p className="mb-6 text-center text-[#c8c8c8] text-sm md:text-base max-w-[401px]">
              {t('checkoutRequired')}
            </p>
          )}

          {displayError && (
            <p
              role="alert"
              aria-live="assertive"
              className="text-[16px] md:text-[18px] text-center text-red-400 mb-4"
            >
              {displayError}
            </p>
          )}

          {googleWorking && (
            <p className="mb-4 text-center text-[#747474] text-sm">
              {tErr('completingSignIn')}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-[401px]"
          >
            <label
              htmlFor="username"
              className="font-inter text-[18px] text-left mb-3"
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
              className="w-full h-[58px] text-[20px] text-black placeholder:text-[18px] placeholder:text-[#747474] bg-white outline-none px-[18px] mb-6"
            />

            <label htmlFor="email" className="font-inter text-[18px] text-left mb-3">
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
              className="w-full h-[58px] text-[20px] text-black placeholder:text-[18px] placeholder:text-[#747474] bg-white outline-none px-[18px] mb-6"
            />

            <label
              htmlFor="password"
              className="font-inter text-[18px] text-left mb-3"
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
              className="w-full h-[58px] text-[20px] text-black placeholder:text-[18px] placeholder:text-[#747474] bg-white outline-none px-[18px] mb-6"
            />

            <button
              type="submit"
              disabled={loading || googleWorking}
              className="w-full h-[58px] font-lora text-[24px] md:text-[28px] leading-5 uppercase text-white text-center bg-[#747474] hover:opacity-90 disabled:opacity-60 mb-3 transition"
            >
              {loading ? t('loading') : t('signupButton')}
            </button>

            <GoogleSignInButton
              label={t('googleButton')}
              loading={loading || googleWorking}
              disabled={loading || googleWorking}
              onClick={handleGoogle}
            />

            <p className="text-[18px] text-center text-[#747474] mt-9">
              <Link href={signinHref}>{t('haveProfile')}</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
