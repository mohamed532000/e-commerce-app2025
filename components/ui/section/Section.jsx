import React from 'react'
import SectionTitle from './SectionTitle'
import { useTranslations } from 'next-intl'

function Section({title , subText , children , className , containerClassName}) {
  const t = useTranslations("sectionsTitles")
  return (
    <section className={`${className} mt-9 py-5 relative`}>
        {title && <SectionTitle title={t(title)} subText={t(subText)}/>}
        <div className={`container ${containerClassName} mt-7`}>
            {children}
        </div>
    </section>
  )
}

export default Section