import { supabase } from "@/app/api/supabase/SupabaseClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const SignOut = async () => {
    try {
        const {error} = await supabase.auth.signOut();
        if(error) {
            throw error
        }
        return error
    }catch (error) {
        throw error
    }
}

export const useSignOut = () => {
    return useMutation({
        mutationKey : ['signout'],
        mutationFn : SignOut,
        onError : (error) => toast.error(error.message)
    })
}