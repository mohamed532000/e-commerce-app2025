import React from 'react';
import { productDetails } from '@/services/productDetails';
import PageHeader from '@/components/ui/page-header/PageHeader';
import SimilerProductsSection from '@/components/sections/product-details/SimilerProductsSection';
import ProductDataSection from '@/components/sections/product-details/ProductDataSection';
import { convertDataHelper } from '@/helper/fucntions/convertDataHelper';

async function page({params}) {
    const {locale , slug} = await params;
    const {data} = await productDetails({locale , slug});
    return (
        <>
            <PageHeader noTranslateTitle={convertDataHelper(data , locale).title} noTranslatePageInfo={convertDataHelper(data , locale).description}/>
            <ProductDataSection data={data} locale={locale}/>
            <SimilerProductsSection productData={data} locale={locale}/>
        </>
    )
}

export default page