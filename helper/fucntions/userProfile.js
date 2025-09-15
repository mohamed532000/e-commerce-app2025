import { supabase } from "@/app/api/supabase/SupabaseClient"
import { useQuery } from "@tanstack/react-query";

const getUserProfile = async () => {
    try {
        const {data : {user} , error} = await supabase.auth.getUser();
        if(error) throw error
        return user
    }catch (error) {
        throw error
    }
}
export const useUserProfileData = () => {
    return useQuery({
      queryKey: ["getuserprofile"],
      queryFn: () => getUserProfile(),
      refetchOnWindowFocus: false,
    });
  };