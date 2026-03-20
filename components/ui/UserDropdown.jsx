"use client";
import React, { useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';
import LogoutBtn from './LogoutBtn';
import HandleTranslate from '@/helper/HandleTranslate';
import { Link } from '@/i18n/navigation';
import CartIcon from './CartIcon';
import WishlistIcon from './icons/WishlistIcon';
// import { useCartData } from '@/services/shopping/useCartData';
function UserDropdown({className , sessionData}) {
    const [openDropDown , setOpenDropDown] = useState(false);
    // const {data , error , isPending:cartLoading} = useCartData();
    if(sessionData?.user?.is_anonymous) return (
        <div className={`lang-toggeler-div relative flex justify-center items-center ${className} col-span-1`}>
            <DropdownMenu open={openDropDown} onOpenChange={setOpenDropDown}>
                <DropdownMenuTrigger aria-label="user drop down" className="outline-0 flex items-center cursor-pointer">
                    <FaRegUser className='text-2xl cursor-pointer' aria-hidden="true"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                        <DropdownMenuItem>
                            <CartIcon/>
                            {/* <Link href={`/user/cart`}></Link> */}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <WishlistIcon/>
                            {/* <Link href={`/user/wishlist`}></Link> */}
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
                            <Link href={`/user/profile`}>{sessionData?.user?.email}</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/user/cart`}><CartIcon/></Link>
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