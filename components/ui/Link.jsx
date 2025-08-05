"use client"
import HandleTranslate from '@/helper/HandleTranslate';
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
function CustomLink({label , href , className , pathname , translationPage , isScrolling}) {
  const [active , setActive] = useState(false);
  const [mounted , setMounted] = useState(false);
  const currentLocale = useLocale();
  const t = useTranslations("home");
  const {theme} = useTheme();
  useEffect(() => {
    const customHref = href == "/" ? "/home" : href;
    const encodeingHref = `/${currentLocale}/${encodeURIComponent(t(customHref.replace(/\//ig , "")))}`;
    pathname == encodeingHref ? setActive(true) : setActive(false);
  } , [pathname , currentLocale])
  useEffect(() => setMounted(true) , [])
  return (
    <Link href={href} className={`${className} tracking-wide ${active ? `text-active-text-primary after:w-full` : `after:w-0 ${mounted &&  theme == "dark" && !isScrolling ? "text-white" : ""}`} after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-active-text-primary after:transition-all after:duration-300`}>
      <HandleTranslate page={translationPage} word={label}/>
    </Link>
  )
}

export default CustomLink;