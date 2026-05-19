"use client"
import CouponForm from '@/app/forms/cart/CouponForm';
import SelecktonLoading from '@/components/ui/loading/SelecktonLoading';
import HandleTranslate from '@/helper/HandleTranslate';
import { Link } from '@/i18n/navigation';
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import Image from 'next/image';
import { CiLock } from "react-icons/ci";

const ItemRow = ({item , quantity , finalPrice , currency}) => {
    return (
        <div className='relative flex justify-between items-center rounded-2xl hover:p-2 hover:bg-slate-400/20 transition-all duration-300'>
            <div className='relative flex items-center w-full gap-x-1.5'>
                <div className='relative item-img rounded-2xl overflow-hidden w-[70px] h-[70px]'>
                    <Image src={item?.image_url} alt='image' title={item?.title || "item image"} fill={true} className='object-cover'/>
                </div>
                <div className='relative flex flex-col gap-y-1.5 w-full'>
                    <h2 className='text-sm'>{item?.title?.length >= 20 ? item?.title?.slice(0 , 20) + "..." : item?.title}</h2>
                    <p className='text-sm opacity-70'>{item?.description?.length >= 20 ? item?.description?.slice(0 , 20) + "..." : item?.description}</p>
                    <div className='relative flex justify-between items-center'>
                        <p className='text-sm'>
                            <HandleTranslate word={"QYT"} page={"shopping"}/>: {quantity}
                        </p>
                        <p className='text-sm'>{finalPrice}{currency}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
function CheckoutSummarySide({products , sub_total , total_price , cartLoading , tax , taxType, appSettingsData , cartData , className}) {
    const currentLocale = useLocale();
    const divsClasses = "relative flex justify-between items-center py-2"
    useEffect(() => {
        console.log(products)
    },[products])
    if(!products || cartLoading) return (
        <div className={`relative flex flex-col gap-y-1.5 rounded-3xl p-4 shadow-flexable-shadow ${className}`}>

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
        </div>
    )
    if(products?.length < 1) return;

    return (
        <div className={`relative flex flex-col gap-y-1.5 rounded-3xl bg-gray-100 dark:bg-slate-900/80 p-6 shadow-flexable-shadow ${className}`}>
             <h1 className='py-2 uppercase'><HandleTranslate word={"Order Summary"} page={"shopping"} /></h1>
             <div className='relative flex flex-col gap-y-1.5 border-b py-6'>
                {
                    products?.map((product , index) => {
                        const {products:itemData} = product;
                        return <ItemRow 
                            key={index}
                            item={itemData} 
                            quantity={product?.quantity} 
                            finalPrice={product?.final_price} 
                            currency={appSettingsData?.currency}
                        />
                    })
                }
             </div>
            <div className='relative flex flex-col gap-y-1'>
                <div className={`${divsClasses}`}>
                    <h2 className='uppercase text-sm'>
                        <HandleTranslate word={"Sub total"} page={"shopping"}/>
                    </h2>
                    <p>{sub_total}{appSettingsData?.currency}</p>
                </div>
                {/* <div className={`${divsClasses}`}>
                    <h2>Shipping</h2>
                    <p>avilabel when address..</p>
                </div> */}
                {
                    cartData?.discount_amount >= 1
                    &&
                    <div className={`${divsClasses}`}>
                        <h2 className='uppercase text-sm'>
                            <HandleTranslate word={"Coupon discount"} page={"shopping"}/>
                        </h2>
                        <p>{cartData?.discount_amount}{appSettingsData?.currency}</p>
                    </div>
                }
                <div className={`${divsClasses}`}>
                    <h2 className='uppercase text-sm'>
                        <HandleTranslate word={"Tax"} page={"global"}/>
                    </h2>
                    <p>{tax}{taxType == "fixed" ? appSettingsData?.currency : "%"}</p>
                </div>
            </div>
            <div className={`${divsClasses} border-t`}>
                <h2 className='uppercase text-sm'>
                    <HandleTranslate word={"Total amount"} page={"shopping"}/>
                </h2>
                <p className='text-active-text-primary text-2xl'>
                    {total_price}{appSettingsData?.currency}
                </p>
            </div>
            <Link href="/user/checkout" className="rounded-3xl group cursor-pointer bg-active-text-primary text-white uppercase tracking-[5px] text-sm w-full py-3 px-4 transition-all duration-300 hover:tracking-normal flex gap-2 items-center justify-center">
                <HandleTranslate word={"Complete"} page={"shopping"}/>
                {
                    currentLocale == "en" 
                    ?
                    <FaArrowRight className=' opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-300' />
                    :
                    <FaArrowLeft className=' opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300' />
                }
            </Link>
            <p className='text-center text-sm text-gray-500 dark:text-gray-400 my-2 uppercase'>
                <CiLock className='inline-block mx-1'/>
                <HandleTranslate word={"Encrypted checkout experience"} page={"global"}/>
            </p>
        </div>
    )
}

export default CheckoutSummarySide