import React from 'react'
import EmptyData from '@/components/ui/data-status/EmptyData'
import FaildLoadingData from '@/components/ui/data-status/FaildLoadingData'
import Section from '@/components/ui/section/Section'
import InfinitItemsLine from '@/components/ui/InfinitItemsLine'
import CategoryCard from '@/components/ui/cards/CategoryCard'

function CategoriesSection({categories}) {
  return (
    <Section
        title={"Categories"}
        subText={"categoriesSectionSubText"}
    >
        {!categories && <FaildLoadingData/>}
        {categories?.length < 1 && <EmptyData/>}
        {categories?.length >= 1 &&
            <InfinitItemsLine
                children={categories.map((item , index) => <CategoryCard key={index} item={item}/>)}
            />
        }
    </Section>
  )
}

export default CategoriesSection