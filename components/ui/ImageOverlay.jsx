import React from 'react'

export const ImageOverlay = ({className}) => {
  return (
    <span className={`overlay absolute inset-0 w-full h-full bg-slate-800 opacity-30 ${className}`}></span>
  )
}