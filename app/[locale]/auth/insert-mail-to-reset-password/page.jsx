import React from 'react';
import { Link } from '@/i18n/navigation';
import { Home } from 'lucide-react';
import InsertEmailToResetPassForm from '@/app/forms/insert-email-to-reset-pass/InsertEmailToResetPassForm';
function page() {
  return (
    <div className='relative min-h-screen flex flex-col md:flex-row gap-y-2.5 md:gap-y-0 justify-center items-center'>
        <Link href="/" className="relative md:absolute h-fit md:inset-y-0 md:translate-y-4 md:right-4 flex justify-center items-center gap-1 text-sm  hover:text-primary transition z-40">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <InsertEmailToResetPassForm/>
    </div>
  )
}

export default page