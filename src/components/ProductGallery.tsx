'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import '@/styles/embla.css'; // ваши стили для embla

interface GalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: GalleryProps) {
  const autoplayRef = useRef<any>(null);

  if (!autoplayRef.current) {
    autoplayRef.current = Autoplay({
      delay: 3000,
      stopOnInteraction: false,
    });
  }

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      containScroll: 'trimSnaps',
    },
    [autoplayRef.current]
  );

  useEffect(() => {
    return () => {
      try {
        autoplayRef.current?.destroy();
      } catch {}
      autoplayRef.current = undefined;
    };
  }, []);

  return (
    <div>
      <div ref={emblaRef} className="embla">
        <div className="embla__container flex space-x-4">
          {images.map((src, i) => (
            <div
              key={i}
              className="
                embla__slide flex-shrink-0
                w-[320px] h-[411px]          /* мобильный */
                md:w-[375px] md:h-[608px]    /* планшет */
                xl:w-[474px] xl:h-[608px]    /* десктоп */
              "
            >
              <Image
                src={src}
                alt={`Slide ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
