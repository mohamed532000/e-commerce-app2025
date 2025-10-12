import { supabase } from "@/app/api/supabase/SupabaseClient";
import { convertDataHelper } from "@/helper/fucntions/convertDataHelper";
import { useQuery } from "@tanstack/react-query";

const getDataFunc = async (userId , local) => {
    try {
        const {data , error} = await supabase.from("carts").select("products , total_price").eq("user_id" , userId).single();
        const products = data?.products;
        const totalPrice = data?.total_price;
        if (error) throw error;
        return {products: convertDataHelper(products , local) , total_price : totalPrice}
    }catch(error) {
        if (error) throw error
    }
}

export const useCartData = (userId , local) => {
    return useQuery({
        queryKey : ["cartData" , userId],
        queryFn : () => getDataFunc(userId , local),
        refetchOnWindowFocus : false,
        retry : false,
        enabled : !!userId
    })
}