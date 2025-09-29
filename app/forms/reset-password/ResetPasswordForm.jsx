"use client"
import React, { useEffect } from 'react';
import CustomFormField from '@/components/ui/CustomFormField';
import { Form } from '@/components/ui/form';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import SubmitButton from '@/components/ui/SubmitButton';
import HandleTranslate from '@/helper/HandleTranslate';
import FormHeading from '../FormHeading';
import { CiLock } from 'react-icons/ci';
import { useUpdateUserData } from '@/services/auth/useUpdateUserAuthData';
import { useRedirectIfNotAuth } from '@/services/auth/useRedirectIfNotAuth';
import { useRouter } from '@/i18n/navigation';

function ResetPasswordForm() {
    const router = useRouter();
    const globalT = useTranslations("global")
    const {mutate:resetPassFunc , isPending:resetLoading , isSuccess} = useUpdateUserData();
    const form = useForm({
        defaultValues : {
            email : ""
        }
    })
    const handleSendResetLinkToEmail = (data) => {
        resetPassFunc({newData : data , successMessage : globalT("success change password") , translate : globalT})
    }
    useEffect(() => {
        isSuccess && useRedirectIfNotAuth(router);
    },[isSuccess])
  return (
    <div className='relative p-5 rounded-2xl border  flex flex-col gap-y-2.5 shadow-flexable-shadow'>
        <FormHeading
            title={"Reset Your password"}
            pargraph={"will send link to your email to reset password"}
            titleClassName={"md:text-xl text-center md:text-start"}
        />
        <Form {...form}>
            <form
            id='reset-pass-form'
            onSubmit={form.handleSubmit((data) => handleSendResetLinkToEmail(data))}
            className='relative flex flex-col gap-y-2.5'
            >
                <CustomFormField 
                // labelClassName='z-20 absolute -translate-y-[50%] translate-x-2 bg-background text-xs px-1 text-slate-500 font-medium' 
                name='password'
                type='password'
                label={globalT('New password')}
                icon={<CiLock className=" text-gray-600 w-4 h-4" />} 
                form={form}
                />
                <div>
                    <SubmitButton>
                        {
                            resetLoading
                            ?
                            <><HandleTranslate word={"Loading"} page={"global"} />..</>
                            :
                            <HandleTranslate word={"Submit"} page={"global"} />
                        }
                    </SubmitButton>
                </div>
            </form>
        </Form>
    </div>
  )
}

export default ResetPasswordForm