"use client"
import { useTranslations } from 'next-intl'
import React from 'react'

function RefetchDataBtn({refetchData , className}) {
    const globalT = useTranslations("global")
  return (
    <button className={`mx-1 outline-0 border-0 bg-transparent p-0 cursor-pointer ${className}`} onClick={() => refetchData && refetchData()}>{globalT("Retry")}!</button>
  )
}

export default RefetchDataBtn