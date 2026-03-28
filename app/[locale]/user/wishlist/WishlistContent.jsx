"use client"
import HandleTranslate from '@/helper/HandleTranslate'
import React, { useState } from 'react'
import CartProductsTable from './WishlistTable'
import FaildLoadingData from '@/components/ui/data-status/FaildLoadingData'
import EmptyData from '@/components/ui/data-status/EmptyData'
import { MainLink } from '@/components/ui/MainLink'
import { useWishlistData } from '@/services/shopping/wishlsit/useWishlistData'
import { UserAuth } from '@/context/AuthProvider'
import { useLocale, useTranslations } from 'next-intl'
import { CiShoppingCart } from 'react-icons/ci'
import WishlistTable from './WishlistTable'

function WishlistContent() {
  const shoppingT = useTranslations("shopping")
  const currentlocale = useLocale()
  const {session} = UserAuth();
  const [wishlistSorting , setWishlistSorting] = useState("created_at")
  const {data , isPending:wishlistLoading , isError} = useWishlistData(
    {
      userId : session?.user?.id , 
      locale : currentlocale , 
      sortingType : wishlistSorting
    }
  );
  const handleWIshlistSorting = (sortType) => {
    setWishlistSorting(sortType)
  }


  if(!wishlistLoading && isError) return <FaildLoadingData/>
  if(data?.products?.length < 1) return <EmptyData 
  emptyText={"Your wishlist is empty"} 
  translate={shoppingT}
  icon={
    <div className='relative flex justify-center items-center p-10 bg-slate-200 rounded-[50%]'>
      <CiShoppingCart className='text-[80px] dark:text-slate-900'/>
    </div>
  }
  className={"md:my-[100px]"}
  />
    return (
      <div className='relative w-full grid grid-cols-12'>
          <div className='table-side col-span-12 flex flex-col gap-y-4.5'>
            <div className='relative flex flex-col md:flex-row gap-y-2 md:gap-y-0 md:justify-between md:items-center'>
              <div className='relative flex flex-col gap-y-1.5'>
                <h1 className='relative text-3xl font-bold'><HandleTranslate word={"Your wishlist"} page={"shopping"} /></h1>
                <p><HandleTranslate word={"wishlistPageDescription"} page={"shopping"}/></p>
              </div>
              <div className='filter-side bg-background shadow-flexable-shadow rounded-4xl py-3.5 px-5'>
                <ul className='relative flex items-center gap-x-6'>
                  <li className='pointer-events-none px-4 py-1  rounded-4xl'>Sort By</li>
                  <li className={`cursor-pointer px-4 py-1 hover:text-stone-50 transition-all duration-300 rounded-4xl ${wishlistSorting == "created_at" ? "bg-active-text-primary" : ""}`}
                    onClick={() => {handleWIshlistSorting("created_at")}}
                  >Newest</li>
                  <li className={`cursor-pointer px-4 py-1 hover:text-stone-50 transition-all duration-300 rounded-4xl ${wishlistSorting == "price_after_discount" ? "bg-active-text-primary" : ""}`}
                    onClick={() => {handleWIshlistSorting("price_after_discount")}}
                  >Price</li>
                </ul>
              </div>
            </div>
              <WishlistTable products={data?.products} wishlistLoading={wishlistLoading}/>
          </div>
      </div>
    )
}

export default WishlistContent