"use client";
import React, { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Spinner } from "@/components/ui/spinner";
import { CiShoppingCart } from 'react-icons/ci';
import { useAddToCart } from '@/services/shopping/cart/useAddToCart';
import { UserAuth } from '@/context/AuthProvider';
import { useCartData } from '@/services/shopping/cart/useCartData';
import SelecktonLoading from '@/components/ui/loading/SelecktonLoading';
import HandleTranslate from '@/helper/HandleTranslate';
import HandleOutOfStockActions from '@/helper/HandleOutOfStockActions';

function AddToCartBtn({className , item , itemInfo}) {
  const currentLocale = useLocale();
  const shoppingT = useTranslations("shopping");
  const {session} = UserAuth();
  const {data:cartData , isPending:cartLoading , isRefetching:reftechCartLoading} = useCartData({userId: session?.user?.id , local: currentLocale});
  const {mutate: addTocart , isPending:addToCartLoading , variables} = useAddToCart();

  const handleAddToCart = () => {
    const databaseItem = {
      product_id : item.id,
      quantity : 1,
      price_after_discount : item.price_after_discount,
    }
    addTocart({item: databaseItem , cartId : cartData?.id , userId : session?.user?.id})
  }
  useEffect(() => {
    console.log("item is" , item)
  },[item])

  if(cartLoading || reftechCartLoading) return <SelecktonLoading className={"w-[70px] rounded-md"}/>
  if (cartData?.products?.find(i => i?.products?.id == item?.id)) return (
    <h1 className='text-active-text-primary flex justify-center items-center'><HandleTranslate word={"Already in cart"} page={"shopping"} /></h1>
  );
  return (
    <HandleOutOfStockActions
      className={"my-1"}
      item={itemInfo}
      elements={ 
        <button disabled={addToCartLoading} onClick={handleAddToCart} className={`cursor-pointer rounded-xl py-2 px-4 bg-white dark:bg-background shadow-flexable-shadow flex justify-center items-center group ${className}`}>
          {
            addToCartLoading && variables?.item?.id == item.id
            ?
            <Spinner className="size-4"/>
            :
            <>
              <CiShoppingCart className='text-2xl'/>
              <span className={`relative font-bold transition-all duration-300  opacity-0  ${currentLocale == "ar" ? "-mr-[50%]" : "-ml-[50%]"} group-hover:m-0 group-hover:opacity-100 text-foreground`}>AC</span>
            </>
          }
        </button>
      }
    />
  )
}

export default AddToCartBtn