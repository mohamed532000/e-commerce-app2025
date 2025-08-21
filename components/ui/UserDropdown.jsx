"use client";
import React from 'react'
import { FaRegUser } from "react-icons/fa";
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';
import LogoutBtn from './LogoutBtn';
function UserDropdown({className , data}) {
    return (
        <div className={`lang-toggeler-div relative flex justify-center items-center ${className} col-span-1`}>
            <DropdownMenu>
                <DropdownMenuTrigger className="outline-0 flex items-center cursor-pointer">
                    {
                    data?.user?.image
                    ? 
                    <Image src={data?.user?.image} alt='user-image' title={data?.user.name} width={40} height={40} className='rounded-[50%] cursor-pointer'/> 
                    : 
                    <FaRegUser className='text-2xl cursor-pointer'/>
                    }
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            {data?.user?.name}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LogoutBtn/>
                        </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserDropdown