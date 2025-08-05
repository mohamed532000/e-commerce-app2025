"use client"
import React, { useEffect, useState } from 'react'
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useTheme } from 'next-themes';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ToggelerDarkMode() {
  const [mounted , setMounted] = useState(false)
  const {resolvedTheme , setTheme} = useTheme()
  useEffect(() => setMounted(true) , []);
  if (!mounted) return (
    <div className={`relative flex justify-center items-center mx-4 text-base md:text-2xl`}>
      <AiOutlineLoading3Quarters className=" animate-spin spin-in transition-all duration-300 opacity-40"/>
    </div>
  )
  return (
    <div className={`relative flex justify-center items-center mx-4 text-base md:text-2xl`}>
        {
            resolvedTheme === "dark" ? 
            <MdOutlineDarkMode onClick={() => setTheme("light")} className='cursor-pointer'/> : 
            <CiLight onClick={() => setTheme("dark")} className='cursor-pointer'/>
        }
    </div>
  )
}

export default ToggelerDarkMode