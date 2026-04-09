"use client";
import React, { useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';
import LogoutBtn from './LogoutBtn';
import HandleTranslate from '@/helper/HandleTranslate';
import { Link } from '@/i18n/navigation';
import CartIcon from './CartIcon';
import WishlistIcon from './icons/WishlistIcon';
import { UserAuth } from '@/context/AuthProvider';
// import { useCartData } from '@/services/shopping/useCartData';

const UserProfileLink = ({sessionData}) => {
    return (
        <Link href={`/user/profile`}>{sessionData?.user?.email}</Link>
    )
}

function UserDropdown({className}) {
    const [openDropDown , setOpenDropDown] = useState(false);
    // const {data , error , isPending:cartLoading} = useCartData();
    const {session:sessionData , getSessionLoading} = UserAuth();

    if(!sessionData?.user) return null
    if(sessionData?.user?.is_anonymous) return (
        <div className={`lang-toggeler-div relative flex justify-center items-center ${className} col-span-1`}>
            <DropdownMenu open={openDropDown} onOpenChange={setOpenDropDown}>
                <DropdownMenuTrigger aria-label="user drop down" className="outline-0 flex items-center cursor-pointer">
                    <FaRegUser className='text-2xl cursor-pointer' aria-hidden="true"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                        <DropdownMenuItem>
                            <CartIcon/>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <WishlistIcon/>
                        </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
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
                            <UserProfileLink sessionData={sessionData}/>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            {/* <Link href={`/user/cart`}></Link> */}
                            <CartIcon/>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <WishlistIcon/>
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