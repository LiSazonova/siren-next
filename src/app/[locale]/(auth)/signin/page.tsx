'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

const LoginPage = () => {
  // const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    identifier: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const success = await login(form.identifier, form.password);
    // if (success) {
    //   router.push('/');
    // } else {
    //   setError('Ошибка входа. Проверьте данные и попробуйте снова.');
    // }
  };

  return (
    <section className="bg-black text-white w-screen min-h-screen px-5 py-6">
      <div className="flex flex-col-reverse items-center lg:flex-row lg:justify-center lg:gap-[138px]">
        {/* Декор */}
        <div className="max-w-[290px] md:max-w-[583px]">
          <Image
            src="/images/decorations/login_siren.svg"
            width={583}
            height={321}
            alt="Login Decoration"
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Форма */}
        <div className="flex flex-col items-center">
          <h1
            className="font-[var(--font-lora)] text-[40px] leading-[51.2px] text-center uppercase text-[var(--white-color)] mb-6
                       md:text-[64px] md:leading-[81.92px] md:mb-12"
          >
            ВХІД
          </h1>

          {error && (
            <p className="mb-4 text-center text-red-400 text-sm md:text-base">
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-[320px] md:w-[728px] lg:w-[401px]"
          >
            <label
              htmlFor="identifier"
              className="font-[var(--font-inter)] text-[18px] leading-[21.78px] text-left text-[var(--white-color)] mb-3"
            >
              Будь ласка, введіть свою електронну адресу
            </label>

            <input
              type="email"
              name="identifier"
              id="identifier"
              placeholder="Електронна адреса"
              value={form.identifier}
              onChange={handleChange}
              required
              autoComplete="email"
              className="text-[20px] leading-[24.2px] text-left h-[58px] text-[var(--black-color)]
                         outline-none rounded-md px-[18px] mb-6 placeholder:text-[18px]
                         placeholder:leading-[21.78px] placeholder:text-[var(--primary-color)]
                         bg-white"
            />

            <label
              htmlFor="password"
              className="font-[var(--font-inter)] text-[18px] leading-[21.78px] text-left text-[var(--white-color)] mb-3"
            >
              Будь ласка, введіть свій пароль
            </label>

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Пароль"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="text-[20px] leading-[24.2px] text-left h-[58px] text-[var(--black-color)]
                         outline-none rounded-md px-[18px] mb-6 placeholder:text-[18px]
                         placeholder:leading-[21.78px] placeholder:text-[var(--primary-color)]
                         bg-white"
            />

            <p className="text-[18px] leading-[21.78px] text-right text-[var(--primary-color)] mb-6">
              <Link href="/auth/forgot-password">Забули пароль ?</Link>
            </p>

            <button
              type="submit"
              className="h-[58px] uppercase text-[24px] md:text-[28px] leading-5 text-center text-[var(--white-color)]
                         bg-[var(--primary-color)] rounded-md transition
                         hover:opacity-90 active:opacity-80 focus:outline-none focus:ring-2
                         focus:ring-offset-2 focus:ring-[var(--primary-color)] focus:ring-offset-[var(--black-color)]
                         lg:mb-[38px]"
            >
              УВІЙТИ
            </button>

            <p className="hidden lg:block text-center font-[var(--font-inter)] text-[18px] leading-[21.78px] uppercase text-[var(--primary-color)] mb-6">
              <Link href="/auth/register">У МЕНЕ НЕМА ПРОФІЛЮ</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
