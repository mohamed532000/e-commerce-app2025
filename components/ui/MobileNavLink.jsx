"use client"
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'

function MobileNavLink({active , item , index , className}) {
    const t = useTranslations("home");
    const [mounted , setMounted] = useState(false);
    useEffect(() => {
        let mountedTime;
        if (active) {
            mountedTime = setTimeout(() => {
                setMounted(true);
            } , 300 * (index + 1))
        }else {
            setMounted(false)
        }
        return () => clearTimeout(mountedTime)
    } , [active])
    return (
        <li className={`${className} text-center ${mounted ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"} transition-all duration-300 font-bold tracking-wide`}>
            <Link href={item.href} className={"text-flexable p-2 cursor-pointer"}>
                {t(item.label)}
            </Link>
        </li>
    )
}

export default MobileNavLink