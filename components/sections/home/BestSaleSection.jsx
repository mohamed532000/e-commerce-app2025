"use client"
import React, { useRef } from 'react'
import Section from '../../ui/section/Section'
// import { CustomSwiperModule } from '../../ui/CustomSwiperModule'
import BestSaleCard from '../../ui/product-card/BestSaleCard'
import { SwiperSlide } from 'swiper/react'
import "../../../styles/swiperSection.css";
import dynamic from 'next/dynamic'
import EmptyData from '@/components/ui/data-status/EmptyData'
import FaildLoadingData from '@/components/ui/data-status/FaildLoadingData'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
const CustomSwiperModule = dynamic(() => import("../../ui/CustomSwiperModule"), { ssr: false });
function BestSaleSection({products}) {
  const sectionRef = useRef(null)
  useGSAP((context) => {
    const bestSaleContainer = context.selector(".best-sale-container");
    gsap.from(bestSaleContainer , {
      scale : .4,
      opacity : 0,
      duration : 1,
      scrollTrigger : {
        trigger : sectionRef.current,
        start : "top 80%"
      }
    })
  },{scope : sectionRef})
  return (
    <Section 
      title={"best sale"}
      subText={"best sale section subtext"}
      className={"swiper-section best-sale-section"}
      containerClassName={"best-sale-container"}
      sectionRef={sectionRef}
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