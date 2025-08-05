import React from 'react'
import RegisterForm from '../../forms/register/RegisterForm'
import registerPanner from "../../media/images/backgrounds/register.webp"
import Link from 'next/link'
import { Home } from 'lucide-react'

function RegisterPage() {
  return (
    <>
      <div className='w-full min-h-screen flex flex-col md:flex-row justify-between bg-light-bg'>
        <Link href="/" className="relative md:absolute top-4 md:left-4 flex justify-center items-center gap-1 text-sm text-slate-700 md:text-slate-100 hover:text-primary transition z-40">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <div className="w-full md:w-1/2 md:h-auto bg-cover bg-no-repeat"
        style={{ backgroundImage: `url('${registerPanner.src}')` }}></div>
        <div className='form p-8 relative md:w-[50%] m-6 md:m-0 shadow-2xl md:shadow-none rounded-3xl md:rounded-none'>
          <RegisterForm/>
        </div>
      </div>
    </>
  )
}

export default RegisterPage