import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

type Props = {
  params: { locale: string };
};

export default async function ErrorPage({ params }: Props) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'success',
  });

  return (
    <main className="max-w-[700px] mx-auto py-24 text-center">
      <h1 className="text-3xl uppercase mb-6">Помилка замовлення</h1>

      <p className="mb-10 text-gray-600">Спробуйте ще раз</p>

      <Link
        href={`/${params.locale}/checkout`}
        className="inline-block px-8 py-4 bg-black text-white uppercase"
      >
        Назад до оформлення
      </Link>
    </main>
  );
}
