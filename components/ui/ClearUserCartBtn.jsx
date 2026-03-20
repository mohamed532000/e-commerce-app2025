"use client"
import React, { useEffect, useState } from 'react';
import HandleTranslate from '@/helper/HandleTranslate';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import MainBtn from './MainBtn';
import { CiShoppingCart } from "react-icons/ci";
import { useClearCartItems } from '@/services/shopping/cart/useClearCartItems';
import { Spinner } from './spinner';
import { GrClear } from "react-icons/gr";
import { useUpdateItemQuantity } from '@/services/shopping/cart/useUpdateItemQuantity';


function ClearUserCartBtn({cartId ,cartLoading}) {
  const [openConfirmation , setOpenConfirmation] = useState();
  const {mutate:clearCartFunc , isPending:clearCartLoading} = useClearCartItems();
  const {isPending:updateCartLoading} = useUpdateItemQuantity()
  const handleClearUserCart = () => {
    clearCartFunc({cartId})
  }
  useEffect(() => {
    clearCartLoading ? setOpenConfirmation(true) : setOpenConfirmation(false)
  },[clearCartLoading])
  return (
    <>
      <AlertDialog open={openConfirmation} onOpenChange={setOpenConfirmation}>
        <AlertDialogTrigger
        className={`relative p-2 bg-background shadow-flexable-shadow outline-0 border-0 cursor-pointer hover:bg-red-700 transition-all duration-200 hover:translate-x-1.5 ${(cartLoading || updateCartLoading) ? "pointer-events-none" : ""}`}
        >
          {
            clearCartLoading
            ?
            <Spinner className="size-4"/>
            :
            "Clear cart"
          }
          <GrClear className='inline-block cursor-pointer mx-2'/>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your cart data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
            >
              <HandleTranslate word={"Cancel"} page={"global"} />
            </AlertDialogCancel>
            <AlertDialogAction
              disabled = {clearCartLoading}
              onClick={handleClearUserCart}
            >
              {
                clearCartLoading
                ?
                <Spinner className="size-4"/>
                :
                <HandleTranslate word={"Continue"} page={"global"}/>
              }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
export default ClearUserCartBtn;