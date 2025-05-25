// 'use client';

// import React, { useCallback, useEffect, useRef } from 'react';
// import useEmblaCarousel from 'embla-carousel-react';
// import type { EmblaCarouselType } from 'embla-carousel';
// import Autoplay, { AutoplayType } from 'embla-carousel-autoplay';

// const TWEEN_FACTOR_BASE = 0.84;

// const numberWithinRange = (number: number, min: number, max: number): number =>
//   Math.min(Math.max(number, min), max);

// const slideImages = [
//   'https://res.cloudinary.com/dupfyzvfy/image/upload/v1746098933/IMG_2610_xmx5nj.jpg',
//   'https://res.cloudinary.com/dupfyzvfy/image/upload/v1746099875/IMG_2616_wkh9jn.jpg',
//   'https://res.cloudinary.com/dupfyzvfy/image/upload/v1746099490/IMG_2620_aoohw8.jpg',
// ];

// const EmblaCarousel: React.FC = () => {
//   const autoplay = useRef<AutoplayType>(
//     Autoplay({
//       delay: 4000,
//       stopOnInteraction: false,
//       stopOnMouseEnter: true,
//     })
//   );

//   const [emblaRef, emblaApi] = useEmblaCarousel(
//     {
//       loop: true,
//       align: 'center',
//     },
//     [autoplay.current]
//   );

//   const tweenFactor = useRef(0);

//   const setTweenFactor = useCallback((embla: EmblaCarouselType) => {
//     tweenFactor.current = TWEEN_FACTOR_BASE * embla.scrollSnapList().length;
//   }, []);

//   const tweenOpacity = useCallback(
//     (embla: EmblaCarouselType, eventName?: string) => {
//       const engine = embla.internalEngine();
//       const scrollProgress = embla.scrollProgress();
//       const slidesInView = embla.slidesInView();
//       const isScrollEvent = eventName === 'scroll';

//       embla.scrollSnapList().forEach((scrollSnap, snapIndex) => {
//         let diffToTarget = scrollSnap - scrollProgress;
//         const slidesInSnap = engine.slideRegistry[snapIndex];

//         slidesInSnap.forEach((slideIndex: number) => {
//           if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

//           if (engine.options.loop) {
//             engine.slideLooper.loopPoints.forEach((loopItem) => {
//               const target = loopItem.target();
//               if (slideIndex === loopItem.index && target !== 0) {
//                 const sign = Math.sign(target);
//                 if (sign === -1)
//                   diffToTarget = scrollSnap - (1 + scrollProgress);
//                 if (sign === 1)
//                   diffToTarget = scrollSnap + (1 - scrollProgress);
//               }
//             });
//           }

//           const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
//           const opacity = numberWithinRange(tweenValue, 0.6, 1).toString();
//           embla.slideNodes()[slideIndex].style.opacity = opacity;
//         });
//       });
//     },
//     []
//   );

//   useEffect(() => {
//     if (!emblaApi) return;

//     setTweenFactor(emblaApi);
//     tweenOpacity(emblaApi);

//     emblaApi
//       .on('reInit', () => {
//         setTweenFactor(emblaApi);
//         tweenOpacity(emblaApi);
//       })
//       .on('scroll', () => tweenOpacity(emblaApi, 'scroll'))
//       .on('slideFocus', () => tweenOpacity(emblaApi));
//   }, [emblaApi, setTweenFactor, tweenOpacity]);

//   return (
//     <div className="overflow-hidden relative sm:max-w-[768px] md:max-w-[1228px] mx-auto">
//       <div
//         className="flex items-center justify-center gap-[9px] sm:gap-[4px] md:gap-[9px]"
//         ref={emblaRef}
//       >
//         {slideImages.map((src, index) => {
//           const isCenterSlide = index === 1;
//           return (
//             <div
//               key={index}
//               className={`
//                 shrink-0
//                 ${isCenterSlide ? 'w-[292px] h-[409px]' : 'w-[251px] h-[350px]'}
//                 sm:${
//                   isCenterSlide
//                     ? 'w-[221.33px] h-[409px]'
//                     : 'w-[221.33px] h-[350px]'
//                 }
//                 md:${
//                   isCenterSlide ? 'w-[292px] h-[409px]' : 'w-[251px] h-[350px]'
//                 }
//               `}
//             >
//               <img
//                 className="w-full h-full object-cover"
//                 src={src}
//                 alt={`Slide ${index}`}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default EmblaCarousel;

// import React, { useState } from 'react';
// import Icon from './Icon';

// const slides = [
//   'https://res.cloudinary.com/dupfyzvfy/image/upload/v1746098933/IMG_2610_xmx5nj.jpg',
//   'https://res.cloudinary.com/dupfyzvfy/image/upload/v1746099875/IMG_2616_wkh9jn.jpg',
//   'https://res.cloudinary.com/dupfyzvfy/image/upload/v1746099490/IMG_2620_aoohw8.jpg',
// ];

// const getPositionClass = (index: number, currentIndex: number): string => {
//   const positions = ['left', 'center', 'right'];
//   const posIndex = (index - currentIndex + slides.length) % slides.length;
//   return positions[posIndex] || 'hidden';
// };

// export const CustomCarousel: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % slides.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   return (
//     <div className="relative w-full flex justify-center items-center gap-2 h-[450px] overflow-hidden">
//       {slides.map((src, index) => {
//         const position = getPositionClass(index, currentIndex);

//         let className = 'absolute transition-all duration-500 ease-in-out';
//         if (position === 'center') {
//           className += ' w-[292px] h-[409px] z-30 scale-100 opacity-100';
//         } else if (position === 'left') {
//           className +=
//             ' w-[251px] h-[350px] -translate-x-[300px] z-20 scale-90 opacity-80';
//         } else if (position === 'right') {
//           className +=
//             ' w-[251px] h-[350px] translate-x-[300px] z-20 scale-90 opacity-80';
//         } else {
//           className += ' hidden';
//         }

//         return (
//           <div key={index} className={className}>
//             <img
//               src={src}
//               alt={`Slide ${index}`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         );
//       })}

//       <button
//         onClick={handlePrev}
//         className="absolute left-4 top-1/2 -translate-y-1/2 z-50"
//       >
//         <Icon name="arrow_left" alt="arrow" width={14} height={38} />
//       </button>
//       <button
//         onClick={handleNext}
//         className="absolute right-4 top-1/2 -translate-y-1/2 z-50"
//       >
//         <Icon name="arrow_right" alt="arrow" width={14} height={38} />
//       </button>
//     </div>
//   );
// };

// export default CustomCarousel;

// import React, { useState } from 'react';
// import Icon from './Icon';

// const slides = [
//   'https://res.cloudinary.com/dupfyzvfy/image/upload/v1746098933/IMG_2610_xmx5nj.jpg',
//   'https://res.cloudinary.com/dupfyzvfy/image/upload/v1746099875/IMG_2616_wkh9jn.jpg',
//   'https://res.cloudinary.com/dupfyzvfy/image/upload/v1746099490/IMG_2620_aoohw8.jpg',
// ];

// const getPositionClass = (index: number, currentIndex: number): string => {
//   const positions = ['left', 'center', 'right'];
//   const posIndex = (index - currentIndex + slides.length) % slides.length;
//   return positions[posIndex] || 'hidden';
// };

// export const CustomCarousel: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % slides.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   return (
//     <div className="relative flex justify-center items-center gap-[9px] md:gap-[4px] lg:gap-[9px] h-[450px] overflow-hidden">
//       {slides.map((src, index) => {
//         const position = getPositionClass(index, currentIndex);

//         let className = 'absolute transition-all duration-500 ease-in-out';
//         if (position === 'center') {
//           className += ' w-[292px] h-[409px] z-30 scale-100 opacity-100';
//         } else if (position === 'left') {
//           className +=
//             ' w-[221.33px] h-[350px] md:w-[221.33px] md:h-[350px] lg:w-[251px] lg:h-[350px] -translate-x-[300px] z-20 scale-90 opacity-80';
//         } else if (position === 'right') {
//           className +=
//             ' w-[221.33px] h-[350px] md:w-[221.33px] md:h-[350px] lg:w-[251px] lg:h-[350px] translate-x-[300px] z-20 scale-90 opacity-80';
//         } else {
//           className += ' hidden';
//         }

//         return (
//           <div key={index} className={className}>
//             <img
//               src={src}
//               alt={`Slide ${index}`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         );
//       })}

//       <button
//         onClick={handlePrev}
//         className="absolute top-1/2 -translate-y-1/2 z-50 left-4 lg:left-[calc(50%-292px/2-251px-20px)]"
//       >
//         <Icon name="arrow_left" alt="arrow" width={14} height={38} />
//       </button>
//       <button
//         onClick={handleNext}
//         className="absolute top-1/2 -translate-y-1/2 z-50 right-4 lg:right-[calc(50%-292px/2-251px-20px)]"
//       >
//         <Icon name="arrow_right" alt="arrow" width={14} height={38} />
//       </button>
//     </div>
//   );
// };

// export default CustomCarousel;

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
