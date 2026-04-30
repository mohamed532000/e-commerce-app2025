"use client"
import React, { useEffect } from 'react';
import CouponForm from '@/app/forms/cart/CouponForm';
import SelecktonLoading from '@/components/ui/loading/SelecktonLoading';
import HandleTranslate from '@/helper/HandleTranslate';
import { Link } from '@/i18n/navigation';
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { useLocale } from 'next-intl';

function CartSummarySide({products , sub_total , total_price , cartLoading , tax , taxType, appSettingsData , cartData}) {
    const currentLocale = useLocale();
    const divsClasses = "relative flex justify-between items-center py-2"
    if(products?.length < 1) return;
    return (
        <div className='relative flex flex-col gap-y-1.5 rounded-sm p-4 border shadow-flexable-shadow'>
             <h1 className='py-2 border-b uppercase'><HandleTranslate word={"Order Summary"} page={"shopping"} /></h1>
             {
                cartLoading
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
                    <div className='relative flex flex-col gap-y-1'>
                        <div className={`${divsClasses}`}>
                            <h2 className='uppercase text-sm'>Sub total</h2>
                            <p>{sub_total}{appSettingsData?.currency}</p>
                        </div>
                        {/* <div className={`${divsClasses}`}>
                            <h2>Shipping</h2>
                            <p>avilabel when address..</p>
                        </div> */}
                        {/* <div className={`${divsClasses}`}>
                            <h2>Discount</h2>
                            <p>-300</p>
                        </div> */}
                        <div className={`${divsClasses}`}>
                            <h2 className='uppercase text-sm'>Tax</h2>
                            <p>{tax}{taxType == "fixed" ? appSettingsData?.currency : "%"}</p>
                        </div>
                    </div>
                    <div className={`${divsClasses} border-t`}>
                        <h2 className='uppercase text-sm'>Total</h2>
                        <p>{total_price}{appSettingsData?.currency}</p>
                    </div>
                    <div className={`${divsClasses} flex justify-start items-start gap-y-1.5 flex-col`}>
                        <h2 className='text-sm'>Do you have coupon ?</h2>
                        <CouponForm cartData={cartData}/>
                    </div>
                    <Link href="/user/checkout" className="rounded-3xl group cursor-pointer bg-black text-white uppercase tracking-[5px] text-sm w-full py-3 px-4 transition-all duration-300 hover:tracking-normal flex gap-2 items-center justify-center">
                        <HandleTranslate word={"Checkout"} page={"shopping"}/>
                        {
                            currentLocale == "en" 
                            ?
                            <FaArrowRight className=' opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-300' />
                            :
                            <FaArrowLeft className=' opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300' />
                        }
                    </Link>
                </>
             }
        </div>
    )
}

export default CartSummarySide