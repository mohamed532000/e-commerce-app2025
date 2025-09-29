"use client"
import { supabase } from "@/app/api/supabase/SupabaseClient";
import { useUserData } from "@/services/auth/useUserData";
import { createContext , useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const authContext = createContext();

export const AuthProvider = ({children}) => {
    const [session , setSession] = useState();
    const {data:profileData , isPending:getProfileLoading} = useUserData(session?.user?.id);
    const [getSessionLoading , setGetSessionLoading] = useState(true);
    const getSession = async () => {
        try {
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
    return (
        <authContext.Provider value={
            {
                getSessionLoading,
                session,
                getProfileLoading,
                profile:profileData,
            }
            }>
            {children}
        </authContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(authContext)
}