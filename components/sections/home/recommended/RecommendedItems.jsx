import { recommendedProducts } from '@/services/items/recommendedProducts'
import React from 'react'
import ShowData from './ShowData';

async function RecommendedItems({locale}) {
  const res = await recommendedProducts(locale);
  return (
    <ShowData items={res}/>
  )
}

export default RecommendedItems