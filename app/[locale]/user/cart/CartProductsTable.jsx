"use client"
import React, { useEffect, useRef, useState } from 'react';
import {
  Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Counter from '@/components/Counter';
import SelecktonLoading from '@/components/ui/loading/SelecktonLoading';
import DeleteItemFromCartBtn from '@/components/ui/DeleteItemFromCartBtn';
import EmptyData from '@/components/ui/data-status/EmptyData';
import { CiShoppingCart } from "react-icons/ci";
import { useUpdateItemQuantity } from '@/services/shopping/cart/useUpdateItemQuantity';
import { useTranslations } from 'next-intl';
import { useCartData } from '@/services/shopping/cart/useCartData';
import { useCartStore } from '@/services/state_management/useCartStore';
import { useDeleteItemFromCart } from '@/services/shopping/cart/useDeleteItemFromCart';
import { useAppSettings } from '@/services/settings/useAppSettings';


const CartRow = ({item : {id , products , quantity:itemQu , final_price}}) => {
  const shoppingT = useTranslations("shopping")
  const [quantity , setQuantity] = useState(itemQu);
  const {updateItemQuantity} = useCartStore();
  const {mutate:updateMutate , isPending:updateLoading} = useUpdateItemQuantity();
  const {mutate:deleteItemFunc , isPending:deleteItemLoading} = useDeleteItemFromCart();
  const {data: appSettingsData} = useAppSettings();
  let updateTimeout = useRef(null)

  const handleUpdateServerQuantity = (quantity) => {
    if(updateTimeout.current) clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      updateMutate({itemId : id , quantity , translate : shoppingT});
    },500)
  }

  const handleIncreaseQu = () => {
    if(quantity < 10) {
      setQuantity(prev => {
        const newQ = prev + 1
        handleUpdateServerQuantity(newQ)
        return newQ
      });
      // updateItem({id , products , final_price , quantity : quantity + 1} , "increase");
      updateItemQuantity({id , updateType : "increase"})
    }
  }
  const handleDecreaseQu = () => {
    if(quantity > 1) {
      setQuantity(prev => {
        const newQ = prev - 1
        handleUpdateServerQuantity(newQ)
        return newQ;
      });
      // updateItem({id , products , final_price, quantity : quantity - 1} , "decrease");
      updateItemQuantity({id , updateType : "decrease"})
    }
  }



  const handleDeleteProductFromCart = () => {
    if(quantity >= 1) {
      // deleteItem(id , quantity , products.price_after_discount)
      deleteItemFunc({item : {id , products , quantity:itemQu , final_price}})
      console.log("no should delte item which id equal:" , id)
    }
  }
  return (
    <TableRow className={"hover:bg-transparent"}>
      <TableCell className="font-medium">
        <div className='relative flex items-center gap-x-1.5'>
          <Image src={products?.image_url} alt='product image' className='rounded-2xl' title={products?.title} width={70} height={70} />
          <div className='relative flex flex-col gap-y-1.5'>
            <h1 className='max-w-[100px] overflow-hidden text-ellipsis'>{products?.title}</h1>
            <p>
              {
                products?.discount_amount >= 1 
                && 
                <span className='line-through text-red-600'>{products?.price}{appSettingsData?.currency}</span>
                }
                <span className='mx-1'>{products?.price_after_discount}{appSettingsData?.currency}</span>
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className={"text-end"}>
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleDecreaseQu}
            className="w-8 h-8 cursor-pointer"
          >
            –
          </Button>
          <Counter
            value={quantity}
            places={quantity >= 10 ? [10, 1] : [1]}
            fontSize={30}
            padding={5}
            gap={2}
            fontWeight={300}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleIncreaseQu}
            className="w-8 h-8 cursor-pointer"
          >
            +
          </Button>
        </div>
      </TableCell>
      <TableCell className="text-center"><span>{final_price}{appSettingsData?.currency}</span></TableCell>
      <TableCell className="text-center">
        <DeleteItemFromCartBtn deleteFunc={handleDeleteProductFromCart} loading={deleteItemLoading}/>
      </TableCell>
    </TableRow>
  )
}
// function CartProductsTable({products , cartLoading}) {
function CartProductsTable({cartLoading}) {
  const {cartData:{products}} = useCartStore();
  if(products?.length >= 1 && !cartLoading) return (
    <Table>
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
            <TableRow className={"hover:bg-transparent"}>
              <TableHead className="w-[100px]">Product</TableHead>
              <TableHead className={"text-center"}>Quantity</TableHead>
              <TableHead className="text-center">Total</TableHead>
              <TableHead className="text-center">Delete</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {
              products?.map((item , index) => (
              <CartRow 
                key={index}
                item={item}
              />
              )
            )
          }
        </TableBody>
    </Table>
  )
  if(products?.length <= 1 && !cartLoading) return <EmptyData icon={<CiShoppingCart className='text-4xl md:text-9xl'/>}/>
  return (
    <div className='relative w-full flex flex-col gap-y-3.5'>
      <SelecktonLoading/>
      <SelecktonLoading/>
      <SelecktonLoading/>
      <SelecktonLoading/>
    </div>
  )
}

export default CartProductsTable