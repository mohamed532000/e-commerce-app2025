"use client";
import React, { useEffect, useState } from 'react';
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
    const { mutate: applyCouponFunc, isPending: applyCouponLoading } = useApplyCouponCode();
    const coupon = form.watch("coupon")
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
    return (
        <div className='relative w-full'>
            <Form {...form}>
                <form
                    id='coupon-form'
                    className='relative w-full grid  grid-cols-12 gap-x-2.5 items-center'
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
                            <p className='col-span-6 py-2'><HandleTranslate word={"Loading"} page={"global"} />..</p>
                    }
                </form>
            </Form>
        </div>
    )
}

export default CouponForm