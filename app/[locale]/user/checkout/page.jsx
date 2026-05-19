import Section from '@/components/ui/section/Section'
import CheckoutContent from './CheckoutContent'
import PageHeader from '@/components/ui/page-header/PageHeader'
import SiteLogo from '@/components/ui/SiteLogo'

function page() {
  return (
    <>
      <div className='relative wi-full flex justify-center items-center py-1 border-b'>
        <SiteLogo/>
      </div>
      <Section className="flex items-center justify-center">
          <CheckoutContent/>
      </Section>
    </>
  )
}

export default page