import { supabase } from "@/app/api/supabase/SupabaseClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const handleCreateNewUser = async ({signUpData , user}) => {
    try {
        const {error} = await supabase.from("users").insert({
            id : user.id,
            name : signUpData.name,
            email : signUpData.email,
            phone : signUpData.phone,
            image_url : "https://i.pinimg.com/1200x/b0/0f/ab/b00fabb62602ae0746f7dd13a1ee8f61.jpg"
        })
        if(error) {
            toast.error(error.message);
        }
    }catch (error) {
        if(error) {
            toast.error(error.message);
        }
        return {error}
    }
}
export  const signUpUser = async ({signUpData}) => {
    try {
        console.log(signUpData)
        const phoneNumber = `${signUpData.phone.replace(/\D/g, '')}`;
        const {data : {user , session} , error} = await supabase.auth.signUp(
            {
                email : signUpData.email , 
                password : signUpData.password , 
                options : {
                    data : {
                        phone : phoneNumber , 
                        name : signUpData.name , 
                        displayName : signUpData.name
                    }
                }
            }
        )
        if(error) {
            throw error
        }
        if(user) {
            handleCreateNewUser({signUpData , user});
        }
        return {user , session}
    } catch (error) {
        throw error
    }
}

export const useSignUp = () => {
    return useMutation({
        mutationKey : ['signUp'],
        mutationFn : ({signUpData}) => signUpUser({signUpData}),
        onError : (error) => toast.error(error.message)
    })
}