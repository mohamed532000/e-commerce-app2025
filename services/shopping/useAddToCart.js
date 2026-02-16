import { supabase } from "@/app/api/supabase/SupabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const addToCartFunc = async ({item , translate}) => {
    try {
        const {error} = await supabase.from("cart_items").insert(item);
        if (error) {
            error.translate = translate
            throw error
        }
        return translate
    }catch (error) {
        throw error
    }
}

export const useAddToCart = (userId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey : ['addToCart' , userId],
        mutationFn : ({item , translate}) => addToCartFunc({item , translate}),
        onSuccess : (translate) => {
            toast.success(translate("Added successfully"))
            // reftech cart data after add item*****
            queryClient.invalidateQueries('cartData')
        },
        onError : (error) => {
            const translate = error.translate;
            if (error.code === "23505") {
                toast.error(translate("Item is already exist"))
                return;
            };
            toast.error(translate("Something went wrong"))
        }
    })
}


// import { supabase } from "@/app/api/supabase/SupabaseClient";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";

// const addToCartFunc = async ({item , successAction , translate}) => {
//     try {
//         console.log("item will adding is :" , item)
//         const {error} = await supabase.from("cart_items").insert(item);
//         if (error) throw error;
//         return {successAction , translate}
//     }catch (error) {
//         if (error) throw error
//     }
// }

// export const useAddToCart = (userId) => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationKey : ['addToCart' , userId],
//         mutationFn : ({item , successAction , translate}) => addToCartFunc({item , successAction , translate}),
//         onSuccess : (successAction) => {
//             console.log(successAction)
//             toast.success(translate("Added successfully"));
//             queryClient.invalidateQueries('cartData');
//         },
//         // mutationFn : ({prevItems , newItem , translate}) => addToCartFunc({prevItems , newItem , translate , userId}),
//         // onSuccess : (translate) => {
//         //     toast.success(translate("Added successfully"))
//         //     queryClient.invalidateQueries('cartData')
//         // },
//         onError : (error) => toast.error(error.message)
//     })
// }