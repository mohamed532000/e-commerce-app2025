"use client"
// import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
// import SpinLoading from './SpinLoading';
// import RegisterBtn from './RegisterBtn';
import UserDropdown from './UserDropdown';
import { UserAuth } from '@/context/AuthProvider';
import RegisterBtn from './RegisterBtn';
import SpinLoading from './SpinLoading';
// import { toast } from 'sonner';
// import { useTranslations } from 'next-intl';
// import { Link } from '@/i18n/navigation';

function NavAuthSide() {
    const [isMounted , setIsMounted] = useState(false)
    const {session:sessionData} = UserAuth();
    useEffect(() => setIsMounted(true) , [])
    if(!isMounted) return <SpinLoading/>
    if(!sessionData) return <RegisterBtn/>
    return <UserDropdown sessionData={sessionData}/>
}

export default NavAuthSide

