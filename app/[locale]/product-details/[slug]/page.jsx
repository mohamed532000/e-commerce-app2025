import React from 'react';
import { productDetails } from '@/services/productDetails';
import PageHeader from '@/components/ui/page-header/PageHeader';
import Section from '@/components/ui/section/Section';
import ImagesSide from '../../../../components/ui/product-details-page/ImagesSide';
import InfoSide from '../../../../components/ui/product-details-page/InfoSide';
import SimilerProductsSection from '@/components/sections/product-details/SimilerProductsSection';
import ProductDataSection from '@/components/sections/product-details/ProductDataSection';

async function page({params}) {
    const {locale , slug} = await params;
    const {data} = await productDetails({locale , slug});
    return (
        <>
            <PageHeader noTranslateTitle={data.title} noTranslatePageInfo={data.description}/>
            <ProductDataSection data={data} />
            <SimilerProductsSection productData={data} locale={locale}/>
        </>
    )
}

export default page