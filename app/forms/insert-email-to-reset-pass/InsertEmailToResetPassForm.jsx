"use client"
import React from 'react';
import CustomFormField from '@/components/ui/CustomFormField';
import { Form } from '@/components/ui/form';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import SubmitButton from '@/components/ui/SubmitButton';
import HandleTranslate from '@/helper/HandleTranslate';
import FormHeading from '../FormHeading';
import { SendResetPassLinkToEmail } from '@/services/auth/SendResetPassLinkToEmail';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


// need translation here
const formValidation = z.object({
    email : z.string().email()
})

function InsertEmailToResetPassForm() {
    const globalT = useTranslations("global");
    const currentLocale = useLocale();
    const {mutate:sendResetLink , isPending:sendLoading} = SendResetPassLinkToEmail();
    const form = useForm({
        resolver : zodResolver(formValidation),
        defaultValues : {
            email : ""
        }
    })
    const handleSendResetLinkToEmail = (data) => {
        sendResetLink({email : data.email , locale : currentLocale})
    }
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
                    type='email'
                    name='email'
                    placeholder='Example@gmail.com'
                    form={form}
                    label={globalT("Email")}
                />
                <div>
                    <SubmitButton>
                        {
                            sendLoading
                            ?
                            <><HandleTranslate word={"Loading"} page={"global"} />..</>
                            :
                        <   HandleTranslate word={"Submit"} page={"global"} />
                        }
                    </SubmitButton>
                </div>
            </form>
        </Form>
    </div>
  )
}

export default InsertEmailToResetPassForm