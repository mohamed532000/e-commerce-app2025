"use client"
import { supabase } from "@/app/api/supabase/SupabaseClient";
import { useUserProfileData } from "@/helper/fucntions/userProfile";
// import { userProfile } from "@/helper/fucntions/userProfile";
import { createContext , useContext, useEffect, useState } from "react";

const authContext = createContext();

export const AuthProvider = ({children}) => {
    const [session , setSession] = useState(null);
    // const [profile , setProfile] = useState(null);
    // const {data:profileData , isLoading:getProfileLoading} = useUserProfileData(session?.user?.id);
    const {data:profileData} = useUserProfileData();
    const [profileLoading , setProfileLoading] = useState(true);
    useEffect(() => {
        supabase.auth.getSession().then(({data : {session}}) => {
            if(session) {
                setSession(session)
                const {user} = session;
                console.log(user)
            }else {
                console.log("there is no session")
            }
        })
        const {data:authListener} = supabase.auth.onAuthStateChange((_e , session) => {
            setSession(session)
        })
        return () => {authListener.subscription.unsubscribe()}
    },[])
    // useEffect(() => {
    //     getProfileLoading ? setProfileLoading(true) : setProfileLoading(false);
    // },[getProfileLoading])
    return (
        <authContext.Provider value={
            {
                session,
                // profileLoading,
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