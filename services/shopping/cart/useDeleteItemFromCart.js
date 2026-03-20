import { supabase } from "@/app/api/supabase/SupabaseClient"
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteFunc = async ({item}) => {
    try {
        console.log(item)
        const {data , error} = await supabase.from("cart_items").delete().eq("id" , item.id);
        if(error) throw error
        return data
    }catch (error) {
        console.log("error deleting item from cart" , error)
    }
}

export const useDeleteItemFromCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey : ['delete_item_from_cart'],
        mutationFn : ({item}) => deleteFunc({item}),
        onSuccess : () => {
            queryClient.invalidateQueries("cartData")
        }
    })
}