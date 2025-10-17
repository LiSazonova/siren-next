'use client';

import { use, useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/Icon';
import useAuthUser from '@/hooks/useAuthUser';
import { auth } from '@/lib/firebaseClient';
import { signOut } from 'firebase/auth';
import { useLocale, useTranslations } from 'next-intl';

export default function UserAuthToggle() {
  const { user, loading } = useAuthUser();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname() || '/';

  const t = useTranslations('toggleButtons');

  const close = () => setOpen(false);
  const toggle = () => setOpen((s) => !s);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current || !btnRef.current) return;
      if (!panelRef.current.contains(t) && !btnRef.current.contains(t)) close();
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/sessionLogout', { method: 'POST' });
    await signOut(auth);
    close();
    router.refresh();
  };

  // Не добавляем returnUrl, если уже на /signin|/signup
  const onAuthPage = /\/(en|ua)\/(signin|signup)(\/|$)/.test(pathname);
  const q = onAuthPage ? '' : `?returnUrl=${encodeURIComponent(pathname)}`;
  const loginHref = `/${locale}/signin${q}`;
  const registerHref = `/${locale}/signup${q}`;

  const displayName =
    user?.displayName?.trim() ||
    '' ||
    (user?.email ? user.email.split('@')[0] : '');

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Кабінет"
        className="p-1 hover:opacity-80 focus:outline-none"
      >
        <Icon name="user" alt="User" width={24} height={24} />
      </button>

      <div
        ref={panelRef}
        className={[
          'absolute right-0 top-full z-50 w-[260px]  bg-white',
          'overflow-hidden transition-all duration-200 ease-out',
          open
            ? 'opacity-100 translate-y-2 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none',
        ].join(' ')}
      >
        <div>
          {loading ? (
            <div className="py-2 text-center text-sm opacity-60">
              {t('loading')}
            </div>
          ) : user ? (
            <div className="flex flex-col gap-3">
              {displayName && (
                <div className="text-sm text-neutral-700">
                  {t('hello')},{' '}
                  <span className="font-medium">{displayName}</span>!
                </div>
              )}
              <button
                onClick={handleLogout}
                className="w-full rounded-xl bg-black text-center text-sm font-semibold uppercase text-white hover:opacity-90"
              >
                {t('logout')}
              </button>
            </div>
          ) : (
            <div className="flex flex-row">
              <Link
                href={loginHref}
                onClick={close}
                className="w-full border border-black px-4 py-3 text-center text-[18px] uppercase"
              >
                {t('login')}
              </Link>
              <Link
                href={registerHref}
                onClick={close}
                className="w-full border border-black px-4 py-3 text-center text-[18px] uppercase"
              >
                {t('register')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
