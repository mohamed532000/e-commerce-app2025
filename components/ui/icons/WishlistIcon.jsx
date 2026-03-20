"use client";
import React from 'react';
import { Link } from '@/i18n/navigation';
import { CiHeart } from "react-icons/ci";
import { useTranslations } from 'next-intl';

function WishlistIcon() {
    const wishlist = {
      products : []
    }
    const shoppingT = useTranslations("shopping");
  return (
    <Link href={'/user/wishlist'} className='flex items-center gap-x-1.5'>
        <div className='relative'>
            <CiHeart/>
        </div>
        <span>{shoppingT("Wishlist")}</span>
        {
            wishlist?.products?.length >= 1
            &&
            <span className='relative animate-pulse -translate-y-2 -translate-x-1.5 w-fit h-fit p-1 rounded-[50%] bg-active-text-primary text-stone-100 text-sm'></span>
        }
    </Link>
  )
}

export default WishlistIcon;