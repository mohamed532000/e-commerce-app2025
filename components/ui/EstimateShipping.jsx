"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useGovernoratesData } from "@/services/shopping/addresses/useGovernoratesData";
import { LiaShippingFastSolid } from "react-icons/lia";
import { useCitiesData } from "@/services/shopping/addresses/useCitiesData";
import { useEffect } from "react";
import { useLocale } from "next-intl";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import HandleTranslate from "@/helper/HandleTranslate";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "./form";
import { useAppSettings } from "@/services/settings/useAppSettings";



export function EstimateShipping({ className }) {
    const form = useForm()
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
    return (
        <>
        <Accordion
            type="single"
            collapsible
            defaultValue={""}
            className={`${className} border-b border-t`}
        >
            <AccordionItem value="shipping">
                <AccordionTrigger className="uppercase cursor-pointer">
                    <div className="flex justify-start items-center gap-x-2">
                        <LiaShippingFastSolid className="" />
                        <span><HandleTranslate word={"Estimate shipping"} page={"shopping"} /></span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className={"relative"}>
                    <div className="relative my-2">
                        <Form {...form}>
                            <form className="flex gap-3.5" onSubmit={form.handleSubmit((data) => {
                                console.log("data from the form is: ", data)
                            })}>
                                <FormField
                                    control={form.control}
                                    name="governorate"
                                    render={({ field }) => (
                                        <FormItem className="">
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value} name={field.name}>
                                                    <SelectTrigger className=" rounded-3xl">
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
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem className="">
                                            <FormControl>
                                                <Select disabled={!governorateId || getGovernoratesLoading} onValueChange={field.onChange} value={field.value} name={field.name}>
                                                    <SelectTrigger className=" rounded-3xl">
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
                            </form>
                        </Form>
                    </div>
                    {
                        governorateId && cityId
                        &&
                        <div className={`relative  show-shipping-info text-white dark:text-slate-900 bg-black dark:bg-white shadow-sm p-3`}>

                            <HandleTranslate word={"Available shipping method: Express Courier"} page={"shopping"} /> : {governoratesData?.[governorateId]?.shipping_cost ? governoratesData?.[governorateId]?.shipping_cost.toFixed(2) : "0.00"} {appSettingsData?.currency}
                        </div>
                    }
                    {/* <HandleTranslate word={"We offer standard (5-7 days), express (2-3 days), and overnight shipping. Free shipping on international orders."} page={"shopping"} /> */}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        </>
        
    )
}
