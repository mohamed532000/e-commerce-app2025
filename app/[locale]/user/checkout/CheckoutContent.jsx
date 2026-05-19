"use client";
import NewAddressForm from '@/app/forms/user/NewAddressForm'
import { useLocale } from 'next-intl'
import { useCartData } from '@/services/shopping/cart/useCartData'
import { UserAuth } from '@/context/AuthProvider'
import { useAppSettings } from '@/services/settings/useAppSettings'
import CheckoutSummarySide from './CheckoutSummarySide'

function CheckoutContent() {
    const {session} = UserAuth();
    const currentLocale = useLocale()
    const {data , isPending:cartLoading , isRefetching , refetch , isError} = useCartData({userId : session?.user?.id , local : currentLocale});
    const {data: appSettingsData , isLoading: settingsLoading} = useAppSettings();
  return (
    <div className='relative grid grid-cols-12 gap-3 md:gap-10'>
        <div className='relative col-span-12 md:col-span-8'>
            <NewAddressForm/>
        </div>
        <CheckoutSummarySide
            className={"col-span-12 md:col-span-4"}
            products={data?.products}
            sub_total={data?.sub_total}
            total_price={data?.total_price}
            cartLoading={cartLoading}
            tax={data?.tax_amount}
            taxType={data?.tax_type}
            appSettingsData={appSettingsData}
            cartData={data}
        />  
    </div>
  )
}

export default CheckoutContent