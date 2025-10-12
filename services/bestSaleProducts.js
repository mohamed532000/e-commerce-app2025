import { supabase } from "@/app/api/supabase/SupabaseClient";
import { convertDataHelper } from "@/helper/fucntions/convertDataHelper";

export const bestSalePrducts = async () => {
    try {
        const {data , error} = await supabase.from("products").select("*").order("sales" ,{ascending : false}).limit(10);
        if (error) throw error;
        return {data}
    }catch(error) {
        console.log("error fetching best sale data" , error)
    }
} 