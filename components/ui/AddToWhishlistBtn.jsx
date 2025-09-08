"use client"
import HandleTranslate from '@/helper/HandleTranslate';
import { useLocale } from 'next-intl'
import React from 'react'
import { CiHeart } from 'react-icons/ci'

function AddToWhishlistBtn({className , fullWord}) {
    const currentLocale = useLocale();
  return (
    <button onClick={() => {
        console.log("Added Done")
    }} className={`cursor-pointer rounded-xl py-2 px-3 bg-white dark:bg-background shadow-flexable-shadow flex justify-center items-center group group ${className}`}>
        <CiHeart className='text-2xl'/>
        <span className={`relative font-bold transition-all duration-300  opacity-0  ${currentLocale == "ar" ? "-mr-[50%]" : "-ml-[50%]"} group-hover:m-0 group-hover:opacity-100 text-foreground`}>
          AW
        </span>
    </button>
  )
}

export default AddToWhishlistBtn