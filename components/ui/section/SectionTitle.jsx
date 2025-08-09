import { useLocale } from 'next-intl'
import React from 'react'

function SectionTitle({title , subText , className}) {
  const currentLocal = useLocale();
  return (
    <div className='relative flex flex-col justify-center items-center my-11 max-w-[50vw] mx-auto'>
        {
          currentLocal !== "ar"
          ?
          <h1 className={`section-title text-center text-section-title-color  ${className}`}>
              {title?.split("").map((letter , index) => <span key={index} className='transition-all duration-200 opacity-60 hover:opacity-100 text-[clamp(2rem,5vw,5rem)]'>{letter.toUpperCase()}</span>)}
          </h1>
          :
          <h1 className={`section-title text-center text-section-title-color  ${className}`}>
              {title}
          </h1>
        }
        <p className='text-center text-slate-800 dark:text-stone-50 md:text-sm mt-2'>{subText}</p>
    </div>
  )
}

export default SectionTitle