import React from 'react';
import ImagesSide from '@/components/ui/product-details-page/ImagesSide';
import InfoSide from '@/components/ui/product-details-page/InfoSide';
import Section from '@/components/ui/section/Section';
import { convertDataHelper } from '@/helper/fucntions/convertDataHelper';

function ProductDataSection({data , locale}) {
  return (
    <Section>
        <div className='relative w-full grid grid-cols-2 gap-5'>
            <ImagesSide title={convertDataHelper(data , locale).title} mainImage={data?.image_url} subImagesList={data?.images?.sub_images}/>
            <InfoSide data={data} dataAfterConvert = {convertDataHelper(data , locale)}/>
        </div>
    </Section>
  )
}

export default ProductDataSection