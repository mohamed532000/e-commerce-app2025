import RecommendedSection from "@/components/sections/home/RecommendedSection";
import HeroSection from "../home-sections/HeroSection";
import { recommendedProducts } from "@/helper/fucntions/recommendedProducts";

export default async function Home() {
  const {data:recommendedData} = await recommendedProducts();
  return (
    <>
      <HeroSection/>
      <RecommendedSection products={recommendedData}/>
    </>
  );
}
