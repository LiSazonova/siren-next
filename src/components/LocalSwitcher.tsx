// import { useLocale, useTranslations } from 'next-intl';
// import { routing } from '@/i18n/routing';
// import LocaleSwitcherSelect from './LocalSwitcherSelect';

// export default function LocaleSwitcher() {
//   const t = useTranslations('LocaleSwitcher');
//   const locale = useLocale();

//   return (
//     <LocaleSwitcherSelect defaultValue={locale}>
//       {routing.locales.map((cur) => (
//         <option key={cur} value={cur}>
//           {t('locale', { locale: cur })}
//         </option>
//       ))}
//     </LocaleSwitcherSelect>
//   );
// }

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
    <div className="flex items-center gap-1 text-sm">
      {routing.locales.map((cur, idx) => (
        <span key={cur} className="flex items-center">
          <button
            onClick={() => changeLocale(cur)}
            className={`bg-transparent border-none p-0 m-0 focus:outline-none ${
              cur === locale
                ? 'font-bold text-black'
                : 'font-normal text-gray-600'
            }`}
          >
            {cur.toUpperCase()}
          </button>
          {idx < routing.locales.length - 1 && (
            <span className="mx-1 text-gray-400">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
