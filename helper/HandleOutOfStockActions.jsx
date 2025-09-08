import React from 'react'
import HandleTranslate from './HandleTranslate'
import { CiCircleInfo } from "react-icons/ci";

function HandleOutOfStockActions({item , elements , className}) {
  return (
    item.stock <= item.min_stock
    ?
    <h1 className={`flex items-center gap-x-1.5 ${className}`}><CiCircleInfo className='text-red-500'/> <HandleTranslate word={"Out of stock"} page={"global"} /></h1>
    :
    elements
  )
}

export default HandleOutOfStockActions