'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import { useLocale } from 'next-intl';

type ViewState =
  | 'checking' // проверяем код из письма
  | 'invalid' // код невалидный/просрочен
  | 'form' // форма ввода нового пароля
  | 'success'; // успех

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const locale = useLocale();
  const router = useRouter();

  const oobCode = params.get('oobCode') || ''; // код из ссылки
  const [view, setView] = useState<ViewState>('checking');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // 1) верифицируем код из письма
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!oobCode) throw new Error('missing-code');
        const emailFromCode = await verifyPasswordResetCode(auth, oobCode);
        if (!mounted) return;
        setEmail(emailFromCode);
        setView('form');
      } catch {
        if (!mounted) return;
        setView('invalid');
      }
    })();
    return () => {
      mounted = false;
    };
  }, [oobCode]);

  // 2) сабмит нового пароля
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Пароль має містити щонайменше 6 символів.');
      return;
    }
    if (password !== password2) {
      setError('Паролі не співпадають.');
      return;
    }

    setBusy(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setView('success');
    } catch (e: any) {
      // типовые коды: auth/expired-action-code, auth/invalid-action-code, auth/user-disabled …
      setError(
        'Не вдалося оновити пароль. Спробуйте знову або запросіть нове посилання.'
      );
    } finally {
      setBusy(false);
    }
  };

  // -------- Вьюшки --------

  if (view === 'checking') {
    return (
      <section className="w-screen min-h-screen bg-black text-white flex items-center justify-center">
        <p className="opacity-80">Перевіряємо посилання…</p>
      </section>
    );
  }

  if (view === 'invalid') {
    return (
      <section className="w-screen min-h-screen bg-black text-white flex items-center justify-center px-6 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-[138px]">
          <div className="max-w-[290px] md:max-w-[583px]">
            <Image
              src="/images/decorations/login_siren.svg"
              width={583}
              height={321}
              alt="Mermaid"
              className="w-full h-auto"
              priority
            />
          </div>
          <div className="text-center">
            <h1 className="font-[var(--font-lora)] text-[40px] md:text-[64px] uppercase">
              ПОСИЛАННЯ НЕДІЙСНЕ
            </h1>
            <p className="mt-6 opacity-80">
              Термін дії посилання минув або воно вже було використане.
            </p>
            <div className="mt-8">
              <Link
                href={`/${locale}/forgot-password`}
                className="underline text-[18px]"
              >
                Надіслати нове посилання
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (view === 'success') {
    return (
      <section className="w-screen min-h-screen bg-black text-white flex items-center justify-center px-6 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-[138px]">
          <div className="max-w-[290px] md:max-w-[583px]">
            <Image
              src="/images/decorations/login_siren.svg"
              width={583}
              height={321}
              alt="Mermaid"
              className="w-full h-auto"
              priority
            />
          </div>
          <div className="text-center">
            <h1 className="font-[var(--font-lora)] text-[40px] md:text-[64px] uppercase">
              ПАРОЛЬ ОНОВЛЕНО
            </h1>
            <p className="mt-6 opacity-80">
              Тепер ви можете увійти до облікового запису.
            </p>
            <div className="mt-10">
              <Link
                href={`/${locale}/signin`}
                className="bg-white text-black px-6 py-3 rounded-md uppercase text-[18px] hover:opacity-90"
              >
                Перейти до входу
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // view === 'form'
  return (
    <section className="w-screen min-h-screen bg-black text-white flex items-center justify-center px-6 py-8">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-[138px]">
        <div className="max-w-[290px] md:max-w-[583px]">
          <Image
            src="/images/decorations/login_siren.svg"
            width={583}
            height={321}
            alt="Mermaid"
            className="w-full h-auto"
            priority
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <h1 className="font-[var(--font-lora)] text-[40px] md:text-[64px] uppercase mb-6">
            НОВИЙ ПАРОЛЬ
          </h1>

          <p className="opacity-80 mb-4 text-[16px]">
            Обліковий запис: <span className="font-semibold">{email}</span>
          </p>

          {error && <p className="text-red-400 mb-4">{error}</p>}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-[320px] md:w-[401px]"
          >
            <label className="text-left mb-2">Введіть новий пароль</label>
            <div className="relative mb-4">
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
                placeholder="Новий пароль"
                className="h-[58px] w-full text-[20px] text-black rounded-md px-[18px] bg-white outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60 text-sm"
              >
                {showPwd ? 'Сховати' : 'Показати'}
              </button>
            </div>

            <label className="text-left mb-2">Повторіть пароль</label>
            <input
              type={showPwd ? 'text' : 'password'}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              minLength={6}
              required
              placeholder="Підтвердження пароля"
              className="h-[58px] w-full text-[20px] text-black rounded-md px-[18px] bg-white outline-none mb-6"
            />

            <button
              type="submit"
              disabled={busy}
              className="h-[58px] uppercase text-[24px] md:text-[28px] text-center bg-[var(--primary-color)] text-white rounded-md transition hover:opacity-90 active:opacity-80 disabled:opacity-60"
            >
              {busy ? 'Зберігаємо…' : 'Зберегти пароль'}
            </button>

            <p className="text-[18px] text-center text-[#747474] mt-6">
              <Link href={`/${locale}/signin`} className="hover:opacity-80">
                Повернутися до входу
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
