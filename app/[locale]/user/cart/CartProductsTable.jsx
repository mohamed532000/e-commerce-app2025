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
import SelecktonLoading from '@/components/ui/loading/SelecktonLoading';
import DeleteItemFromCartBtn from '@/components/ui/DeleteItemFromCartBtn';
import EmptyData from '@/components/ui/data-status/EmptyData';
import { CiShoppingCart } from "react-icons/ci";
import { useCartStore } from '@/services/state_management/useCartStore';
import { useDeleteItemFromCart } from '@/services/shopping/cart/useDeleteItemFromCart';
import { useAppSettings } from '@/services/settings/useAppSettings';
import { ItemQuantityCounter } from '@/components/shared/buttons/ItemQuantityCounter';


const CartRow = ({item : {id , products , quantity:itemQu , final_price}}) => {
  const {mutate:deleteItemFunc , isPending:deleteItemLoading} = useDeleteItemFromCart();
  const {data: appSettingsData} = useAppSettings();

  const handleDeleteProductFromCart = () => {
    if(itemQu >= 1) {
      deleteItemFunc({item : {id , products , quantity:itemQu , final_price}})
    }
  }
  return (
    <TableRow className={"hover:bg-transparent"}>
      <TableCell className="font-medium">
        <div className='relative flex items-center gap-x-1.5'>
          <Image src={products?.image_url} alt='product image' className='rounded-2xl' title={products?.title} width={70} height={70} />
          <div className='relative flex flex-col gap-y-1.5'>
            <h1 className='max-w-[100px] overflow-hidden text-ellipsis'>{products?.title}</h1>
            <p className='flex md:inline-block flex-col'>
              {
                products?.discount_amount >= 1 
                && 
                <span className='line-through text-red-600'>{products?.price}{appSettingsData?.currency}</span>
                }
                <span className='md:mx-1'>{products?.price_after_discount}{appSettingsData?.currency}</span>
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className={"text-end"}>
        <ItemQuantityCounter item={{id , products , quantity:itemQu , final_price}}  />
      </TableCell>
      <TableCell className="text-center"><span>{final_price}{appSettingsData?.currency}</span></TableCell>
      <TableCell className="text-center">
        <DeleteItemFromCartBtn deleteFunc={handleDeleteProductFromCart} loading={deleteItemLoading}/>
      </TableCell>
    </TableRow>
  )
}

function CartProductsTable({cartLoading}) {
  const {cartData:{products}} = useCartStore();
  if(products?.length >= 1 && !cartLoading) return (
    <Table>
        {/* <TableCaption>A list of your products.</TableCaption> */}
        <TableHeader>
            <TableRow className={"hover:bg-transparent"}>
              <TableHead className="w-[100px] uppercase text-sm">Product</TableHead>
              <TableHead className={"text-center uppercase text-sm"}>Quantity</TableHead>
              <TableHead className="text-center uppercase text-sm">Total</TableHead>
              <TableHead className="text-center uppercase text-sm">Delete</TableHead>
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
      <SelecktonLoading className={"min-h-16"}A/>
      <SelecktonLoading className={"min-h-16"}A/>
      <SelecktonLoading className={"min-h-16"}A/>
      <SelecktonLoading className={"min-h-16"}A/>
    </div>
  )
}

export default CartProductsTable