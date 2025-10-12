import React from 'react';
import EmptyData from '@/components/ui/data-status/EmptyData';
import FaildLoadingData from '@/components/ui/data-status/FaildLoadingData';
import Section from '@/components/ui/section/Section'
import InfinitItemsLine from '@/components/ui/InfinitItemsLine';
import ProductCard from '@/components/ui/product-card/ProductCard';

function NewProductsSection({products , convertedProducts}) {
    return (
        <Section
            title={"New arrivals"}
            subText={"new products section subtext"}
            containerClassName={"overflow-hidden"}
        >
            {!convertedProducts && <FaildLoadingData/>}
            {convertedProducts?.length < 1 && <EmptyData/>}
            {
            convertedProducts?.length >= 1 &&
            <InfinitItemsLine
                children={convertedProducts.map((item , index) => 
                    <ProductCard 
                    key={index}
                    product={products[index]} 
                    productAfterConvert={item} />
                )}
            />
            }
        </Section>
    )
}

export default NewProductsSection