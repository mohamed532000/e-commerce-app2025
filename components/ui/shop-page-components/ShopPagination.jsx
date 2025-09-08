"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useLocale, useTranslations } from 'next-intl';

// function ShopPagination({pagesCount , handleUpdateFilterData , loadingProducts}) {
function ShopPagination({pagesCount , handleUpdatePageNum , loadingProducts}) {
    const currentLocale = useLocale() 
    const globalT = useTranslations("global")
    const [slicePagination , setSlicePagination] = useState({from : 0 , to : pagesCount});
    const handleIncrementSlice = () => {
        slicePagination.to != pagesCount
        &&
        setSlicePagination((prev) => (
            {from : prev.from + 1 , to : prev.to + 1}
        ))
    }
    const handleDecrementSlice = () => {
        setSlicePagination((prev) => (
            {from : prev.from > 0 ? prev.from - 1 : 0, to : prev.to > pagesCount ? prev.to - 1 : pagesCount}
        ))
    }
    return (
        pagesCount >= 0 &&
        <div className='flex justify-end gap-x-1.5 mt-4'>
            <Button aria-label="Prev page" className={`cursor-pointer ${(slicePagination.to <= pagesCount || loadingProducts) ? "pointer-events-none opacity-70 cursor-no-drop" : ""}`} onClick={() => handleDecrementSlice()}>
                {
                   slicePagination.from > 0
                   &&
                   (
                    currentLocale == "ar"
                    ?
                    <MdKeyboardDoubleArrowRight className='m-0 p-0'/> 
                    :
                    <MdKeyboardDoubleArrowLeft/> 
                    )
                }
                <span aria-hidden="true" className={`${slicePagination.from > 0 ? "-translate-y-[1px]" : ""}`}>{globalT("Prev")}</span>
            </Button>
            {Array.from({ length: pagesCount }, (_, i) => i + 1) // [1, 2, 3, ...]
            .slice(slicePagination.from, slicePagination.to)
            .map((pageNum) => (
                <Button key={pageNum} onClick={() => handleUpdatePageNum(pageNum)} className={`${loadingProducts ? "pointer-events-none opacity-70" : ""} cursor-pointer`}>{pageNum}</Button>
            ))}
            <Button aria-label="Next page" className={`cursor-pointer ${(slicePagination.to == pagesCount || loadingProducts) ? "pointer-events-none opacity-70" : ""}`} onClick={() => handleIncrementSlice()}>
                <span aria-hidden="true" className={`${slicePagination.to < pagesCount ? "-translate-y-[1px]" : ""}`}>{globalT("Next")}</span>
                {
                   slicePagination.to < pagesCount
                   &&
                   (
                    currentLocale == "ar"
                    ?
                    <MdKeyboardDoubleArrowLeft/> 
                    :
                    <MdKeyboardDoubleArrowRight className='m-0 p-0'/> 
                    )
                }
            </Button>
        </div>
    )
}

export default ShopPagination