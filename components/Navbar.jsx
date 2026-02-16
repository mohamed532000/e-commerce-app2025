"use client"
import CustomLink from "./ui/Link";
import { BsListNested } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { MobileNavList } from "./ui/MobileNavList";
import { usePathname } from 'next/navigation';
import ToggelerDarkMode from "./ui/ToggelerDarkMode";
import { useLocale, useTranslations } from "next-intl";
import LangToggeler from "./ui/LangToggeler";
import { navList } from "@/i18n/routing";
import SiteLogo from "./ui/SiteLogo";
import NavAuthSide from "./ui/NavAuthSide";
import CategoriesList from "./ui/CategoriesList";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all"
import { useCartStore } from "@/services/client/useCartStore";
gsap.registerPlugin(ScrollTrigger)
export default function Navbar() {
    const {data , addItem , deleteItem , updateItem} = useCartStore()
    const t = useTranslations("home");
    const globalT = useTranslations("global");
    const [isScrolling , setIsScrolling] = useState(false);
    const [activeMobileNav , setActiveMobileNav] = useState(false);
    const navRef = useRef(null)
    const currentLocale = useLocale();
    const pathname = usePathname();
    const removeNavWhen = new Set([
        `/${currentLocale}/${encodeURI(globalT("auth"))}/${encodeURI(t("register"))}` , 
        `/${currentLocale}/${encodeURI(globalT("auth"))}/${encodeURI(t("login"))}`,
        `/${currentLocale}/${encodeURI(globalT("user"))}/${encodeURI(globalT("profile"))}`,
        `/${currentLocale}/${encodeURI(globalT("auth"))}/${encodeURI(globalT("insert-mail-to-reset-password"))}`,
        `/${currentLocale}/${encodeURI(globalT("auth"))}/${encodeURI(globalT("reset-password"))}`
    ]);
    const noNav = removeNavWhen.has(pathname);
    useEffect(() => {
        const trigger = ScrollTrigger.create({
            onUpdate : (self) => {
                const scrollY = self.scroll();
                if(scrollY >= 10) {
                    navRef?.current?.classList.add(
                        "bg-background",
                        "shadow-[2px_3px_10px_#c4c4c4]",
                        "dark:shadow-[2px_3px_10px_black]",)
                }else {
                    navRef?.current?.classList.remove(
                        "bg-background",
                        "shadow-[2px_3px_10px_#c4c4c4]",
                        "dark:shadow-[2px_3px_10px_black]",)
                }
            }
        });
        return () => trigger.kill();
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
            {/* <header ref={navRef} className={`fixed inset-x-0 inset-y-0 h-fit z-40 ${isScrolling ? "bg-background  shadow-[2px_3px_10px_#c4c4c4] dark:shadow-[2px_3px_10px_black]" : ""} transition-all duration-300`}> */}
            <header ref={navRef} className={`navbar fixed inset-x-0 inset-y-0 h-fit z-40 transition-all duration-300`}>
                <nav aria-label="Global" className="flex items-center justify-between container relative">
                    <div className="flex lg:flex-1"
                    >
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