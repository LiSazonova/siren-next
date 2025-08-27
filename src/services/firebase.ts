import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface Product {
  slug: string;
  name: string;
  description: { en?: string; ua?: string };
  price: number;
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

export async function fetchProductSlugs(): Promise<string[]> {
  const productsCol = collection(db, 'products');
  const snapshot = await getDocs(
    // если хочется упорядочить — можно по name или по порядковому полю
    query(productsCol, orderBy('slug'))
  );
  return snapshot.docs.map((doc) => {
    const data = doc.data() as any;
    return data.slug as string;
  });
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  // Предполагаем, что document ID == slug
  // Если у вас в Firestore _id отличен, то надо делать query
  const docRef = doc(db, 'products', slug);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data();
  return {
    slug: data.slug,
    name: data.name,
    description: data.description,
    price: data.price,
    sizes: data.sizes || [],
    imageTitle: data.imageTitle || '',
    images: data.images || [],
  };
}