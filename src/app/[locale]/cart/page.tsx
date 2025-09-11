// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { useCart, useCartItems, useCartSubtotal } from '@/stores/cart';
// import Icon from '@/components/Icon';

// const nf = new Intl.NumberFormat('uk-UA');

// export default function CartPage() {
//   const { locale } = useParams() as { locale: string };

//   const items = useCartItems();
//   const subtotal = useCartSubtotal();

//   const addItem = useCart((s) => s.addItem);
//   const removeItem = useCart((s) => s.removeItem);
//   const setQty = useCart((s) => s.setQty);

//   const handleSizeChange = (it: any, newSize: string) => {
//     if (!newSize || newSize === it.size) return;
//     // Перекладываем позицию с новым ключом (productId::size)
//     addItem({
//       productId: it.productId,
//       name: it.name,
//       price: it.price,
//       size: newSize,
//       qty: it.qty,
//       slug: it.slug,
//       image: it.image,
//     });
//     removeItem(it.key);
//   };

//   if (items.length === 0) {
//     return (
//       <main className="max-w-6xl mx-auto px-4 py-20 text-center">
//         <h1 className="font-lora text-[64px] leading-none uppercase mb-6">
//           Не знайдено
//         </h1>
//         <Link href={`/${locale}/collections`}>
//           <button className="inline-block w-[220px] border border-black py-3 text-[18px] uppercase tracking-wide">
//             До колекцій →
//           </button>
//         </Link>
//       </main>
//     );
//   }

//   return (
//     <main className="mx-auto px-4 pt-6 pb-16">
//       {/* Хедеры таблицы */}
//       <div className="hidden md:grid grid-cols-[1fr_140px_160px_140px] items-center gap-4 border-b border-[#747474] pb-4 uppercase text-[13px] tracking-wide text-neutral-500">
//         <div className="text-[18px] font-inter text-black">Найменування</div>
//         <div className="text-center text-[18px] font-inter text-black">
//           Розмір
//         </div>
//         <div className="text-center text-[18px] font-inter text-black">
//           Кількість
//         </div>
//         <div className="text-right pr-8 text-[18px] font-inter text-black">
//           Вартість
//         </div>
//       </div>

//       <ul>
//         {items.map((it) => {
//           // Если из бэка не приходит массив доступных размеров, используем дефолтный ряд
//           const sizeOptions: string[] = (it as any).availableSizes ?? [
//             'S',
//             'M',
//             'L',
//             'XL',
//           ];

//           return (
//             <li
//               key={it.key}
//               className="relative grid md:grid-cols-[1fr_140px_160px_140px] gap-4 items-center border-b border-neutral-200 py-12"
//             >
//               {/* превью + название */}
//               <div className="flex flex-col gap-4">
//                 <div className="text-[18px] font-inter text-black">
//                   {it.name}
//                 </div>

//                 <Image
//                   src={it.image ?? `/images/products/${it.slug}/${it.slug}.jpg`}
//                   alt={it.name}
//                   width={188}
//                   height={240}
//                   className=" object-cover"
//                 />
//                 <div className="flex justify-between">
//                   {/* Размер (мобайл) */}
//                   <div className="mt-3 md:hidden">
//                     <label className="block text-[12px] uppercase tracking-wide text-neutral-500 mb-1">
//                       Розмір
//                     </label>
//                     <div className="relative">
//                       <select
//                         name="size"
//                         value={it.size}
//                         onChange={(e) => handleSizeChange(it, e.target.value)}
//                         className="w-21 h-8 text-[18px] border border-[#747474] rounded-none bg-white "
//                       >
//                         {sizeOptions.map((s) => (
//                           <option key={s} value={s}>
//                             {s}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <button
//                     className="mt-3 md:hidden text-[13px] text-neutral-500 hover:text-black underline underline-offset-4 w-fit"
//                     onClick={() => removeItem(it.key)}
//                   >
//                     <Icon name="close" alt="Close" width={28} height={28} />
//                   </button>
//                 </div>
//               </div>

//               {/* Размер (десктоп) */}
//               <div className="hidden md:block">
//                 <div className="relative mx-auto w-28">
//                   <select
//                     value={it.size}
//                     onChange={(e) => handleSizeChange(it, e.target.value)}
//                     className="w-28 h-9 border border-neutral-300 px-3 text-[14px] appearance-none bg-white pr-7 text-center"
//                   >
//                     {sizeOptions.map((s) => (
//                       <option key={s} value={s}>
//                         {s}
//                       </option>
//                     ))}
//                   </select>
//                   <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
//                     ▾
//                   </span>
//                 </div>
//               </div>

//               {/* Количество – селект */}
//               <div className="flex md:justify-center">
//                 <div className="relative">
//                   <select
//                     value={it.qty}
//                     onChange={(e) =>
//                       setQty(it.key, Math.max(1, Number(e.target.value)))
//                     }
//                     className="w-24 h-9 border border-neutral-300 px-3 text-[14px] appearance-none bg-white pr-7 text-center"
//                   >
//                     {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
//                       <option key={n} value={n}>
//                         {n}
//                       </option>
//                     ))}
//                   </select>
//                   <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
//                     ▾
//                   </span>
//                 </div>
//               </div>

//               {/* Цена строки */}
//               <div className="text-right text-[16px]">
//                 {nf.format(it.price * it.qty)} грн
//               </div>

//               {/* крестик удаления (десктоп) */}
//               <button
//                 className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
//                 onClick={() => removeItem(it.key)}
//                 aria-label="Видалити товар"
//                 title="Видалити"
//               >
//                 <Icon name="close" alt="Close" width={28} height={28} />
//               </button>
//             </li>
//           );
//         })}
//       </ul>

//       {/* Итог + кнопка */}
//       <div className="p-[14px] border-t border-[#747474] flex flex-col md:flex-row items-center justify-between gap-4">
//         <div className="w-full md:w-auto uppercase text-[28px] font-inter">
//           Сума замовлення: <span>{nf.format(subtotal)} грн</span>
//         </div>
//         <Link
//           href={`/${locale}/checkout`}
//           className="w-full h-[58px] md:w-auto inline-flex items-center justify-center px-28 py-5 bg-black text-white uppercase tracking-wide text-[28px]"
//         >
//           Оформити замовлення
//         </Link>
//       </div>
//     </main>
//   );
// }

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { useCart, useCartItems, useCartSubtotal } from '@/stores/cart';
// import Icon from '@/components/Icon';

// export default function CartPage() {
//   const { locale } = useParams() as { locale: string };

//   const items = useCartItems();
//   const subtotal = useCartSubtotal();

//   const addItem = useCart((s) => s.addItem);
//   const removeItem = useCart((s) => s.removeItem);
//   const setQty = useCart((s) => s.setQty);

//   const handleSizeChange = (it: any, newSize: string) => {
//     if (!newSize || newSize === it.size) return;
//     addItem({
//       productId: it.productId,
//       name: it.name,
//       price: it.price,
//       size: newSize,
//       qty: it.qty,
//       slug: it.slug,
//       image: it.image,
//     });
//     removeItem(it.key);
//   };

//   if (items.length === 0) {
//     return (
//       <main className="max-w-[1280px] mx-auto px-4 py-20 text-center">
//         <h1 className="font-lora text-[48px] md:text-[64px] uppercase mb-6">
//           Не знайдено
//         </h1>
//         <Link href={`/${locale}/collections`}>
//           <button className="inline-block w-[220px] border border-black py-3 text-[18px] uppercase">
//             До колекцій →
//           </button>
//         </Link>
//       </main>
//     );
//   }

//   return (
//     <main className="max-w-[1280px] mx-auto px-4 pt-6 pb-16">
//       {/* TABLET/DESKTOP header */}

//       <div className="hidden md:grid grid-cols-[1fr_140px_160px_140px] items-center gap-4 border-b border-[#747474] pb-4 uppercase text-[13px] tracking-wide text-neutral-500">
//         <div className="text-[18px] font-inter text-black">Найменування</div>
//         <div className="text-center text-[18px] font-inter text-black">
//           Розмір
//         </div>
//         <div className="text-center text-[18px] font-inter text-black">
//           Кількість
//         </div>
//         <div className="text-right pr-8 text-[18px] font-inter text-black">
//           Вартість
//         </div>
//       </div>
//       {/* MOBILE header (как в макете 360) */}

//       <div className="md:hidden">
//         <div className="flex items-end justify-between">
//           <div className="text-[28px] leading-[1.1] uppercase">
//             Найменування
//           </div>
//           <div className="text-right leading-[1.15] uppercase">
//             <div className="text-[22px]">Розмір</div>
//             <div className="text-[22px]">Кількість</div>
//             <div className="text-[22px]">Вартість</div>
//           </div>
//         </div>
//         <hr className="mt-4 border-black/30" />
//       </div>

//       <ul>
//         {items.map((it) => {
//           const sizeOptions: string[] = (it as any).availableSizes ?? [
//             'XS',
//             'S',
//             'M',
//             'L',
//             'XL',
//           ];

//           return (
//             <li
//               key={it.key}
//               className="relative grid gap-4 items-start py-6 border-b border-black/15 md:grid-cols-[1fr_140px_160px_160px]"
//             >
//               {/* Крестик удаления: право-верх (mobile), центр-право (md+) */}
//               <button
//                 className="absolute right-0 top-4 md:top-1/2 md:-translate-y-1/2 text-black/50 hover:text-black"
//                 onClick={() => removeItem(it.key)}
//                 aria-label="Видалити товар"
//               >
//                 <Icon name="close" alt="Close" width={28} height={28} />
//               </button>

//               {/* COL 1: превью + название */}
//               <div className="flex flex-col gap-3">
//                 <div className="text-[18px]">{it.name}</div>
//                 <div className="flex gap-6">
//                   <Image
//                     src={
//                       it.image ?? `/images/products/${it.slug}/${it.slug}.jpg`
//                     }
//                     alt={it.name}
//                     width={260}
//                     height={340}
//                     className="w-[260px] h-[340px] md:w-[180px] md:h-[240px] object-cover"
//                   />

//                   {/* MOBILE правый столбец */}
//                   <div className="flex-1 md:hidden">
//                     {/* SIZE select */}
//                     <div className="mb-3">
//                       <div className="relative inline-block w-[132px]">
//                         <select
//                           value={it.size}
//                           onChange={(e) => handleSizeChange(it, e.target.value)}
//                           className="
//                             w-[132px] h-10
//                             border border-black
//                             bg-white
//                             px-3 pr-9
//                             text-[16px] text-center uppercase
//                             appearance-none
//                             focus:outline-none
//                           "
//                         >
//                           {sizeOptions.map((s) => (
//                             <option key={s} value={s}>
//                               {s}
//                             </option>
//                           ))}
//                         </select>
//                         <Icon
//                           name="scroll"
//                           alt="scroll"
//                           width={18}
//                           height={18}
//                           className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
//                         />
//                       </div>
//                     </div>

//                     {/* QTY select */}
//                     <div className="mb-5">
//                       <div className="relative inline-block w-[92px]">
//                         <select
//                           value={it.qty}
//                           onChange={(e) =>
//                             setQty(it.key, Math.max(1, Number(e.target.value)))
//                           }
//                           className="
//                             w-[92px] h-10
//                             border border-black
//                             bg-white
//                             px-3 pr-9
//                             text-[16px] text-center
//                             appearance-none
//                             focus:outline-none
//                           "
//                         >
//                           {Array.from({ length: 10 }, (_, i) => i + 1).map(
//                             (n) => (
//                               <option key={n} value={n}>
//                                 {n}
//                               </option>
//                             )
//                           )}
//                         </select>
//                         <Icon
//                           name="scroll"
//                           alt="scroll"
//                           width={18}
//                           height={18}
//                           className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
//                         />
//                       </div>
//                     </div>

//                     {/* PRICE — крупный, две строки как в макете */}
//                     <div className="leading-none">
//                       <div className="text-[28px]">{it.price * it.qty}</div>
//                       <div className="text-[28px]">грн</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* COL 2: SIZE (tablet/desktop) */}
//               <div className="hidden md:flex justify-center items-start pt-14">
//                 <div className="relative w-[110px]">
//                   <select
//                     value={it.size}
//                     onChange={(e) => handleSizeChange(it, e.target.value)}
//                     className="
//                       w-[110px] h-10
//                       border border-black
//                       bg-white
//                       px-3 pr-9
//                       text-[14px] text-center uppercase
//                       appearance-none
//                       focus:outline-none
//                     "
//                   >
//                     {sizeOptions.map((s) => (
//                       <option key={s} value={s}>
//                         {s}
//                       </option>
//                     ))}
//                   </select>
//                   <Icon
//                     name="scroll"
//                     alt="scroll"
//                     width={16}
//                     height={16}
//                     className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
//                   />
//                 </div>
//               </div>

//               {/* COL 3: QTY (tablet/desktop) */}
//               <div className="hidden md:flex justify-center items-start pt-14">
//                 <div className="relative w-[80px]">
//                   <select
//                     value={it.qty}
//                     onChange={(e) =>
//                       setQty(it.key, Math.max(1, Number(e.target.value)))
//                     }
//                     className="
//                       w-[80px] h-10
//                       border border-black
//                       bg-white
//                       px-3 pr-9
//                       text-[14px] text-center
//                       appearance-none
//                       focus:outline-none
//                     "
//                   >
//                     {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
//                       <option key={n} value={n}>
//                         {n}
//                       </option>
//                     ))}
//                   </select>
//                   <Icon
//                     name="scroll"
//                     alt="scroll"
//                     width={16}
//                     height={16}
//                     className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
//                   />
//                 </div>
//               </div>

//               {/* COL 4: PRICE (tablet/desktop) */}
//               <div className="hidden md:flex items-start justify-end pt-14 pr-10 text-[16px]">
//                 {it.price * it.qty} грн
//               </div>
//             </li>
//           );
//         })}
//       </ul>

//       {/* Итоги */}
//       <div className="mt-10 pt-6 border-t border-black/20 flex flex-col md:flex-row items-center justify-between gap-6">
//         <div className="w-full md:w-auto uppercase text-[22px] md:text-[18px]">
//           Сума замовлення: <span className="font-semibold">{subtotal} грн</span>
//         </div>
//         <Link
//           href={`/${locale}/checkout`}
//           className="w-full md:w-auto inline-flex items-center justify-center px-6 md:px-10 py-4 bg-black text-white uppercase text-[18px] md:text-[16px]"
//         >
//           Оформити замовлення
//         </Link>
//       </div>
//     </main>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart, useCartItems, useCartSubtotal } from '@/stores/cart';
import Icon from '@/components/Icon';

export default function CartPage() {
  const { locale } = useParams() as { locale: string };

  const items = useCartItems();
  const subtotal = useCartSubtotal();

  const addItem = useCart((s) => s.addItem);
  const removeItem = useCart((s) => s.removeItem);
  const setQty = useCart((s) => s.setQty);

  const handleSizeChange = (it: any, newSize: string) => {
    if (!newSize || newSize === it.size) return;
    addItem({
      productId: it.productId,
      name: it.name,
      price: it.price,
      size: newSize,
      qty: it.qty,
      slug: it.slug,
      image: it.image,
    });
    removeItem(it.key);
  };

  if (items.length === 0) {
    return (
      <main className="max-w-[1280px] mx-auto px-4 py-20 text-center">
        <h1 className="font-lora text-[48px] md:text-[64px] uppercase mb-6">
          Не знайдено
        </h1>
        <Link href={`/${locale}/collections`}>
          <button className="inline-block w-[220px] border border-black py-3 text-[18px] uppercase">
            До колекцій →
          </button>
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-[1280px] mx-auto px-4 pt-6 pb-16">
      {/* HEADER tablet/desktop */}
      <div className="hidden md:grid grid-cols-[1fr_100px_120px_100px] items-center gap-4 border-b border-[#747474] pb-4 uppercase text-[13px] tracking-wide text-neutral-500">
        <div className="text-[18px]  text-black">Найменування</div>
        <div className="text-center text-[18px]  text-black">Розмір</div>
        <div className="text-center text-[18px] text-black">Кількість</div>
        <div className="text-right pr-8 text-[18px] text-black">Вартість</div>
      </div>

      {/* HEADER mobile */}
      <div className="md:hidden">
        <div className="flex items-start justify-between text-[18px]">
          <div className="uppercase font-inter">Найменування</div>
          <ul className="text-right uppercase font-inter">
            <li>Розмір</li>
            <li>Кількість</li>
            <li>Вартість</li>
          </ul>
        </div>
        <hr className="mt-1 border-[#747474]" />
      </div>

      <ul>
        {items.map((it) => {
          const sizeOptions: string[] = (it as any).availableSizes ?? [
            'XS',
            'S',
            'M',
            'L',
            'XL',
          ];

          return (
            <li
              key={it.key}
              className="relative grid gap-4 items-start pt-4 md:pt-12 not-last:pb-4 not-last:border-b not-last:border-[#747474] md:grid-cols-[1fr_100px_120px_100px]"
            >
              {/* Крестик удаления: всегда в правом верхнем углу */}
              <button
                className="absolute right-0 top-4 text-black/50 hover:text-black z-10"
                onClick={() => removeItem(it.key)}
                aria-label="Видалити товар"
              >
                <Icon name="close" alt="Close" width={28} height={28} />
              </button>

              {/* COL 1: превью + название */}
              <div className="flex flex-col gap-3">
                <h5 className="text-[18px]">{it.name}</h5>
                <div className="flex justify-between gap-12">
                  <Image
                    src={
                      it.image ?? `/images/products/${it.slug}/${it.slug}.jpg`
                    }
                    alt={it.name}
                    width={188}
                    height={240}
                    className="w-[188px] h-[240px] md:w-[188px] md:h-[240px] object-cover"
                  />

                  {/* MOBILE правый столбец */}
                  <div className="flex flex-col items-end gap-4 md:hidden">
                    {/* SIZE select */}
                    <div className="relative inline-block ">
                      <select
                        value={it.size}
                        onChange={(e) => handleSizeChange(it, e.target.value)}
                        className="w-[84px] h-[31px] border border-black px-1 pr-10 text-[28px] text-center uppercase appearance-none focus:outline-none leading-[1]"
                      >
                        {sizeOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <Icon
                          name="scroll"
                          alt="scroll"
                          width={16}
                          height={16}
                          className="block"
                        />
                      </div>
                    </div>

                    {/* QTY select */}
                    <div className="relative inline-block">
                      <select
                        value={it.qty}
                        onChange={(e) =>
                          setQty(it.key, Math.max(1, Number(e.target.value)))
                        }
                        className="w-[84px] h-[31px] border border-black px-1 pr-10 text-[28px] text-center uppercase appearance-none focus:outline-none leading-[1]"
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                          (n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          )
                        )}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <Icon
                          name="scroll"
                          alt="scroll"
                          width={16}
                          height={16}
                          className="block"
                        />
                      </div>
                    </div>

                    {/* PRICE mobile */}
                    <p className="text-[18px] font-normal">
                      {it.price * it.qty} грн
                    </p>
                  </div>
                </div>
              </div>

              {/* COL 2: SIZE (tablet/desktop) */}
              <div className="hidden md:flex justify-center items-start pt-14">
                <div className="relative w-[84px]">
                  <select
                    value={it.size}
                    onChange={(e) => handleSizeChange(it, e.target.value)}
                    className="w-[84px] h-[31px] border border-black px-1 pr-10 text-[28px] text-center uppercase appearance-none focus:outline-none leading-[1]"
                  >
                    {sizeOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <Icon
                      name="scroll"
                      alt="scroll"
                      width={14}
                      height={14}
                      className="block"
                    />
                  </div>
                </div>
              </div>

              {/* COL 3: QTY (tablet/desktop) */}
              <div className="hidden md:flex justify-center items-start pt-14">
                <div className="relative w-[80px]">
                  <select
                    value={it.qty}
                    onChange={(e) =>
                      setQty(it.key, Math.max(1, Number(e.target.value)))
                    }
                    className="w-[84px] h-[31px] border border-black px-1 pr-10 text-[28px] text-center uppercase appearance-none focus:outline-none leading-[1]"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <Icon
                      name="scroll"
                      alt="scroll"
                      width={14}
                      height={14}
                      className="block"
                    />
                  </div>
                </div>
              </div>

              {/* COL 4: PRICE (tablet/desktop) */}
              <div className="hidden md:flex pt-14 pr-10 md:pr-0 text-[18px]">
                {it.price * it.qty} грн
              </div>
            </li>
          );
        })}
      </ul>

      {/* Итоги */}
      <div className="mt-12 pt-6 border-t border-[#747474] flex flex-col lg:flex-row items-center md:items-start lg:items-center justify-between  gap-6">
        <div className="w-full flex flex-col md:flex-row gap-4 lg:w-auto uppercase text-[24px] md:text-[28px]">
          <p>Сума замовлення:</p>
          <p>{subtotal} грн</p>
        </div>
        <Link
          href={`/${locale}/checkout`}
          className="w-full md:w-auto inline-flex items-center justify-center px-6 md:px-10 py-4 bg-black text-white uppercase text-[28px]"
        >
          Оформити замовлення
        </Link>
      </div>
    </main>
  );
}
