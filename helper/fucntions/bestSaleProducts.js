import { supabase } from "@/app/api/supabase/SupabaseClient";
import { convertDataHelper } from "./convertDataHelper";

export const bestSalePrducts = async (locale) => {
    try {
        const {data , error} = await supabase.from("products").select("*").order("sales" ,{ascending : false}).limit(10);
        if (error) throw error;
        return {data : convertDataHelper(data , locale)}
    }catch(error) {
        console.log("error fetching best sale data" , error)
    }
} 