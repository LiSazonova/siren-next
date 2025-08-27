// 'use client';

// import { useCart } from '@/stores/cart';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';

// export default function CartPage() {
//   const locale = useParams()?.locale ?? 'ua';
//   const items = Object.values(useCart((s) => s.items));
//   const subtotal = useCart((s) => s.subtotal());
//   const { removeItem, setQty, clear } = useCart((s) => ({
//     removeItem: s.removeItem,
//     setQty: s.setQty,
//     clear: s.clear,
//   }));

//   if (!items.length) {
//     return (
//       <main className="max-w-5xl mx-auto px-4 py-16 text-center">
//         <h1 className="text-2xl font-semibold mb-6">Нічого не знайдено</h1>
//         <Link
//           href={`/${locale}/collections`}
//           className="px-6 py-3 bg-black text-white rounded"
//         >
//           До колекцій
//         </Link>
//       </main>
//     );
//   }

//   return (
//     <main className="max-w-5xl mx-auto px-4 py-8">
//       <h1 className="text-2xl md:text-3xl font-semibold mb-6">Кошик</h1>

//       <ul className="divide-y">
//         {items.map((it) => (
//           <li
//             key={it.key}
//             className="py-4 flex flex-col md:flex-row md:items-center gap-4"
//           >
//             <div className="flex gap-3 flex-1">
//               <Image
//                 src={it.image ?? `/images/products/${it.slug}/${it.slug}.jpg`}
//                 alt={it.name}
//                 width={120}
//                 height={160}
//                 className="object-cover rounded"
//               />
//               <div>
//                 <div className="font-medium">{it.name}</div>
//                 <div className="text-sm text-gray-500">Розмір: {it.size}</div>
//                 <div className="text-sm text-gray-700">{it.price} грн</div>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setQty(it.key, it.qty - 1)}
//                 className="px-2 border"
//               >
//                 −
//               </button>
//               <input
//                 type="number"
//                 min={1}
//                 className="w-12 border text-center"
//                 value={it.qty}
//                 onChange={(e) => setQty(it.key, Number(e.target.value))}
//               />
//               <button
//                 onClick={() => setQty(it.key, it.qty + 1)}
//                 className="px-2 border"
//               >
//                 +
//               </button>
//             </div>

//             <div className="min-w-[80px] text-right">
//               {it.price * it.qty} грн
//             </div>

//             <button
//               onClick={() => removeItem(it.key)}
//               className="text-red-600 ml-auto"
//             >
//               ×
//             </button>
//           </li>
//         ))}
//       </ul>

//       <div className="mt-8 border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
//         <button
//           onClick={() => clear()}
//           className="text-sm underline text-gray-600"
//         >
//           Очистити кошик
//         </button>

//         <div className="text-right">
//           <div className="text-sm text-gray-600 uppercase">Сума замовлення:</div>
//           <div className="text-2xl font-semibold">{subtotal} грн</div>
//           <Link
//             href={`/${locale}/checkout`}
//             className="inline-block mt-3 px-6 py-3 bg-black text-white rounded uppercase"
//           >
//             Оформити замовлення
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart, useCartItems, useCartSubtotal } from '@/stores/cart';

export default function CartPage() {
  const { locale } = useParams() as { locale: string };

  // производные:
  const items = useCartItems();
  const subtotal = useCartSubtotal();

  // действия – по одному селектору (без объекта!)
  const removeItem = useCart((s) => s.removeItem);
  const setQty = useCart((s) => s.setQty);
  const clear = useCart((s) => s.clear);

  if (items.length === 0) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold mb-6">Нічого не знайдено</h1>
        <Link
          href={`/${locale}/collections`}
          className="px-6 py-3 bg-black text-white rounded"
        >
          До колекцій
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Кошик</h1>
      <ul className="divide-y">
        {items.map((it) => (
          <li
            key={it.key}
            className="py-4 flex flex-col md:flex-row md:items-center gap-4"
          >
            {/* превью + название */}
            <div className="flex gap-3 flex-1">
              <Image
                src={it.image ?? `/images/products/${it.slug}/${it.slug}.jpg`}
                alt={it.name}
                width={120}
                height={160}
                className="object-cover rounded"
              />
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-sm text-gray-500">Розмір: {it.size}</div>
                <div className="text-sm text-gray-700">{it.price} грн</div>
              </div>
            </div>

            {/* qty */}
            <div className="flex items-center gap-2">
              <button
                className="px-2 border"
                onClick={() => setQty(it.key, it.qty - 1)}
              >
                −
              </button>
              <input
                className="w-12 border text-center"
                type="number"
                min={1}
                value={it.qty}
                onChange={(e) => setQty(it.key, Number(e.target.value))}
              />
              <button
                className="px-2 border"
                onClick={() => setQty(it.key, it.qty + 1)}
              >
                +
              </button>
            </div>

            {/* цена строки */}
            <div className="min-w-[80px] text-right">
              {it.price * it.qty} грн
            </div>

            <button
              className="text-red-600 ml-auto"
              onClick={() => removeItem(it.key)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t pt-6 flex items-center justify-between">
        <button
          className="text-sm underline text-gray-600"
          onClick={() => clear()}
        >
          Очистити кошик
        </button>
        <div className="text-right">
          <div className="text-sm text-gray-600 uppercase">
            Сума замовлення:
          </div>
          <div className="text-2xl font-semibold">{subtotal} грн</div>
          <Link
            href={`/${locale}/checkout`}
            className="inline-block mt-3 px-6 py-3 bg-black text-white rounded uppercase"
          >
            Оформити замовлення
          </Link>
        </div>
      </div>
    </main>
  );
}
