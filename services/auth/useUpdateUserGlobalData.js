import { supabase } from "@/app/api/supabase/SupabaseClient"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const updateFunc = async ({newData , userId , translate}) => {
    try {
        const {error} = await supabase.from("users").update(
            {
                ...(newData.phone ? {phone : newData.phone} : {}),
                ...(newData.name ? {name : newData.name} : {}),
            }
        ).eq("id" , userId)
        if(error) throw error;
        return {translate}
    }catch(error) {
        if (error) throw error
    }
}

export const useUpdateUserGlobalData = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey : ['updateUserGlobalData'],
        mutationFn : ({newData , userId , translate}) => updateFunc({newData , userId , translate}),
        onSuccess : ({translate}) => {
            toast.success(translate("Updated successfully"))
            queryClient.invalidateQueries(['getUserDataFunc'])
        },
        onError : (error) => toast.error(error.message)
    })
}