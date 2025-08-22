"use client"
import React from 'react'
import ProductCard from './product-card/ProductCard'
import { useLocale } from 'next-intl'

function NewProductsContent({products}) {
    const currentLocale = useLocale()
  return (
    <div className={`relative w-full p-4 flex gap-x-5 transition-all duration-500 ${currentLocale == "ar" ? "infinite-line-animate-ar" :"infinite-line-animate"} `}>
        {products.map((item , index) => <ProductCard key={index} product={item}/>)}
    </div>
  )
}

export default NewProductsContent