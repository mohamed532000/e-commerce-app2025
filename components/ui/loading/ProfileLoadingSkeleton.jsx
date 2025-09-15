"use client"
import React from 'react';
import Section from '@/components/ui/section/Section';

function ProfileLoadingSkeleton() {
    return (
        <Section className={""} containerClassName={"!mt-0"}>
            <div className='header relative border-b border-slate-300 p-2 flex justify-between items-center'>
                <h1 className='relative animate-pulse bg-background shadow-flexable-shadow min-w-[150px] py-3 rounded-2xl'></h1>
                <div className='relative bg-background shadow-flexable-shadow min-h-[30px] min-w-[30px] rounded-2xl animate-pulse'></div>
            </div>
            <div className='relative flex-flex-col py-5'>
                <div className='relative flex flex-col md:flex-row items-center justify-center md:justify-start gap-x-2.5 p-2'>
                    <div className='relative user-img w-[100px] h-[100px] max-w-[100px] max-h-[100px] rounded-[50%] my-2 overflow-hidden bg-background shadow-flexable-shadow'>
                    </div>
                    <div className='info relatie flex flex-col gap-y-3.5'>
                        <div className=''>
                            <p className='flex items-center gap-x-0.5 justify-center md:justify-between'>
                                <span className='flex animate-pulse items-center gap-x-0.5 rounded-2xl bg-background shadow-flexable-shadow min-w-[100px] py-3'>
                                </span>
                                <span className='flex animate-pulse items-center gap-x-0.5 rounded-2xl bg-background shadow-flexable-shadow min-w-[30px] p-3'>
                                </span>
                            </p>
                        </div>
                        <div className='rounded-2xl animate-pulse bg-background shadow-flexable-shadow min-w-[150px] py-3'></div>
                        <div className='rounded-2xl animate-pulse bg-background shadow-flexable-shadow min-w-[250px] py-5'></div>
                    </div>
                </div>
            </div>
            <div className='bg-background relative w-full min-h-[30px] rounded-2xl shadow-flexable-shadow animate-pulse my-3'></div>
            <div className='bg-background relative w-full min-h-[300px] rounded-2xl shadow-flexable-shadow animate-pulse my-3'></div>
        </Section>
    )
}

export default ProfileLoadingSkeleton