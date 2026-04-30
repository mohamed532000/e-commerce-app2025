import { supabase } from "@/app/api/supabase/SupabaseClient";
import { useQuery } from "@tanstack/react-query";

const getDataFunc = async ({governorateId}) => {
    try {
        const {data , error} = await supabase.from("cities").select("*").eq("governorate_id" , governorateId);
        if(error){
            console.log("error fetching cities data" , error)
            throw error;
        }
        return data;
    }catch(error){
        console.log("error fetching cities data" , error)
        throw error
    }
}

export const useCitiesData = ({governorateId}) => {
    return useQuery({
        queryKey: ["cities" , governorateId],
        queryFn: () => getDataFunc({governorateId}),
        enabled : !!governorateId
    })
}