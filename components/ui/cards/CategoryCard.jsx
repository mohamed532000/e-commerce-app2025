import Image from 'next/image'
import React from 'react'
import defaultSiteImage from "../../../app/media/images/logos/logo-Sochialyzer.webp"
import HandleTranslate from '@/helper/HandleTranslate'
import { Link } from '@/i18n/navigation'
function CategoryCard({item}) {
  return (
    <Link href={`/`} className='hover:-translate-y-1.5 transition-all duration-300 relative group'>
        <div className='relative flex flex-col justify-center items-center gap-y-1.5 px-2 md:px-0 py-3 rounded-3xl dark:shadow-accent-foreground bg-white dark:bg-background shadow-flexable-shadow w-[150px] md:min-w-[200px]'>
            <Image 
            src={item?.image_url ? item.image_url : defaultSiteImage} 
            alt='image' 
            title={item?.name}
            className='rounded-3xl group-hover:blur-md transition-all duration-300'
            />
            <div className='content md:absolute w-full flex flex-col justify-center items-center gap-y-1.5'>
                <h1 className='text-center transition-all duration-300 md:-translate-y-2.5 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100'>{item.name}</h1>
                <p className='text-center transition-all duration-300 md:translate-y-2.5 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100'><HandleTranslate word={"products"} page={"global"}/> ({item.products_count})</p>
            </div>
        </div>
    </Link>
  )
}

export default CategoryCard

// translate-y-2.5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
// translate-y-2.5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100