import React from 'react'
import { Button } from './button'

function MainBtn({children , type = "button" , className , onClick}) {
  return (
    <Button type={type} className={`bg-primary cursor-pointer ${className}`} onClick={onClick}>{children}</Button>
  )
}

export default MainBtn
