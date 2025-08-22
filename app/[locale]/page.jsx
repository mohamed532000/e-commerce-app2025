import RecommendedSection from "@/components/sections/home/RecommendedSection";
import HeroSection from "../home-sections/HeroSection";

export default async function Home() {
  return (
    <>
      <HeroSection/>
      <RecommendedSection products={[]}/>
    </>
  );
}
