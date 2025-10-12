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
import { GoTrash } from "react-icons/go";
const CartRow = ({item}) => {
  const handleDeleteProductFromWhishlist = () => {
    console.log("deleted")
  }
  return (
    <TableRow className={"hover:bg-transparent"}>
      <TableCell className="font-medium">
        <div className='relative flex items-center gap-x-1.5'>
          <Image src={item.image} alt='product image' className='rounded-2xl' title={item.title} width={100} height={100} />
          <div className='relative flex flex-col gap-y-1.5'>
            <h1 className='max-w-[200px] overflow-hidden text-ellipsis'>{item.title}</h1>
            <p>{item.price}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className={"text-center"}>Paid</TableCell>
      <TableCell className="text-center">
        <GoTrash className='inline-block cursor-pointer' onClick={handleDeleteProductFromWhishlist}/>
      </TableCell>
    </TableRow>
  )
}
function CartProductsTable({products}) {
  return (
    <Table>
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
            <TableRow className={"hover:bg-transparent"}>
              <TableHead className="w-[100px]">Product</TableHead>
              <TableHead className={"text-center"}>U-Price</TableHead>
              <TableHead className="text-center">Delete</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {
            products?.map((item , index) => (
              <CartRow 
                key={index}
                item={item}/>
              )
            )
          }
        </TableBody>
    </Table>
  )
}

export default CartProductsTable