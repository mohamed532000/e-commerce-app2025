import React from 'react'

function FormHeading({title , pargraph , titleClassName , pargraphClassName}) {
  return (
    <div className='form-heading flex flex-col gap-y-1.5 mb-6'>
        <h2 className={`text-center font-bold text-xl md:text-3xl ${titleClassName}`}>{title}</h2>
        <p className={`text-center text-sm ${pargraphClassName}`}>{pargraph}</p>
    </div>
  )
}

export default FormHeading