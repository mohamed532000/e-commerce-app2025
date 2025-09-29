import { supabase } from "@/app/api/supabase/SupabaseClient"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const sendResetPassLinkToMailFunc = async ({email , locale}) => {
    try {
        const {data , error} = await supabase.auth.resetPasswordForEmail(email , {
            redirectTo : `${process.env.NEXT_PUBLIC_URL}/${locale}/auth/reset-password`
        })
        if(error) throw error
        return data
    }catch (error) { 
        if(error) throw error
    }
}

export const SendResetPassLinkToEmail = () => {
    return useMutation({
        mutationKey : ['resetPass'],
        mutationFn : ({email , locale}) => sendResetPassLinkToMailFunc({email , locale}),
        onSuccess : () => toast.success("We send reset link to your email"),
        onError : (error) => toast.error("ooops")
    })
}