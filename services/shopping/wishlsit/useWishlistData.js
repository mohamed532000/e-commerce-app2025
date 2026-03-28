import { supabase } from "@/app/api/supabase/SupabaseClient"
import { convertDataHelper } from "@/helper/fucntions/convertDataHelper";
import { useQuery } from "@tanstack/react-query";

const getFunc = async ({userId , locale , sortingType = "created_at"}) => {
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
        )
        .eq("user_id" , userId)
        .order(
            sortingType,
            {referencedTable : "wishlist_items" , ascending : false}
        )
        .maybeSingle()
        if(error) throw error;
        return {
            id : data?.id || null, 
            products : convertDataHelper(data?.wishlist_items , locale , true) || []
        }

    }catch (error) {
        console.log("error fetching wishlist data" , error)
        return {
            id : null,
            products : []
        }
    }
}


export const useWishlistData = ({userId , locale , sortingType}) => {
    return useQuery({
        queryKey : ['wishlistData' , userId , locale , sortingType],
        queryFn : () => getFunc({userId , locale , sortingType}),
        refetchOnWindowFocus : false,
        enabled : !!userId && !!locale
    })
}