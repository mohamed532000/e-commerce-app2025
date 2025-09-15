import React from 'react'
import { PuffLoader } from 'react-spinners'
function FullScreenLoading() {
  return (
    <div className='fixed inset-0 w-full h-screen flex justify-center items-center bg-background z-40'>
      <PuffLoader color='' className='text-accent-foreground'/>
    </div>
  )
}

export default FullScreenLoading