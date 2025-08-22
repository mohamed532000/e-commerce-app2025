"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import {locales} from "@/i18n/routing"
import { IoLanguageSharp } from 'react-icons/io5'
import {useRouter , usePathname} from "next/navigation"
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
const HandleShowFlag = () => {
    const currentLocale = useLocale();
    const currentFlag = locales.find((item) => item.locale === currentLocale);
    return <Image src={currentFlag.flag || ""} alt='' aria-hidden="true" title='flag' width={20} height={20} className='object-cover'/>
}
function LangToggeler({className}) {
    const currentLocale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const handleSwitch = (e , newLocale) => {
        e.preventDefault();
        const newPath = pathname.replace(currentLocale , newLocale);
        router.push(newPath)
    }
  return (
    <div className={`lang-toggeler-div relative flex justify-center items-center ${className}`}>
        <DropdownMenu>
            <DropdownMenuTrigger aria-label="Change language" className="outline-0 flex items-center cursor-pointer">
                <IoLanguageSharp className='mx-1 dark:text-lime-50' aria-hidden="true"/>
                {HandleShowFlag()}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                {/* <DropdownMenuSeparator /> */}
                {
                    locales.map((item , index) => (
                        <DropdownMenuItem key={index}>
                            <Link href={"#"} onClick={(e) => {
                                handleSwitch(e , item.locale)
                            }}>
                                <div className='relative flex items-center'>
                                    <Image 
                                        src={item.flag} 
                                        alt='flag' 
                                        title={item.locale} 
                                        width={20} 
                                        height={20}
                                        className='object-cover'
                                    />
                                    <div className='mx-2'>
                                        {item.locale.toUpperCase()}
                                    </div>
                                </div>
                            </Link>
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default LangToggeler