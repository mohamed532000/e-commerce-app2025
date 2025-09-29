import { supabase } from "@/app/api/supabase/SupabaseClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
const updateFunc = async ({userId , newData , translate}) => {
    console.log(userId)
    console.log(newData)
    try {
        const {data : {user} , error} = await supabase.auth.updateUser({
            email : newData.email,
            ...(newData.password?.length >= 1 ? {password : newData.password} : {}),
        })
        if(error) {
            throw error
        }else {
            await supabase.from("users").update({
                email : newData.email
            }).eq("id" , userId)
        }
        return {user , translate}
    }catch(error) {
        throw error
    }
}
export const useUpdateUserAuthData = () => {
    return useMutation({
        mutationKey : ['updateUserAuthData'],
        mutationFn : ({userId , newData , translate}) => updateFunc({userId , newData , translate}),
        onSuccess : ({translate}) => toast.success(translate("We send confirm link to your email")),
        onError : (error) => toast.error(error.message),
    })
}