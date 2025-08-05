"use client"
import React from 'react'
import Section from '../../ui/section/Section'
import { CustomSwiperModule } from '../../ui/CustomSwiperModule'
import BestSaleCard from '../../ui/product-card/BestSaleCard'
import { SwiperSlide } from 'swiper/react'
import "../../../styles/swiperSection.css";
function BestSaleSection() {
  const products = [
    {
      id: 11,
      title: "Elegant Quilted Shoulder Bag",
      category: "Luxury",
      price: 135.00,
      info: "Quilted shoulder bag with chain strap, perfect for evening outings.",
      image_url: "https://images.pexels.com/photos/22432986/pexels-photo-22432986.jpeg",
      discount_type: "percentage",
      discount_amount: 20,
      price_after_discount: 108.00,
    },
    {
      id: 12,
      title: "Woven Leather Tote",
      category: "Tote",
      price: 95.00,
      info: "Spacious woven leather tote ideal for casual and work settings.",
      image_url: "https://images.pexels.com/photos/22434781/pexels-photo-22434781.jpeg",
      discount_type: "fixed",
      discount_amount: 10,
      price_after_discount: 85.00,
    },
    {
      id: 13,
      title: "Tan Office Handbag",
      category: "Work",
      price: 110.00,
      info: "Tan office handbag with structured body and gold details.",
      image_url: "https://images.pexels.com/photos/22432994/pexels-photo-22432994.jpeg",
      discount_type: "percentage",
      discount_amount: 25,
      price_after_discount: 82.50,
    },
    {
      id: 14,
      title: "Cream Everyday Satchel",
      category: "Satchel",
      price: 88.00,
      info: "Cream-colored satchel with versatile compartments and soft lining.",
      image_url: "https://images.pexels.com/photos/22432991/pexels-photo-22432991.jpeg",
      discount_type: "fixed",
      discount_amount: 8,
      price_after_discount: 80.00,
    },
    {
      id: 15,
      title: "Crocodile Texture Mini Bag",
      category: "Mini",
      price: 70.00,
      info: "Compact mini bag with crocodile texture and metal accents.",
      image_url: "https://images.pexels.com/photos/22434783/pexels-photo-22434783.jpeg",
      discount_type: "percentage",
      discount_amount: 15,
      price_after_discount: 59.50,
    },
    {
      id: 16,
      title: "Classic Black Handbag",
      category: "Classic",
      price: 125.00,
      info: "Timeless black handbag that pairs with any outfit.",
      image_url: "https://images.pexels.com/photos/22432995/pexels-photo-22432995.jpeg",
      discount_type: "fixed",
      discount_amount: 20,
      price_after_discount: 105.00,
    },
    {
      id: 17,
      title: "Textured Beige Crossbody",
      category: "Crossbody",
      price: 92.00,
      info: "Beige crossbody with a textured finish and adjustable strap.",
      image_url: "https://images.pexels.com/photos/22434780/pexels-photo-22434780.jpeg",
      discount_type: "percentage",
      discount_amount: 10,
      price_after_discount: 82.80,
    },
    {
      id: 18,
      title: "Stylish Studio Bag",
      category: "Trendy",
      price: 99.00,
      info: "Modern studio bag with soft lines and vibrant tone.",
      image_url: "https://images.pexels.com/photos/22434773/pexels-photo-22434773.jpeg",
      discount_type: "fixed",
      discount_amount: 14,
      price_after_discount: 85.00,
    },
  ];
  
  return (
    <Section 
      title={"BEST SALE"}
      subText={"These products are best sale of this month."}
      className={"swiper-section best-sale-section"}
      >
        <CustomSwiperModule
          className='relative mt-4'
          slidesPerView={1}
          pagination = {false}
          autoplay={true}
          children={products.map((item , index) => (
            <SwiperSlide>
              <BestSaleCard key={index} product={item} />
            </SwiperSlide>
          ))}
        />
    </Section>
  )
}

export default BestSaleSection