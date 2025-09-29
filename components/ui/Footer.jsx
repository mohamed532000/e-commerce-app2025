import NewsLetterForm from '@/app/forms/newsletter/NewsLetterForm';
import React from 'react'
import SiteLogo from './SiteLogo';
import { Link } from '@/i18n/navigation';
import { navList } from '@/i18n/routing';
import { CiLocationOn } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { categoriesData } from '@/services/categoriesData';
import { getTranslations } from 'next-intl/server';


export const FollowUsIcons = () => {
    return (
        <div className='icons relative flex gap-x-1.5'>
            <Link href={"https://www.facebook.com"} aria-label='facebook' className='opacity-70 transition-all duration-300 hover:opacity-100'>
                <FaFacebook className='text-2xl'/>
            </Link>
            <Link href={"https://www.instagram.com"} aria-label='instagram'  className='opacity-70 transition-all duration-300 hover:opacity-100'>
                <FaInstagram className='text-2xl'/>
            </Link>
        </div>
    )
}

const FooterColumn = async ({children , title , className , locale}) => {
    const globalT = await getTranslations({ locale, namespace: "global" })
    return (
        <div className={`relative col-span-4 md:col-span-2 lg:col-span-1 py-2 ${className}`}>
            {title && <h2 className='relative mb-2 font-bold'>{globalT(title)}</h2>}
            <div className='relative flex flex-col gap-y-1.5'>
                {children}
            </div>
        </div>
    )
}
async function Footer({locale}) {
    const currentYear = new Date().getFullYear();
    const {data:categories} = await categoriesData(locale);
    const [globalT , footerT , homePT] = await Promise.all([
        getTranslations({ locale, namespace: "global" }),
        getTranslations({ locale, namespace: "footer" }),
        getTranslations({ locale, namespace: "home" })
    ])
    return (
        <footer className='relative mt-[100px]'>
            <div className='container border-b border-slate-400 dark:border-slate-200 flex flex-col md:flex-row md:justify-between items-center py-5'>
                <div className='news-letter-content relatie flex flex-col justify-center md:justify-center items-center md:items-start gap-y-1.5'>
                    <h1 className='font-bold text-2xl'>{footerT("Join Our Newsletter")}</h1>
                    <p>{footerT("newsletter subtext")}</p>
                </div>
                <NewsLetterForm/>
            </div>
            <div className='container relative grid grid-cols-4 py-5'>
                <FooterColumn locale={locale}>
                    <div className="flex lg:flex-1">
                        <SiteLogo/>
                    </div>
                    <p className='text-sm'>{footerT("brand subtext")}</p>
                </FooterColumn>
                <FooterColumn
                title={"Quick links"}
                locale={locale}
                >
                    {
                        navList?.length >= 1
                        ?
                        navList.map((item , index) => <Link key={index} href={item.href} label={item.label} className='opacity-70 transition-all duration-300 hover:opacity-100'>{homePT(item.label)}</Link>)
                        :
                        <span>Will Add Data Soon.</span>
                    }
                </FooterColumn>
                <FooterColumn
                title={"Categories"}
                locale={locale}
                >
                    {
                        categories?.length >= 1
                        ?
                        categories?.slice(0,6)?.map((item , index) => <Link href={`/shop?category=${item.id}`} key={index} className='opacity-70 transition-all duration-300 hover:opacity-100'>{item.title}</Link>)
                        :
                        <span>Will Add Data Soon.</span>
                    }
                </FooterColumn>
                <FooterColumn
                title={"contact us"}
                locale={locale}
                >
                    <Link href={"#"} className='relative flex items-center gap-x-1.5 opacity-70 transition-all duration-300 hover:opacity-100'>
                        <CiLocationOn/>
                        <span>{globalT("Egypt")} - {globalT("Giza")} - {globalT("El-Haram")}</span>
                    </Link>
                    <Link href={"#"} className='relative flex items-center gap-x-1.5 opacity-70 transition-all duration-300 hover:opacity-100'>
                        <FaPhone/>
                        <span>01124485518</span>
                    </Link>
                    <Link href={`mailto:Sochialyzer@gmail.com`} className='relative flex items-center gap-x-1.5 opacity-70 transition-all duration-300 hover:opacity-100'>
                        <MdAlternateEmail/>
                        <span>Sochialyzer@gmail.com</span>
                    </Link>
                    <div className='fowllow-us relative flex flex-col gap-y-1.5 pt-2 mt-2'>
                        <h2 className='font-bold'>{globalT("Follow us")}</h2>
                        <FollowUsIcons/>
                    </div>
                </FooterColumn>
            </div>
            <div className='container border-t border-slate-400 dark:border-slate-200 flex justify-center items-center py-5'>
                <p>© {currentYear} <span className='text-active-text-primary'>Sochyalizer</span>. {globalT("All rights reserved")}.</p>
            </div>
        </footer>
    )
}

export default Footer