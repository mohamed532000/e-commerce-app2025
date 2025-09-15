"use client"
import React, { useEffect } from 'react';
import Section from '@/components/ui/section/Section';
import Image from 'next/image';
import { HiOutlineMail } from "react-icons/hi";
import ProfileTabs from '@/components/ui/user-profile/ProfileTabs';
import ProfileActions, { EditPassAndImageBtns } from '@/components/ui/user-profile/ProfileActions';
import FullScreenLoading from '@/components/ui/loading/FullScreenLoading';
import { UserAuth } from '@/context/AuthProvider';
import CopyIcon from '@/components/ui/CopyIcon';
import HandleTranslate from '@/helper/HandleTranslate';
import ProfileLoadingSkeleton from '@/components/ui/loading/ProfileLoadingSkeleton';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useRedirectIfNotAuth } from '@/helper/fucntions/auth/useRedirectIfNotAuth';
function ProfileContent() {
    const locale = useLocale()
    const router = useRouter()
    // const {session , profile , profileLoading} = UserAuth()
    const {session , profile} = UserAuth()
    // useEffect(() => {
    //     // !session && !profileLoading && useRedirectIfNotAuth(router , locale)
    //     !session && useRedirectIfNotAuth(router , locale)
    // } , [session])
    useEffect(() => {
        console.log(profile)
    },[profile])
    // if(profileLoading) return <FullScreenLoading/>
    if(!session) return <ProfileLoadingSkeleton/>
    return (
        <Section className={""} containerClassName={"!mt-0"}>
        <div className='header relative border-b border-slate-300 p-2 flex justify-between items-center'>
            <h1 className=''>Profile information</h1>
            <ProfileActions/>
        </div>
        <div className='relative flex-flex-col py-5'>
            <div className='relative flex flex-col md:flex-row items-center justify-center md:justify-start gap-x-2.5 p-2'>
                <div className='relative user-img w-[100px] h-[100px] max-w-[100px] max-h-[100px] rounded-[50%] overflow-hidden'>
                <Image 
                    src={profile?.user_metadata?.image_url ? profile?.user_metadata?.image_url : "https://i.pinimg.com/1200x/d9/e1/4c/d9e14c251d468cc476c0ec33f969b5da.jpg"} 
                    alt='image'
                    title={profile?.user_metadata?.name}
                    fill
                />
                </div>
                <div className='info relatie flex flex-col gap-y-3.5'>
                    <div className=''>
                        <h1 className='font-bold text-center md:text-start'>{profile?.user_metadata?.name}</h1>
                        <p className='flex items-center gap-x-0.5 justify-center md:justify-between'>
                            <span className='flex items-center gap-x-0.5'>
                                <HiOutlineMail className='translate-y-0.5'/>
                                {profile?.email}
                            </span>
                            <CopyIcon className={'translate-y-0.5 cursor-pointer opacity-70 hover:opacity-100 transition-all duration-300'} text={profile?.email} successText={<HandleTranslate word={"Email copied"} page={"global"}/>}/>
                        </p>
                    </div>
                    <EditPassAndImageBtns/>
                </div>
            </div>
        </div>
        <ProfileTabs/>
    </Section>
    )
}

export default ProfileContent