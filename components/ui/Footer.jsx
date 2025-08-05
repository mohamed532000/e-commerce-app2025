
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

const FooterColumn = ({children , title , className}) => {
    return (
        <div className={`relative col-span-4 md:col-span-2 lg:col-span-1 py-2 ${className}`}>
            {title && <h2 className='relative mb-2 font-bold'>{title}</h2>}
            <div className='relative flex flex-col gap-y-1.5'>
                {children}
            </div>
        </div>
    )
}
function Footer() {
    const footerSubText = "Your one-stop shop for everything you need.Quality products, unbeatable prices."
    const categories = [
        {id : 1 , name : "Electronics"},
        {id : 1 , name : "Clothes"},
        {id : 1 , name : "Sports & Outdoors"},
        {id : 1 , name : "Books"},
        {id : 1 , name : "Home & Garden"},
    ]
    const currentYear = new Date().getFullYear()
  return (
    <footer className='relative mt-[100px]'>
        <div className='container border-b border-slate-400 dark:border-slate-200 flex flex-col md:flex-row md:justify-between items-center py-5'>
            <div className='news-letter-content relatie flex flex-col justify-center md:justify-center items-center md:items-start gap-y-1.5'>
                <h1 className='font-bold text-2xl'>Join Our Newsletter</h1>
                <p>Stay up-to-date with our latest products and promotions.</p>
            </div>
            <NewsLetterForm/>
        </div>
        <div className='container relative grid grid-cols-4 py-5'>
            <FooterColumn>
                <div className="flex lg:flex-1">
                    <SiteLogo/>
                </div>
                <p className='text-sm'>{footerSubText}</p>
            </FooterColumn>
            <FooterColumn
            title={"Quick Links"}
            >
                {
                    navList?.length >= 1
                    ?
                    navList.map((item , index) => <Link key={index} href={item.href} label={item.label} className='opacity-70 transition-all duration-300 hover:opacity-100'>{item.label}</Link>)
                    :
                    <span>Will Add Data Soon.</span>
                }
            </FooterColumn>
            <FooterColumn
            title={"Categories"}
            >
                {
                    categories?.length >= 1
                    ?
                    categories.map((item , index) => <Link href={`/`} key={index} className='opacity-70 transition-all duration-300 hover:opacity-100'>{item.name}</Link>)
                    :
                    <span>Will Add Data Soon.</span>
                }
            </FooterColumn>
            <FooterColumn
            title={"Contact Us"}
            >
                <Link href={"#"} className='relative flex items-center gap-x-1.5 opacity-70 transition-all duration-300 hover:opacity-100'>
                    <CiLocationOn/>
                    <span>Egypt - Giza - Haram</span>
                </Link>
                <Link href={"#"} className='relative flex items-center gap-x-1.5 opacity-70 transition-all duration-300 hover:opacity-100'>
                    <FaPhone/>
                    <span>01124485518</span>
                </Link>
                <Link href={"#"} className='relative flex items-center gap-x-1.5 opacity-70 transition-all duration-300 hover:opacity-100'>
                    <MdAlternateEmail/>
                    <span>Sochialyzer@gmail.com</span>
                </Link>
                <div className='fowllow-us relative flex flex-col gap-y-1.5 pt-2 mt-2'>
                    <h2 className='font-bold'>Follow Us</h2>
                    <div className='icons relative flex gap-x-1.5'>
                        <Link href={"https://www.facebook.com"} className='opacity-70 transition-all duration-300 hover:opacity-100'>
                            <FaFacebook className='text-2xl'/>
                        </Link>
                        <Link href={"https://www.facebook.com"} className='opacity-70 transition-all duration-300 hover:opacity-100'>
                            <FaInstagram className='text-2xl'/>
                        </Link>
                    </div>
                </div>
            </FooterColumn>
        </div>
        <div className='container border-t border-slate-400 dark:border-slate-200 flex justify-center items-center py-5'>
            <p>© {currentYear} <span className='text-active-text-primary'>Sochyalizer</span>. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer