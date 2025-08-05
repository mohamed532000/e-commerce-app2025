import React from 'react'
import { Button } from './button'

function SubmitButton({children , loading , form , className}) {
  return (
    <Button className={`${className} cursor-pointer`} type="submit" form={form}>
        {
            loading
            ?
            "loading..."
            :
            children
        }
    </Button>
  )
}

export default SubmitButton