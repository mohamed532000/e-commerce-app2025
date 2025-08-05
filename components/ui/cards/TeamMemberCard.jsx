import Image from 'next/image'
import React from 'react'
import { MdAlternateEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import Link from 'next/link';
function TeamMemberCard({item , className}) {
  return (
    <div className={`${className} relative w-full max-w-[250px] rounded-3xl bg-background flex flex-col justify-center gap-y-1.5 py-3 px-2 shadow-flexable-shadow group transition-all duration-300 hover:-translate-y-1.5`}>
        <div className='image relative flex justify-center items-center'>
            <div className='relative w-[120px] h-[120px] rounded-[50%] overflow-hidden'>
                <Image
                    src={item.image_url}
                    alt={item.name}
                    title={item.name}
                    fill
                    sizes="120px"
                    className="object-cover group-hover:scale-120 transition duration-300"
                />
            </div>
        </div>
        <h2 className='font-bold text-center'>{item.name}</h2>
        <div className='contact relative'>
            <Link href={`mailto:${item.email}`} className='flex justify-center items-center gap-x-1.5 opacity-70 group-hover:opacity-100 transition-all duration-300'>
                <MdAlternateEmail/>
                <span title={item.email}>{item.email}</span>
            </Link>
            <Link href={`https://wa.me/${item.phone}`} className='flex justify-center items-center gap-x-1.5 opacity-70 group-hover:opacity-100 transition-all duration-300'>
                <FaWhatsapp/>
                <span>{item.phone}</span>
            </Link>
        </div>
        <p className='relative py-2 border-t border-slate-300 dark:border-slate-100 opacity-70 text-sm text-center break-words line-clamp-2 group-hover:opacity-100 transition-all duration-300'>{item.info}</p>
    </div>
  )
}

export default TeamMemberCard