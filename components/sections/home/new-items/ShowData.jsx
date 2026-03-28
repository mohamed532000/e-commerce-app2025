import React from 'react';
import EmptyData from '@/components/ui/data-status/EmptyData';
import FaildLoadingData from '@/components/ui/data-status/FaildLoadingData';
import Section from '@/components/ui/section/Section'
import InfinitItemsLine from '@/components/ui/InfinitItemsLine';
import ProductCard from '@/components/ui/cards/ProductCard';

function ShowData({items}) {
    return (
        <Section
            title={"New arrivals"}
            subText={"new products section subtext"}
            containerClassName={"overflow-hidden"}
        >
            {!items && <FaildLoadingData/>}
            {items?.length < 1 && <EmptyData/>}
            {
            items?.length >= 1 &&
            <InfinitItemsLine
                children={items.map((item , index) => 
                    <ProductCard 
                        key={index}
                        product={items[index]} 
                        productAfterConvert={item} 
                    />
                )}
            />
            }
        </Section>
    )
}

export default ShowData