"use client";
import {Swiper} from "swiper/react";
import {A11y , Autoplay , Navigation , Pagination , EffectFade} from "swiper/modules"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
const CustomSwiperModule = (
  { 
    children,
    className = "",
    slidesPerView,
    breakpoints,
    spaceBetween,
    effect = "",
    speed = 1000,
    autoplay,
    onSlideChange = null,
    loop = true,
    initialSlide = 0,
    pagination = true,
  }
) => {
  return (
    <div>
      <Swiper
        className={`w-full ${className}`}
        modules={[A11y, Autoplay, Navigation, ...(pagination ? [Pagination] : []), EffectFade]}
        slidesPerView={slidesPerView}
        breakpoints={breakpoints}
        spaceBetween={spaceBetween}
        autoplay={autoplay}
        navigation
        pagination={{ clickable: true }}
        effect={effect}
        speed={speed}
        loop = {loop}
        initialSlide={initialSlide}
        onSlideChange={(swiper) => {
          onSlideChange && onSlideChange(swiper)
        }}
      >
        {children}
      </Swiper>
    </div>
  )
}
export default CustomSwiperModule