import RecommendedSection from "@/components/sections/home/RecommendedSection";
import HeroSection from "../home-sections/HeroSection";
import BestSaleSection from "@/components/sections/home/BestSaleSection";
import { recommendedProducts } from "@/helper/fucntions/recommendedProducts";
import { bestSalePrducts } from "@/helper/fucntions/bestSaleProducts";
import NewProductsSection from "@/components/sections/home/NewProductsSection";
import { newProducts } from "@/helper/fucntions/newProducts";

export default async function Home() {
  const [recommendedRes, bestSaleRes , newProductsRes] = await Promise.all([
    recommendedProducts(),
    bestSalePrducts(),
    newProducts(),
  ]);
  return (
    <>
      <HeroSection/>
      <RecommendedSection products={recommendedRes.data}/>
      <NewProductsSection products={newProductsRes.data}/>
      <BestSaleSection products={bestSaleRes.data}/>
    </>
  );
}
