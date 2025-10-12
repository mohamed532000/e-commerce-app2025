import { supabase } from "@/app/api/supabase/SupabaseClient"
import { useQuery } from "@tanstack/react-query";

const getUserDataFunc = async (userIdFromSession) => {
    try {
        const {data , error} = await supabase.from("users").select("*").eq("id" , userIdFromSession).single();
        if(error) throw error;
        return data;
    }catch (error) {
        throw error
    }
}
export const useUserData = (userIdFromSession) => {
    return useQuery({
      queryKey: ["getUserDataFunc"],
      queryFn: () => getUserDataFunc(userIdFromSession),
      refetchOnWindowFocus: false,
      enabled : !!userIdFromSession
    });
  };