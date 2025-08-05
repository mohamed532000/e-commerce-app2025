import React from 'react'
import SectionTitle from './SectionTitle'

function Section({title , subText , children , className , containerClassName}) {
  return (
    <section className={`${className} mt-9 py-5 relative`}>
        <SectionTitle title={title} subText={subText}/>
        <div className={`container ${containerClassName} mt-7`}>
            {children}
        </div>
    </section>
  )
}

export default Section