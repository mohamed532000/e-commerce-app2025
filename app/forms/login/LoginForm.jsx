"use client"
import { Form } from '@/components/ui/form';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import CustomFormField from '@/components/ui/CustomFormField';
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import SubmitButton from '@/components/ui/SubmitButton';
import FormHeading from '../FormHeading';
// import AuthWithGoogleBtn from '@/components/ui/AuthWithGoogleBtn';
import { Link } from '@/i18n/navigation';
import HandleTranslate from '@/helper/HandleTranslate';
import { useLocale } from 'next-intl';
import { useSignIn } from '@/services/auth/SignIn';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import FullScreenLoading from '@/components/ui/loading/FullScreenLoading';
import { useRedirectToProfile } from '@/services/auth/useRedirectToProfile';
const formValidation = z.object({
  email : z.string().email(),
  password : z.string().min(1)
})
function LoginForm() {
  const router = useRouter()
  const currentLocale = useLocale()
  const [redirect , setRedirect] = useState(false)
  const {mutate:signIn , isPending:signInLoading , isError , error , isSuccess} = useSignIn()
  const form = useForm({
    resolver : zodResolver(formValidation),
    defaultValues : {
      name : "",
      password : "",
    }
  })
  const handleSignInUser = async (data) => {
    signIn({email:data.email , password : data.password})
  }
  useEffect(() => {
    if(isSuccess) {
      toast.success(`redirect to your profile...`)
      setRedirect(true);
      useRedirectToProfile(router)
    }
    return () => setRedirect(false)
  },[isSuccess])
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
          onSubmit={form.handleSubmit((data) => handleSignInUser(data))}
          aria-disabled={redirect || signInLoading}
          onKeyDown={(e) => {
            if(signInLoading || redirect) {
              e.preventDefault()
            }
          }}
        >
          <div className='flex flex-col gap-y-6'>
            <CustomFormField 
            labelClassName='z-20 absolute -translate-y-[50%] translate-x-2 bg-background text-xs px-1 text-slate-500 font-medium' 
            name='email'
            type='email'
            label='E-mail' 
            icon={<MdOutlineEmail className=" text-gray-600 w-4 h-4" />} 
            form={form}
            />
            <CustomFormField 
            labelClassName='z-20 absolute -translate-y-[50%] translate-x-2 bg-background text-xs px-1 text-slate-500 font-medium' 
            name='password'
            type='password'
            label='Password' 
            icon={<CiLock className=" text-gray-600 w-4 h-4" />} 
            form={form}
            />
          </div>
          <Link href={"/auth/insert-mail-to-reset-password"} className='text-sm mt-2'>
            Forgot your password ?
          </Link>
          <div className='relative flex items-center justify-center my-4'>
            <span className='relative w-[50%] h-[.5px] bg-slate-800 rounded-md opacity-50'></span>
            <span className='mx-2 -translate-y-0.5'>or</span>
            <span className='relative w-[50%] h-[.5px] bg-slate-800 rounded-md opacity-50'></span>
          </div>
          <div className='relative flex items-center gap-x-1.5'>
            <SubmitButton disabled={signInLoading || isSuccess} form={"login-form"}>
              {
                signInLoading
                ?
                <><HandleTranslate word={"Loading"} page={"global"} />..</>
                :
                <HandleTranslate word={"Submit"} page={"global"} />
              }
            </SubmitButton>
            <span className='flex items-center gap-x-1'>
                <HandleTranslate word={"Don't have an account"} page={"global"} />
                <Link href={"/auth/register"} className='underline '>
                  <HandleTranslate word={"Register"} page={"global"} />
                </Link>
            </span>
          </div>
        </form>
        {/* <AuthWithGoogleBtn className={`mb-4`} title={"Login with Google"}/> */}
      </Form>
    </div>
    {redirect && <FullScreenLoading/>}
    </>
  )
}

export default LoginForm