import React from 'react'
import RefetchDataBtn from '../RefetchDataBtn'
import { MdOutlineSmsFailed } from "react-icons/md";
import { useTranslations } from 'next-intl';

function FaildLoadingData({refetchData}) {
  const globalT = useTranslations("global")
  return (
    <div className='relative flex flex-col justify-center items-center gap-y-2'>
      <MdOutlineSmsFailed className='text-4xl md:text-9xl' />
      <p>{globalT("Faild loading data")} <RefetchDataBtn refetchData={refetchData}/></p>
    </div>
  )
}

export default FaildLoadingData