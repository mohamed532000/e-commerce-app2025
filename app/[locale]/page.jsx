import RecommendedSection from "@/components/sections/home/RecommendedSection";
import HeroSection from "../home-sections/HeroSection";
import BestSaleSection from "@/components/sections/home/BestSaleSection";
import { recommendedProducts } from "@/helper/fucntions/recommendedProducts";
import { bestSalePrducts } from "@/helper/fucntions/bestSaleProducts";
import NewProductsSection from "@/components/sections/home/NewProductsSection";
import { newProducts } from "@/helper/fucntions/newProducts";

export default async function Home() {
  const {data:recommendedData} = await recommendedProducts();
  const {data:newProductsData} =  await newProducts();
  const {data:bestSaleData} =  await bestSalePrducts();
  // const [recommendedRes, bestSaleRes , newProductsRes] = await Promise.all([
  //   recommendedProducts(),
  //   bestSalePrducts(),
  //   newProducts(),
  // ]);
  return (
    <>
      <HeroSection/>
      <RecommendedSection products={recommendedData}/>
      <NewProductsSection products={newProductsData}/>
      <BestSaleSection products={bestSaleData}/>
    </>
  );
}
