"use client"
import CustomFormField from '@/components/ui/CustomFormField';
import { Form } from '@/components/ui/form';
import { MainButton } from '@/components/ui/MainButton';
import SubmitButton from '@/components/ui/SubmitButton';
import { updateUserData, useUpdateUserData } from '@/helper/fucntions/auth/updateUserData';
import { useUserProfileData } from '@/helper/fucntions/userProfile';
import HandleTranslate from '@/helper/HandleTranslate';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

function UserInformationForm({className , profileData}) {
    const globalT = useTranslations("global");
    const {refetch:reftechProfileData} = useUserProfileData();
    const {mutate:updataDataFunc , isPending:updateDataLoading , isSuccess:updateSuccess} = useUpdateUserData(globalT("Updated successfully"));
    const currentLocale = useLocale()
    const form = useForm({
        defaultValues : {
            name : "",
            email : "",
            phone : "",
        }
    })
    useEffect(() => {
        if(profileData) {
            form.setValue("name" , profileData?.user_metadata?.name)
            form.setValue("email" , profileData.email)
            form.setValue("phone" , profileData?.user_metadata?.phone)
        }
    },[profileData])
    const handleUpdateData = async (data) => {
        updataDataFunc({newData : data})
    }
    useEffect(() => {
        if(updateSuccess) {
            reftechProfileData();
        }
    },[updateSuccess])
    if(!profileData) return <h1>Please login and trye</h1>
    return (
        <div className={`relative rounded-2xl border border-slate-300 p-4 ${className}`} dir={currentLocale === "ar" ? "rtl" : "ltr"}>
            <div className='form-title relative flex flex-col mb-3 md:mb-5'>
                <h1 className='font-bold'>User details</h1>
                <p>Update your persolnal information and contact details</p>
            </div>
            <Form {...form}>
                <form
                    id='user-information-form'
                    className='relative grid grid-cols-2 gap-2 w-ful'
                    onSubmit={form.handleSubmit((data) => handleUpdateData(data))}
                >
                    <CustomFormField
                        type='text'
                        name='name'
                        label={globalT('Name')}
                        placeholder='Jouhn Nader'
                        form={form}
                        className='col-span-2 md:col-span-1'
                    />
                    <CustomFormField
                        type='email'
                        name='email'
                        label={globalT('Email')}
                        placeholder='example@gmail.com'
                        form={form}
                        className='col-span-2 md:col-span-1'
                    />
                    <CustomFormField
                        type='text'
                        name='phone'
                        label={globalT('Phone number')}
                        placeholder='01XXXXXXXXX'
                        form={form}
                        className='col-span-2'
                    />
                    <div className='relative col-span-2 my-4 flex items-center gap-x-1.5 pt-3 border-t border-slate-300'>
                        <SubmitButton
                        form={"user-information-form"}
                        >
                            {
                                updateDataLoading
                                ?
                                <><HandleTranslate word={"Loading"} page={"global"} />..</>
                                :
                                <HandleTranslate word={"Save changes"} page={"global"} />
                            }
                        </SubmitButton>
                        <MainButton>
                            <HandleTranslate word={"Cancel"} page={"global"} />
                        </MainButton>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default UserInformationForm