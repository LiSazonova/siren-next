'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import {
  createSessionFromUser,
  getAuthErrorCode,
  hardNavigate,
  isCheckoutReturnUrl,
  signInWithGoogle,
} from '@/lib/auth/firebaseAuth';
import { useAuthSessionFinish } from '@/hooks/useAuthSessionFinish';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import { useLocale, useTranslations } from 'next-intl';

type Props = { returnUrl?: string };

export default function LoginClient({ returnUrl = '' }: Props) {
  const locale = useLocale();
  const t = useTranslations('loginPage');
  const tErr = useTranslations('authErrors');
  const { working: googleWorking, error: googleError } = useAuthSessionFinish(true);

  const [form, setForm] = useState({ identifier: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const getSafeReturn = () => {
    const raw = returnUrl;
    const isAuth = /\/(en|ua)\/(signin|signup)(\/|$)/.test(raw);
    return isAuth ? `/${locale}` : raw || `/${locale}`;
  };

  const signupHref = returnUrl
    ? `/${locale}/signup?returnUrl=${encodeURIComponent(returnUrl)}`
    : `/${locale}/signup`;

  const finishLogin = async () => {
    await createSessionFromUser();
    hardNavigate(getSafeReturn());
  };

  const mapLoginError = (err: unknown) => {
    const code = getAuthErrorCode(err);
    const msg = (err as Error)?.message ?? '';
    if (
      code === 'auth/invalid-credential' ||
      code === 'auth/wrong-password' ||
      code === 'auth/user-not-found' ||
      code === 'auth/invalid-email'
    ) {
      return tErr('invalidCredentials');
    }
    if (msg.includes('session-fail') || msg.includes('no-id-token')) {
      return tErr('sessionFailed');
    }
    return tErr('generic');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.identifier, form.password);
      await finishLogin();
    } catch (err: unknown) {
      setError(mapLoginError(err));
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

  return (
    <section className="bg-black text-white w-screen min-h-screen px-5 py-6">
      <div className="flex flex-col-reverse items-center lg:flex-row lg:justify-center lg:gap-[138px]">
        <div className="max-w-[290px] md:max-w-[583px]">
          <Image
            src="/Images/decorations/login_siren.svg"
            width={583}
            height={321}
            alt="Login Decoration"
            className="w-full h-auto"
            priority
          />
        </div>

        <div className="flex flex-col items-center w-full max-w-[401px]">
          <h1 className="font-lora text-[40px] md:text-[64px] text-center uppercase mb-6 md:mb-12">
            {t('title')}
          </h1>

          {isCheckoutReturnUrl(returnUrl) && (
            <p className="mb-6 text-center text-[#c8c8c8] text-sm md:text-base max-w-[401px]">
              {t('checkoutRequired')}
            </p>
          )}

          {(error || googleError) && (
            <p
              role="alert"
              className="mb-4 text-center text-red-400 text-sm md:text-base"
            >
              {error ||
                (googleError === 'session-fail'
                  ? tErr('sessionFailed')
                  : tErr('googleFailed'))}
            </p>
          )}

          {googleWorking && (
            <p className="mb-4 text-center text-[#747474] text-sm">
              {tErr('completingSignIn')}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-[401px] gap-0"
          >
            <label
              htmlFor="identifier"
              className="font-inter text-[18px] text-left mb-3"
            >
              {t('labelEmail')}
            </label>
            <input
              type="email"
              name="identifier"
              id="identifier"
              placeholder={t('email')}
              value={form.identifier}
              onChange={handleChange}
              required
              autoComplete="email"
              className="text-[20px] h-[58px] w-full text-black outline-none px-[18px] mb-6 placeholder:text-[18px] placeholder:text-[#747474] bg-white"
            />

            <label
              htmlFor="password"
              className="font-inter text-[18px] text-left mb-3"
            >
              {t('labelPassword')}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder={t('password')}
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="text-[20px] h-[58px] w-full text-black outline-none px-[18px] mb-3 placeholder:text-[18px] placeholder:text-[#747474] bg-white"
            />

            <p className="text-[18px] text-right text-[#747474] mb-8">
              <Link href={`/${locale}/forgot-password`}>
                {t('forgotPassword')}
              </Link>
            </p>

            <button
              type="submit"
              disabled={loading || googleWorking}
              className="w-full h-[58px] font-lora text-[24px] md:text-[28px] leading-5 uppercase text-white text-center bg-[#747474] hover:opacity-90 disabled:opacity-60 mb-3 transition"
            >
              {loading ? t('loading') : t('signinButton')}
            </button>

            <GoogleSignInButton
              label={t('googleButton')}
              loading={loading || googleWorking}
              disabled={loading || googleWorking}
              onClick={handleGoogle}
            />

            <p className="text-center font-inter text-[18px] uppercase text-[#747474] mt-9">
              <Link href={signupHref}>{t('noProfile')}</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
