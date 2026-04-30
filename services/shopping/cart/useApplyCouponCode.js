import { supabase }  from "@/app/api/supabase/SupabaseClient"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const applyFunc = async ({cartId , userId , code}) => {
    try {
        const {data:couponData , error:getCouponError} = await supabase.rpc("apply_coupon" , {
            p_cart_id: cartId,
            p_user_id: userId,
            p_coupon_code: code
        })
        if(getCouponError) throw getCouponError;
        if(!couponData.success) throw new Error(couponData.message)
        return couponData
    }catch (error) {
        console.log("error applying coupon is:" , error)
        throw error
    }
}

export const useApplyCouponCode = () => {
    return useMutation({
        mutationKey : ["applyCouponCode"],
        mutationFn : ({cartId , userId , code}) => applyFunc({cartId , userId , code}),
        onSuccess : () => {
            console.log("success getting coupon data");
            toast.success("success appling coupon")
        },
        onError : (error) => {
            console.log("error getting coupon data");
            toast.error(error.message)
        },
    })
}