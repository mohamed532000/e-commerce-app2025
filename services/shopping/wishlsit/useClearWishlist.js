import { supabase } from "@/app/api/supabase/SupabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const clearFunc = async ({wishlistId}) => {
    try {
        const {data , error} = await supabase.from("wishlist_items").delete().eq("wishlist_id" , wishlistId)
        if(error) throw error;
        return data
    }catch (error) {
        console.log("error clear user wishlist" , error)
    }
}


export const useClearCartItems = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey : ["clear_user_wishlist"],
        mutationFn : ({wishlistId}) => clearFunc({wishlistId}),
        onSuccess : () => {
            toast.success("wishlist now is empty");
            queryClient.invalidateQueries(['wishlistData'])
        },
        onError : (error) => {
            toast.error(error);
        }
    })
}