"use client";
import { useLocale } from 'next-intl';
import React, { useEffect, useState } from 'react'

function PageLettersParent({title , splitTitle}) {
    const [scrollY , setScrollY] = useState(0);
    const currentLocal = useLocale();
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if(!ticking) {
                window.requestAnimationFrame(() => {
                    setScrollY(window.scrollY);
                    ticking = false;
                })
                ticking = true;
            }
        }
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    },[])
    return (
        <div className={`relative flex flex-wrap justify-center items-center gap-x-14`}>
            {
                currentLocal !== "ar"
                ?
                (
                    splitTitle === true
                    ?
                    <h1 className='font-bold text-[clamp(1.5rem,5vw,5rem)]'>{title}</h1>
                    :
                    title.split("").map((letter , index) => (
                        <span key={index} className={`font-bold text-[clamp(1.5rem,5vw,5rem)] text-stone-50 transition-all duration-500`}
                        style={{
                            transform: scrollY >= 1 ? `translateY(-${scrollY + index * 5}px)` : "none",
                        }}
                        >{letter.toUpperCase()}</span>
                    ))
                )
                :
                <h1 className='font-bold text-[clamp(1.5rem,5vw,5rem)]'>{title}</h1>
            }
        </div>
    )
}

export default PageLettersParent