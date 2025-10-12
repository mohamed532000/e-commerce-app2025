import PageHeader from '@/components/ui/page-header/PageHeader'
import React from 'react'
import WhishlistCotent from './WhishlistContent'

function page() {
  return (
    <>
        <PageHeader title={"whishlist"} pageInfo={"cartPageInfo"}/>
        <Section>
            <WhishlistCotent/>
        </Section>
    </>
  )
}

export default page