"use client";
import React from 'react';
import { useLocale } from 'next-intl';
import { Spinner } from "@/components/ui/spinner";
import { CiShoppingCart } from 'react-icons/ci';

function AddToCartBtn({className , addingFunc , loading , disabled}) {
    const currentLocale = useLocale();
  return (
    <button disabled={disabled} onClick={addingFunc} className={`cursor-pointer rounded-xl py-2 px-4 bg-white dark:bg-background shadow-flexable-shadow flex justify-center items-center group ${className}`}>
      {
        loading
        ?
        <Spinner className="size-4"/>
        :
        <>
          <CiShoppingCart className='text-2xl'/>
          <span className={`relative font-bold transition-all duration-300  opacity-0  ${currentLocale == "ar" ? "-mr-[50%]" : "-ml-[50%]"} group-hover:m-0 group-hover:opacity-100 text-foreground`}>AC</span>
        </>
      }
    </button>
  )
}

export default AddToCartBtn