import { supabase }  from "@/app/api/supabase/SupabaseClient";

const updateFunc = async ({userId , prevItems , quantity}) => {
    const {error} = supabase
    .from("carts")
    .update("products" , [])
    .eq("user_id" , userId)
}