"use client"
import { useLocale } from 'next-intl'
import React from 'react'
import { CiShoppingCart } from 'react-icons/ci'

function AddToCartBtn({className}) {
    const currentLocale = useLocale();
  return (
    <button onClick={() => {
        console.log("Added Done")
    }} className={`cursor-pointer rounded-xl py-2 px-4 bg-white dark:bg-background shadow-flexable-shadow flex justify-center items-center group ${className}`}>
        <CiShoppingCart className='text-2xl'/>
        <span className={`relative font-bold transition-all duration-300  opacity-0  ${currentLocale == "ar" ? "-mr-[50%]" : "-ml-[50%]"} group-hover:m-0 group-hover:opacity-100 text-foreground`}>AC</span>
    </button>
  )
}

export default AddToCartBtn