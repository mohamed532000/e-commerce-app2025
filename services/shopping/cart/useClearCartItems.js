import { supabase } from "@/app/api/supabase/SupabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const clearFunc = async ({cartId}) => {
    try {
        const {data , error} = await supabase.from("cart_items").delete().eq("cart_id" , cartId)
        if(error) throw error;
        return data
    }catch (error) {
        console.log("error clear user cart" , error)
    }
}


export const useClearCartItems = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey : ["clear_user_cart"],
        mutationFn : ({cartId}) => clearFunc({cartId}),
        onSuccess : () => {
            toast.success("cart now is empty");
            queryClient.invalidateQueries(['cartData'])
        },
        onError : (error) => {
            toast.error(error);
        }
    })
}