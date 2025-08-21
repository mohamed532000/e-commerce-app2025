import { supabase } from "@/app/api/supabase/SupabaseClient";

export const recommendedProducts = async () => {
    try {
        const {data, error} = await supabase.from("products").select("*").eq("isRecommended" , true);
        if (error) throw error;
        return {data}
    }catch(error) {
        console.log("erorr fetching data" , error)
    }
} 