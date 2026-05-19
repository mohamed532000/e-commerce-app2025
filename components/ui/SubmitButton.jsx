import React from 'react'
import { Button } from './button'
import HandleTranslate from '@/helper/HandleTranslate'

function SubmitButton({children , loading , form , className}) {
  return (
    <Button className={`${className} cursor-pointer`} type="submit" form={form}>
        {
            loading
            ?
            <><HandleTranslate word={"Loading"} page={"global"}/>...</>
            :
            children || <HandleTranslate word={"Submit"} page={"global"}/>
        }
    </Button>
  )
}

export default SubmitButton