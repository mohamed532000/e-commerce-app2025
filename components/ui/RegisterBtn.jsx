import React from 'react'
import { MainButton } from './MainButton'
import HandleTranslate from '@/helper/HandleTranslate'

function RegisterBtn() {
  return (
    <MainButton href="/auth/register">
        <HandleTranslate page={"home"} word={"Login / Register"} />
    </MainButton>
  )
}

export default RegisterBtn