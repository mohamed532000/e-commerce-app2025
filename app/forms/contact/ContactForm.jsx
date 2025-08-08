"use client"
import React from 'react';
import {z} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import CustomFormField from '@/components/ui/CustomFormField';
import SubmitButton from '@/components/ui/SubmitButton';
import { IoIosSend } from "react-icons/io";
import { useTranslations } from 'next-intl';

const formValidation = z.object({
    name : z.string().min(3),
    email : z.string().email(),
    phone : z.string().min(8).max(11),
    message : z.string().min(5).max(200)
})
function ContactForm() {
    const globalT = useTranslations("global");
    const contactPT = useTranslations("contactPage");
    const form = useForm({
        resolver : zodResolver(formValidation),
        defaultValues : {
            name : "",
            email : "",
            phone : "",
            message : ""
        }
    })
  return (
    <div className='border border-slate-300 dark:border-slate-500 rounded-2xl flex flex-col gap-y-2 p-5'>
        <h1 className='font-bold text-2xl'>{contactPT("Send us a message")}</h1>
        <Form {...form}>
            <form 
                id='contact-form'
                onSubmit={form.handleSubmit((data) => {
                    console.log(data)
                })}
                className='grid grid-cols-2 gap-2'
            >
                <CustomFormField
                    type='string'
                    name='name'
                    label={globalT('Name')}
                    form={form}
                    className='col-span-2 md:col-span-1'
                />
                <CustomFormField
                    type='string'
                    name='email'
                    label={globalT('Email')}
                    form={form}
                    className='col-span-2 md:col-span-1'
                />
                <CustomFormField
                    type='string'
                    name='phone'
                    label={globalT('Phone')}
                    form={form}
                    labelClassName='my-1'
                    className='col-span-2'
                />
                <CustomFormField
                    type='textarea'
                    name='message'
                    form={form}
                    className='col-span-2'
                    label={globalT('Message')}
                    placeholder={`${globalT('Your message her')}..`}
                />
                <SubmitButton
                form={"contact-form"}
                className={"w-fit"}
                >
                    <>
                    {contactPT("Send message")}
                    <IoIosSend/>
                    </>
                </SubmitButton>
            </form>
        </Form>
    </div>
  )
}

export default ContactForm