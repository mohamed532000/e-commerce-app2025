import { supabase } from "@/app/api/supabase/SupabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


const handleInsertCartItem = async ({item , cId}) => {
    const {data , error:insertCartItemError} = await supabase.from("cart_items").insert(
    {
        product_id: item.product_id ,
        quantity : item.quantity , 
        cart_id : cId
    }).select().maybeSingle();

    if (insertCartItemError) throw insertCartItemError
    return data
}


// function to create new cart then insert target item inside this cart
const handleCreateNewCartAndAddItem = async ({item , uId}) => {
    const {data : cartData , error : insertCartError} = await supabase.from("carts").insert({
        user_id: uId,
        status : "pending",
    })
    .select().maybeSingle();

    if (insertCartError) throw insertCartError;
    await handleInsertCartItem({item , cId : cartData?.id});
    return cartData;
}


const addingFunc = async ({item , cartId , userId}) => {

    if(userId) {
        if(!cartId) {
            await handleCreateNewCartAndAddItem({item , uId : userId})
        }else {
            await handleInsertCartItem({item , cId : cartId})
        }
    }else {
        const {data : {session , user} , error:signInAnonError} = await supabase.auth.signInAnonymously();
        if (signInAnonError) throw signInAnonError
        await handleCreateNewCartAndAddItem({item , uId : user.id})
        return user;
    }
}

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey : ['adding-to-cart'],
        mutationFn : ({item , cartId , userId}) => addingFunc({item , cartId , userId}),
        onSuccess : (data, variables, context) => {
            toast.success("Item added successfully");
            queryClient.invalidateQueries(["cartData"]);
        },
        onError : (error) => {
            console.log(error)
            toast.error("Something error happen");
        }
    })
}