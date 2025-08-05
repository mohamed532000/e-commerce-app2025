import { getProducts } from "../api/getProducts"
import HeroSliders from "@/components/sections/home/HeroSliders";
export default async function  HeroSection() {
    // const {data , loading} = await getProducts();
    // data && console.log(data)
    return (
        <div className="bg-gray-900">
            <HeroSliders/>
        </div>
    )
}