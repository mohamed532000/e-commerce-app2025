import React from 'react'
import loginPanner from "../../media/images/backgrounds/login.webp"
import Link from 'next/link'
import { Home } from 'lucide-react'
import LoginForm from '../../forms/login/LoginForm'

function LoginPage() {
  return (
    <>
      <div className='relative w-full min-h-screen flex flex-col md:flex-row justify-center md:justify-between items-center bg-slate-50'>
        <Link href="/" className="relative md:absolute top-4 md:right-4 flex justify-center items-center gap-1 text-sm text-slate-700 md:text-slate-100 hover:text-primary transition z-40">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <div className='form p-8 relative md:w-[50%] m-6 md:m-0 shadow-2xl md:shadow-none rounded-3xl md:rounded-none'>
          <LoginForm/>
        </div>
        <div className='image relative w-[50%] min-h-screen bg-no-repeat bg-cover hidden md:block'
          style={{backgroundImage: `url('${loginPanner.src}')`}}
        >
        </div>
      </div>
    </>
  )
}

export default LoginPage