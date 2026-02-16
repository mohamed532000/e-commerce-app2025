import RecommendedSection from "@/components/sections/home/RecommendedSection";
import HeroSection from "../home-sections/HeroSection";
import BestSaleSection from "@/components/sections/home/BestSaleSection";
import { recommendedProducts } from "@/services/recommendedProducts";
import { bestSalePrducts } from "@/services/bestSaleProducts";
import NewProductsSection from "@/components/sections/home/NewProductsSection";
import { newProducts } from "@/services/newProducts";
import { convertDataHelper } from "@/helper/fucntions/convertDataHelper";
import axios from "axios";
import SetCookies from "@/helper/SetCookies";
export default async function Home({params}) {
  const {locale} = await params;
  const [recommendedRes, bestSaleRes , newProductsRes] = await Promise.all([
    recommendedProducts(locale),
    bestSalePrducts(locale),
    newProducts(locale)
  ]);
  // const settings = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/settings`);

  return (
    <>
      <HeroSection/>
      <RecommendedSection 
      products={recommendedRes?.data} 
      convertedProducts = {convertDataHelper(recommendedRes?.data , locale)} 
      locale={locale}/>
      <NewProductsSection 
      products={newProductsRes?.data} 
      convertedProducts={convertDataHelper(newProductsRes?.data , locale)}/>
      <BestSaleSection 
      products={bestSaleRes?.data}
      convertedProducts = {convertDataHelper(bestSaleRes?.data , locale)} 
      />
      <SetCookies/>
    </>
  );
}
