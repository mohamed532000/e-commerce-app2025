import { supabase } from "@/app/api/supabase/SupabaseClient";
import { cache } from "react";
import { convertDataHelper } from "./convertDataHelper";

export const productDetails = cache(async (params) => {
    const {slug , locale} = await params
    console.log(slug , locale)
    try {
        const {data ,error} = slug &&  await supabase.from("products").select("*").or(`slug->>ar.ilike.%${slug}%,slug->>en.ilike.%${slug}%`).single()
        if(error) throw error
        return {data : convertDataHelper([data] , locale)[0]}
    }catch (error) {
        console.log("error fetching single product" , error)
    }
})