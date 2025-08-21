import { useTranslations } from 'next-intl';
import React from 'react'
import { ImFilesEmpty } from "react-icons/im";
function EmptyData() {
    const globalT = useTranslations("global")
  return (
    <div className='relative flex flex-col justify-center items-center gap-y-4'>
      <ImFilesEmpty className='text-4xl md:text-9xl' />
      <p>{globalT("No data avilable")}</p>
    </div>
  )
}

export default EmptyData