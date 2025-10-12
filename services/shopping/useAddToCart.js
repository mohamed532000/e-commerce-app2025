import { supabase } from "@/app/api/supabase/SupabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const addToCartFunc = async ({prevItems , newItem , userId , translate}) => {
    try {
        const isAlreadyInCart = prevItems?.find(item => item.id == newItem.id)
        if(isAlreadyInCart) {
            toast.error(translate("Item is already exist"))
        }else {
            const {error} = await supabase
            .from("carts")
            .update({"products" : [...prevItems , {...newItem , quantity: 1}]})
            .eq("user_id" , userId)
            if (error) throw error
            return translate
        }
    }catch (error) {
        if (error) throw error
    }
}

export const useAddToCart = (userId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey : ['addToCart'],
        mutationFn : ({prevItems , newItem , translate}) => addToCartFunc({prevItems , newItem , translate , userId}),
        onSuccess : (translate) => {
            toast.success(translate("Added successfully"))
            queryClient.invalidateQueries('cartData')
        },
        onError : (error) => toast.error(error.message)
    })
}