"use client"
import React, { useState } from 'react'
import { Input } from './input'
import {FormField , FormItem , FormMessage , FormLabel , FormControl} from "./form"
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

function CustomFormField({className = "" , labelClassName = "" , label = "" , name = "" , icon , form , placeholder = "" , type = "text"}) {
  const [showPass , setShowPass] = useState(false);
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
                          <FaRegEyeSlash onClick={() => setShowPass(false)} className='absolute top-[50%] -translate-y-[50%] right-2 cursor-pointer opacity-70'/>
                          :
                          <FaRegEye onClick={() => setShowPass(true)} className='absolute top-[50%] -translate-y-[50%] right-2 cursor-pointer opacity-70'/>
                        }
                      </div>
                    )
                    :
                    type !== "file"
                    ?
                    (
                      <Input type={type} {...field} placeholder={placeholder}/>
                    )
                    :
                    (
                      <Input type={"file"} onChnage = {(e) => form.setValue(name , e.target.files[0])}/>
                    )
                  }
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
        />
    </div>
  )
}

export default CustomFormField