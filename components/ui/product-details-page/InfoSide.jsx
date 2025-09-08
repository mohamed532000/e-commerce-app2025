import HandleShowPriceAndDiscount from '@/helper/HandleShowPriceAndDiscount';
import HandleTranslate from '@/helper/HandleTranslate';
import React from 'react';
import AddToWhishlistBtn from '../AddToWhishlistBtn';
import AddToCartBtn from '../AddToCartBtn';
import DetailsTabs from './DetailsTabs';
import HandleOutOfStockActions from '@/helper/HandleOutOfStockActions';

function InfoSide({data}) {
  return (
    <div className={`images-side relative col-span-2 md:col-span-1 flex flex-col gap-y-1`}>
        <div className='info-content relative flex flex-col gap-y-2.5 w-full'>
            <h1 className='font-bold md:text-3xl'>{data.title}</h1>
            <div className='relative flex items-center'>
                <HandleTranslate word={"Price"} page={"global"}/> : 
                <HandleShowPriceAndDiscount price={data.price} discount_amount={data.discount_amount} price_after_discount={data.price_after_discount} currency={"$"}/>
            </div>
            <div className='relative'><HandleTranslate word={"Category"} page={"global"} /> : <span className='text-active-text-primary font-bold'>{data.category}</span></div>
            <div className='relative'><HandleTranslate word={"Sales"} page={"global"} /> : <span className='text-active-text-primary font-bold'>{data.sales}</span></div>
            {
                <HandleOutOfStockActions
                item={data}
                elements={
                    <>
                        <div className='relative'><HandleTranslate word={"Stock"} page={"global"} /> : <span className='text-active-text-primary font-bold'>{data.stock}</span></div>
                        <div className='action relative flex items-center gap-x-1.5'>
                            <AddToWhishlistBtn fullWord={true} className={"font-medium"}/>
                            <AddToCartBtn/>
                        </div>
                    </>
                }
                />
            }
            <DetailsTabs item={data}/>
        </div>
    </div>
  )
}

export default InfoSide