import React from 'react';
import CategoriesSection from '@/components/sections/about/CategoriesSection';
import TeamSection from '@/components/sections/about/TeamSection';
import PageHeader from '@/components/ui/page-header/PageHeader';
import { categoriesData } from '@/services/categoriesData';

export default async function page({params}) {
  const {locale} = await params
  const res = await categoriesData(locale)
  return (
    <>
      <PageHeader title={"about"} pageInfo={"aboutPageInfo"} />
      <CategoriesSection categories={res?.data}/>
      <TeamSection/>
    </>
  )
}