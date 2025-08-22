import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import React from 'react'
import logo from "../../app/media/images/logos/logo-Sochialyzer.webp"
function SiteLogo() {
  return (
    <Link href="/" className="-m-1.5 p-1.5">
        <Image priority src={logo} width={100} height={100} alt="logo" title="site logo"/>
    </Link>
  )
}

export default SiteLogo