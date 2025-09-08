import React from 'react';
import ImagesSide from '@/components/ui/product-details-page/ImagesSide';
import InfoSide from '@/components/ui/product-details-page/InfoSide';
import Section from '@/components/ui/section/Section';

function ProductDataSection({data}) {
  return (
    <Section>
        <div className='relative w-full grid grid-cols-2 gap-5'>
            <ImagesSide title={data.title} mainImage={data?.image_url} subImagesList={data?.images?.sub_images}/>
            <InfoSide data={data}/>
        </div>
    </Section>
  )
}

export default ProductDataSection