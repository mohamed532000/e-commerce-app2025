import React from 'react'
import { Button } from './button'
import { Link } from '@/i18n/navigation'

export const MainLink = ({children , href = "" , className = ""}) => {
  return (
    <Link href={href}>
        <Button className={`bg-primary cursor-pointer ${className}`}>{children}</Button>
    </Link>
  )
}