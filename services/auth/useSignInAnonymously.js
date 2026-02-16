import { supabase } from "@/app/api/supabase/SupabaseClient";
import { useMutation } from "@tanstack/react-query";

const signInAnonymouslyFunc = async () => {
    const {data : {user}} = await supabase.auth.getUser();
    try {
        if(!user) {
            const {error , data} = await supabase.auth.signInAnonymously();
            if(error) throw error;
            console.log("will happen sign in anon now")
            return data;
        }else {
            console.log("there is user" , user)
        }
    }catch (error) {
        throw error
    }
}

export const useSignInAnonimously = () => {
    return useMutation({
        mutationKey : ['sign-in-anonimous'],
        mutationFn : () => signInAnonymouslyFunc(),
    })
}