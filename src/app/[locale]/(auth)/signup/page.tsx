'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';
// import Modal from '@/components/Modal/Modal';
import Image from 'next/image';

const RegisterPage = () => {
  // const { register } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // const result = await register(form.username, form.email, form.password);
      // if (result?.success) {
      //   router.push('/');
      // } else {
      //   const msg = result?.message || 'Помилка реєстрації. Спробуйте пізніше.';
      //   setError(msg);
      //   // Если бэкенд вернул инфо о занятости почты — покажем модалку
      //   if (
      //     /already|exists|зарегистр/i.test(result?.message || '') ||
      //     result?.code === 'EMAIL_EXISTS'
      //   ) {
      //     setIsModalOpen(true);
      //   }
      // }
    } catch (err) {
      setError('Помилка реєстрації. Спробуйте пізніше.');
    }
  };

  return (
    <section className="w-screen min-h-screen bg-black text-white px-5 py-6">
      <div className="flex flex-col-reverse items-center lg:flex-row lg:justify-center lg:gap-[138px]">
        {/* Декорация */}
        <div className="w-[175px] h-[290px] md:w-[350px] md:h-[583px]">
          <Image
            src="/images/decorations/registr_siren.svg"
            width={583}
            height={583}
            alt="Registration Decoration"
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Форма */}
        <div className="flex flex-col items-center">
          <h1
            className="font-[var(--font-lora)] text-[40px] leading-[51.2px] text-center uppercase
                       text-[var(--white-color)] mb-6 md:text-[64px] md:leading-[81.92px]"
          >
            РЕЄСТРАЦІЯ
          </h1>

          {error && (
            <p
              aria-live="assertive"
              className="text-[16px] md:text-[18px] text-center text-[var(--red-color)] mb-4"
            >
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-[320px] md:w-[728px] lg:w-[401px]"
          >
            <label
              htmlFor="username"
              className="w-full max-w-[320px] md:max-w-[728px] font-[var(--font-inter)]
                         text-[18px] leading-[21.78px] text-left text-[var(--white-color)] mb-3"
            >
              Будь ласка, введіть своє ім&apos;я
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Ім'я"
              required
              autoComplete="name"
              className="w-[320px] md:w-[728px] lg:w-[401px] h-[58px] text-[20px] leading-[24.2px]
                         text-[var(--black-color)] placeholder:text-[18px] placeholder:leading-[21.78px]
                         placeholder:text-[var(--primary-color)] bg-white rounded-md outline-none
                         px-[18px] mb-6"
            />

            <label
              htmlFor="email"
              className="w-full max-w-[320px] md:max-w-[728px] font-[var(--font-inter)]
                         text-[18px] leading-[21.78px] text-left text-[var(--white-color)] mb-3"
            >
              Будь ласка, введіть свою електронну адресу
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Електронна адреса"
              required
              autoComplete="email"
              className="w-[320px] md:w-[728px] lg:w-[401px] h-[58px] text-[20px] leading-[24.2px]
                         text-[var(--black-color)] placeholder:text-[18px] placeholder:leading-[21.78px]
                         placeholder:text-[var(--primary-color)] bg-white rounded-md outline-none
                         px-[18px] mb-6"
            />

            <label
              htmlFor="password"
              className="w-full max-w-[320px] md:max-w-[728px] font-[var(--font-inter)]
                         text-[18px] leading-[21.78px] text-left text-[var(--white-color)] mb-3"
            >
              Будь ласка, введіть свій пароль
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Пароль"
              required
              autoComplete="new-password"
              className="w-[320px] md:w-[728px] lg:w-[401px] h-[58px] text-[20px] leading-[24.2px]
                         text-[var(--black-color)] placeholder:text-[18px] placeholder:leading-[21.78px]
                         placeholder:text-[var(--primary-color)] bg-white rounded-md outline-none
                         px-[18px] mb-6"
            />

            {/* Если понадобится дата рождения — можно вернуть этот блок и задать pattern/подсказки аналогично */}

            <button
              type="submit"
              className="w-[320px] md:w-[728px] lg:w-[401px] h-[58px] font-[var(--font-lora)]
                         text-[24px] md:text-[28px] leading-5 uppercase text-[var(--white-color)]
                         text-center bg-[var(--primary-color)] rounded-md cursor-pointer
                         mt-0 md:mt-6 mb-6 md:mb-[38px]
                         transition hover:opacity-90 active:opacity-80
                         focus:outline-none focus:ring-2
                         focus:ring-[var(--primary-color)]
                         focus:ring-offset-2 focus:ring-offset-[var(--black-color)]"
            >
              Зареєструватися
            </button>
          </form>

          <p className="text-[18px] leading-[21.78px] text-center text-[var(--primary-color)] mb-8 md:mb-[38px]">
            <Link href="/auth/login">У МЕНЕ ВЖЕ Є ПРОФІЛЬ</Link>
          </p>
        </div>

        {/* Модалка об ошибке регистрации */}
        {/* <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Ошибка реєстрації"
        >
          <div className="flex flex-col items-center justify-center p-5 bg-[var(--white-color)] rounded-lg">
            <h2 className="font-[var(--font-lora)] text-2xl text-[var(--black-color)] mb-3">
              Помилка реєстрації
            </h2>
            <p className="text-base text-[var(--black-color)] mb-4 text-center">
              Ця електронна адреса вже зареєстрована.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="font-[var(--font-lora)] text-base px-4 py-2 text-[var(--white-color)]
                         bg-[var(--primary-color)] rounded transition
                         hover:bg-[var(--black-color)]"
            >
              Закрити
            </button>
          </div>
        </Modal> */}
      </div>
    </section>
  );
};

export default RegisterPage;
