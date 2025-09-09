"use client"
import React, { useEffect, useState } from 'react'
import EmptyData from '@/components/ui/data-status/EmptyData';
import FaildLoadingData from '@/components/ui/data-status/FaildLoadingData';
import PageHeader from '@/components/ui/page-header/PageHeader';
import ProductCard from '@/components/ui/product-card/ProductCard';
import ProductsFilteration from '@/components/ui/ProductsFilteration';
import Section from '@/components/ui/section/Section';
import { categoriesData } from '@/helper/fucntions/categoriesData';
import { productsCount, productsData } from '@/helper/fucntions/productsData';
import HandleTranslate from '@/helper/HandleTranslate';
import SearchProductsForm from '@/components/ui/SearchProductsForm';
import { useLocale } from 'next-intl';
import ShopPagination from '@/components/ui/shop-page-components/ShopPagination';
import LoadingProducts from '@/components/ui/loading/LoadingProducts';
import { CiFilter } from "react-icons/ci";
import { useSearchParams } from 'next/navigation';

function ShopContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get("category")
    const locale = useLocale();
    const [data , setData] = useState([])
    const [categories , setCategories] = useState([])
    const [count , setCount] = useState();
    const productsCountInOnePage = 9; // count of products in one page
    const pagesCount = Math.ceil(count / productsCountInOnePage);
    const [loadingProducts , setLoadingProducts] = useState(true)
    const [loadingCategory , setLoadingCategory] = useState(true)
    const [page , setPage] = useState(1);
    const [showFilteration , setShowFilteration] = useState(false)
    const handleToggelFilteration = (value) => {
        setShowFilteration(value)
    }
    const [filterData , setFilterData] = useState(
        {
            search : "",
            category_id : "",
            price : "all",
            have_discount : "all",
            range : {from : 0 , to : productsCountInOnePage-1},
        }
    )
    const handleUpdatePageNum = (newPage) => {
        setPage(newPage)
    }
    const handleSetNewFilterData = (newData) => {
        setFilterData((prev) => ({...prev , ...newData}))
        window.localStorage.setItem("filterData" , JSON.stringify({...filterData , ...newData}))
    }
    const handleGetProducts = async () => {
        try {
            setLoadingProducts(true);
            const {data} = await productsData(locale , filterData);
            setData(data);
            setLoadingProducts(false);
        }catch (error) {
            setLoadingProducts(false);
            console.log(error);
        }
    }
    const handleGetProductsCount = async () => {
        const {count} = await productsCount();
        setCount(count)
    }
    const handleGetCategories = async () => {
        try {
            const {data:categories} = await categoriesData(locale);
            setCategories(categories);
            setLoadingCategory(false);
        }catch (error) {
            console.log(error);
            setLoadingCategory(false);
        }
    }
    useEffect(() => {
        handleGetProducts()
    },[filterData])
    useEffect(() => {
        handleGetProductsCount()
        handleGetCategories()
    },[])
    useEffect(() => {
        handleSetNewFilterData({range : {from : (page - 1) * productsCountInOnePage , to : page * productsCountInOnePage - 1}})
    } , [page])
    useEffect(() => {
        if(category && category !== "") {
            handleSetNewFilterData({category_id : category})
        }
    } , [category])
    return (
        <>
        <PageHeader title={"shop"} pageInfo={"shop page info"}/>
        
        {
            <Section
            containerClassName={""}
            >
            <div className='products-contnet relative grid grid-cols-12 gap-2.5'>
                <div className={`filteration-side absolute md:relative inset-y-0 ${showFilteration ? "translate-x-0 opacity-100" : `${locale == "ar" ? "-translate-x-[-150%]" : "-translate-x-[150%]"} opacity-0`} md:translate-x-0 md:opacity-100 transition-all duration-300 md:relative col-span-3 dark:shadow-accent-foreground rounded-3xl bg-white dark:bg-background shadow-flexable-shadow px-3 py-3 md:py-0 z-10 min-w-[300px] md:min-w-auto`}>
                    <ProductsFilteration 
                    categoriesData={categories} 
                    handleUpdateFilterData={handleSetNewFilterData} 
                    laodingProducts={loadingProducts} 
                    loadingCategory={loadingCategory}
                    handleToggelFilteration = {handleToggelFilteration}
                    />
                </div>
                <div className='products-side col-span-12 md:col-span-9 px-2'>
                <div className='relative flex justify-between items-center w-full'>
                    <div className={`relative hidden md:flex flex-col gap-y-1 justify-start items-start ${locale == "ar" ? "border-r-2" : "border-l-2"} border-active-text-primary py-1 px-2 md:text-2xl`}>
                    <h1 className='font-bold'><HandleTranslate word={"Shop Now"} page={"home"}/></h1>
                    <p className='text-sm'><HandleTranslate word={"shop page info"} page={"pagesHeader"}/></p>
                    </div>
                    <CiFilter className='md:hidden text-3xl cursor-pointer' onClick={() => handleToggelFilteration(true)}/>
                    <SearchProductsForm handleUpdateFilterData={handleSetNewFilterData} loadingData={loadingProducts}/>
                </div>
                <div className={`grid col-span-12 md:grid-cols-3 gap-2.5`}>
                    {loadingProducts && <LoadingProducts />}
                    {!data && !loadingProducts && <div className='col-span-3 flex justify-center items-center my-16'><FaildLoadingData/></div>}
                    {data?.length < 1 && !loadingProducts && <div className='col-span-3 flex justify-center items-center my-16'><EmptyData/></div>}
                    {
                    data?.length >= 1
                    &&
                    !loadingProducts
                    &&
                    data.map((item , index) => <ProductCard key={index} product={item} className={"col-span-3 md:col-span-1 mx-auto md:mx-0"}/>)
                    }
                </div>
                {
                    pagesCount >= 1
                    &&
                    <ShopPagination pagesCount={pagesCount} handleUpdatePageNum={handleUpdatePageNum} loadingProducts={loadingProducts}/>
                }
                </div>
            </div>
            </Section>
        }
        </>
    )
}


export default ShopContent



// if you want to use supabsae with rest api not client way
// const getData = async () => {
//     const response = await fetch(
//         "https://iosmuuvlhcijqehsluji.supabase.co/rest/v1/products",
//         {
//           headers: {
//             apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//             Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
//           },
//         }
//       ).then(res => res.json())
//       console.log(response)
// }
// useEffect(() => {
//     getData()
// },[])