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
import { categoriesData } from '@/services/categoriesData'
import { useLocale } from 'next-intl'
import { IoIosArrowDown } from "react-icons/io";
import HandleTranslate from '@/helper/HandleTranslate'
import { Link } from '@/i18n/navigation'

function HandleShowCategoriesList({data}) {
    return (
        data?.map((item , index) => (
            item?.sub_categories?.length >= 1
            ?
            <DropdownMenuSub key={index}>
                <DropdownMenuSubTrigger>
                  <Link href={`/shop?category=${item.id}`}>{item.title}</Link>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    <HandleShowCategoriesList  data={item?.sub_categories} key={index}/>
                </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>
            :
            <DropdownMenuItem key={index}>
              <Link href={`/shop?category=${item.id}`}>{item.title}</Link>
            </DropdownMenuItem>
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
        <Button variant="outline" className={"group flex items-center justify-center cursor-pointer !bg-transparent !shadow-none !ring-0 !outline-none !border-none relative hover:!bg-transparent text-2xl md:text-base italic md:font-normal"}>
          <HandleTranslate word={"Categories"} page={"global"} />
          <IoIosArrowDown className='transition-all duration-500 group-data-[state=open]:rotate-180 group-data-[state=open]:translate-y-1.5 translate-y-2.5 -translate-x-1'/>
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