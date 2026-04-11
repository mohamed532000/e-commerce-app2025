import HeroSection from "@/components/sections/home/hero-section/HeroSection";
import SetCookies from "@/helper/SetCookies";
import RecommendedItems from "@/components/sections/home/recommended/RecommendedItems";
import BestSalesitems from "@/components/sections/home/best-sales/BestSalesitems";
import NewItemsSection from "@/components/sections/home/new-items/NewItemsSection";
export default async function Home({params}) {
  const {locale} = await params;
  return (
    <>
      <HeroSection/>
      <RecommendedItems locale={locale} />
      <BestSalesitems locale={locale} />
      <NewItemsSection locale={locale} />
      <SetCookies/>
    </>
  );
}
