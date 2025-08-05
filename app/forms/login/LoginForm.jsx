"use client"
import { Form } from '@/components/ui/form';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import CustomFormField from '@/components/ui/CustomFormField';
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import SubmitButton from '@/components/ui/SubmitButton';
import FormHeading from '../FormHeading';
import AuthWithGoogleBtn from '@/components/ui/AuthWithGoogleBtn';
import { Link } from '@/i18n/navigation';
const formValidation = z.object({
  email : z.string().email(),
  password : z.any()
})
function LoginForm() {
  const form = useForm({
    resolver : zodResolver(formValidation),
    defaultValues : {
      name : "",
      password : "",
    }
  })
  return (
    <>
    <div className='relative flex flex-col gap-y-2'>
      <FormHeading
        title = {<div>Let’s <span className='text-primary'>Get</span> You Signed In</div>}
        pargraph = {`Welcome back! Sign in to discover your favorite picks and enjoy seamless shopping.`}
      />
      <Form {...form}>
        <form
          id='login-form'
          onSubmit={form.handleSubmit((data) => console.log(data))}
        >
          <div className='flex flex-col gap-y-6'>
            <CustomFormField 
            labelClassName='z-20 absolute -translate-y-[50%] translate-x-2 bg-light-bg text-xs px-1 text-slate-500 font-medium' 
            name='email'
            type='email'
            label='E-mail' 
            icon={<MdOutlineEmail className=" text-gray-600 w-4 h-4" />} 
            form={form}
            />
            <CustomFormField 
            labelClassName='z-20 absolute -translate-y-[50%] translate-x-2 bg-light-bg text-xs px-1 text-slate-500 font-medium' 
            name='Password'
            type='password'
            label='Password' 
            icon={<CiLock className=" text-gray-600 w-4 h-4" />} 
            form={form}
            />
          </div>
          <div className='relative flex items-center justify-center my-4 opacity-50'>
            <span className='relative w-[50%] h-[.5px] bg-slate-800 rounded-md'></span>
            <span className='mx-2 -translate-y-0.5'>or</span>
            <span className='relative w-[50%] h-[.5px] bg-slate-800 rounded-md'></span>
          </div>
          <AuthWithGoogleBtn className={`mb-4`} title={"Login with Google"}/>
          <div className='relative flex items-center gap-x-1.5'>
            <SubmitButton form={"login-form"}>
                Submit
            </SubmitButton>
            <span className='flex items-center gap-x-1 text-slate-400'>
                don't have an account
                <Link href={"/register"} className='underline text-slate-700'>Register</Link>
            </span>
          </div>
        </form>
      </Form>
    </div>
    </>
  )
}

export default LoginForm