import React from 'react'
import PageHeader from '@/components/ui/page-header/PageHeader'
import Section from '@/components/ui/section/Section'
import { useTranslations } from 'next-intl'
import { CiLocationOn } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { FollowUsIcons } from '@/components/ui/Footer';
import ContactForm from '@/app/forms/contact/ContactForm';
// import MapboxMap from '@/components/ui/maps/Map';

function Contact() {
    const globalT = useTranslations("global")
    const contactPT = useTranslations("contactPage")
    return (
        <>
            <PageHeader title={"contact us"} pageInfo={"contactPageInfo"}/>
            <Section
            title={"Contact our team"}
            subText={"contactSubText"}
            >
                <div className='relative grid grid-cols-3 gap-x-4'>
                    <div className='contact-info relative flex flex-col gap-y-2 p-5 border border-slate-300 dark:border-slate-500 dark:border-slate-5 rounded-2xl col-span-3 md:col-span-1'>
                        <h1 className='font-bold text-2xl'>{contactPT("Contact info")}</h1>
                        <div className='relative py-2'>
                            <h2 className='font-bold mb-2'>{globalT("Location")}</h2>
                            <div className='relative flex items-center gap-x-1.5'>
                                <CiLocationOn/>
                                <p>{globalT("Egypt")} - {globalT("Giza")} - {globalT("El-Haram")}</p>
                            </div>
                        </div>
                        <div className='relative py-2'>
                            <h2 className='font-bold mb-2'>{globalT("Get in touch")}</h2>
                            <div className='relative flex items-center gap-x-1.5'>
                                <FaPhone/>
                                <p>01124485518</p>
                            </div>
                            <div className='relative flex items-center gap-x-1.5'>
                                <MdAlternateEmail/>
                                <p>Sochyalzer@gmail.com</p>
                            </div>
                        </div>
                        <div className='relative py-2'>
                            <h2 className='font-bold mb-2'>{contactPT("Support hours")}</h2>
                            <div className='relative flex items-center gap-x-1.5'>
                                <IoIosTimer/>
                                <p>{globalT("Monday")} - {globalT("Friday")}: 9:00 AM - 5:00 PM</p>
                            </div>
                        </div>
                        <div className='relative py-2'>
                            <h2 className='font-bold mb-2'>{globalT("Follow us")}</h2>
                            <FollowUsIcons/>
                        </div>
                    </div>
                    <div className='contact-form col-span-3 md:col-span-2'>
                        <ContactForm/>
                    </div>
                </div>
            </Section>
        </>
    )
}

export default Contact