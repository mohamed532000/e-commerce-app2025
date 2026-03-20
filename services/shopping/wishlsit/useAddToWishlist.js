import { supabase } from "@/app/api/supabase/SupabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


const handleInsertWishlistItem = async ({item , wId}) => {
    const {data , error:insertWishlistItemError} = await supabase.from("wishlist_items").insert(
    {
        product_id: item.id ,
        wishlist_id : wId
    }).select().single();

    if (insertWishlistItemError) throw insertWishlistItemError
    return data
}


// function to create new cart then insert target item inside this cart
const handleCreateNewWishlistAndAddItem = async ({item , uId}) => {
    const {data : wishlistData , error : insertCartError} = await supabase.from("wishlist").insert({
        user_id: uId
    })
    .select().single();

    if (insertCartError) throw insertCartError;
    await handleInsertWishlistItem({item , wId : wishlistData?.id});
    return wishlistData;
}

const addingFunc = async ({item , wishlistId , userId}) => {
    if(userId) {
        if(!wishlistId) {
            await handleCreateNewWishlistAndAddItem({item , uId : userId})
        }else {
            await handleInsertWishlistItem({item , wId : wishlistId})
        }
    }else {
        const {data : {session , user} , error:signInAnonError} = await supabase.auth.signInAnonymously();
        if (signInAnonError) throw signInAnonError
        await handleCreateNewWishlistAndAddItem({item , uId : user.id})
        return user;
    }
}

export const useAddToWishlist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey : ['adding-to-wishlist'],
        mutationFn : ({item , wishlistId , userId}) => addingFunc({item , wishlistId , userId}),
        onSuccess : () => {
            toast.success("Item added successfully");
            queryClient.invalidateQueries(['wishlistData'])
        },
        onError : (error) => {
            console.log(error)
            toast.error("Something error happen");
        }
    })
}