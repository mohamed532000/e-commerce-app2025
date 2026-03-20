import HeroSection from "../../components/sections/home/HeroSection";
// import RecommendedSection from "@/components/sections/home/RecommendedSection";
import BestSaleSection from "@/components/sections/home/BestSaleSection";
// import { recommendedProducts } from "@/services/recommendedProducts";
// import { bestSalePrducts } from "@/services/items/bestSaleProducts";
// import NewProductsSection from "@/components/sections/home/NewProductsSection";
import { newProducts } from "@/services/items/newProducts";
import { convertDataHelper } from "@/helper/fucntions/convertDataHelper";
import axios from "axios";
import SetCookies from "@/helper/SetCookies";
import RecommendedItems from "@/components/sections/home/recommended/RecommendedItems";
export default async function Home({params}) {
  const {locale} = await params;
  // const [recommendedRes, bestSaleRes , newProductsRes] = await Promise.all([
  //   recommendedProducts(locale),
  //   // bestSalePrducts(locale),
  //   // newProducts(locale)
  // ]);
  const settings = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/settings`);

  return (
    <>
      <HeroSection/>
      <RecommendedItems locale={locale}/>
      
      {/* <RecommendedSection 
      products={recommendedRes?.data} 
      convertedProducts = {convertDataHelper(recommendedRes?.data , locale)} 
      locale={locale}
      
      /> */}
      {/* <NewProductsSection 
      products={newProductsRes?.data} 
      convertedProducts={convertDataHelper(newProductsRes?.data , locale)}/>
      <BestSaleSection 
      products={bestSaleRes?.data}
      convertedProducts = {convertDataHelper(bestSaleRes?.data , locale)} 
      /> */}
      <SetCookies/>
    </>
  );
}
