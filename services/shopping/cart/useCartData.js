import { supabase } from "@/app/api/supabase/SupabaseClient";
import { convertDataHelper } from "@/helper/fucntions/convertDataHelper";
import { useQuery } from "@tanstack/react-query";
import {getCookie} from "cookies-next/client"
import { checkUserPermission } from "@/helper/fucntions/checkUserPermission";
import { useCartStore } from "../../state_management/useCartStore";

const getDataFunc = async ({userId , local , setItemsFuncInClientStateFunc}) => {
    const res = await checkUserPermission();
    const query = supabase.from("carts").select(`
             id,
             sub_total,
             total_price,
             tax,
             cart_items(
                 id,
                 quantity,
                 final_price,
                 products (
                    *
                 )
             )    
         `
        ).eq("user_id" , userId).maybeSingle()
    if(!res.allowed) {
        return {};
    }
    try {
        const {data:{id , cart_items , sub_total , total_price , tax} , error} = await query;
        if (error) throw error;
        if(cart_items?.length >= 1) {
            setItemsFuncInClientStateFunc({id , products : convertDataHelper(cart_items , local , true) , sub_total , total_price , tax})
            return {id , products : convertDataHelper(cart_items , local , true) , sub_total , total_price , tax}
        }else {
            // setItemsFuncInClientStateFunc({id , sub_total , total_price , tax})
            return {id , products : [] , sub_total , total_price , tax}
        }
    }catch(error) {
        if (error) throw error
    }
}

export const useCartData = ({userId , local}) => {
    const {setItems} = useCartStore()
    return useQuery({
        queryKey : ["cartData" , userId , local],
        queryFn : () => getDataFunc({userId , local , setItemsFuncInClientStateFunc: setItems}),
        refetchOnWindowFocus : false,
        retry : false,
        enabled : !!userId
    })
}