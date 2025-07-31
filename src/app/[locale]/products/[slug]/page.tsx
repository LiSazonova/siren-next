import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import ProductGallery from '@/components/ProductGallery';
import ProductInfo from '@/components/ProductInfo';
import { fetchProductBySlug, fetchProductSlugs } from '@/services/firebase';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await fetchProductSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const product = await fetchProductBySlug(slug);
  if (!product) return { title: 'Not Found' };

  return {
    title: `${product.name} | Siren`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug, locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const product = await fetchProductBySlug(slug);
  if (!product) notFound();

  return (
    <main className="md:py-6 md:px-5 max-w-[320px] md:max-w-[768px] xl:max-w-[1228px] mx-auto">
      <h1 className="text-[40px] md:text-[48px] text-center font-lora uppercase mb-6">
        {product.name}
      </h1>
      <div className="flex flex-col md:flex-row gap-2 md:gap-6">
        <div className="max-w-[320px] md:max-w-[375px] xl:max-w-[474px]">
          <ProductGallery
            images={[product.imageTitle, ...(product.images || [])]}
          />
        </div>

        <div className="md:flex">
          <ProductInfo product={product} />
        </div>
      </div>
    </main>
  );
}
