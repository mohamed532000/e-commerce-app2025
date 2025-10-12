"use client"
import { supabase } from "@/app/api/supabase/SupabaseClient";
import { useUserData } from "@/services/auth/useUserData";
import { useCartData } from "@/services/shopping/useCartData";
import { useLocale } from "next-intl";
import { createContext , useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const authContext = createContext();

export const AuthProvider = ({children}) => {
    const currentLocal = useLocale();
    const [session , setSession] = useState();
    const {data:profileData , isPending:getProfileLoading} = useUserData(session?.user?.id);
    const {data:cartData , isPending:getCartLoading} = useCartData(session?.user?.id , currentLocal);
    const [getSessionLoading , setGetSessionLoading] = useState(true);
    const getSession = async () => {
        try {
            console.log("getting session")
            supabase.auth.getSession().then(({data : {session}}) => {
                if(session) {
                    setSession(session)
                }
            })
        }catch (error) {
            toast.error(error)
        }finally {
            setGetSessionLoading(false)
        }
    }
    useEffect(() => {
        getSession();
        const {data:authListener} = supabase.auth.onAuthStateChange((_e , session) => {
            setSession(session)
        })
        return () => {authListener.subscription.unsubscribe()}
    },[])
    useEffect(() => console.log("render happen") , [])
    useEffect(() => console.log(cartData) , [cartData])
    return (
        <authContext.Provider value={
            {
                getSessionLoading,
                session,
                getProfileLoading,
                profile:profileData,
                cart : cartData,
                cartLoading : getCartLoading,
            }
            }>
            {children}
        </authContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(authContext)
}