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
import MapboxMap from '@/components/ui/maps/Map';

function Contact() {
    const t = useTranslations("contactPage")
    return (
        <>
            <PageHeader title={"CONTACT US"} pageInfo={"Here you can contact us and send messages."}/>
            <Section>
                <div className=''>
                    <MapboxMap/>
                </div>
            </Section>
            <Section
            title={"Contact Our Team"}
            subText={"We're here to help! Whether you have questions about our products, need support, or just want to give feedback, please reach out to us."}
            >
                <div className='relative grid grid-cols-3 gap-x-4'>
                    <div className='contact-info relative flex flex-col gap-y-2 p-5 border border-slate-300 dark:border-slate-500 dark:border-slate-5 rounded-2xl col-span-3 md:col-span-1'>
                        <h1 className='font-bold text-2xl'>Contact Info</h1>
                        <div className='relative py-2'>
                            <h2 className='font-bold mb-2'>Location</h2>
                            <div className='relative flex items-center gap-x-1.5'>
                                <CiLocationOn/>
                                <p>Egypt - Giza - Haram</p>
                            </div>
                        </div>
                        <div className='relative py-2'>
                            <h2 className='font-bold mb-2'>Get in touch</h2>
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
                            <h2 className='font-bold mb-2'>Support hours</h2>
                            <div className='relative flex items-center gap-x-1.5'>
                                <IoIosTimer/>
                                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                            </div>
                        </div>
                        <div className='relative py-2'>
                            <h2 className='font-bold mb-2'>Follow us</h2>
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