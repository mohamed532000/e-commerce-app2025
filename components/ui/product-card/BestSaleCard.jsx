import React from 'react'
import AddToCartBtn from '../AddToCartBtn'
import AddToWhishlistBtn from '../AddToWhishlistBtn'
import HandleShowPriceAndDiscount from '@/helper/HandleShowPriceAndDiscount'

function BestSaleCard({className , product}) {
  return (
    <div className={`best-sale-card relatie flex flex-col md:flex-row md:justify-between ${className}`}>
        <div className='relative w-full md:w-[50%] flex justify-center'>
          <div className='relative w-full md:w-[300px] image'>
            <img loading='lazy' src={product.image_url} alt='image' title='best sale prodct' className='relative rounded-3xl' />
          </div>
        </div>
        <div className='product-info flex flex-col gap-y-2.5'>
            <h1 className='text-6xl line-clamp-2'>
              {product.title}
            </h1>
            <div className='relative'>Category : <span className='text-active-text-primary font-bold'>{product.category}</span></div>
            <HandleShowPriceAndDiscount 
            price={product.price} 
            currency={"$"} 
            price_after_discount={product.price_after_discount} 
            discount_amount={product.discount_amount}/>
            <p className='line-clamp-2'>{product.info}</p>
            <div className='flex items-center gap-1'>
              <AddToCartBtn/>
              <AddToWhishlistBtn/>
            </div>
        </div>
    </div>
  )
}

export default BestSaleCard