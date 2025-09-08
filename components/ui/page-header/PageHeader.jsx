import Image from 'next/image'
import React from 'react'
import pageHeader from "../../../app/media/images/backgrounds/page-header.webp"
import PageLettersParent from './PageLettersParent'
import { useTranslations } from 'next-intl'

function PageHeader({noTranslateTitle , title , noTranslatePageInfo , pageInfo}) {
  const t = useTranslations("pagesHeader")
  return (
    <div className='relative w-full h-[70vh]'>
        <Image 
        src={pageHeader} 
        alt='page-header' 
        title={title} 
        fill 
        priority
        fetchPriority='high'
        className='absolute inset-0 object-cover' 
        sizes='100vw'
        quality={85}
        />
        <span className='absolute inset-0 w-full h-full bg-slate-900 opacity-35'></span>
        <div className='relative container h-full flex flex-col gap-y-2.5 justify-center items-center'>
          {
            noTranslateTitle
            ?
            <PageLettersParent splitTitle={true} title={noTranslateTitle}/>
            :
            <PageLettersParent title={t(title)}/>
          }
          <p className='text-xs text-stone-50 text-center'>{noTranslatePageInfo ? noTranslatePageInfo : t(pageInfo)}</p>
        </div>
        <span className='absolute bottom-0 w-full h-[10%] md:h-[30%] bg-gradient-to-t from-background to-transparent'></span>
    </div>
  )
}

export default PageHeader