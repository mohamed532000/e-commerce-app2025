import { supabase } from "@/app/api/supabase/SupabaseClient";
import { convertDataHelper } from "./convertDataHelper";
export const recommendedProducts = async (locale) => {
    try {
        const { data, error } = await supabase.from("products").select("*").eq("isRecommended" , true).limit(10);
        if (error) throw error;
        return {data : convertDataHelper(data , locale)}
    }catch(error) {
        console.log("erorr fetching data" , error)
    }
} 