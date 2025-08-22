"use client"
// import { signOut } from 'next-auth/react';
import React from 'react';
import { MdLogout } from 'react-icons/md';
import { Toaster } from './sonner';

function LogoutBtn() {
  return (
    <>
      <button
          className='relative flex items-center gap-x-1.5 bg-transparent outline-0 border-0 cursor-pointer'
          // onClick={() => signOut({redirect : false})}
          >
          <MdLogout/>
          <span>Logout</span>
      </button>
      <Toaster/>
    </>
  )
}

export default LogoutBtn