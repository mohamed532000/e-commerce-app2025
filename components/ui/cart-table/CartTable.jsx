import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
function CartTable({products}) {
  return (
    <Table>
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
        </TableBody>
    </Table>
  )
}

export default CartTable