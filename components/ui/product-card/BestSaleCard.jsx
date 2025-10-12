import React from 'react'
import AddToCartBtn from '../AddToCartBtn'
import AddToWhishlistBtn from '../AddToWhishlistBtn'
import HandleShowPriceAndDiscount from '@/helper/HandleShowPriceAndDiscount'
import Image from 'next/image'
import HandleTranslate from '@/helper/HandleTranslate'
import { Link } from '@/i18n/navigation'
import { IoInformationCircle } from "react-icons/io5";


function BestSaleCard({className , product , productAfterConvert}) {
  return (
    <div className={`best-sale-card my-2 relatie flex flex-col md:flex-row md:justify-between ${className}`}>
        <div className='relative w-full md:w-[40%] flex justify-center'>
          <div className='relative aspect-[4/4] md:aspect-auto-[3/4] w-full md:max-w-[300px] image rounded-3xl overflow-hidden'>
            <Image
            src={product.image_url}
            alt='image'
            title={productAfterConvert.title}
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            sizes="300px"
            fill
            className='relative object-cover'
            quality={85}
            />
          </div>
        </div>
        <div className='product-info flex flex-col gap-y-2.5 md:w-[60%]'>
            <Link href={`/product-details/${productAfterConvert.slug}`} className='line-clamp-2'>
              <h1 className='text-6xl line-clamp-2 py-2.5'>
                {productAfterConvert.title}
              </h1>
            </Link>
            <div className='relative'><HandleTranslate word={"Category"} page={"global"} /> : <span className='text-active-text-primary font-bold'>{productAfterConvert.category}</span></div>
            <div className='relative'><HandleTranslate word={"Sales"} page={"global"} /> : <span className='text-active-text-primary font-bold'>{product.sales}</span></div>
            <HandleShowPriceAndDiscount 
            price={product.price} 
            currency={"$"} 
            price_after_discount={product.price_after_discount} 
            discount_amount={product.discount_amount}/>
            <p className='line-clamp-2'>{productAfterConvert.description}</p>
            <div className='flex items-center gap-1'>
              <AddToCartBtn/>
              <AddToWhishlistBtn/>
              <Link href={`/product-details/${productAfterConvert.slug}`} aria-label='Show product details' className={`cursor-pointer rounded-xl py-2 px-3 bg-white dark:bg-background shadow-flexable-shadow flex justify-center items-center group group ${className}`}>
                  <IoInformationCircle className='text-2xl'/>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default BestSaleCard