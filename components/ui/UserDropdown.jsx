"use client";
import React, { useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';
import LogoutBtn from './LogoutBtn';
import HandleTranslate from '@/helper/HandleTranslate';
import { Link } from '@/i18n/navigation';
import CartIcon from './CartIcon';
function UserDropdown({className , sessionData}) {
    const [openDropDown , setOpenDropDown] = useState(false);
    return (
        <div className={`lang-toggeler-div relative flex justify-center items-center ${className} col-span-1`}>
            <DropdownMenu open={openDropDown} onOpenChange={setOpenDropDown}>
                <DropdownMenuTrigger aria-label="user drop down" className="outline-0 flex items-center cursor-pointer">
                    {
                    sessionData?.user?.image
                    ? 
                    <Image src={sessionData?.user?.image} alt='user-image' title={sessionData?.user.name} width={40} height={40} className='rounded-[50%] cursor-pointer'/> 
                    : 
                    <FaRegUser className='text-2xl cursor-pointer' aria-hidden="true"/>
                    }
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        <HandleTranslate word={"My account"} page={"global"}/>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={`/user/profile`}>{sessionData?.user?.email}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CartIcon/>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                        onSelect={(e) => {
                            e.preventDefault();
                            setOpenDropDown(true)
                        }}
                        >
                            <LogoutBtn/>
                        </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserDropdown