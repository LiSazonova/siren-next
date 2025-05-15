'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  return (
    <div className="flex items-center justify-end text-[18px] mr-6 py-8">
      {routing.locales.map((cur, idx) => (
        <span key={cur} className="flex items-center">
          <button
            onClick={() => changeLocale(cur)}
            className={`bg-transparent border-none p-0 m-0  ${
              cur === locale
                ? 'font-bold text-black'
                : 'font-normal text-gray-600'
            }`}
          >
            {cur.toUpperCase()}
          </button>
          {idx < routing.locales.length - 1 && (
            <span className="text-gray-400">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
