"use client"
import React from 'react';
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
import EmptyData from '@/components/ui/data-status/EmptyData';
import { CiShoppingCart } from "react-icons/ci";
import { useLocale, useTranslations } from 'next-intl';
import { useAppSettings } from '@/services/settings/useAppSettings';
import { useDeleteWishlistItem } from '@/services/shopping/wishlsit/useDeleteWishlistItem';
import AddToCartBtn from '@/components/shared/buttons/AddToCartBtn';
import DeleteSomethingbtn from '@/components/ui/actions-buttons/DeleteSomethingBtn';
import { Spinner } from '@/components/ui/spinner';


const WishlistRow = ({item : {id , products , price_after_discount}}) => {
  const shoppingT = useTranslations("shopping")
  const {mutate:deleteItemFunc , isPending:deleteItemLoading , variables} = useDeleteWishlistItem();
  const {data: appSettingsData} = useAppSettings();

  const handleDeleteItemFromWishlist = () => {
    deleteItemFunc({itemId : id})
  }

  return (
    <TableRow className={"hover:bg-transparent"}>
      <TableCell className="font-medium">
        <div className='relative flex items-center gap-x-1.5 '>
          <Image src={products?.image_url} alt='product image' className='rounded-2xl' title={products?.title} width={70} height={70} />
          <div className='relative flex flex-col gap-y-1.5'>
            <h1 className='max-w-[200px] overflow-hidden text-ellipsis'>{products?.title}</h1>
            <p className='max-w-[200px] overflow-hidden text-ellipsis font-normal'>{products?.description}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center">
          <p>
            {
              products?.discount_amount >= 1 
              && 
              <span className='line-through text-red-600'>{products?.price}{appSettingsData?.currency}</span>
              }
              <span className='mx-1'>{products?.price_after_discount}{appSettingsData?.currency}</span>
          </p>
      </TableCell>
      <TableCell className="">
        <div className='relative flex justify-center gap-x-2.5 '>
          <AddToCartBtn
            item = {{id , products , price_after_discount}}
            itemInfo = {products}
          />
          <DeleteSomethingbtn
            deleteFunc={handleDeleteItemFromWishlist}
            loading={variables?.itemId == id && deleteItemLoading}
            loadingElement={<Spinner className="size-4"/>}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}
// function WishlistTable({products , wishlistLoading}) {
function WishlistTable({wishlistLoading , products}) {
  // const {cartData:{products}} = useCartStore();
  const currentLocale = useLocale()
  if(products?.length >= 1 && !wishlistLoading) return (
    <Table>
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
            <TableRow className={"hover:bg-transparent"}>
              <TableHead className={currentLocale == "ar" ? "text-right" : ""}>Product</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {
            products?.map((item , index) => (
            <WishlistRow 
              key={index}
              item={item}
            />
              )
            )
          }
        </TableBody>
    </Table>
  )
  if(products?.length <= 1 && !wishlistLoading) return <EmptyData icon={<CiShoppingCart className='text-4xl md:text-9xl'/>}/>
  return (
    <div className='relative w-full flex flex-col gap-y-3.5'>
      <SelecktonLoading/>
      <SelecktonLoading/>
      <SelecktonLoading/>
      <SelecktonLoading/>
    </div>
  )
}

export default WishlistTable