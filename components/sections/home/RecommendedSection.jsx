"use client"
import React from 'react';
import ProductCard from '../../ui/product-card/ProductCard';
import Section from '../../ui/section/Section';
import { SwiperSlide } from 'swiper/react';
import "../../../styles/swiperSection.css";
import "../../../styles/recommendedSection.css";
import FaildLoadingData from '@/components/ui/data-status/FaildLoadingData';
import EmptyData from '@/components/ui/data-status/EmptyData';
import dynamic from 'next/dynamic';
const CustomSwiperModule = dynamic(() => import("../../ui/CustomSwiperModule"), { ssr: false });
function  RecommendedSection({products}) {
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
  return (
    <Section 
    className={"swiper-section recommended-section"} 
    containerClassName={""} 
    title={"recommended"}
    subText={"recommended section subtext"}>
      {products?.length >= 1 && products?.length < 5
      ?
      <div className='relative flex flex-wrap justify-center items-center gap-2.5'>
        {products.map((item , index) => <ProductCard key={index} product={item} />)}
      </div>
      :
      <CustomSwiperModule
        className=''
        breakpoints={breakpoints}
        spaceBetween={20}
        pagination = {false}
        children={products?.map((item , index) => (
          <SwiperSlide className='!flex justify-center items-center my-7'>
            <ProductCard key={index} product={item} />
          </SwiperSlide>
        ))}
      />
      }
      {!products && <FaildLoadingData/>}
      {products?.length < 1 && <EmptyData/>}
    </Section>
  )
}

export default RecommendedSection