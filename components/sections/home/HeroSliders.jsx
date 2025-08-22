"use client"
import React, { useState } from 'react'
import {SwiperSlide} from "swiper/react";
import slide1 from "../../../app/media/images/backgrounds/banner.webp"
import slide2 from "../../../app/media/images/backgrounds/banner-2.webp"
import slide3 from "../../../app/media/images/backgrounds/banner-3.webp"
// import {CustomSwiperModule} from '../../ui/CustomSwiperModule';
import {ImageOverlay} from '../../ui/ImageOverlay';
import { MainButton } from '../../ui/MainButton';
import "../../../styles/homeSwiper.css"
import HandleTranslate from '@/helper/HandleTranslate';
import dynamic from 'next/dynamic';
const CustomSwiperModule = dynamic(() => import("../../ui/CustomSwiperModule"), { ssr: false });
function HeroSliders() {
    const [activeSlideIndex , setActiveSlideIndex] = useState(0)
    const heroSlides = [
        {
            bg : slide1 ,
            headerText : "Header Text" ,
            pargraph : 'pargraph' ,
            path : "/",
            title : "Crafted with Heart",
            description : "Discover artisan goods made by real hands, not machines — where every stitch tells a story."
        },
        {
            bg : slide2 ,
            headerText : "Header Text" ,
            pargraph : 'pargraph' ,
            path : "/",
            title : "Authentic. Handmade. Yours.",
            description : "From local creators to your home — shop one-of-a-kind pieces that stand out from the ordinary."
        },
        {
            bg : slide3 ,
            headerText : "Header Text" ,
            pargraph : 'pargraph' ,
            path : "/",
            title : "Sustainable & Soulful",
            description : "Choose eco-conscious creations that blend natural materials with timeless design."
        },
    ]
  return (
    <div className='relative w-full h-screen'>
            <CustomSwiperModule
                className='h-screen w-full relative hero-swiper'
                effect='fade'
                autoplay={{ delay : 3000, disableOnInteraction: false }}
                onSlideChange = {(swiper) => {
                    setActiveSlideIndex(swiper.activeIndex);
                }}
                loop = {false}
                children={
                    heroSlides.map((item , index) => (
                        <SwiperSlide key={index}>
                                <div className={`relative w-full h-full flex justify-center items-center bg-no-repeat bg-cover`}
                                style={{backgroundImage : `url('${item.bg.src}')`}}
                                >
                                    <ImageOverlay/>
                                    <div className='relative container flex justify-center items-center'>
                                        <div className={`relative flex flex-col justify-center items-center gap-3 transition-all duration-800 md:max-w-[50%]`}>
                                            <h2 className={`font-bold text-4xl  text-center text-stone-50 ${activeSlideIndex == index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-70px]"} transition-all duration-800`}>{item.title}</h2>
                                            <p className={`text-center text-stone-50 ${activeSlideIndex == index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[70px]"} transition-all duration-800`}>{item.description}</p>
                                            <MainButton
                                            className={`${activeSlideIndex == index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[100px]"} delay-100 transition-all duration-800`}
                                                href={'/'}
                                            >
                                                <HandleTranslate page={"home"} word={"Shop Now"} />
                                            </MainButton>
                                        </div>
                                    </div>
                                </div>
                        </SwiperSlide>
                    ))
                }
            />
    </div>
  )
}
export default HeroSliders