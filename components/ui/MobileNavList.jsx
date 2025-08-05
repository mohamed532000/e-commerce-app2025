import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import MobileNavLink from './MobileNavLink';
import LangToggeler from './LangToggeler';
import ToggelerDarkMode from './ToggelerDarkMode';
export const MobileNavList = ({active , navList = [] , closeMobileNav}) => {
  return (
    <div className={`fixed top-0 ${active ? "w-full md:w-[200px]" : "w-0"} min-h-screen bg-white dark:bg-slate-700 transition-all duration-300 overflow-hidden flex justify-center items-center lg:hidden`}>
        <div className='w-full absolute top-0'>
            <IoCloseOutline className='cursor-pointer text-2xl m-2 dark:text-slate-800 ' onClick={closeMobileNav}/>
        </div>
        <ul className='flex flex-col justify-center items-center gap-2'>
            {
                navList.map((item , index) => (
                    <MobileNavLink key={index} item={item} active={active} index={index}/>
                ))
            }
            <ToggelerDarkMode/>
            <LangToggeler className={"mt-2"}/>
        </ul>
    </div>
  )
}