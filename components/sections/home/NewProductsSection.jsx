import React from 'react';
import EmptyData from '@/components/ui/data-status/EmptyData';
import FaildLoadingData from '@/components/ui/data-status/FaildLoadingData';
import Section from '@/components/ui/section/Section'
import InfinitItemsLine from '@/components/ui/InfinitItemsLine';
import ProductCard from '@/components/ui/product-card/ProductCard';

function NewProductsSection({products}) {
    return (
        <Section
            title={"New arrivals"}
            subText={"new products section subtext"}
            containerClassName={"overflow-hidden"}
        >
            {!products && <FaildLoadingData/>}
            {products?.length < 1 && <EmptyData/>}
            {
            products?.length >= 1 &&
            <InfinitItemsLine
                children={products.map((item , index) => <ProductCard key={index} product={item}/>)}
            />
            }
        </Section>
    )
}

export default NewProductsSection