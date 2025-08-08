import React from 'react'

function SectionTitle({title , subText , className}) {
  return (
    <div className='relative flex flex-col justify-center items-center my-11'>
        <h1 className={`section-title text-center text-section-title-color  ${className}`}>
            {title?.split("").map((letter , index) => <span key={index} className='transition-all duration-200 opacity-60 hover:opacity-100 text-[clamp(2rem,5vw,5rem)]'>{letter}</span>)}
        </h1>
        <p className=' text-slate-800 dark:text-stone-50'>{subText}</p>
    </div>
  )
}

export default SectionTitle