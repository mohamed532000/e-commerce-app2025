import { supabase } from "@/app/api/supabase/SupabaseClient"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
export const updateUserData = async ({newData}) => {
    try {
        const {data : {user} , error} = await supabase.auth.updateUser({
            email : newData.email,
            data: { 
                name: newData.name , 
                display_name : newData.name , 
                phone : newData.phone 
            }
        })
        if(error) {
            throw error
        }
        return user
    }catch(error) {
        throw error
    }
}

export const useUpdateUserData = (successMessage) => {
    return useMutation({
        mutationKey : ['updateUserData'],
        mutationFn : ({newData}) => updateUserData({newData}),
        onSuccess : () => toast.success(successMessage),
        onError : (error) => toast.error(error.message)
    })
}