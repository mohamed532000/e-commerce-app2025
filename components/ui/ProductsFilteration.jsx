"use client"
import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/CustomAccordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import HandleTranslate from '@/helper/HandleTranslate';
import { useLocale } from 'next-intl';
import { IoCloseOutline } from "react-icons/io5";

const FilterTitle = ({children}) => {
  return (
    <h1 className='font-bold px-2 mt-4 relative after:absolute after:inset-y-0 after:w-[5px] after:h-[5px] after:rounded-[50%] after:bg-active-text-primary'>{children}</h1>
  )
}
const CustomRadioItem = ({value , id , children , className}) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={id ? id : value}  className={"cursor-pointer"}/>
      <Label htmlFor={id ? id : value} className={`cursor-pointer`}>
        {children}
      </Label>
    </div>
  )
}
const HandleShowDiscountFilteration = ({updateFilterDataFunc , currentLocale , laodingProducts}) => {
  return (
    <>
        <FilterTitle>
          <HandleTranslate word={"Filter with have discount"} page={"global"} />
        </FilterTitle>
        <RadioGroup dir={currentLocale === "ar" ? "rtl" : "ltr"} className={`px-2 py-2 ${laodingProducts ? "pointer-events-none opacity-70" : ""}`} defaultValue="all-prices" onValueChange={(value) => updateFilterDataFunc({have_discount : value})}>
          <CustomRadioItem value={"all-prices"} id={"all-prices"}>
            <HandleTranslate word={"All"} page={"global"}/>
          </CustomRadioItem>
          <CustomRadioItem value={true} id={"have-discount"}>
            <HandleTranslate word={"Have discount"} page={"global"}/>
          </CustomRadioItem>
          <CustomRadioItem value={false} id={"not-have-discount"}>
            <HandleTranslate word={"Not have discount"} page={"global"}/>
          </CustomRadioItem>
        </RadioGroup>
    </>
  )
}
const HandleShowFilterPrice = ({updateFilterDataFunc , currentLocale , laodingProducts}) => {
  return (
    <>
        <FilterTitle>
          <HandleTranslate word={"Sort with price"} page={"global"} />
        </FilterTitle>
        <RadioGroup dir={currentLocale === "ar" ? "rtl" : "ltr"} className={`px-2 py-2 ${laodingProducts ? "pointer-events-none opacity-70" : ""}`} defaultValue={"all"} onValueChange={(value) => updateFilterDataFunc({price : value})}>
          <CustomRadioItem value={"all"}>
            <HandleTranslate word={"All"} page={"global"}/>
          </CustomRadioItem>
          <CustomRadioItem value={"high-to-low"}>
            <HandleTranslate word={"High to low"} page={"global"}/>
          </CustomRadioItem>
          <CustomRadioItem value={"low-to-high"}>
            <HandleTranslate word={"Low to High"} page={"global"}/>
          </CustomRadioItem>
        </RadioGroup>
    </>
  )
}
const HandleShowCategories = ({data , updateFilterDataFunc , loadingCategory}) => {
    return (
      <>
      {loadingCategory && <h1 className='my-9'><HandleTranslate  word={"Loading"} page={"global"} />...</h1>}
        {
          data?.length >= 1
          &&
          data?.map((item , index) => {
            const {sub_categories} = item;
            return sub_categories?.length < 1
            ? 
            <AccordionItem key={index} className={"px-2 py-4"}>
              <AccordionTrigger  nested={false}>
                <h1 className={`cursor-pointer ${loadingCategory ? "pointer-events-none opacity-70" : ""}`} onClick={() => updateFilterDataFunc({category_id : item.id})}>{item.title}</h1>
              </AccordionTrigger>
            </AccordionItem>
            :
            <AccordionItem key={index} value={`item-${item.id}`} className={"px-2"}>
              <AccordionTrigger>
                <h1 className={`cursor-pointer ${loadingCategory ? "pointer-events-none opacity-70" : ""}`} onClick={() => updateFilterDataFunc({category_id : item.id})}>{item.title}</h1>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <HandleShowCategories data={sub_categories} updateFilterDataFunc={updateFilterDataFunc}/>
              </AccordionContent>
            </AccordionItem>
          })
        }
      </>
    )
}

function ProductsFilteration({categoriesData , handleUpdateFilterData , laodingProducts , loadingCategory , className , handleToggelFilteration}) {
  const currentLocale = useLocale();
  return (
    <div className={`relative flex flex-col gap-y-1.5 filteration-content ${className}`}>
      <IoCloseOutline 
      className={`absolute block md:hidden cursor-pointer ${currentLocale == "ar" ? "left-0" : "right-0"} text-2xl`}
      onClick={() => handleToggelFilteration(false)}
      />
      <div className='!mt-[20px] !md:mt-0'>
        <HandleShowFilterPrice 
          updateFilterDataFunc={handleUpdateFilterData} 
          currentLocale={currentLocale} 
          laodingProducts={laodingProducts}/>
        <HandleShowDiscountFilteration
          updateFilterDataFunc={handleUpdateFilterData} 
          currentLocale={currentLocale} 
          laodingProducts={laodingProducts}/>
        <div className='relative flex flex-col'>
          <FilterTitle>
            <HandleTranslate word={"Category"} page={"global"} />
          </FilterTitle>
          <Accordion
            type="single"
            collapsible
            className="w-full"
          >
            <AccordionItem className={"px-2 py-4"}>
              <AccordionTrigger  nested={false}>
                <h1 className={`cursor-pointer ${loadingCategory ? "pointer-events-none opacity-70" : ""}`} onClick={() => handleUpdateFilterData({category_id : ""})}><HandleTranslate word={"All"} page={"global"} /></h1>
              </AccordionTrigger>
            </AccordionItem>
            {/* <HandleShowCategories
              data={categoriesData} 
              updateFilterDataFunc={handleUpdateFilterData} 
              loadingCategory={loadingCategory}/> */}
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default ProductsFilteration
