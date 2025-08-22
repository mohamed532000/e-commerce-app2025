import React from 'react';
import EmptyData from '@/components/ui/data-status/EmptyData';
import FaildLoadingData from '@/components/ui/data-status/FaildLoadingData';
import NewProductsContent from '@/components/ui/NewProductsContent';
import Section from '@/components/ui/section/Section'

function NewProductsSection({products}) {
    return (
        <Section
            title={"New arrivals"}
            subText={"new products section subtext"}
            containerClassName={"overflow-hidden"}
        >
            {!products && <FaildLoadingData/>}
            {products?.length < 1 && <EmptyData/>}
            {products?.length >= 1 &&
            <div className='relative w-full p-4'>
                <span className='absolute inset-y-0 left-0 z-20 w-[10%] bg-gradient-to-r from-background to-transparent h-full'></span>
                    <NewProductsContent products={products}/>
                <span className='absolute inset-y-0 right-0 z-20 w-[10%] bg-gradient-to-l from-background to-transparent h-full'></span>
            </div>}
        </Section>
    )
}

export default NewProductsSection