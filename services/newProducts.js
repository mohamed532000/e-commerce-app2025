import { supabase } from "@/app/api/supabase/SupabaseClient"
import { convertDataHelper } from "@/helper/fucntions/convertDataHelper"

export const newProducts = async () => {
    try {
        const {data , error} = await supabase.from("products").select("*").order("created_at" , {ascending : false}).limit(10)
        if (error) throw error
        return {data}
    }catch(error) {
        console.log("error fetching new products" , error)
    }
}
