"use client"
import React from 'react'
import { useLocale } from 'next-intl'

function InfinitItemsLine({children}) {
    const currentLocale = useLocale()
  return (
    <div className='relative w-full p-4 overflow-hidden'>
        <span className='absolute inset-y-0 left-0 z-20 w-[10%] bg-gradient-to-r from-background to-transparent h-full'></span>
            <div className={`relative w-full p-4 flex gap-x-5 transition-all duration-500 ${currentLocale == "ar" ? "infinite-line-animate-ar" :"infinite-line-animate"} `}>
                {children}
            </div>
        <span className='absolute inset-y-0 right-0 z-20 w-[10%] bg-gradient-to-l from-background to-transparent h-full'></span>
    </div>
  )
}

export default InfinitItemsLine