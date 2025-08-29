import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import MobileNavLink from './MobileNavLink';
import LangToggeler from './LangToggeler';
import ToggelerDarkMode from './ToggelerDarkMode';
import UserDropdown from './UserDropdown';
import CategoriesList from './CategoriesList';
export const MobileNavList = ({active , navList = [] , closeMobileNav}) => {
  return (
    <div className={`fixed inset-y-0 ${active ? "w-full md:w-[200px]" : "w-0"} min-h-screen bg-white dark:bg-slate-700 transition-all duration-300 overflow-hidden flex justify-center items-center lg:hidden`}>
        <div className='w-full absolute inset-y-0'>
            <IoCloseOutline className='cursor-pointer text-2xl m-2 dark:text-slate-800 ' onClick={closeMobileNav}/>
        </div>
        <ul className='flex flex-col justify-center items-center gap-2'>
            <li>
                <UserDropdown/>
            </li>
            {
                navList.map((item , index) => (
                    <MobileNavLink key={index} item={item} active={active} index={index}/>
                ))
            }
            <li><CategoriesList/></li>
            <li>
                <ToggelerDarkMode/>
            </li>
            <li className={"mt-2"}>
                <LangToggeler/>
            </li>
        </ul>
    </div>
  )
}

