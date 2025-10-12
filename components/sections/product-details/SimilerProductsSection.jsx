import EmptyData from '@/components/ui/data-status/EmptyData';
import FaildLoadingData from '@/components/ui/data-status/FaildLoadingData';
import InfinitItemsLine from '@/components/ui/InfinitItemsLine';
import ProductCard from '@/components/ui/product-card/ProductCard';
import Section from '@/components/ui/section/Section';
import { convertDataHelper } from '@/helper/fucntions/convertDataHelper';
import { productsData } from '@/services/productsData'
import React from 'react'

async function SimilerProductsSection({productData , locale}) {
    const {data} = await productsData({
        category_id : productData.category_id,
        range : {from : 0 , to : 8}
    })
    const dataAfterConvert = convertDataHelper(data , locale);
  return (
    <Section
        title={"Similer products"}
        subText={"similerProductsSubText"}
    >
        {!dataAfterConvert && <FaildLoadingData/>}
        {dataAfterConvert?.length < 1 && <EmptyData/>}
        {
        dataAfterConvert?.length >= 1 &&
        <InfinitItemsLine
            pauseAnimate={true}
            children={dataAfterConvert.filter(item => item.id !== productData.id).map((item , index) => <ProductCard key={index} product={data[index]} productAfterConvert={item}/>)}
        />
        }
    </Section>
  )
}

export default SimilerProductsSection