"use client"
import CustomFormField from '@/components/ui/CustomFormField';
import { Form } from '@/components/ui/form';
import MainBtn from '@/components/ui/MainBtn';
import SubmitButton from '@/components/ui/SubmitButton';
import HandleTranslate from '@/helper/HandleTranslate';
import { useUpdateUserAuthData } from '@/services/auth/useUpdateUserAuthData';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

function SecurityForm({profileData , className , style}) {
    const globalT = useTranslations("global")
    const currentLocale = useLocale();
    const {mutate:updataDataFunc , isPending:updateLoading} = useUpdateUserAuthData();
    const form = useForm({
        defaultValues : {
            email : "",
            password : ""
        }
    })
    useEffect(() => {
        if(profileData) {
            form.setValue("email" , profileData.email);
        }
    },[profileData])
    const handleResetData = () => {
        if(profileData) {
            form.setValue("email" , profileData.email);
        }
    }
    const handleUpdateSecurityData = (data) => {
        updataDataFunc({userId : profileData.id , newData : data , translate : globalT})
    }
  return (
    <div style={{...style}} className={`relative rounded-2xl border border-slate-300 p-4 ${className}`} dir={currentLocale === "ar" ? "rtl" : "ltr"}>
        <div className='form-title relative flex flex-col mb-3 md:mb-5'>
            <h1 className='font-bold'>Security</h1>
            <p>Update your persolnal Security Data</p>
            <Form {...form}>
                <form
                    id='security-form'
                    onSubmit={form.handleSubmit((data) => handleUpdateSecurityData(data))}
                    className='relative grid grid-cols-2 gap-2 w-ful'
                >
                    <CustomFormField
                        type='email'
                        name='email'
                        label={globalT('Email')}
                        placeholder='example@gmail.com'
                        form={form}
                        className='col-span-2 md:col-span-1'
                        warningText={globalT("Changing your email will require confirmation")}
                    />
                    <CustomFormField
                        type='password'
                        name='password'
                        label={globalT('Password')}
                        placeholder='* * * * * * * *'
                        form={form}
                        className='col-span-2 md:col-span-1'
                    />
                    <div className='relative col-span-2 my-4 flex items-center gap-x-1.5 pt-3 border-t border-slate-300'>
                        <SubmitButton
                        form={"security-form"}
                        >
                            {
                                updateLoading
                                ?
                                <><HandleTranslate word={"Loading"} page={"global"} />..</>
                                :
                                <HandleTranslate word={"Save changes"} page={"global"} />
                            }
                        </SubmitButton>
                        <MainBtn
                            onClick = {handleResetData}
                        >
                            <HandleTranslate word={"Cancel"} page={"global"} />
                        </MainBtn>
                    </div>
                </form>
            </Form>
        </div>
    </div>
  )
}

export default SecurityForm