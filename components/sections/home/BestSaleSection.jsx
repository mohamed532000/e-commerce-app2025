"use client"
import React from 'react'
import Section from '../../ui/section/Section'
// import { CustomSwiperModule } from '../../ui/CustomSwiperModule'
import BestSaleCard from '../../ui/product-card/BestSaleCard'
import { SwiperSlide } from 'swiper/react'
import "../../../styles/swiperSection.css";
import dynamic from 'next/dynamic'
const CustomSwiperModule = dynamic(() => import("../../ui/CustomSwiperModule"), { ssr: false });
function BestSaleSection({products}) {
  return (
    <Section 
      title={"best sale"}
      subText={"best sale section subtext"}
      className={"swiper-section best-sale-section"}
      >
        {products?.length >= 1 && 
        <CustomSwiperModule
          className='relative mt-4'
          slidesPerView={1}
          pagination = {false}
          autoplay={true}
          children={products.map((item , index) => (
            <SwiperSlide className='flex justify-center items-center'>
              <BestSaleCard key={index} product={item} />
            </SwiperSlide>
          ))}
        />}
        {!products && <FaildLoadingData/>}
        {products?.length < 1 && <EmptyData/>}
    </Section>
  )
}

export default BestSaleSection