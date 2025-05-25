// components/Mermaid.tsx
import Image from 'next/image';

type Props = {
  src: string;
  side: 'left' | 'right'; // где показываем на desktop
  alt: string;
};

const Mermaid = ({ src, side, alt }: Props) => (
  <Image
    src={src}
    alt={alt}
    width={188}
    height={443}
    className={`
      pointer-events-none select-none    /* purely decorative */
      hidden xl:block                    /* показываем только ≥1280 px */
      absolute top-1/2 -translate-y-1/2  /* выравниваем по центру секции */
      ${side === 'left' ? 'left-[-220px]' : 'right-[-220px]'}
      2xl:left-[-260px] 2xl:right-[-260px]  /* небольшой вынос на ультра-wide */
    `}
  />
);

export default Mermaid;
