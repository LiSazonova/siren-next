'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { useLocale, useTranslations } from 'next-intl';

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('resetPassword');

  const mode = searchParams.get('mode');
  const oobCode = searchParams.get('oobCode');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [linkValid, setLinkValid] = useState(false);
  const [done, setDone] = useState(false);

  const invalidLink = !oobCode || mode !== 'resetPassword';

  useEffect(() => {
    if (invalidLink) {
      setChecking(false);
      return;
    }

    verifyPasswordResetCode(auth, oobCode)
      .then(() => setLinkValid(true))
      .catch(() => setLinkValid(false))
      .finally(() => setChecking(false));
  }, [oobCode, invalidLink]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oobCode) return;

    if (password.length < 6) {
      setError(t('weakPassword'));
      return;
    }
    if (password !== confirm) {
      setError(t('mismatch'));
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setDone(true);
      setTimeout(() => router.push(`/${locale}/signin`), 2500);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === 'auth/expired-action-code' || code === 'auth/invalid-action-code') {
        setError(t('expiredLink'));
      } else if (code === 'auth/weak-password') {
        setError(t('weakPassword'));
      } else {
        setError(t('failed'));
      }
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <section className="w-screen min-h-screen bg-black text-white flex items-center justify-center px-6 py-8">
        <div className="text-center max-w-md">
          <h1 className="font-lora text-[32px] md:text-[48px] uppercase mb-4">
            {t('successTitle')}
          </h1>
          <p className="text-[#747474]">{t('successHint')}</p>
        </div>
      </section>
    );
  }

  if (checking) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>{t('loading')}</p>
      </section>
    );
  }

  if (invalidLink || !linkValid) {
    return (
      <section className="w-screen min-h-screen bg-black text-white flex items-center justify-center px-6 py-8">
        <div className="text-center max-w-md space-y-6">
          <h1 className="font-lora text-[32px] md:text-[48px] uppercase">
            {t('invalidTitle')}
          </h1>
          <p className="text-red-400">{error ?? t('invalidLink')}</p>
          <p className="text-[#747474] text-sm">{t('alreadyChangedHint')}</p>
          <div className="flex flex-col gap-3">
            <Link
              href={`/${locale}/signin`}
              className="uppercase border border-white px-6 py-3 hover:bg-white hover:text-black transition"
            >
              {t('goSignIn')}
            </Link>
            <Link
              href={`/${locale}/forgot-password`}
              className="text-[#747474] hover:text-white"
            >
              {t('requestAgain')}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-screen min-h-screen bg-black text-white flex items-center justify-center px-6 py-8">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8">
        <div className="max-w-[290px] md:max-w-[424px]">
          <Image
            src="/Images/decorations/siren_3.svg"
            width={583}
            height={321}
            alt="Mermaid"
            className="w-full h-auto"
            priority
          />
        </div>

        <div className="flex flex-col items-center w-[320px] md:w-[460px]">
          <h1 className="font-lora text-[40px] md:text-[56px] uppercase mb-6 text-center">
            {t('title')}
          </h1>

          {error && (
            <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
            <label htmlFor="password" className="text-[18px] text-left">
              {t('newPassword')}
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-[58px] text-[20px] text-black px-[18px] bg-white outline-none"
            />

            <label htmlFor="confirm" className="text-[18px] text-left">
              {t('confirmPassword')}
            </label>
            <input
              id="confirm"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="h-[58px] text-[20px] text-black px-[18px] bg-white outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-[58px] uppercase text-[24px] md:text-[28px]"
            >
              {loading ? t('saving') : t('saveButton')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
