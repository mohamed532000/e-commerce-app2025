import CustomFormField from '@/components/ui/CustomFormField';
import { Form } from '@/components/ui/form'
import { useTranslations } from 'next-intl';
import React from 'react'
import { useForm } from 'react-hook-form'
import { CiSearch } from "react-icons/ci";

function NavSearchForm() {
    const form = useForm();
    const globalT = useTranslations("global")
    return (
        <div className='nav-search'>
            <Form {...form}>
                <form
                    id = "nav-search-form"
                    onSubmit={form.handleSubmit((data) => console.log(data))}
                >
                    <CustomFormField
                        // labelClassName={labelClassNameContent} 
                        className=''
                        form={form} 
                        type='search'
                        // label='Username' 
                        name='name' 
                        icon={<CiSearch/>}
                        placeholder={`${globalT('What do you want')} !`}
                    />
                </form>
            </Form>
        </div>
    )
}

export default NavSearchForm