// 'use client';

// import React, { useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
// import { auth, googleProvider } from '@/lib/firebaseClient';
// import { useLocale, useTranslations } from 'next-intl';
// import Icon from '@/components/Icon';

// export default function LoginPage() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const locale = useLocale();
//   const t = useTranslations('loginPage');

//   const [form, setForm] = useState({ identifier: '', password: '' });
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const getSafeReturn = () => {
//     const raw = params.get('returnUrl') || '';
//     const isAuth = /\/(en|ua)\/(signin|signup)(\/|$)/.test(raw);
//     return isAuth ? `/${locale}` : raw || `/${locale}`;
//   };

//   const finishLogin = async () => {
//     const idToken = await auth.currentUser?.getIdToken(true);
//     if (!idToken) throw new Error('no-id-token');
//     const res = await fetch('/api/sessionLogin', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ idToken }),
//     });
//     if (!res.ok) throw new Error('session-fail');
//     router.push(getSafeReturn());
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);
//     try {
//       await signInWithEmailAndPassword(auth, form.identifier, form.password);
//       await finishLogin();
//     } catch (err: any) {
//       if (
//         err?.code === 'auth/invalid-credential' ||
//         err?.code === 'auth/wrong-password'
//       )
//         setError('Невірний email або пароль');
//       else if (err?.message?.includes('session-fail'))
//         setError('Не вдається створити сесію. Спробуйте ще раз.');
//       else setError('Сталася помилка. Спробуйте ще раз.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogle = async () => {
//     setError(null);
//     setLoading(true);
//     try {
//       await signInWithPopup(auth, googleProvider);
//       await finishLogin();
//     } catch {
//       setError('Не вдалося увійти через Google');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="bg-black text-white w-screen min-h-screen px-5 py-6">
//       <div className="flex flex-col-reverse items-center lg:flex-row lg:justify-center lg:gap-[138px]">
//         {/* Декор */}
//         <div className="max-w-[290px] md:max-w-[583px]">
//           <Image
//             src="/images/decorations/login_siren.svg"
//             width={583}
//             height={321}
//             alt="Login Decoration"
//             className="w-full h-auto"
//             priority
//           />
//         </div>

//         {/* Форма */}
//         <div className="flex flex-col items-center">
//           <h1 className="font-lora text-[40px] md:text-[64px] text-center uppercase mb-6 md:mb-12">
//             {t('title')}
//           </h1>

//           {error && (
//             <p className="mb-4 text-center text-red-400 text-sm md:text-base">
//               {error}
//             </p>
//           )}

//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col w-[320px] md:w-[728px] lg:w-[401px]"
//           >
//             <label
//               htmlFor="identifier"
//               className="font-inter text-[18px] text-left mb-3"
//             >
//               {t('labelEmail')}
//             </label>
//             <input
//               type="email"
//               name="identifier"
//               id="identifier"
//               placeholder={t('email')}
//               value={form.identifier}
//               onChange={handleChange}
//               required
//               autoComplete="email"
//               className="text-[20px] h-[58px] w-[320px] md:w-full text-black outline-none px-[18px] mb-6 placeholder:text-[18px] placeholder:text-[#747474] bg-white"
//             />

//             <label
//               htmlFor="password"
//               className="font-inter text-[18px] text-left mb-3"
//             >
//               {t('labelPassword')}
//             </label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               placeholder={t('password')}
//               value={form.password}
//               onChange={handleChange}
//               required
//               autoComplete="current-password"
//               className="text-[20px] h-[58px] w-[320px] md:w-full text-black outline-none px-[18px] mb-3 placeholder:text-[18px] placeholder:text-[#747474] bg-white"
//             />

//             <p className="text-[18px] text-right text-[#747474] mb-8 md:mb-16 lg:mb-8">
//               <Link href={`/${locale}/forgot-password`}>
//                 {t('forgotPassword')}
//               </Link>
//             </p>

//             <div className="flex flex-col items-center gap-6 mb-8 md:flex-row md:justify-center md:gap-13 md:mb-0">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="h-[24px] uppercase text-[24px] md:text-[28px] leading-5 text-center text-white"
//               >
//                 {loading ? t('loading') : t('signinButton')}
//               </button>

//               {/* Google */}
//               <button
//                 type="button"
//                 onClick={handleGoogle}
//                 disabled={loading}
//                 className="inline-flex items-center gap-2 h-[24px] uppercase text-[24px] md:text-[28px] leading-5 text-center text-white"
//               >
//                 {t('googleButton')}
//                 <Icon
//                   name="google"
//                   alt="Google"
//                   width={48}
//                   height={48}
//                   onClick={handleGoogle}
//                 />
//               </button>
//             </div>

//             <p className="hidden lg:block text-center font-inter text-[18px] uppercase text-[#747474] mt-9">
//               <Link href={`/${locale}/signup`}>{t('noProfile')}</Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

import { Suspense } from 'react';
import LoginClient from './loginClient';

type SearchParamsPromise = Promise<
  Record<string, string | string[] | undefined>
>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsPromise;
}) {
  const sp = await searchParams;
  const returnUrl =
    (Array.isArray(sp?.returnUrl) ? sp.returnUrl[0] : sp?.returnUrl) ?? '';

  return (
    <Suspense fallback={null}>
      <LoginClient returnUrl={returnUrl} />
    </Suspense>
  );
}
