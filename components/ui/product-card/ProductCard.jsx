"use client"
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import React from 'react'
import AddToCartBtn from '../AddToCartBtn';
import AddToWhishlistBtn from '../AddToWhishlistBtn';
import Image from 'next/image';

function ProductCard({className , product}) {
    const currentLocale = useLocale();
  return (
    <div className={`product-card relative flex flex-col justify-center items-center ${className} dark:shadow-accent-foreground mt-9 w-fit rounded-3xl bg-white dark:bg-background shadow-flexable-shadow px-2 py-3`}>
        <Link href={`/product-details/${product.id}`}>
            <div className='image-div aspect-[4/3] relative rounded-3xl overflow-hidden w-full h-[170px]'>
                <Image
                    src={product.image_url}
                    alt={`${product.title} product image`} 
                    fill
                    sizes='(max-width: 768px) 50vw, (max-width: 1024px) 30vw, 250px'
                    className='object-cover hover:scale-105 hover:rotate-2 transition-all duration-300'
                    quality={85}
                    priority={false}
                />
            </div>
        </Link>
        <div className='flex flex-col gap-1 px-2'>
            <div className='product-info relative flex flex-col gap-1'>
                <p className='font-bold line-clamp-1 text-foreground text-center md:text-start'>
                    {product.title}
                </p>
                {
                    product.discount_amount >= 1
                    ?
                    <div className='relative flex justify-center items-center md:justify-start gap-2'>
                        <p className='font-bold text-center md:text-start'>{product.price_after_discount}$</p>
                        <p className='font-bold text-center md:text-start line-through text-red-500'>{product.price}$</p>
                    </div>
                    :
                    <div className='relative flex justify-center items-center md:justify-start gap-2'>
                        <p className='font-bold text-center md:text-start'>{product.price}$</p>
                    </div>
                }
                <p className='text-center line-clamp-2 md:text-start'>
                    {product.description}
                </p>
            </div>
            <div className='card-icons relative flex justify-between w-full'>
                <AddToCartBtn/>
                <AddToWhishlistBtn/>
            </div>
        </div>
        {
            product.discount_amount >= 1
            &&
            <p className={`absolute inset-y-0 translate-y-4 h-fit ${currentLocale == "ar" ? "right-3" : "left-3"} bg-red-600 text-center md:text-start text-white py-1 px-2`}>
                -
                {
                    product.discount_type === "fixed"
                    ?
                    `${product.discount_amount}$`
                    :
                    `${product.discount_amount}%`
                }
            </p>
        }
    </div>
  )
}

export default ProductCard