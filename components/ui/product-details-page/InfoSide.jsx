"use client"
import HandleTranslate from '@/helper/HandleTranslate';
import React from 'react';
import AddToWhishlistBtn from '../../shared/buttons/AddToWhishlistBtn';
import AddToCartBtn from '../../shared/buttons/AddToCartBtn';
import { UserAuth } from '@/context/AuthProvider';
import { useAddToCart } from '@/services/shopping/cart/useAddToCart';
import { useAppSettings } from '@/services/settings/useAppSettings';
import MainBtn from '../MainBtn';


const HandleSHowItemPrice = ({price , priceAfterDiscount , discountAmount , discountType , currency}) => {
    return (
        <div className='relative flex items-end gap-x-3.5'>
            <h3 className='relative text-5xl font-bold'>{priceAfterDiscount}{currency}</h3>
            {
                discountAmount >= 1
                &&
                <>
                    <h3 className='text-4xl line-through'>{price}{currency}</h3>
                    <div className="relative rounded-4xl bg-red-600/15 py-1 px-2 text-[12px] text-red-800">
                        {discountAmount}{discountType == "fixed" ? `${currency} OFF` : "% OFF"}
                    </div>
                </>
            }
        </div>
    )
}

function AttributeItem({attr , value}) {
    return (
      <div className={`relative py-2 flex items-center w-full gap-x-1`}>
          <span>{attr}</span>
          :
          <span>{value}</span>
      </div>
    )
  }


function InfoSide({data , dataAfterConvert}) {
    const {profile , cart:cartData , cartLoading} = UserAuth();
    const {mutate:addTocart , isPending:addTocartLoading} = useAddToCart(profile?.id);
    const {data:appSettingsData , isPending:appSettingsLoading} = useAppSettings();
    const handleAddToCart = () => {
        addTocart({
            prevItems : cartData?.products ,
            newItem : data , 
            translate : shoppingT
        })
    }

    return (
        <div className={`images-side relative col-span-2 md:col-span-1 flex flex-col gap-y-2.5`}>
            <div className='info-content relative flex flex-col gap-y-2.5 w-full'>
                <h1 className='font-bold md:text-5xl'>{dataAfterConvert.title}</h1>
                <div className='relative'>
                    <HandleTranslate word={"Sales"} page={"global"} /> 
                    <span className='text-active-text-primary mx-4'>( {data.sales} times )</span>
                </div>
                <HandleSHowItemPrice
                    price={data.price} 
                    priceAfterDiscount={data.price_after_discount}
                    discountAmount={data.discount_amount} 
                    discountType={data.discount_type} 
                    currency={appSettingsLoading ? "..." : appSettingsData?.currency}
                />
                <div className='relative'>
                {
                    Object.keys(dataAfterConvert?.attributes)?.length >= 1
                    &&
                    Object.entries(dataAfterConvert?.attributes).map(([key , value] , index) => (
                        <AttributeItem 
                            key={index} 
                            attr={key} 
                            value={value} 
                        />
                        )
                    )
                }
                    <AttributeItem 
                        attr={<HandleTranslate word={"Category"} page={"global"} />} 
                        value={dataAfterConvert.category} 
                    />
                </div>
                <p>{dataAfterConvert?.description}</p>
                <div className='relative flex gap-x-1.5'>
                    <AddToCartBtn item={data} disabled={addTocartLoading || cartLoading} addingFunc={handleAddToCart} loading={addTocartLoading || cartLoading}/>
                    <AddToWhishlistBtn item={data} fullWord={true} className={"font-medium"}/>
                </div>
                <MainBtn className={"relative w-[80%] bg-transparent hover:bg-active-text-primary hover:text-stone-50 transition-all duration-300 border text-fexable"}>
                    Express Checkout
                </MainBtn>
            </div>
        </div>
    )
}

export default InfoSide;