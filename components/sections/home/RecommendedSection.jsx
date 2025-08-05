"use client"
import React from 'react';
import ProductCard from '../../ui/product-card/ProductCard';
import Section from '../../ui/section/Section';
import { CustomSwiperModule } from '../../ui/CustomSwiperModule';
import { SwiperSlide } from 'swiper/react';
import "../../../styles/swiperSection.css";
import "../../../styles/recommendedSection.css";
function RecommendedSection() {
  const products = [
    {
      id: 1,
      title: "Coffee Brown Crossbody",
      category: "Crossbody",
      price: 89.00,
      info: "Stylish coffee‑brown leather crossbody bag shown flat‑lay with accessories.",
      image_url: "https://images.pexels.com/photos/167703/pexels-photo-167703.jpeg", // from turn0search15 :contentReference[oaicite:1]{index=1}
      discount_type: "percentage",
      discount_amount: 10,
      price_after_discount: 80.10,
    },
    {
      id: 2,
      title: "Brown Messenger Bag",
      category: "Bags",
      price: 99.00,
      info: "Brown leather messenger bag with buckle and zip details.",
      image_url: "https://images.pexels.com/photos/27204288/pexels-photo-27204288.jpeg", // from turn0search19 :contentReference[oaicite:2]{index=2}
      discount_type: "fixed",
      discount_amount: 15,
      price_after_discount: 84.00,
    },
    {
      id: 3,
      title: "Beige Studio Handbag",
      category: "Everyday",
      price: 120.00,
      info: "Chic beige handbag styled on a clean neutral background.",
      image_url: "https://images.pexels.com/photos/8006405/pexels-photo-8006405.jpeg", // from turn0search12 :contentReference[oaicite:3]{index=3}
      discount_type: "percentage",
      discount_amount: 15,
      price_after_discount: 102.00,
    },
    {
      id: 4,
      title: "Designer Shoulder Bag",
      category: "Designer",
      price: 150.00,
      info: "Elegant shoulder bag with refined structure and sleek finish.",
      image_url: "https://images.pexels.com/photos/22432990/pexels-photo-22432990.jpeg", // from turn0search20 :contentReference[oaicite:4]{index=4}
      discount_type: "none",
      discount_amount: 0,
      price_after_discount: 150.00,
    },
    {
      id: 5,
      title: "Minimalist Neutral Tote",
      category: "Tote",
      price: 95.00,
      info: "Minimalist neutral tote bag perfect for everyday errands.",
      image_url: "https://images.pexels.com/photos/22434760/pexels-photo-22434760.jpeg", // from turn0search0 combined of handbag search :contentReference[oaicite:5]{index=5}
      discount_type: "fixed",
      discount_amount: 10,
      price_after_discount: 85.00,
    },
    {
      id: 6,
      title: "Pink Leather Handbag",
      category: "Fashion",
      price: 130.00,
      info: "Pastel pink leather handbag in studio lighting with gold-tone hardware.",
      image_url: "https://images.pexels.com/photos/22432983/pexels-photo-22432983.jpeg", // from turn0search20 :contentReference[oaicite:6]{index=6}
      discount_type: "percentage",
      discount_amount: 12,
      price_after_discount: 114.40,
    },
    {
      id: 7,
      title: "Vintage Travel Satchel",
      category: "Travel",
      price: 140.00,
      info: "Vintage style travel satchel with structured shape and leather trim.",
      image_url: "https://images.pexels.com/photos/27204288/pexels-photo-27204288.jpeg", // reuse turn0search19 :contentReference[oaicite:7]{index=7}
      discount_type: "percentage",
      discount_amount: 20,
      price_after_discount: 112.00,
    },
    {
      id: 8,
      title: "Cassette Leather Bag",
      category: "Classic",
      price: 110.00,
      info: "Timeless leather bag with clean lines and minimalist aesthetic.",
      image_url: "https://images.pexels.com/photos/8006405/pexels-photo-8006405.jpeg", // reuse turn0search12 :contentReference[oaicite:8]{index=8}
      discount_type: "fixed",
      discount_amount: 20,
      price_after_discount: 90.00,
    },
    {
      id: 9,
      title: "Flat Lay Essentials Bag",
      category: "Accessories",
      price: 75.00,
      info: "Flat-lay shot of a leather bag with accessories like glasses, wallet.",
      image_url: "https://i.pinimg.com/1200x/ad/92/9a/ad929a018ec2aa187bcf86e78daac3e5.jpg", // from turn0search13 :contentReference[oaicite:9]{index=9}
      discount_type: "percentage",
      discount_amount: 15,
      price_after_discount: 63.75,
    },
    {
      id: 10,
      title: "Everyday Shoulder Handbag",
      category: "Bags",
      price: 105.00,
      info: "Everyday shoulder handbag photographed in clean studio settings.",
      image_url: "https://images.pexels.com/photos/22434775/pexels-photo-22434775.jpeg", // from turn0search0 :contentReference[oaicite:10]{index=10}
      discount_type: "fixed",
      discount_amount: 10,
      price_after_discount: 94.50,
    },
  ];
  
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
    title={"RECOMMENDED"}
    subText={"We Recommended These Products For You."}>
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
    </Section>
  )
}

export default RecommendedSection