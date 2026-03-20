import PageHeader from '@/components/ui/page-header/PageHeader'
import React from 'react'
import WishlistContent from './WishlistContent'
import Section from '@/components/ui/section/Section'

function page() {
  return (
    <>
        <PageHeader 
          title = {"Wishlist"}
          pageInfo = {"wishlistPageSubText"}
        />
        <Section>
          <WishlistContent/>
        </Section>
    </>
  )
}

export default page