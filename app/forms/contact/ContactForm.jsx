"use client"
import React from 'react';
import {z} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import CustomFormField from '@/components/ui/CustomFormField';
import SubmitButton from '@/components/ui/SubmitButton';
import { IoIosSend } from "react-icons/io";

const formValidation = z.object({
    name : z.string().min(3),
    email : z.string().email(),
    phone : z.string().min(8).max(11),
    message : z.string().min(5).max(200)
})
function ContactForm() {
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
        <h1 className='font-bold text-2xl'>Send us a message</h1>
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
                    label='Name'
                    form={form}
                    className='col-span-2 md:col-span-1'
                />
                <CustomFormField
                    type='string'
                    name='email'
                    label='Email'
                    form={form}
                    className='col-span-2 md:col-span-1'
                />
                <CustomFormField
                    type='string'
                    name='phone'
                    label='Phone number'
                    form={form}
                    labelClassName='my-1'
                    className='col-span-2'
                />
                <CustomFormField
                    type='textarea'
                    name='message'
                    form={form}
                    className='col-span-2'
                    label='Message'
                    placeholder='Your message her.'
                />
                <SubmitButton
                form={"contact-form"}
                className={"w-fit"}
                >
                    <>
                    Send Message
                    <IoIosSend/>
                    </>
                </SubmitButton>
            </form>
        </Form>
    </div>
  )
}

export default ContactForm