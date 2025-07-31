import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const slides = [
  'https://res.cloudinary.com/dupfyzvfy/image/upload/v1746098933/IMG_2610_xmx5nj.jpg',
  'https://res.cloudinary.com/dupfyzvfy/image/upload/v1746099875/IMG_2616_wkh9jn.jpg',
  'https://res.cloudinary.com/dupfyzvfy/image/upload/v1746099490/IMG_2620_aoohw8.jpg',
];

const getPositionClass = (index: number, currentIndex: number): string => {
  const positions = ['left', 'center', 'right'];
  const posIndex = (index - currentIndex + slides.length) % slides.length;
  return positions[posIndex] || 'hidden';
};

export const CustomCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      className="relative w-[calc(292px+2*260px)] mx-auto"
      style={{ maxWidth: '100%' }}
    >
      <div className="relative h-[450px] overflow-hidden flex justify-center items-center gap-[9px] md:gap-[4px] lg:gap-[9px]">
        {slides.map((src, index) => {
          const position = getPositionClass(index, currentIndex);

          let style = {};
          if (position === 'left') {
            style = {
              transform: 'translateX(calc(-251px - 30px)) scale(1)',
            };
          } else if (position === 'right') {
            style = {
              transform: 'translateX(calc(251px + 30px)) scale(1)',
            };
          } else if (position === 'center') {
            style = {
              transform: 'scale(1)',
            };
          }

          let className =
            'absolute transition-transform duration-500 ease-in-out opacity-100';
          if (position === 'center') {
            className += ' w-[292px] h-[409px] z-30 opacity-100';
          } else if (position === 'left' || position === 'right') {
            className += ' w-[251px] h-[350px] z-20 opacity-80';
          } else {
            className += ' hidden';
          }

          return (
            <div key={index} className={className} style={style}>
              <img
                src={src}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCarousel;
