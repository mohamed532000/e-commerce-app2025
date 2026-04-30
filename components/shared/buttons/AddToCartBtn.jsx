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
import { BsCartPlus } from "react-icons/bs";
import { BsCartDash } from "react-icons/bs";
import {ItemQuantityCounter} from './ItemQuantityCounter';

function AddToCartBtn({ className, item, itemInfo }) {
  const currentLocale = useLocale();
  const { session } = UserAuth();
  const { data: cartData, isPending: cartLoading, isRefetching: refetchCartLoading } = useCartData({ userId: session?.user?.id, local: currentLocale });
  const { mutate: addTocart, isPending: addToCartLoading, variables } = useAddToCart();

  const handleAddToCart = () => {
    const databaseItem = {
      product_id: item.id,
      quantity: 1,
      price_after_discount: item.price_after_discount,
    }
    addTocart({ item: databaseItem, cartId: cartData?.id, userId: session?.user?.id })
  }

  const disabledBtn = cartLoading || refetchCartLoading || addToCartLoading;
  useEffect(() => {
    console.log(cartLoading, refetchCartLoading, addToCartLoading)
  },[cartLoading, refetchCartLoading, addToCartLoading])

  // added user check for cart loading because cartLoading is always true when user is not logged in because this value is anitialiazed to true
  if (session?.user && cartLoading) return <SelecktonLoading className={"w-[70px] rounded-md"} />
  if (cartData?.products?.find(i => i?.products?.id == item?.id)) return (
    <ItemQuantityCounter
      minusIcon={<BsCartDash/>}
      plusIcon={<BsCartPlus/>}
      item={cartData?.products?.find(i => i?.products?.id == item?.id)}
    />
  );
  return (
    <HandleOutOfStockActions
      className={"my-1"}
      item={itemInfo}
      elements={
        <button disabled={disabledBtn} onClick={handleAddToCart} className={`cursor-pointer rounded-xl py-2 px-4 bg-white dark:bg-background shadow-flexable-shadow flex justify-center items-center group ${className}`}>
          {
            addToCartLoading && variables?.item?.product_id == item.id
              ?
              <Spinner className="size-4" />
              :
              <>
                <CiShoppingCart className='text-2xl' />
                <span className={`relative font-bold transition-all duration-300  opacity-0  ${currentLocale == "ar" ? "-mr-[50%]" : "-ml-[50%]"} group-hover:m-0 group-hover:opacity-100 text-foreground`}>AC</span>
              </>
          }
        </button>
      }
    />
  )
}

export default AddToCartBtn