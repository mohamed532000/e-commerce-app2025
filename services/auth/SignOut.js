import { supabase } from "@/app/api/supabase/SupabaseClient";
import { useRouter } from "@/i18n/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRedirectIfNotAuth } from "./useRedirectIfNotAuth";
import { useTranslations } from "next-intl";

const SignOut = async () => {
    try {
        const {error} = await supabase.auth.signOut();
        if(error) {
            throw error
        }
        return error
    }catch (error) {
        throw error
    }
}

export const useSignOut = () => {
    const router = useRouter()
    const globalT = useTranslations("global");
    return useMutation({
        mutationKey : ['signout'],
        mutationFn : SignOut,
        onError : (error) => toast.error(error.message),
        onSuccess : () => {
            useRedirectIfNotAuth(router)
            toast.success(globalT("Logout successfully"))
        }
    })
}