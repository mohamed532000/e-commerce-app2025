import { supabase } from "@/app/api/supabase/SupabaseClient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export const signInUser = async ({email , password}) => {
    try {
        const {data : {user , session} , error} = await supabase.auth.signInWithPassword({email , password})
        if(error) {
            throw error
        }
        return {user , session}
    } catch (error) {
        throw error
    }
}

export const useSignIn = () => {
    return useMutation({
        mutationKey : ['login'],
        mutationFn : ({email , password}) => signInUser({email , password}),
        onError : (error) => toast.error(error.message)
    })
}