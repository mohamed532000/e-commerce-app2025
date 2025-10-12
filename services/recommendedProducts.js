import { supabase } from "@/app/api/supabase/SupabaseClient";
import { convertDataHelper } from "@/helper/fucntions/convertDataHelper";
export const recommendedProducts = async () => {
    try {
        const { data, error } = await supabase.from("products").select("*").eq("isRecommended" , true).limit(10);
        if (error) throw error;
        return {data}
    }catch(error) {
        console.log("erorr fetching data" , error)
    }
} 