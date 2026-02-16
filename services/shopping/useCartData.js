
import { supabase } from "@/app/api/supabase/SupabaseClient";
import { convertDataHelper } from "@/helper/fucntions/convertDataHelper";
import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "../client/useCartStore";
import {getCookie} from "cookies-next/client"
import { checkUserPermission } from "@/helper/fucntions/checkUserPermission";
import { UserAuth } from "@/context/AuthProvider";

const getDataFunc = async ({userId , local , setItemsFunc}) => {
    const res = await checkUserPermission();
    const query = supabase.from("carts").select(`
             id,
             total_price,
             cart_items(
                 id,
                 quantity,
                 final_price,
                 products (
                     *
                 )
             )    
         `
        ).eq("user_id" , userId)
    if(!res.allowed) {
        return {};
    }
    try {
        const {data:{id , cart_items , total_price} , error} = await query;
        if (error) throw error;
        setItemsFunc({id , products : convertDataHelper(cart_items , local , true) , total_price})
        if(cart_items) {
            return {id , products : convertDataHelper(cart_items , local , true) , total_price}
        }else {
            return {}
        }
    }catch(error) {
        if (error) throw error
    }
}

export const useCartData = ({userId , local}) => {
    const {setItems} = useCartStore()
    return useQuery({
        queryKey : ["cartData"],
        queryFn : () => getDataFunc({userId , local , setItemsFunc : setItems}),
        refetchOnWindowFocus : false,
        retry : false,
        enabled : !!userId
    })
}