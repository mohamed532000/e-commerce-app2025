import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from './button';
import {signIn} from "next-auth/react"
function AuthWithGoogleBtn({className , title}) {
  return (
    <Button className={`${className} flex justify-center items-center bg-white shadow-xsm shadow-slate-300 w-full cursor-pointer group`}
    onClick={() => signIn("google" , {redirect : true , callbackUrl : "/en/home"})}
    >
        <FcGoogle/>
        <span className='mx-2 text-slate-800 group-hover:text-white transition-all duration-300'>{title}</span>
    </Button>
  )
}

export default AuthWithGoogleBtn