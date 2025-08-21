import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function SpinLoading() {
  return (
    <div className={`relative flex justify-center items-center mx-4 text-base md:text-2xl`}>
      <AiOutlineLoading3Quarters className=" animate-spin spin-in transition-all duration-300 opacity-40"/>
    </div>
  )
}

export default SpinLoading