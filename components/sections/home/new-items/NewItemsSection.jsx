import React from 'react'
import ShowData from './ShowData';
import { newProducts } from '@/services/items/newProducts';

async function NewItemsSection({locale}) {
  const res = await newProducts(locale);
  return (
    <ShowData items={res}/>
  )
}

export default NewItemsSection