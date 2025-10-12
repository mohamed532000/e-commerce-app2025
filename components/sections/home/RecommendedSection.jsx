"use client"
import React, { useEffect, useRef } from 'react';
import ProductCard from '../../ui/product-card/ProductCard';
import Section from '../../ui/section/Section';
import { SwiperSlide } from 'swiper/react';
import "../../../styles/swiperSection.css";
import "../../../styles/recommendedSection.css";
import FaildLoadingData from '@/components/ui/data-status/FaildLoadingData';
import EmptyData from '@/components/ui/data-status/EmptyData';
import dynamic from 'next/dynamic';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
const CustomSwiperModule = dynamic(() => import("../../ui/CustomSwiperModule"), { ssr: false });
function  RecommendedSection({products , convertedProducts}) {
  const containerRef = useRef(null);
  const breakpoints = {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 4,
    },
  }
  useGSAP((context) => {
    const cards = context.selector(".recommended-card");
    gsap.from(cards , {
      opacity : 0,
      y : 100,
      scale : .4,
      stagger : .4,
      ease : "elastic.out(0.7, 0.7)",
      duration : 1,
      scrollTrigger : {
        trigger : containerRef.current,
        start : "top 80%",
      }
    })
  }, { scope: containerRef })
  return (
    <Section 
    className={"swiper-section recommended-section"} 
    containerClassName={"recommended-container"}
    containerId={"recommended-container"}
    title={"recommended"}
    containerRef={containerRef}
    subText={"recommended section subtext"}>
      {convertedProducts?.length >= 1 && convertedProducts?.length < 5
      ?
      <div className='relative flex flex-wrap justify-center items-center gap-2.5' id='smoother-content'>
        {
        
        convertedProducts.map((item , index) => {
          return (
            <ProductCard 
            key={index} 
            product={products[index]} 
            productAfterConvert={item} 
            className={"recommended-card"}
            />
          )
        })}
      </div>
      :
      <CustomSwiperModule
        className=''
        breakpoints={breakpoints}
        spaceBetween={20}
        pagination = {false}
        children={convertedProducts?.map((item , index) => {
          return (
            <SwiperSlide className='!flex justify-center items-center my-7'>
              <ProductCard 
              key={index} 
              product={products[index]} 
              productAfterConvert={item} 
              className={"recommended-card"}
              />
            </SwiperSlide>
          )
          }
        )}
      />
      }
      {!products && <FaildLoadingData/>}
      {products?.length < 1 && <EmptyData/>}
    </Section>
  )
}

export default RecommendedSection