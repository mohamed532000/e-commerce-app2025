"use client"
import React, { useState } from 'react'
import { Input } from './input'
import {FormField , FormItem , FormMessage , FormLabel , FormControl} from "./form"
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Textarea } from './textarea';
import { useLocale, useTranslations } from 'next-intl';

function CustomFormField({className = "" , labelClassName = "" , label = "" , name = "" , icon , form , placeholder = "" , type = "text" , warningText = ""}) {
  const [showPass , setShowPass] = useState(false);
  const currentLocale = useLocale();
  const globalT = useTranslations("global")
  return (
    <div className={`${className} flex flex-col gap-y-1`}>
        <FormField
            control = {form.control}
            name = {name}
            render = {({field}) => (
              <FormItem className={"relative"}>
                {label !== "" && 
                <FormLabel className={`${labelClassName}`}>
                  {icon && icon}{label}
                </FormLabel>
                }
                <FormControl>
                  {
                    type === "password"
                    ?
                    (
                      <div className='flex items-center relative z-10'>
                        <Input type={`${showPass ? "text" : "password"}`} {...field} placeholder={placeholder}/>
                        {
                          showPass
                          ?
                          <FaRegEyeSlash onClick={() => setShowPass(false)} className={`absolute inset-y-[50%] -translate-y-[50%] ${currentLocale === "ar" ? "left-2" : "right-2"} cursor-pointer opacity-70`}/>
                          :
                          <FaRegEye onClick={() => setShowPass(true)} className={`absolute inset-y-[50%] -translate-y-[50%] ${currentLocale === "ar" ? "left-2" : "right-2"} cursor-pointer opacity-70`}/>
                        }
                      </div>
                    )
                    :
                    type !== "file"
                    ?
                    (
                      type === "textarea"
                      ?
                      <Textarea {...field} placeholder = {placeholder}/>
                      :
                      <Input type={type} {...field} placeholder={placeholder}/>
                    )
                    :
                    (
                      <Input type={"file"} onChnage = {(e) => form.setValue(name , e.target.files[0])}/>
                    )
                  }
                </FormControl>
                {
                  warningText
                  &&
                  <span className='mt-1 block text-sm opacity-70 transition-all duration-300 hover:opacity-100'><span className='text-red-600 font-bold'>{globalT("Note")}</span>: {warningText}</span>
                }
                <FormMessage/>
              </FormItem>
            )}
        />
    </div>
  )
}

export default CustomFormField
