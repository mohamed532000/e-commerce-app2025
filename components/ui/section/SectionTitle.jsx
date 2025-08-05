import React from 'react'

function SectionTitle({title , subText , className}) {
  return (
    <div className='relative flex flex-col justify-center items-center my-11'>
        <h1 className={`section-title text-center text-section-title-color ${className}`}>
            {title?.split("").map((letter , index) => <span key={index} className='transition-all duration-200 opacity-60 hover:opacity-100'>{letter}</span>)}
        </h1>
        <p className='section-subtext'>{subText}</p>
    </div>
  )
}

export default SectionTitle