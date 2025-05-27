import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface Product {
  slug: string;
  name: string;
  description: string;
  price: number | string;
  sizes: string[];
  imageTitle: string;
  images?: string[];
}

export async function fetchCollections() {
  const q = query(collection(db, 'collections'), orderBy('order'));

  const snapshot = await getDocs(q);

  const collections = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      slug: data.slug,
      title: data.title,
      image: data.image,
    };
  });

  return collections;
}

export async function fetchProductsByCollection(slug: string): Promise<Product[]> {
  const q = query(
    collection(db, 'products'),
    where('collectionSlug', '==', slug)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      slug: data.slug,
      name: data.name,
      price: data.price,
      description: data.description,
      sizes: data.sizes,
      images: data.images,
      imageTitle: data.imageTitle || '',
    };
  });
}