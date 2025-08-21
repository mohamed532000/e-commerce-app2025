import TeamSection from '@/components/sections/about/TeamSection'
import PageHeader from '@/components/ui/page-header/PageHeader'
import React from 'react'

function page() {
  return (
    <>
      <PageHeader title={"about"} pageInfo={"aboutPageInfo"} />
      <TeamSection/>
    </>
  )
}

export default page