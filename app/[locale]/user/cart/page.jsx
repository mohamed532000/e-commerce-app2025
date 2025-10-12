import PageHeader from '@/components/ui/page-header/PageHeader'
import Section from '@/components/ui/section/Section'
import React from 'react';
import CartContent from './CartContent';

async function page() {
  // const {data:cartData} = await useCartData();
  return (
    <>
        <PageHeader title={"cart"} pageInfo={"cartPageInfo"}/>
        <Section>
            <CartContent/>
        </Section>
    </>
  )
}

export default page