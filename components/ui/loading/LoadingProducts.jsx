import React from 'react'
import LoadingCard from './LoadingCard'

function LoadingProducts() {
  return (
    <>
        {Array.from({length : 6} , (_ , i) => i+1).map((_ , index) => <LoadingCard key={index} className={"col-span-1"}/>)}
    </>
  )
}

export default LoadingProducts