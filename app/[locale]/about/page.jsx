import TeamSection from '@/components/sections/about/TeamSection'
import PageHeader from '@/components/ui/page-header/PageHeader'
import React from 'react'

function page() {
  return (
    <>
      <PageHeader title={"ABOUT"} pageInfo={"Inside this page you can know more about us and talk to our expert team."} />
      <TeamSection/>
    </>
  )
}

export default page