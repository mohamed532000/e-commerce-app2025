"use client"
import HandleTranslate from '@/helper/HandleTranslate'
import React from 'react'
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
  const {data , isPending:wishlistLoading , isError} = useWishlistData({userId : session?.user?.id , locale : currentlocale});
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
              <div className='relative flex flex-col gap-y-1.5'>
                <h1 className='relative md:text-3xl font-bold'><HandleTranslate word={"Your wishlist"} page={"shopping"} /></h1>
                <p><HandleTranslate word={"wishlistPageDescription"} page={"shopping"}/></p>
              </div>
              <WishlistTable products={data?.products} wishlistLoading={wishlistLoading}/>
              <MainLink href='/shop' className={""}><HandleTranslate word={"Continue Shop"} page={"shopping"}/></MainLink>
          </div>
      </div>
    )
}

export default WishlistContent