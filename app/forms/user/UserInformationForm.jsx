"use client"
import CustomFormField from '@/components/ui/CustomFormField';
import { Form } from '@/components/ui/form';
import MainBtn from '@/components/ui/MainBtn';
import SubmitButton from '@/components/ui/SubmitButton';
import HandleTranslate from '@/helper/HandleTranslate';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateUserGlobalData } from '@/services/auth/useUpdateUserGlobalData';

function UserInformationForm({className , profileData , style}) {
    const globalT = useTranslations("global");
    const {mutate:updataDataFunc , isPending:updateDataLoading} = useUpdateUserGlobalData();
    const currentLocale = useLocale()
    const form = useForm({
        defaultValues : {
            name : "",
            phone : "",
        }
    })
    useEffect(() => {
        if(profileData) {
            form.setValue("name" , profileData?.name);
            form.setValue("phone" , profileData?.phone);
        }
    },[profileData])
    const handleUpdateData = async (data) => {
        updataDataFunc({newData : data , translate : globalT , userId : profileData.id});
    }
    const handleCanselProfileChanges = () => {
        form.setValue("name" , profileData?.name);
        form.setValue("phone" , profileData?.phone);
    }
    if(!profileData) return <h1>Please login and trye</h1>
    return (
        <div style={{...style}} className={`relative rounded-2xl border border-slate-300 p-4 ${className}`} dir={currentLocale === "ar" ? "rtl" : "ltr"}>
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
                        className='col-span-1'
                    />
                    <CustomFormField
                        type='text'
                        name='phone'
                        label={globalT('Phone number')}
                        placeholder='01XXXXXXXXX'
                        form={form}
                        className='col-span-1'
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
                        <MainBtn
                            onClick = {handleCanselProfileChanges}
                        >
                            <HandleTranslate word={"Cancel"} page={"global"} />
                        </MainBtn>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default UserInformationForm