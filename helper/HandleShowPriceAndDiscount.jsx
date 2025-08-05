import React from 'react'

function HandleShowPriceAndDiscount({price , discount_amount , price_after_discount , currency}) {
  return (
    <div className='relative flex items-center gap-1.5'>
        {
            discount_amount >= 1
            ?
            (
            <div className='relative flex items-center gap-1.5'>
                <span className='font-bold'>{price_after_discount}{currency}</span>
                <span className='line-through text-red-600 font-bold'>{price}{currency}</span>
            </div>
            )
            :
            <span className='font-bold'>{price}{currency}</span>
        }
    </div>
  )
}

export default HandleShowPriceAndDiscount