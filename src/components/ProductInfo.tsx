'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import type { Product } from '@/services/firebase';
import { useLocale, useTranslations } from 'next-intl';
import Modal from './Modal';
import useCart from '@/stores/cart';
import { useRouter } from 'next/navigation';

interface InfoProps {
  product: Product;
}

export default function ProductInfo({ product }: InfoProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [openSizeModal, setOpenSizeModal] = useState(false);
  const locale = useLocale();
  const t = useTranslations('products');
  const router = useRouter();

  const addItem = useCart((s) => s.addItem);

  const desc = product.description[locale as 'en' | 'ua'] ?? '';

  const handleBuyNow = () => {
    if (!selectedSize) {
      setOpenSizeModal(true);
      return;
    }
    addItem({
      productId: product.slug,
      name: product.name,
      price: product.price,
      size: selectedSize,
      qty: 1,
      slug: product.slug,
      image: product.imageTitle,
    });
    router.push(`/${locale}/cart`);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error(t('errors.selectSize'));
      return;
    }
    addItem({
      productId: product.slug,
      name: product.name,
      price: product.price,
      size: selectedSize,
      qty: 1,
      slug: product.slug,
      image: product.imageTitle,
    });
    toast.success(t('messages.addedToCart', { name: product.name }));
  };

  // const handleAddToCart = () => {
  //   if (!selectedSize) {
  //     toast.error(t('errors.selectSize'));
  //     return;
  //   }
  //   toast.success(t('messages.addedToCart', { name: product.name }));
  // };

  return (
    <div className="md:flex md:flex-col md:justify-between">
      <div>
        <p className="text-[28px] uppercase mb-6">
          {product.price} {t('currency')}
        </p>

        <p className="hidden md:block text-[18px] text-gray-700 md:mb-12">
          {desc}
        </p>

        <div>
          <h2 className="text-[20px] font-inter uppercase mb-6">
            {t('sizesTitle')}
          </h2>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {product.sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`border border-black h-[58px] text-[20px] ${
                  selectedSize === sz
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Кнопки */}
      <div className="flex flex-col md:flex-row gap-4 mt-[80px] md:mt-[94px] xl:mt-[160px]">
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-black text-white py-3 text-[18px] uppercase"
        >
          {t('buyNow')}
        </button>
        <button
          onClick={handleAddToCart}
          className="flex-1 border border-black py-3 text-[18px] uppercase"
        >
          {t('addToCart')}
        </button>
      </div>

      <Modal
        isOpen={openSizeModal}
        onClose={() => setOpenSizeModal(false)}
        size="sm"
      >
        <p className="uppercase">{t('errors.selectSize')}</p>
      </Modal>
    </div>
  );
}

// src/components/ProductInfo.tsx
// 'use client';
// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { useTranslations } from 'next-intl';
// import type { Product } from '@/services/firebase';

// interface InfoProps {
//   product: Product;
// }

// export default function ProductInfo({ product }: InfoProps) {
//   const [selectedSize, setSelectedSize] = useState<string>('');
//   const t = useTranslations('Products');

//   const handleBuyNow = () => {
//     if (!selectedSize) {
//       toast.error(t('errors.selectSize'));
//       return;
//     }
//     toast.success(t('messages.goToCheckout'));
//   };
//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       toast.error(t('errors.selectSize'));
//       return;
//     }
//     toast.success(t('messages.addedToCart', { name: product.name }));
//   };

//   return (
//     <div>
//       <p className="text-[28px] uppercase mb-6">{product.price} грн</p>
//       <p className="hidden md:block text-[18px] text-gray-700 md:mb-12">
//         {product.description}
//       </p>
//       <h2 className="text-[20px] uppercase mb-4">{t('sizesTitle')}</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         {product.sizes.map((sz) => (
//           <button
//             key={sz}
//             onClick={() => setSelectedSize(sz)}
//             className={`border h-[58px] text-[18px] ${
//               selectedSize === sz
//                 ? 'bg-black text-white'
//                 : 'bg-white text-black'
//             }`}
//           >
//             {sz}
//           </button>
//         ))}
//       </div>
//       <div className="flex flex-col sm:flex-row gap-4">
//         <button
//           onClick={handleBuyNow}
//           className="flex-1 bg-black text-white py-3 uppercase"
//         >
//           {t('buyNow')}
//         </button>
//         <button
//           onClick={handleAddToCart}
//           className="flex-1 border border-black py-3 uppercase"
//         >
//           {t('addToCart')}
//         </button>
//       </div>
//     </div>
//   );
// }
