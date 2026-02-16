"use client";
import React, { useEffect, useState } from 'react';
import HandleTranslate from '@/helper/HandleTranslate';
import CartProductsTable from './CartProductsTable';
import CartSummarySide from './CartSummarySide';
import FaildLoadingData from '@/components/ui/data-status/FaildLoadingData';
import { MainLink } from '@/components/ui/MainLink';
import { UserAuth } from '@/context/AuthProvider';
import { useCartStore } from '@/services/client/useCartStore';
import MainBtn from '@/components/ui/MainBtn';

function CartContent() {
    const {cartLoading } = UserAuth();
    const [isMounted , setIsMounted] = useState(false);
    const {data:{items} , clearCart} = useCartStore();
    useEffect(() => {setIsMounted(true)} ,[])
    return (
        <>
          <div className='relative w-full grid grid-cols-12 gap-6'>
            <div className={`table-side col-span-12 ${items?.length < 1 ? "md:col-span-12" : "md:col-span-8"} flex flex-col gap-y-4.5`}>
                <h1 className='relative md:text-3xl font-bold'><HandleTranslate word={"Your shopping cart"} page={"shopping"} /></h1>
                <CartProductsTable loading={cartLoading}/>
                <div className='relative grid grid-cols-2 gap-x-1.5'>
                  <MainLink href='/shop' className={"border border-active-text-primary hover:bg-active-text-primary text-fexable"}>
                    <HandleTranslate word={"Continue Shop"} page={"shopping"}/>
                  </MainLink>
                  <MainBtn className={"col-span-1"}>Clear cart</MainBtn>
                </div>
            </div>
            <div className='summary-side relative col-span-12 md:col-span-4'>
                <CartSummarySide loading={cartLoading}/>
            </div>
          </div>
          {!items && !cartLoading && isMounted &&  <FaildLoadingData/>}
          {/* {items?.length < 1 && isMounted &&  <EmptyData/>} */}
        </>
    )
}

export default CartContent