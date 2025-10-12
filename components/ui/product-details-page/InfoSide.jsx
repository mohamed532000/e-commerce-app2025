"use client"
import HandleShowPriceAndDiscount from '@/helper/HandleShowPriceAndDiscount';
import HandleTranslate from '@/helper/HandleTranslate';
import React, { useEffect, useState } from 'react';
import AddToWhishlistBtn from '../AddToWhishlistBtn';
import AddToCartBtn from '../AddToCartBtn';
import DetailsTabs from './DetailsTabs';
import HandleOutOfStockActions from '@/helper/HandleOutOfStockActions';
import { UserAuth } from '@/context/AuthProvider';
import { useAddToCart } from '@/services/shopping/useAddToCart';

function InfoSide({data , dataAfterConvert}) {
    const {profile , cart:cartData , cartLoading} = UserAuth();
    const {mutate:addTocart , isPending:addTocartLoading , isSuccess} = useAddToCart(profile?.id);
    const [alreadyInCart , setAlreadyInCart] = useState();
    const [alreadyInShishlist , setAlreadyInShishlist] = useState(true);
    const handleAddToCart = () => {
        addTocart({
            prevItems : cartData?.products ,
            newItem : data , 
            translate : shoppingT
        })
    }
    useEffect(() => {
        if(cartData) setAlreadyInCart(cartData?.products?.some(item => item.id == data.id));
    },[cartData])
    return (
        <div className={`images-side relative col-span-2 md:col-span-1 flex flex-col gap-y-1`}>
            <div className='info-content relative flex flex-col gap-y-2.5 w-full'>
                <h1 className='font-bold md:text-3xl'>{dataAfterConvert.title}</h1>
                <div className='relative flex items-center'>
                    <HandleTranslate word={"Price"} page={"global"}/> : 
                    <HandleShowPriceAndDiscount price={data.price} discount_amount={data.discount_amount} price_after_discount={data.price_after_discount} currency={"$"}/>
                </div>
                <div className='relative'><HandleTranslate word={"Category"} page={"global"} /> : <span className='text-active-text-primary font-bold'>{dataAfterConvert.category}</span></div>
                <div className='relative'><HandleTranslate word={"Sales"} page={"global"} /> : <span className='text-active-text-primary font-bold'>{data.sales}</span></div>
                {
                    <HandleOutOfStockActions
                    item={data}
                    elements={
                        <>
                            <div className='relative'><HandleTranslate word={"Stock"} page={"global"} /> : <span className='text-active-text-primary font-bold'>{data.stock}</span></div>
                            <div className='action relative flex items-center gap-x-1.5'>
                                {
                                    alreadyInShishlist
                                    ?
                                    <h1 className='text-active-text-primary flex justify-center items-center'><HandleTranslate word={"Already in whishlist"} page={"shopping"} /></h1>
                                    :
                                    <AddToWhishlistBtn fullWord={true} className={"font-medium"}/>
                                }
                                {
                                    alreadyInCart
                                    ?
                                    <h1 className='text-active-text-primary flex justify-center items-center mx-3'><HandleTranslate word={"Already in cart"} page={"shopping"} /></h1>
                                    :
                                    <AddToCartBtn disabled={addTocartLoading || cartLoading} addingFunc={handleAddToCart} loading={addTocartLoading || cartLoading}/>
                                }
                            </div>
                        </>
                    }
                    />
                }
                <DetailsTabs item={dataAfterConvert}/>
            </div>
        </div>
    )
}

export default InfoSide;