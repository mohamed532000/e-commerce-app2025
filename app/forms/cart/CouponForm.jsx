"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import CustomFormField from '@/components/ui/CustomFormField';
import SubmitButton from '@/components/ui/SubmitButton';
import HandleTranslate from '@/helper/HandleTranslate';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { GoTrash } from "react-icons/go";
import { useApplyCouponCode } from '@/services/shopping/cart/useApplyCouponCode';
import { UserAuth } from '@/context/AuthProvider';
import { Spinner } from '@/components/ui/spinner';

const formValidation = z.object({
    coupon: z.string().min(1)
})
function CouponForm({ cartData }) {
    const form = useForm({
        defaultValues: {
            coupon: ""
        },
        resolver: zodResolver(formValidation)
    })
    const [isMounted, setIsMounted] = useState(false);
    const { session } = UserAuth();
    const { data: applyCouponRes, mutate: applyCouponFunc, isPending: applyCouponLoading , error : applyCouponError} = useApplyCouponCode();
    const coupon = form.watch("coupon");
    const errorRef = useRef(null);
    useEffect(() => {
        const couponFromStorage = JSON.parse(localStorage.getItem("cart_coupon_code"))
        if (couponFromStorage) {
            form.setValue("coupon", couponFromStorage)
        }
        setIsMounted(true)
    }, [])
    const handleSubmitCoupon = (data) => {
        localStorage.setItem("cart_coupon_code", JSON.stringify(data.coupon));
        applyCouponFunc({ userId: session?.user?.id, cartId: cartData?.id, code: data.coupon })
    }
    const handleClearCoupon = () => {
        form.setValue("coupon", "");
        localStorage.removeItem("cart_coupon_code");
    }
    useEffect(() => {
        if(applyCouponRes) {
            console.log("applyCouponRes is :" , applyCouponRes);
        }
        if(applyCouponError) {
            console.log("applyCouponError is :" , applyCouponError?.message);
        }
    }, [applyCouponRes , applyCouponError])
    useEffect(() => {
        let removeErrorElementTimeout;
        if(applyCouponError) {
            removeErrorElementTimeout = setTimeout(() => {
                errorRef?.current?.classList.add("hidden")
            }, 3000);
        }
        return () => {
            clearTimeout(removeErrorElementTimeout);
        }
    }, [applyCouponError])
    return (
        <div className='relative w-full'>
            {
                applyCouponError
                &&
                <p ref={errorRef} className='col-span-12 text-red-600 py-2 text-sm'>{applyCouponError?.message}</p>
            }
            <Form {...form}>
                <form
                    id='coupon-form'
                    className='relative w-full grid grid-cols-12 gap-x-2.5 items-center'
                    onSubmit={form.handleSubmit((data) => handleSubmitCoupon(data))}
                >
                    {
                        isMounted
                        ?
                        <>
                            <CustomFormField
                                type='text'
                                name='coupon'
                                form={form} 
                                placeholder='X X X X..'
                                className={`${coupon !== "" ? "col-span-6" : "col-span-12"}`}
                            />
                            {
                                coupon !== ""
                                &&
                                <GoTrash className='col-span-2 cursor-pointer' onClick={handleClearCoupon} />
                            }
                            {
                                coupon !== ""
                                &&
                                <SubmitButton className={`col-span-4 text-white bg-black hover:bg-black hover:tracking-[4px] transition-all duration-300`} form={'coupon-form'}>
                                    {
                                        applyCouponLoading
                                        ?
                                        <Spinner className="size-4" />
                                        :
                                        <><HandleTranslate word={"Apply"} page={"global"} /></>

                                    }
                                </SubmitButton>
                            }
                        </>
                        :
                        <p className='col-span-12 py-2'><HandleTranslate word={"Loading"} page={"global"} />..</p>
                    }
                </form>
            </Form>
        </div>
    )
}

export default CouponForm