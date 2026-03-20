"use client";
import SelecktonLoading from '@/components/ui/loading/SelecktonLoading';
import { Spinner } from '@/components/ui/spinner';
import { UserAuth } from '@/context/AuthProvider';
import { useAddToWishlist } from '@/services/shopping/wishlsit/useAddToWishlist';
import { useWishlistData } from '@/services/shopping/wishlsit/useWishlistData';
import { useLocale } from 'next-intl'
import React, { useEffect } from 'react'
import { CiHeart } from 'react-icons/ci'

function AddToWhishlistBtn({item , className}) {
  const currentLocale = useLocale();
  const {session} = UserAuth();
  const {data , isPending:wishlistLoading , isRefetching:wishlistRefetching} = useWishlistData({userId : session?.user?.id , locale: currentLocale});
  const {mutate:addingFunc , isPending:addingLoading , variables} = useAddToWishlist();
  const handleAddItemToWishlist = () => {
    addingFunc({item , wishlistId : data?.id , userId: session?.user?.id})
  }

  if(wishlistLoading || wishlistRefetching) return <SelecktonLoading className={"w-[70px] h-[40px]"}/>
  if(data?.products?.find(i => i.products?.id == item.id)) return (
    <button className={` pointer-events-none rounded-xl py-2 px-3 bg-white dark:bg-background shadow-flexable-shadow flex justify-center items-center group group ${className}`}>
        <CiHeart className='text-2xl text-red-700'/>
      </button>
  )
  return (
    <button onClick={() => {
        handleAddItemToWishlist()
    }} className={`cursor-pointer rounded-xl py-2 px-3 bg-white dark:bg-background shadow-flexable-shadow flex justify-center items-center group group ${className}`}>
      {
        addingLoading && variables?.item?.id == item?.id
        ?
        <Spinner className="size-4"/>
        :
        <>
          <CiHeart className='text-2xl'/>
          <span className={`relative font-bold transition-all duration-300  opacity-0  ${currentLocale == "ar" ? "-mr-[50%]" : "-ml-[50%]"} group-hover:m-0 group-hover:opacity-100 text-foreground`}>
            AW
          </span>
        </>
      }
    </button>
  )
}

export default AddToWhishlistBtn