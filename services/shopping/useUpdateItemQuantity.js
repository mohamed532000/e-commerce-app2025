import { supabase }  from "@/app/api/supabase/SupabaseClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const updateFunc = async ({itemId , quantity , translate}) => {
    try {
        const {error} = await supabase
        .from("cart_items")
        .update({quantity})
        .eq("id" , itemId)
        .set
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
    return useMutation({
        mutationKey : ['updateItemQuantity'],
        mutationFn : ({itemId , quantity , translate}) => updateFunc({itemId , quantity , translate}),
        onSuccess : () => {console.log("updated successfully")},
        onError : (error) => {
            toast.error(error.translate("Something went wrong"))
        }
    })
}