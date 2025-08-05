"use client"
import CustomLink from "./ui/Link";
import { BsListNested } from "react-icons/bs";
import dynamic from "next/dynamic";
const Client = dynamic(() => import("./ui/Client") , {ssr : false})
// import Link from "next/link";
import {Link} from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { MobileNavList } from "./ui/MobileNavList";
import { usePathname } from 'next/navigation';
import { MainButton } from "./ui/MainButton";
import ToggelerDarkMode from "./ui/ToggelerDarkMode";
import { useLocale, useTranslations } from "next-intl";
import LangToggeler from "./ui/LangToggeler";
import HandleTranslate from "@/helper/HandleTranslate";
import { navList } from "@/i18n/routing";
import SiteLogo from "./ui/SiteLogo";

export default function Navbar() {
    const t = useTranslations("home");
    const [isScrolling , setIsScrolling] = useState(false);
    const [activeMobileNav , setActiveMobileNav] = useState(false);
    const currentLocale = useLocale();
    const pathname = usePathname();
    const removeNavWhen = new Set([`/${currentLocale}/${encodeURI(t("register"))}` , `/${currentLocale}/${encodeURI(t("login"))}`]);
    const noNav = removeNavWhen.has(pathname);t("login");
    useEffect(() => {
        window.onscroll = () => {
            window.scrollY >= 10 ? setIsScrolling(true) : setIsScrolling(false)
        }
    },[])
    const handleShowMobileNav = () => {
        setActiveMobileNav(true)
    }
    const handleCloseMobileNav = () => {
        setActiveMobileNav(false)
    }
    useEffect(() => {
        handleCloseMobileNav()
    },[pathname])
    
    if (noNav) return null
    return (
        <>
            <header className={`fixed inset-x-0 top-0 z-40 ${isScrolling ? "bg-background  shadow-[2px_3px_10px_#c4c4c4] dark:shadow-[2px_3px_10px_black]" : ""} transition-all duration-300`}>
                <nav aria-label="Global" className="flex items-center justify-between container relative">
                    <div className="flex lg:flex-1">
                        <SiteLogo/>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-4">
                        {
                            navList.map((item , index) => <CustomLink isScrolling={isScrolling} pathname={pathname} key={index} href={item.href} label={item.label} className={`relative py-1 px-2`} translationPage={"home"}/>)
                        }
                        <MainButton href="/register">
                            <HandleTranslate page={"home"} word={"Login / Register"} />
                        </MainButton>
                        <ToggelerDarkMode/>
                        <LangToggeler/>
                    </div>
                    <BsListNested className="cursor-pointer text-4xl light-text lg:hidden" onClick={handleShowMobileNav}/>
                </nav>
                <MobileNavList active={activeMobileNav} navList={navList} closeMobileNav={handleCloseMobileNav}/>
            </header>
        </>
    )
}