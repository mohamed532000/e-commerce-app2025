import { supabase } from "@/app/api/supabase/SupabaseClient";
import { cache } from "react";
import { convertDataHelper } from "@/helper/fucntions/convertDataHelper";

export const productDetails = cache(async (params) => {
    const {slug , locale} = await params;
    try {
        const {data ,error} = slug &&  await supabase
        .from("products")
        .select("*")
        .or(`slug->>ar.ilike.%${slug}%,slug->>en.ilike.%${slug}%`)
        .single()
        if(error) throw error
        return {data}
    }catch (error) {
        console.log("error fetching single product" , error)
    }
})