import EmptyData from '@/components/ui/data-status/EmptyData';
import FaildLoadingData from '@/components/ui/data-status/FaildLoadingData';
import InfinitItemsLine from '@/components/ui/InfinitItemsLine';
import ProductCard from '@/components/ui/product-card/ProductCard';
import Section from '@/components/ui/section/Section';
import { productsData } from '@/helper/fucntions/productsData'
import React from 'react'

async function SimilerProductsSection({productData , locale}) {
    const {data} = await productsData(locale , {
        category_id : productData.category_id,
        range : {from : 0 , to : 8}
    })
    console.log(data)
    console.log(productData , locale)
  return (
    <Section
        title={"Similer products"}
        subText={"similerProductsSubText"}
    >
        {!data && <FaildLoadingData/>}
        {data?.length < 1 && <EmptyData/>}
        {
        data?.length >= 1 &&
        <InfinitItemsLine
            pauseAnimate={true}
            children={data.filter(item => item.id !== productData.id).map((item , index) => <ProductCard key={index} product={item}/>)}
        />
        }
    </Section>
  )
}

export default SimilerProductsSection