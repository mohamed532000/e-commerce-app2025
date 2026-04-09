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
import { useSignInAnonimously } from "@/services/auth/useSignInAnonymously";
import NavSearchForm from "@/app/forms/nav-search/NavSearchForm";
import { useAppSettings } from "@/services/settings/useAppSettings";
import { Link } from "@/i18n/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger)
export default function Navbar() {
    const {mutate:signInAsGuest} = useSignInAnonimously();
    
    const t = useTranslations("home");
    const globalT = useTranslations("global");
    const [activeMobileNav , setActiveMobileNav] = useState(false);
    const {data:settingsData} = useAppSettings()
    const navRef = useRef(null);
    const navLinksParentRef = useRef(null)
    const firstNavRef = useRef(null)
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
                        "dark:shadow-[2px_3px_10px_black]",);
                    navLinksParentRef.current.classList.remove("border-b");
                    firstNavRef.current.classList.remove("h-[70px]");
                    firstNavRef.current.classList.add("h-0");
                }else {
                    navRef?.current?.classList.remove(
                        "bg-background",
                        "shadow-[2px_3px_10px_#c4c4c4]",
                        "dark:shadow-[2px_3px_10px_black]",);
                    navLinksParentRef.current.classList.add("border-b");
                    firstNavRef.current.classList.remove("h-0");
                    firstNavRef.current.classList.add("h-[70px]");
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
                <div className="relative w-full bg-gradient-to-r from-[#3c7165] to-[#031637] overflow-hidden transition-all duration-300" ref={firstNavRef}>
                    <div className="container flex items-center justify-between py-3.5">
                        <div className="flex gap-x-2.5">
                            <NavAuthSide/>
                            <LangToggeler/>
                            <ToggelerDarkMode/>
                        </div>
                        <div className="relative flex items-center gap-x-2.5">
                            {
                                settingsData
                                &&
                                <>
                                    {
                                    settingsData?.contact_numbers?.contact_numbers?.map((number) => {
                                        if (number.is_primary == true) return (
                                            <Link key={number.number} target="_blank" href={`https://wa.me/${number.number}`} className="relative flex items-center gap-x-1">
                                                <FaWhatsapp/>
                                                <span>
                                                    {number.number}
                                                </span>
                                            </Link>
                                        )
                                    })
                                    }
                                    <Link href={`mailto:${settingsData.contact_email}`} className="relative flex items-center gap-x-1">
                                        <MdOutlineAlternateEmail/>
                                        <span>
                                            {settingsData.contact_email}
                                        </span>
                                    </Link>
                                </>
                            }
                            <NavSearchForm/>
                        </div>
                    </div>
                </div>
                <nav aria-label="Global" className="flex items-center justify-between container relative">
                    <div className="flex lg:flex-1"
                    >
                        <SiteLogo/>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-4 border-b" ref={navLinksParentRef}>
                        {
                            navList.map((item , index) => <CustomLink  pathname={pathname} key={index} href={item.href} label={item.label} className={`relative py-1 px-2`} translationPage={"home"}/>)
                        }
                        <CategoriesList/>
                        {/* <button
                        onClick={() => {
                            signInAsGuest()
                        }}
                        >Make Me a guest</button>*/}
                    </div>
                    <BsListNested className="cursor-pointer text-4xl light-text lg:hidden" onClick={handleShowMobileNav}/>
                </nav>
                <MobileNavList active={activeMobileNav} navList={navList} closeMobileNav={handleCloseMobileNav}/>
            </header>
        </>
    )
}
