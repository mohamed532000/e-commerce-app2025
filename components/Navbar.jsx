"use client"
import CustomLink from "./ui/Link";
import { BsListNested } from "react-icons/bs";
import { useEffect, useState } from "react";
import { MobileNavList } from "./ui/MobileNavList";
import { usePathname } from 'next/navigation';
import ToggelerDarkMode from "./ui/ToggelerDarkMode";
import { useLocale, useTranslations } from "next-intl";
import LangToggeler from "./ui/LangToggeler";
import { navList } from "@/i18n/routing";
import SiteLogo from "./ui/SiteLogo";
import NavAuthSide from "./ui/NavAuthSide";
import { toast } from "sonner";
import CategoriesList from "./ui/CategoriesList";

export default function Navbar() {
    const t = useTranslations("home");
    const globalT = useTranslations("global");
    const [isScrolling , setIsScrolling] = useState(false);
    const [activeMobileNav , setActiveMobileNav] = useState(false);
    const currentLocale = useLocale();
    const pathname = usePathname();
    const removeNavWhen = new Set([`/${currentLocale}/${encodeURI(globalT("auth"))}/${encodeURI(t("register"))}` , `/${currentLocale}/${encodeURI(globalT("auth"))}/${encodeURI(t("login"))}`]);
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
            <header className={`fixed inset-x-0 inset-y-0 h-fit z-40 ${isScrolling ? "bg-background  shadow-[2px_3px_10px_#c4c4c4] dark:shadow-[2px_3px_10px_black]" : ""} transition-all duration-300`}>
                <nav aria-label="Global" className="flex items-center justify-between container relative">
                    <div className="flex lg:flex-1">
                        <SiteLogo/>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-4">
                        {
                            navList.map((item , index) => <CustomLink isScrolling={isScrolling} pathname={pathname} key={index} href={item.href} label={item.label} className={`relative py-1 px-2`} translationPage={"home"}/>)
                        }
                        <CategoriesList/>
                        <ToggelerDarkMode/>
                        <LangToggeler/>
                        <NavAuthSide/>                        
                    </div>
                    <BsListNested className="cursor-pointer text-4xl light-text lg:hidden" onClick={handleShowMobileNav}/>
                </nav>
                <MobileNavList active={activeMobileNav} navList={navList} closeMobileNav={handleCloseMobileNav}/>
            </header>
        </>
    )
}