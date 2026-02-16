// import { supabase } from "@/app/api/supabase/SupabaseClient"
// import { cache } from "react";

// export const appSettings = cache(async () => {
//     try {
//         const {data , error} = await supabase.from("user_panel_settings").select("*").single();
//         console.log(data)
//         return data
//     }catch (error) {
//         throw error
//     }
// })
import { supabase } from "@/app/api/supabase/SupabaseClient"
export const appSettings = async () => {
    try {
        // const cookiesStore = await cookies();
        // const visitor_id = cookiesStore.get("visitor_id")
        const {data , error} = await supabase.from("user_panel_settings").select("*").single();
        const avilable_guests = data.avilable_guests;
        console.log(data)
        return data
    }catch (error) {
        throw error
    }
}