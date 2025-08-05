"use client"
import CustomFormField from '@/components/ui/CustomFormField';
import { Form } from '@/components/ui/form';
import SubmitButton from '@/components/ui/SubmitButton';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
const formValidation = z.object({
    email : z.string().email()
})
function NewsLetterForm() {
    const form = useForm({
        resolver : zodResolver(formValidation),
        defaultValues : {
            email : ""
        }
    });
  return (
    <div className='relative mt-3 md:mt-0'>
        <Form {...form}>
            <form
                id='newsletter-form'
                onSubmit={form.handleSubmit((data) => {
                    console.log(data)
                })}
                className='relative flex items-center gap-x-1.5'
            >
                <CustomFormField
                    name='email'
                    placeholder='Enter email address'
                    type='email'
                    form={form}
                />
                <SubmitButton form={"newsletter-form"}>
                    Subscribe
                </SubmitButton>
            </form>
        </Form>
    </div>
  )
}

export default NewsLetterForm