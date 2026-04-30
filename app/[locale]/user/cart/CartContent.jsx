"use client";
import React, { useEffect, useState } from 'react';
import HandleTranslate from '@/helper/HandleTranslate';
import CartProductsTable from './CartProductsTable';
import CartSummarySide from './CartSummarySide';
import FaildLoadingData from '@/components/ui/data-status/FaildLoadingData';
import { MainLink } from '@/components/ui/MainLink';
import { UserAuth } from '@/context/AuthProvider';
import MainBtn from '@/components/ui/MainBtn';
import { useCartData } from '@/services/shopping/cart/useCartData';
import { useLocale, useTranslations } from 'next-intl';
import { useAppSettings } from '@/services/settings/useAppSettings';
import EmptyData from '@/components/ui/data-status/EmptyData';
import ClearUserCartBtn from '@/components/ui/ClearUserCartBtn';
import { CiShoppingCart } from "react-icons/ci";
import { Button } from '@/components/ui/button';
import { EstimateShipping } from '@/components/ui/EstimateShipping';

function CartContent() {
    const {session} = UserAuth();
    const currentLocale = useLocale()
    const shoppingT = useTranslations("shopping")
    const {data , isPending:cartLoading , isRefetching , refetch , isError} = useCartData({userId : session?.user?.id , local : currentLocale});
    const {data: appSettingsData , isLoading: settingsLoading} = useAppSettings();
    

    if(!cartLoading && isError) return <FaildLoadingData/>
    if(data?.products?.length < 1) return <EmptyData 
    emptyText={"Your cart is empty"} 
    translate={shoppingT}
    icon={
      <div className='relative flex justify-center items-center p-10 bg-slate-200 rounded-[50%]'>
        <CiShoppingCart className='text-[80px] dark:text-slate-900'/>
      </div>
    }
    className={"md:my-[100px]"}
    />
    return (
        <>
          <div className='relative w-full grid grid-cols-12 gap-6'>
            <div className={`table-side col-span-12 ${data?.products?.length < 1 ? "md:col-span-12" : "md:col-span-8"} flex flex-col gap-y-4.5`}>
                <h1 className='relative md:text-3xl font-bold'><HandleTranslate word={"Your shopping cart"} page={"shopping"} /></h1>
                <CartProductsTable 
                  products={data?.products} 
                  cartLoading={cartLoading}
                  appSettingsData = {appSettingsData}
                />
                <EstimateShipping/>
                <div className='relative flex justify-between items-center'>
                  <ClearUserCartBtn cartId={data?.id} cartLoading={cartLoading || isRefetching}/>
                </div>
            </div>
            <div className='summary-side relative col-span-12 md:col-span-4'>
                <CartSummarySide 
                  products = {data?.products} 
                  sub_total = {data?.sub_total} 
                  total_price = {data?.total_price} 
                  cartLoading = {cartLoading || isRefetching}
                  appSettingsData = {appSettingsData}
                  tax = {data?.tax}
                  taxType = {data?.tax_type}
                  cartData = {data}
                />
            </div>
          </div>
        </>
    )
}

export default CartContent