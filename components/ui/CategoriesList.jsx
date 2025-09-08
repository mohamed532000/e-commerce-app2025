"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { categoriesData } from '@/helper/fucntions/categoriesData'
import { useLocale } from 'next-intl'
import { IoIosArrowDown } from "react-icons/io";
import HandleTranslate from '@/helper/HandleTranslate'

function HandleShowCategoriesList({data}) {
    return (
        data?.map((item , index) => (
            item?.sub_categories?.length >= 1
            ?
            <DropdownMenuSub key={index}>
                <DropdownMenuSubTrigger>{item.title}</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    <HandleShowCategoriesList  data={item?.sub_categories} key={index}/>
                </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
            :
            <DropdownMenuItem key={index}>{item.title}</DropdownMenuItem>
        ))
    )
}

export default function CategoriesList() {
    const [categories , setCategories] = useState([])
    const currentLocale = useLocale()
    const fetchCategories = async () => {
        const {data} = await categoriesData(currentLocale);
        data && setCategories(data)
    }
    useEffect(() => {
        fetchCategories()
    },[])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={"group cursor-pointer !bg-transparent !shadow-none !ring-0 !outline-none !border-none relative hover:!bg-transparent"}>
        <HandleTranslate word={"Categories"} page={"global"} />
        <IoIosArrowDown className='absolute bottom-0 translate-y-1 transition-all duration-500 group-data-[state=open]:rotate-180 group-data-[state=open]:translate-y-1.5'/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel><HandleTranslate word={"What do u need"} page={"global"} /> ?</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            <HandleShowCategoriesList data={categories} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}