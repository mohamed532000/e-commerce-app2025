"use client"
import React from 'react';
import { useLocale } from 'next-intl';


import SplitText from "@/components/ui/split-text/SplitText"
function SectionTitle({title , subText}) {
  const currentLocal = useLocale();
  return (
    <div className='relative flex flex-col justify-center items-center my-11 max-w-[50vw] mx-auto'>
      <div className={`relative w-fit after:absolute after:w-[50px] after:h-[2px] after:bg-active-text-primary after:inset-y-[100%] after:rounded-3xl after:transition-all after:duration-500 ${currentLocal !== "ar" ? "after:inset-x-[50%] after:-translate-x-[50%]" : "after:inset-x-[50%] after:translate-x-[50%]"} after:mb-2`}>
        <SplitText
        text={title}
        className="text-section-title-color transition-all duration-300 font-bold text-[clamp(2rem,5vw,3rem)] text-center dark:text-stone-50 dark:[text-shadow:0px_0px_6px_#c0db66] px-2.5"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType={currentLocal !== "ar" ? "chars" : "words"}
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        />
      </div>
      <SplitText
      text={subText}
      className="md:text-sm mt-4"
      delay={100}
      duration={0.6}
      ease="power3.out"
      splitType="words"
      from={{ opacity: 0, y: 40 }}
      to={{ opacity: 1, y: 0 }}
      threshold={0.1}
      rootMargin="-100px"
      textAlign="center"
      tag='p'
      upperCase = {false}
      />
    </div>
  )
}

export default SectionTitle