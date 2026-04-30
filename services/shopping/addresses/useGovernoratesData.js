import { supabase } from "@/app/api/supabase/SupabaseClient";
import { useQuery } from "@tanstack/react-query";

const getDataFunc = async () => {
    try {
        const {data , error} = await supabase.from("governorates").select("*");    
        if(error){
            console.log("error fetching governorates data" , error)
            throw error;
        }
        return data;
    }catch(error){
        console.log("error fetching governorates data" , error)
        throw error
    }
}

export const useGovernoratesData = () => {
    return useQuery({
        queryKey: ["governorates"],
        queryFn: getDataFunc,
    })
}