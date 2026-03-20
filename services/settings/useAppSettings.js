import { supabase } from "@/app/api/supabase/SupabaseClient"
import { useQuery } from "@tanstack/react-query";
const getSesstingsFunc = async () => {
    try {
        const {data , error} = await supabase.from("user_panel_settings").select("*").maybeSingle();
        if(error) throw error;
        return data
    }catch (error) {
        throw error
    }
}

export const useAppSettings = () => {
    return useQuery({
        queryKey : ['appSettings'],
        queryFn : getSesstingsFunc
    })
}