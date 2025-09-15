"use client"
import React, { useState } from 'react'
import LangToggeler from '../LangToggeler';
import { CiViewList } from "react-icons/ci";
import ToggelerDarkMode from '@/components/ui/ToggelerDarkMode';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import LogoutBtn from '../LogoutBtn';
import { MainButton } from '../MainButton';
import HandleTranslate from '@/helper/HandleTranslate';


export const EditPassAndImageBtns = () => {
    return (
        <div className='actions-btns relative flex items-center gap-x-2.5'>
            <MainButton>
                <HandleTranslate word={"Edit profile picture"} page={"global"} />
            </MainButton>
            <MainButton>
                <HandleTranslate word={"Change password"} page={"global"} />
            </MainButton>
        </div>
    )
}

function ProfileActions() {
    const [openDropDown , setOpenDropDown] = useState(false);
    return (
        <div className='relative flex items-center gap-x-2.5'>
            <LangToggeler/>
            <DropdownMenu open={openDropDown} onOpenChange={setOpenDropDown}>
                <DropdownMenuTrigger aria-label="user drop down" className="outline-0 flex items-center cursor-pointer">
                    <CiViewList
                    className='cursor-pointer'
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        <HandleTranslate word={"My account"} page={"global"}/>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <ToggelerDarkMode showWord={true}/>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={(e) => {
                        e.preventDefault();
                        setOpenDropDown(true)
                    }}>
                        <LogoutBtn/>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default ProfileActions