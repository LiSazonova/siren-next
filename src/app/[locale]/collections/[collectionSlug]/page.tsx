import { notFound } from 'next/navigation';
import ProductList from '@/components/ProductList';
import { fetchProductsByCollection } from '@/services/firebase';

interface PageProps {
  params: Promise<{
    locale: string;
    collectionSlug: string;
  }>;
}

export async function generateStaticParams() {
  const locales = ['en', 'ua'];
  const slugs = [
    'moon_crystal',
    'christmas_song',
    'sleeping_beauty',
    'la_fleur',
  ];

  const params = [];
  for (const locale of locales) {
    for (const collectionSlug of slugs) {
      params.push({ locale, collectionSlug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { collectionSlug } = await params;
  const titleMap: Record<string, string> = {
    moon_crystal: 'Moon Crystal',
    christmas_song: 'Christmas Song',
    sleeping_beauty: 'Sleeping Beauty',
    la_fleur: 'La Fleur',
  };

  const title = titleMap[collectionSlug] || 'Collection';
  return { title: `${title} | Siren` };
}

export default async function CollectionPage({ params }: PageProps) {
  const { collectionSlug } = await params;

  const products = await fetchProductsByCollection(collectionSlug);
  if (!products.length) {
    notFound();
  }

  const titleMap: Record<string, string> = {
    moon_crystal: 'Moon Crystal',
    christmas_song: 'Christmas Song',
    sleeping_beauty: 'Sleeping Beauty',
    la_fleur: 'La Fleur',
  };
  const title = titleMap[collectionSlug] || 'Collection';

  return (
    <main className="px-6 py-12">
      <h1 className="text-[40px] md:text-[64px] uppercase font-lora text-center mb-10">
        {title}
      </h1>
      <ProductList products={products} />
    </main>
  );
}
