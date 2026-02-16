import { useTranslations } from 'next-intl';
import React from 'react'
import { ImFilesEmpty } from "react-icons/im";
function EmptyData({emptyText , className , icon = <ImFilesEmpty className='text-4xl md:text-9xl'/>}) {
    const globalT = useTranslations("global");
  return (
    <div className={`relative flex flex-col justify-center items-center gap-y-4 ${className}`}>
      {icon}
      <p>
        {
          emptyText && emptyText !== undefined
          ?
          globalT(emptyText)
          :
          globalT("No data avilable")
        }
      </p>
    </div>
  )
}

export default EmptyData