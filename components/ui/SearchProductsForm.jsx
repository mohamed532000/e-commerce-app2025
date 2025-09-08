"use client"
import React, { useEffect } from 'react'
import { Form } from './form'
import { useForm } from 'react-hook-form'
import CustomFormField from './CustomFormField'
import SubmitButton from './SubmitButton'
import { useTranslations } from 'next-intl'
import HandleTranslate from '@/helper/HandleTranslate'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
const useSearchSchema = () => {
    const t = useTranslations("validations");
    return z.object({
        search : z.string().min(1 , {message : t("Enter name at least 1 letter")})
    })
}
function SearchProductsForm({handleUpdateFilterData , loadingData}) {
    const schema = useSearchSchema()
    const t = useTranslations("global")
    const form = useForm({
        resolver : zodResolver(schema),
        defaultValues : {
            search : ""
        }
    })
    const searchValue = form.watch("search")
    
    const handleChangeSearch = (data) => {
        handleUpdateFilterData(data)
    }
    useEffect(() => {
        searchValue == "" && handleUpdateFilterData({search : ""})
    },[searchValue])
    return (
        <Form {...form}>
            <form
            id='search-form'
            onSubmit={form.handleSubmit((data) => handleChangeSearch(data))}
            className='relative flex items-center gap-x-1.5'
            >
            <CustomFormField
                name='search'
                type='search'
                placeholder={`${t("Search here")}..`}
                form={form}
                />
                <SubmitButton form={"search-form"} className={`${loadingData ? "pointer-events-none opacity-70" : ""}`}>
                    <HandleTranslate word={"Search"} page={"global"}/>
                </SubmitButton>
            </form>
        </Form>
    )
}

export default SearchProductsForm