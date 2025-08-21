import { supabase } from "@/app/api/supabase/SupabaseClient"

export const newProducts = async () => {
    try {
        const {data , error} = await supabase.from("products").select("*").order("created_at" , {ascending : false}).range(0 , 9)
        if (error) throw error
        return {data}
    }catch(error) {
        console.log("error fetching new products" , error)
    }
}
