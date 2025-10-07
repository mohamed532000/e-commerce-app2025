"use client"
import React from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

function MobileNavLink({ item , className }) {
    const t = useTranslations("home");
    return (
        <li className={`${className} text-center font-bold tracking-wide italic text-2xl`}>
            <Link href={item.href} className={"p-2 cursor-pointer"}>
                {t(item.label)}
            </Link>
        </li>
    )
}

export default MobileNavLink