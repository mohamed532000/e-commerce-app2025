"use client";
import React from 'react';
import { Link } from '@/i18n/navigation';
import { CiShoppingCart } from "react-icons/ci";
import { UserAuth } from '@/context/AuthProvider';
import { useTranslations } from 'next-intl';

function CartIcon() {
    const {cart:cartData} = UserAuth();
    const shoppingT = useTranslations("shopping");
  return (
    <Link href={'/user/cart'} className='flex items-center gap-x-1.5'>
        <div className='relative'>
            <CiShoppingCart/>
        </div>
        <span>{shoppingT("My cart")}</span>
        {
            cartData?.products?.length >= 1
            &&
            <span className='relative animate-pulse -translate-y-2 -translate-x-1.5 w-fit h-fit p-1 rounded-[50%] bg-active-text-primary text-stone-100 text-sm'></span>
        }
    </Link>
  )
}

export default CartIcon;