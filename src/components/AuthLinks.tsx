// import Link from 'next/link';
// import { useTranslations, useLocale } from 'next-intl';
// import { usePathname } from 'next/navigation';

// interface Props {
//   onClick?: () => void;
// }

// const AuthLinks: React.FC<Props> = ({ onClick }) => {
//   const t = useTranslations('AuthLinks');
//   const locale = useLocale();
//   const pathname = usePathname() || '/';
//   const ret = encodeURIComponent(pathname);

//   return (
//     <div className="flex flex-row items-center justify-center gap-8 py-8 px-6 text-[18px] border-b border-gray uppercase">
//       <Link
//         href={`/${locale}/signin?returnUrl=${ret}`}
//         onClick={onClick}
//         className="hover:underline"
//       >
//         {t('signin')}
//       </Link>
//       <Link
//         href={`/${locale}/signup?returnUrl=${ret}`}
//         onClick={onClick}
//         className="hover:underline"
//       >
//         {t('signup')}
//       </Link>
//     </div>
//   );
// };

// export default AuthLinks;
'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import useAuthUser from '@/hooks/useAuthUser';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import { useState } from 'react';

interface Props {
  onClick?: () => void;
  className?: string;
}

const AuthLinks: React.FC<Props> = ({ onClick, className }) => {
  const t = useTranslations('AuthLinks');
  const locale = useLocale();
  const pathname = usePathname() || '/';
  const router = useRouter();

  const { user, loading } = useAuthUser();
  const [busy, setBusy] = useState(false);

  // Не добавляем returnUrl, если уже на страницах авторизации
  const onAuthPage = /\/(en|ua)\/(signin|signup)(\/|$)/.test(pathname);
  const ret = onAuthPage ? '' : `?returnUrl=${encodeURIComponent(pathname)}`;

  const handleLogout = async () => {
    if (busy) return;
    setBusy(true);
    try {
      // 1) Чистим серверную httpOnly-куку (ВАЖНО: без префикса локали!)
      await fetch('/api/sessionLogout', { method: 'POST' });

      // 2) Клиентский signOut Firebase
      await signOut(auth);

      onClick?.(); // закрыть мобильное меню
      router.refresh(); // обновить хедер/иконки
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      setBusy(false);
    }
  };

  if (loading) return null;

  // Гость → Вхід / Реєстрація
  if (!user) {
    return (
      <div
        className={`flex flex-row items-center justify-center gap-8 py-8 px-6 text-[18px] border-b border-gray uppercase ${
          className ?? ''
        }`}
      >
        <Link
          href={`/${locale}/signin${ret}`}
          onClick={onClick}
          className="uppercase text-[#747474]"
        >
          {t('signin')}
        </Link>
        <Link
          href={`/${locale}/signup${ret}`}
          onClick={onClick}
          className="uppercase text-[#747474]"
        >
          {t('signup')}
        </Link>
      </div>
    );
  }

  // Залогинен → Вийти
  return (
    <div
      className={`flex flex-row items-center justify-center gap-8 py-8 px-6 text-[18px] border-b border-gray uppercase ${
        className ?? ''
      }`}
    >
      <button
        type="button"
        onClick={handleLogout}
        disabled={busy}
        className="uppercase text-[#747474]"
      >
        {t('logout')}
      </button>
    </div>
  );
};

export default AuthLinks;
