"use client";
import React, { useEffect } from 'react';
import HandleTranslate from '@/helper/HandleTranslate';
import CartProductsTable from './CartProductsTable';
import CartSummarySide from './CartSummarySide';
import FaildLoadingData from '@/components/ui/data-status/FaildLoadingData';
import EmptyData from '@/components/ui/data-status/EmptyData';
import { MainLink } from '@/components/ui/MainLink';
import { UserAuth } from '@/context/AuthProvider';

function CartContent() {
    const {cart:cartData , cartLoading} = UserAuth();
    useEffect(() =>  console.log(cartData) , [cartData])
    const products = [
        {
          id: 1,
          title: "Wireless Bluetooth Headphones Wireless Bluetooth Headphones Wireless Bluetooth Headphones Wireless Bluetooth Headphones",
          price: 59.99,
          quantity: 2,
          image: "https://i.pinimg.com/1200x/b8/83/80/b883804d9cced57f21a005add62683bd.jpg",
          category: "Electronics",
          description: "High-quality sound with noise cancellation."
        },
        {
          id: 2,
          title: "Gaming Mouse RGB",
          price: 29.99,
          quantity: 1,
          image: "https://i.pinimg.com/1200x/b8/83/80/b883804d9cced57f21a005add62683bd.jpg",
          category: "Electronics",
          description: "Ergonomic design with customizable RGB lighting."
        },
        {
          id: 3,
          title: "Cotton T-Shirt - Black",
          price: 14.99,
          quantity: 3,
          image: "https://i.pinimg.com/1200x/b8/83/80/b883804d9cced57f21a005add62683bd.jpg",
          category: "Clothing",
          description: "Soft cotton T-shirt with a modern fit."
        },
        {
          id: 4,
          title: "https://i.pinimg.com/1200x/b8/83/80/b883804d9cced57f21a005add62683bd.jpg",
          price: 19.99,
          quantity: 1,
          image: "/images/tripod.jpg",
          category: "Photography",
          description: "Adjustable tripod for stable phone photography."
        },
        {
          id: 5,
          title: "Ceramic Coffee Mug",
          price: 9.99,
          quantity: 4,
          image: "https://i.pinimg.com/1200x/b8/83/80/b883804d9cced57f21a005add62683bd.jpg",
          category: "Kitchen",
          description: "Durable ceramic mug for hot and cold drinks."
        },
        {
          id: 6,
          title: "Leather Wallet - Brown",
          price: 24.99,
          quantity: 1,
          image: "https://i.pinimg.com/1200x/b8/83/80/b883804d9cced57f21a005add62683bd.jpg",
          category: "Accessories",
          description: "Premium leather wallet with multiple compartments."
        }
    ];
    return (
        <>
            {!cartData && !cartLoading && <FaildLoadingData/>}
            {cartData?.products?.length < 1 && <EmptyData/>}
            <div className='relative w-full grid grid-cols-12 gap-6'>
                <div className='table-side col-span-12 md:col-span-8 flex flex-col gap-y-4.5'>
                    <h1 className='relative md:text-3xl font-bold'><HandleTranslate word={"Your shopping cart"} page={"shopping"} /></h1>
                    <CartProductsTable cartData={cartData} />
                    <MainLink href='/shop' className={"relative bg-transparent border border-active-text-primary hover:bg-active-text-primary text-fexable w-full"}><HandleTranslate word={"Continue Shop"} page={"shopping"}/></MainLink>
                </div>
                <div className='summary-side relative col-span-12 md:col-span-4'>
                    <CartSummarySide/>
                </div>
            </div>
        </>
    )
}

export default CartContent