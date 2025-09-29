import React from 'react'
import { MainLink } from './MainLink'
import HandleTranslate from '@/helper/HandleTranslate'

function RegisterBtn() {
  return (
    <MainLink href="/auth/register">
        <HandleTranslate page={"home"} word={"Login / Register"} />
    </MainLink>
  )
}

export default RegisterBtn