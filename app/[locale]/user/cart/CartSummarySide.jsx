"use client"
import React, { useEffect } from 'react';
import CouponForm from '@/app/forms/cart/CouponForm';
import SelecktonLoading from '@/components/ui/loading/SelecktonLoading';
import HandleTranslate from '@/helper/HandleTranslate';
import { useCartStore } from '@/services/client/useCartStore';

function CartSummarySide({loading}) {
    const {data:{items , total_price}} = useCartStore();
    const divsClasses = "relative flex justify-between items-center py-2"
    useEffect(() => console.log(total_price) , [total_price]) 
    if(items?.length < 1) return;
    return (
        <div className='relative flex flex-col gap-y-1.5 rounded-3xl p-4 border shadow-flexable-shadow'>
             <h1 className='py-2 border-b border-slate-500 dark:border-stone-100'><HandleTranslate word={"Order Summary"} page={"shopping"} /></h1>
             {
                loading
                ?
                <div className='relative w-full flex flex-col gap-y-3.5'>
                    <div className='relative w-full flex justify-between items-center'>
                        <SelecktonLoading className={"w-[50%]"}/>
                        <SelecktonLoading className={"w-[30%]"}/>
                    </div>
                    <div className='relative w-full flex justify-between items-center'>
                        <SelecktonLoading className={"w-[50%]"}/>
                        <SelecktonLoading className={"w-[30%]"}/>
                    </div>
                    <div className='relative w-full flex justify-between items-center'>
                        <SelecktonLoading className={"w-[50%]"}/>
                        <SelecktonLoading className={"w-[30%]"}/>
                    </div>
                    <SelecktonLoading/>
                </div>
                :
                <>
                    <div className='relative flex flex-col gap-y-1.5'>
                        <div className={`${divsClasses}`}>
                            <h2>Sub total</h2>
                            <p>{total_price}EGP</p>
                        </div>
                        <div className={`${divsClasses}`}>
                            <h2>Shipping</h2>
                            <p>3200</p>
                        </div>
                        <div className={`${divsClasses}`}>
                            <h2>Discount</h2>
                            <p>-300</p>
                        </div>
                        <div className={`${divsClasses}`}>
                            <h2>Tax</h2>
                            <p>30</p>
                        </div>
                    </div>
                    <div className={`${divsClasses} border-t border-slate-500 dark:border-stone-100`}>
                        <h2>Total</h2>
                        <p>30</p>
                    </div>
                    <div className={`${divsClasses} flex justify-start items-start gap-y-1.5 flex-col`}>
                        <h2 className='text-sm'>Do you have coupon ?</h2>
                        <CouponForm/>
                    </div>
                </>
             }
        </div>
    )
}

export default CartSummarySide