"use client";
import React, { useEffect, useState } from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import CustomFormField from '@/components/ui/CustomFormField';
import SubmitButton from '@/components/ui/SubmitButton';
import HandleTranslate from '@/helper/HandleTranslate';
import {z} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { GoTrash } from "react-icons/go";

const formValidation = z.object({
    coupon : z.string().min(1)
})
function CouponForm() {
    const form = useForm({
        defaultValues : {
            coupon : ""
        },
        resolver : zodResolver(formValidation)
    })
    const [isMounted , setIsMounted] = useState(false)
    const coupon = form.watch("coupon")
    useEffect(() => {
        const couponFromStorage = JSON.parse(localStorage.getItem("cart_coupon_code"))
        if(couponFromStorage) {
            form.setValue("coupon" , couponFromStorage)
        }
        setIsMounted(true)
    },[])
    const handleSubmitCoupon = (data) => {
        localStorage.setItem("cart_coupon_code" , JSON.stringify(data.coupon))
    }
    const handleClearCoupon = () => {
        form.setValue("coupon" , "");
        localStorage.removeItem("cart_coupon_code");
    }
    return (
        <div className='relative'>
            <Form {...form}>
                <form
                    id='coupon-form'
                    className='grid grid-cols-6 gap-x-2.5 items-center'
                    onSubmit={form.handleSubmit((data) => handleSubmitCoupon(data))}
                >
                    {
                        isMounted
                        ?
                        <>
                            <CustomFormField
                                type='text'
                                name='coupon'
                                form={form} className={`${coupon ? "col-span-3" : "col-span-4"}`}
                                placeholder='X X X X..'
                            />
                            {
                                coupon
                                &&
                                <GoTrash className='col-span-1 cursor-pointer' onClick={handleClearCoupon}/>
                            }
                            <SubmitButton className={`col-span-2`} form={'coupon-form'}>
                                <HandleTranslate word={"Submit"} page={"global"}/>
                            </SubmitButton>
                        </>
                        :
                        <p className='col-span-6 py-2'><HandleTranslate word={"Loading"} page={"global"}/>..</p>
                    }
                </form>
            </Form>
        </div>
    )
}

export default CouponForm