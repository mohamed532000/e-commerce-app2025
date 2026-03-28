import { MainLink } from '@/components/ui/MainLink';
import Section from '@/components/ui/section/Section'
import HandleTranslate from '@/helper/HandleTranslate';
import React from 'react'
import { HiOutlineSparkles } from "react-icons/hi";

function DescoverMore() {
  return (
    <Section>
        <div className='relative flex flex-col gap-y-3.5 items-center'>
            <HiOutlineSparkles className='text-4xl md:text-8xl dark:text-stone-50 dark:drop-shadow-[0_0_6px_#c0db66]'/>
            <div className='relative text-content gap-y-1.5'>
                <h1 className='text-center text-2xl md:text-4xl font-bold'>Discover More Treasures</h1>
                <p className='text-center'>Your olfactory journey doesn't end here. Explore our seasonal curation and find your next signature scent.</p>
            </div>
            <MainLink
            className={`delay-100 transition-all duration-800`}
                href={'/products'}
            >
                <HandleTranslate page={"home"} word={"Shop Now"} />
            </MainLink>
        </div>
    </Section>
  )
}

export default DescoverMore