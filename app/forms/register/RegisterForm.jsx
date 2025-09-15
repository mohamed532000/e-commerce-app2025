"use client"
import CustomFormField from '@/components/ui/CustomFormField'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from 'lucide-react'
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import {z} from "zod"
import SubmitButton from '@/components/ui/SubmitButton'
import FormHeading from '../FormHeading'
// import AuthWithGoogleBtn from '@/components/ui/AuthWithGoogleBtn'
import { Link } from '@/i18n/navigation'
import { UserAuth } from '@/context/AuthProvider'
import HandleTranslate from '@/helper/HandleTranslate'
import { useLocale } from 'next-intl'
import { useSignUp } from '@/helper/fucntions/auth/SignUp'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'
import { useRedirectToProfile } from '@/helper/fucntions/auth/useRedirectToProfile'

const formValidation = z.object({
    name : z.string().min(3 , {message : "Name must be more than 3 letters"}),
    email : z.string().email(),
    phone : z.any(),
    password : z.string(),
    confirmPassword : z.string()
}).refine((data) => data.password == data.confirmPassword , {message : "Please confirm password" , path : ["confirmPassword"]});        

function RegisterForm() {
    const currentLocale = useLocale();
    const router= useRouter();
    const {mutate:signUp , isPending:signUpLoading , isError , error , isSuccess} = useSignUp()
    const form = useForm({
        resolver : zodResolver(formValidation),
        defaultValues : {
            name : "",
            email : "",
            phone : "",
            password : "",
            confirmPassword : "",
        }
    })
    const labelClassNameContent = 'z-20 absolute -translate-y-[50%] bg-background text-xs px-1  font-medium'
    const labelIconClassName = "w-3 h-3"
    const handleSignUpUser = async (data) => {
        signUp({signUpData : data , locale : currentLocale});
    }
    useEffect(() => {
        if(isError && error) {
            toast.error(error.message)
        }
    },[isError , error])
    useEffect(() => {
        if(isSuccess) {
            useRedirectToProfile(router , currentLocale)
        }
    },[isSuccess])
    return (
        <div className='flex flex-col gap-y-2'>
            <FormHeading
                title = {<div>Create <span className='text-primary'>Your</span> Account</div>}
                pargraph = {`Join us today to unlock exclusive benefits and seamless shopping.`}
            />
            <Form {...form}>
                <form
                    id='registeration-form'
                    onSubmit={form.handleSubmit((data) => handleSignUpUser(data))}
                    className='flex flex-col gap-y-4'
                    onKeyDown={(e) => {
                        if(signUpLoading) {
                            e.preventDefault();
                        }
                    }}
                >
                    <CustomFormField
                    labelClassName={labelClassNameContent} 
                    className=''
                    form={form} 
                    label='Username' 
                    name='name' 
                    icon={<User className={labelIconClassName} />}
                    placeholder='John Nady'
                    />
                    <CustomFormField
                    labelClassName={labelClassNameContent} 
                    className=' md:m-0'
                    form={form} 
                    label='E-mail' 
                    name='email' 
                    type='email'
                    icon={
                    <MdOutlineEmail className={labelIconClassName} />
                    }
                    placeholder='Example@gmail.com'
                    />
                    <CustomFormField
                    labelClassName={labelClassNameContent} 
                    form={form} 
                    label='Phone Number' 
                    name='phone' 
                    type='tel'
                    icon={<FaPhone className={labelIconClassName} />}
                    placeholder='01688277109'
                    />
                    <CustomFormField
                    labelClassName={labelClassNameContent} 
                    form={form} 
                    label='Password' 
                    name='password' 
                    type='password'
                    icon={<CiLock className={labelIconClassName} />}
                    placeholder='* * * * * * * *'
                    />
                    <CustomFormField
                    labelClassName={labelClassNameContent} 
                    form={form} 
                    label='Confirm Password' 
                    name='confirmPassword' 
                    type='password'
                    icon={<CiLock className={labelIconClassName} />}
                    placeholder='* * * * * * * *'
                    />
                    <div className='relative flex flex-col'>
                        <SubmitButton form={"registeration-form"} className={" w-fit"}>
                            {
                                signUpLoading
                                ?
                                <><HandleTranslate word={"Loading"} page={"global"}/>..</>
                                :
                                <HandleTranslate word={"Submit"} page={"global"}/>
                            }
                        </SubmitButton>
                        <span className='flex items-center gap-x-1 text-slate-400  mt-2'>
                            <HandleTranslate word={"I have an account"} page={"global"}/>
                            <Link href={"/auth/login"} className='underline text-slate-700'>
                                <HandleTranslate word={"Login"} page={"global"} />
                            </Link>
                        </span>
                    </div>
                    <div className='relative flex items-center justify-center my-1 opacity-50'>
                        <span className='relative w-[50%] h-[.5px] bg-slate-800 rounded-md'></span>
                        <span className='mx-2 -translate-y-0.5'>or</span>
                        <span className='relative w-[50%] h-[.5px] bg-slate-800 rounded-md'></span>
                    </div>
                    {/* <AuthWithGoogleBtn className={""} title={"Sign up with Google"} /> */}
                </form>
            </Form>
        </div>
    )
}

export default RegisterForm