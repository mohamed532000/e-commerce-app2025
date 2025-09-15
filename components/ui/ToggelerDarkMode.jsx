"use client"
import React, { useEffect, useState } from 'react'
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useTheme } from 'next-themes';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SpinLoading from './SpinLoading';

function ToggelerDarkMode({showWord , className}) {
  const [mounted , setMounted] = useState(false)
  const {resolvedTheme , setTheme ,} = useTheme()
  useEffect(() => setMounted(true) , []);
  const handleSetTheme = () => {
    if(resolvedTheme === "dark") {
      setTheme("light")
    }else {
      setTheme("dark")
    }
  }
  if (!mounted) return <SpinLoading/>
  return (
    <div className={`relative flex ${showWord && showWord !== undefined ? "justify-start w-full" : "justify-center"} items-center text-base md:text-2xl ${className} cursor-pointer`}
    onClick={handleSetTheme}
    >
        {
            resolvedTheme === "dark" 
            ? 
            <>
            <MdOutlineDarkMode/>
              {
                showWord && showWord !== undefined &&
                <span className='text-sm mx-2'>Light</span>
              }
            </>
            : 
            <>
            <CiLight/>
              {
              showWord && showWord !== undefined &&
              <span className='text-sm mx-2'>Dark</span>
              }
            </>
        }
    </div>
  )
}

export default ToggelerDarkMode