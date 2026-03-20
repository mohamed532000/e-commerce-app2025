import { supabase } from "@/app/api/supabase/SupabaseClient"
import { convertDataHelper } from "@/helper/fucntions/convertDataHelper";
import { useQuery } from "@tanstack/react-query";

const getFunc = async ({userId , locale}) => {
    try{
        const {data , error} = await supabase.from("wishlists").select(
            `
                id,
                wishlist_items(
                    id,
                    wishlist_id,
                    product_id,
                    products(*)
                )
            `
        ).eq("user_id" , userId).maybeSingle();
        if(error) throw error;
        return {id : data?.id , products : convertDataHelper(data?.wishlist_items , locale , true) || []}

    }catch (error) {
        console.log("error fetching wishlist data" , error)
    }
}


export const useWishlistData = ({userId , locale}) => {
    return useQuery({
        queryKey : ['wishlistData'],
        queryFn : () => getFunc({userId , locale}),
        refetchOnWindowFocus : false,
        enabled : !!userId && !!locale
    })
}