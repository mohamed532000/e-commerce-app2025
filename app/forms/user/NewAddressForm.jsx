"use client"
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import HandleTranslate from '@/helper/HandleTranslate';
import CustomFormField from '@/components/ui/CustomFormField';
import { useAppSettings } from '@/services/settings/useAppSettings';
import { useGovernoratesData } from '@/services/shopping/addresses/useGovernoratesData';
import { useCitiesData } from '@/services/shopping/addresses/useCitiesData';
import { useLocale } from 'next-intl';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect } from 'react'
import SubmitButton from '@/components/ui/SubmitButton';


function NewAddressForm({className}) {
    const form = useForm();
    const {data: appSettingsData} = useAppSettings();
    const { data: governoratesData , isPending:getGovernoratesLoading} = useGovernoratesData();
    const governorateId = form.watch("governorate")
    const { data: citiesData , isPending:getCitiesLoading} = useCitiesData({ governorateId: governorateId});
    const cityId = form.watch("city")
    const currentLocale = useLocale();
    useEffect(() => {
        if(citiesData) {
            form.setValue("city" , citiesData[0].id)
        }
    }, [citiesData])
    const handleSubmitNewAddress = (data) => {
        console.log("new address info is: " , data)
    }
    return (
        <div className={`relative flex flex-col gap-y-5 p-4 rounded-3xl border bg-gray-100 dark:bg-slate-800/50 ${className}`}>
            <h1 className='uppercase text-2xl'>
                <HandleTranslate word={"Create new address"} page={"global"}/>
            </h1>
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit((data) => handleSubmitNewAddress(data))}
                    className='grid grid-cols-12 gap-4'
                >
                    <CustomFormField
                        name='name'
                        form = {form}
                        placeholder={"Full Name"}
                        label={"Full Name"}
                        type={"text"}
                        className='col-span-12 md:col-span-6'
                    />
                    <CustomFormField
                        name='phone'
                        form = {form}
                        placeholder={"01xxxxxxxxx"}
                        label={"phone"}
                        type={"text"}
                        className='col-span-12 md:col-span-6'
                    />
                    <div className='relative col-span-12 md:col-span-6'>
                        <FormField
                            name="governorate"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel>
                                        <HandleTranslate word={"Governorate"} page={"global"} />
                                    </FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value} name={field.name}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={<HandleTranslate word={"Choose governorate"} page={"shopping"} />} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                {governoratesData?.map(governorate => {
                                                    return (
                                                        <SelectItem key={governorate.id} value={governorate.id}>
                                                            {governorate.name[currentLocale]}
                                                        </SelectItem>
                                                    )
                                                })}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='relative col-span-12 md:col-span-6'>
                        <FormField
                            name="city"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel>
                                        <HandleTranslate word={"City"} page={"global"} />
                                    </FormLabel>
                                    <FormControl>
                                        <Select disabled={!governorateId || getGovernoratesLoading} onValueChange={field.onChange} value={field.value} name={field.name}>
                                            <SelectTrigger className="w-full">
                                                {
                                                    governorateId && getCitiesLoading
                                                    ?
                                                    ". . ."
                                                    :
                                                    <SelectValue placeholder={<HandleTranslate word={"Choose city"} page={"shopping"} />} />
                                                }
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                {citiesData?.map(city => {
                                                    return (
                                                        <SelectItem key={city.id} value={city.id}>
                                                            {city.name[currentLocale]}
                                                        </SelectItem>
                                                    )
                                                })}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <CustomFormField
                        name='address'
                        form = {form}
                        placeholder={"Enter street address, buillding, apartment, floor"}
                        label={"Street address"}
                        type={"text"}
                        className='col-span-12'
                    />
                    <CustomFormField
                        name='postal_code'
                        form = {form}
                        placeholder={"000000"}
                        label={"Postal Code ( Optional )"}
                        type={"number"}
                        className='col-span-6'
                    />
                    <div className='col-span-6 flex items-end'>
                        <SubmitButton form={form} className=""></SubmitButton>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default NewAddressForm