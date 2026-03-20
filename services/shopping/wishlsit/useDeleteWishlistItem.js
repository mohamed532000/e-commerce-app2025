import { supabase }  from "@/app/api/supabase/SupabaseClient"
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteFunc = async ({itemId}) => {
    try {
        const {data , error} = await supabase.from("wishlist_items").delete().eq("id" , itemId);
        if (error) throw error
        return data
    }catch(error) {
        console.log("error delete wishlist item" , error)
    }
}

export const useDeleteWishlistItem = () => {
    const queryCLient = useQueryClient()
    return useMutation({
        mutationKey : ["deleteWishlistItem"],
        mutationFn : ({itemId}) => deleteFunc({itemId}),
        onSuccess : () => {
            console.log("wishlist item was deleted!");
            queryCLient.invalidateQueries(['wishlistData'])
        }
    })
}