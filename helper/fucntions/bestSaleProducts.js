import { supabase } from "@/app/api/supabase/SupabaseClient";

export const bestSalePrducts = async () => {
    try {
        const {data , error} = await supabase.from("products").select("*").order("sales" ,{ascending : false}).range(0,9);
        if (error) throw error;
        return {data}
    }catch(error) {
        console.log("error fetching best sale data" , error)
    }
} 