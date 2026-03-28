import React from 'react'
import ShowData from './ShowData';
import { bestSalePrducts } from '@/services/items/bestSaleProducts';

async function BestSalesitems({locale}) {
  const res = await bestSalePrducts(locale);
  return (
    <ShowData items={res}/>
  )
}

export default BestSalesitems