"use client";
import React, { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Spinner } from "@/components/ui/spinner";
import { CiShoppingCart } from 'react-icons/ci';
import { useCartStore } from '@/services/client/useCartStore';
import { useAddToCart } from '@/services/shopping/useAddToCart';
import { UserAuth } from '@/context/AuthProvider';
import { checkUserPermission } from '@/helper/fucntions/checkUserPermission';
import { useRouter } from '@/i18n/navigation';
import { useSignInAnonimously } from '@/services/auth/useSignInAnonymously';

// function AddToCartBtn({className , addingFunc , loading , disabled}) {
function AddToCartBtn({className , item}) {
  const currentLocale = useLocale();
  const shoppingT = useTranslations("shopping");
  const {profile , session} = UserAuth();
  const router = useRouter()
  const {data} = useCartStore();
  const {mutate: addTocart , isPending} = useAddToCart(profile?.id);
  const {mutate:signInAsAnonimousUser} = useSignInAnonimously();
  const handleAddToCart = async () => {
    console.log(data)
    const res = await checkUserPermission();
    const databaseItem = {
        // cart_id , 
        product_id : item.id , 
        quantity : 1 , 
        price_after_discount : item.price_after_discount,
    };
    // handle adding item info to cart
    const addingFunc = () => {
      // this func will work just if there is no any session for guest
      signInAsAnonimousUser()
      addTocart({
        item : databaseItem ,
        translate : shoppingT
      });
    }
    if(!res.allowed) {
      router.push("/auth/login");
      return;
    }
    addingFunc();
  }
  return (
    <button disabled={isPending} onClick={handleAddToCart} className={`cursor-pointer rounded-xl py-2 px-4 bg-white dark:bg-background shadow-flexable-shadow flex justify-center items-center group ${className}`}>
      {
        isPending
        ?
        <Spinner className="size-4"/>
        :
        <>
          <CiShoppingCart className='text-2xl'/>
          <span className={`relative font-bold transition-all duration-300  opacity-0  ${currentLocale == "ar" ? "-mr-[50%]" : "-ml-[50%]"} group-hover:m-0 group-hover:opacity-100 text-foreground`}>AC</span>
        </>
      }
    </button>
  )
}

export default AddToCartBtn