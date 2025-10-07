"use client"
import React, { useEffect, useRef, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import MobileNavLink from './MobileNavLink';
import LangToggeler from './LangToggeler';
import ToggelerDarkMode from './ToggelerDarkMode';
import UserDropdown from './UserDropdown';
import CategoriesList from './CategoriesList';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/all';
export const MobileNavList = ({active , navList = [] , closeMobileNav}) => {
    const mobileListRef = useRef(null);
    const toggeleThemRef = useRef(null);
    const tl = useRef()
    const [mounted , setMounted] = useState(false)
    useGSAP(() => {
        if(mounted) {
            tl.current = gsap.timeline({ paused: true })
            .from(".close-nav-list-icon" , {
                opacity : 0,
                y : -100
            })
            .from(".mobile-nav-link", {
                x: -20,
                scale : .2,
                opacity: 0,
                stagger: 0.3,
                duration : 1,
                ease: "elastic.out(0.7,0.7)",
            })
            .to(".span-border" , {
                width : "100%",
                duration : .3,
                opacity : 1,
                ease: "none",
            },"<.5")
            .from(".list-footer-icon" , {
                opacity : 0,
                y : 50,
                ease : "elastic.out(0.7,0.7)" ,
                stagger : .3
            },"<.5")
        }
    }, { scope: mobileListRef , dependencies : [mounted]})
    useEffect(() => {
        setMounted(true)
        return () => setMounted(false);
    },[])
    useEffect(() => {
        if (!tl.current) return
        active ? tl.current.play() : tl.current.reverse();
        active ? ScrollSmoother.get().paused(true) : ScrollSmoother.get().paused(false)
    }, [active])
  return (
    <div ref={mobileListRef} className={`fixed inset-y-0 ${active ? "w-full md:w-[200px]" : "w-0"} h-screen bg-background/70 backdrop-blur-md transition-all duration-300 flex flex-col overflow-hidden justify-center items-center lg:hidden`}>
        <div className='w-full absolute inset-y-0 close-nav-list-icon'>
            <IoCloseOutline className='cursor-pointer text-2xl m-2 dark:text-stone-100' onClick={closeMobileNav}/>
        </div>
        <ul className='flex flex-col justify-center items-center h-fit gap-2'>
            <li>
                <UserDropdown/>
            </li>
            {
                navList.map((item , index) => (
                    <MobileNavLink key={index} item={item} index={index} className={"mobile-nav-link"}/>
                ))
            }
            <li className={"mobile-nav-link"}><CategoriesList/></li>
        </ul>
        <div className='absolute bottom-0 flex justify-center items-center gap-x-2.5  py-4 w-full'>
            <span className='span-border absolute inset-y-0 h-[.5px] bg-slate-500 dark:bg-stone-100'></span>
            <ToggelerDarkMode className={"list-footer-icon"} toggeleThemRef={toggeleThemRef}/>
            <LangToggeler className={"list-footer-icon"}/>
        </div>
    </div>
  )
}

