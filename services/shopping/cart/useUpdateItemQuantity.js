import { supabase }  from "@/app/api/supabase/SupabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const updateFunc = async ({itemId , quantity , translate}) => {
    try {
        const {error} = await supabase
        .from("cart_items")
        .update({quantity})
        .eq("id" , itemId)
        .select()
        if (error) {
            error.translate = translate
            throw error;
        };
        return translate
    }catch (error) {
        throw error
    }
    
}

export const useUpdateItemQuantity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey : ['updateItemQuantity'],
        mutationFn : ({itemId , quantity , translate}) => updateFunc({itemId , quantity , translate}),
        onSuccess : () => {
            queryClient.invalidateQueries(["cartData"])
            console.log("updated successfully")
        },
        onError : (error) => {
            toast.error(error.translate("Something went wrong"))
        }
    })
}