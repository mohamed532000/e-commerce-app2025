import React from 'react'

function FormHeading({title , pargraph}) {
  return (
    <div className='form-heading flex flex-col gap-y-1.5 mb-6'>
        <h2 className='text-center font-bold text-xl md:text-3xl'>{title}</h2>
        <p className='text-center text-sm'>{pargraph}</p>
    </div>
  )
}

export default FormHeading