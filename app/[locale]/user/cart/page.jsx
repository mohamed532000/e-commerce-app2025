import CartTable from '@/components/ui/cart-table/CartTable';
import EmptyData from '@/components/ui/data-status/EmptyData';
import FaildLoadingData from '@/components/ui/data-status/FaildLoadingData';
import PageHeader from '@/components/ui/page-header/PageHeader'
import Section from '@/components/ui/section/Section'
import React from 'react'

function page() {
    const products = [
        {
          id: 1,
          name: "Wireless Bluetooth Headphones",
          price: 59.99,
          quantity: 2,
          image: "/images/headphones.jpg",
          category: "Electronics",
          description: "High-quality sound with noise cancellation."
        },
        {
          id: 2,
          name: "Gaming Mouse RGB",
          price: 29.99,
          quantity: 1,
          image: "/images/gaming-mouse.jpg",
          category: "Electronics",
          description: "Ergonomic design with customizable RGB lighting."
        },
        {
          id: 3,
          name: "Cotton T-Shirt - Black",
          price: 14.99,
          quantity: 3,
          image: "/images/tshirt-black.jpg",
          category: "Clothing",
          description: "Soft cotton T-shirt with a modern fit."
        },
        {
          id: 4,
          name: "Smartphone Tripod Stand",
          price: 19.99,
          quantity: 1,
          image: "/images/tripod.jpg",
          category: "Photography",
          description: "Adjustable tripod for stable phone photography."
        },
        {
          id: 5,
          name: "Ceramic Coffee Mug",
          price: 9.99,
          quantity: 4,
          image: "/images/coffee-mug.jpg",
          category: "Kitchen",
          description: "Durable ceramic mug for hot and cold drinks."
        },
        {
          id: 6,
          name: "Leather Wallet - Brown",
          price: 24.99,
          quantity: 1,
          image: "/images/wallet.jpg",
          category: "Accessories",
          description: "Premium leather wallet with multiple compartments."
        }
      ];
  return (
    <>
        <PageHeader title={"cart"} pageInfo={"cartPageInfo"}/>
        <Section>
            {!products && <FaildLoadingData/>}
            {products?.length < 1 && <EmptyData/>}
            {products?.length > 1 && products.map((item , index) => <h2 key={index}>{item.name}</h2>)}
        </Section>
    </>
  )
}

export default page