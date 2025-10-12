"use client"
import React, { useEffect, useState } from 'react';
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
import { GoTrash } from "react-icons/go";
const handleUpdateProductQuantity = () => {
  
}
const CartRow = ({item}) => {
  const [quantity , setQuantity] = useState(item?.quantity);
  const handleIncreaseQu = () => {
    if(quantity < 10) {
      setQuantity(prev => prev + 1)
    }
  }
  const handleDecreaseQu = () => {
    if(quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }
  useEffect(() => {
    let updateTimeout;
    const handleUpdate = () => {
      updateTimeout = setTimeout(() => {
        console.log(`quantity od ${item.title} is: ` , quantity)
      },500)
    }
    handleUpdate()
    return () => clearTimeout(updateTimeout)
  },[quantity])
  const handleDeleteProductFromCart = () => {
    if(quantity > 1) {
      setQuantity(1)
    }
  }
  return (
    <TableRow className={"hover:bg-transparent"}>
      <TableCell className="font-medium">
        <div className='relative flex items-center gap-x-1.5'>
          <Image src={item.image_url} alt='product image' className='rounded-2xl' title={item.title} width={70} height={70} />
          <div className='relative flex flex-col gap-y-1.5'>
            <h1 className='max-w-[100px] overflow-hidden text-ellipsis'>{item.title}</h1>
            <p>{item.price_after_discount}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className={"text-end"}>{item?.price_after_discount}</TableCell>
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
      <TableCell className="text-center"><span>{parseInt(quantity * item?.price_after_discount).toFixed(2)}</span></TableCell>
      <TableCell className="text-center">
        <GoTrash className='inline-block cursor-pointer' onClick={handleDeleteProductFromCart}/>
      </TableCell>
    </TableRow>
  )
}
function CartProductsTable({cartData}) {
  return (
    <Table>
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
            <TableRow className={"hover:bg-transparent"}>
              <TableHead className="w-[100px]">Product</TableHead>
              <TableHead className={"text-end"}>U-Price</TableHead>
              <TableHead className={"text-center"}>Quantity</TableHead>
              <TableHead className="text-center">Total</TableHead>
              <TableHead className="text-center">Delete</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {
            cartData?.products?.map((item , index) => (
              <CartRow 
                key={index}
                item={item}
                // handleIncreaseQu={() => cosnole.log("")}
                // handleDecreaseQu={() => cosnole.log("")}
              />
              )
            )
          }
        </TableBody>
    </Table>
  )
}

export default CartProductsTable