import { supabase } from "@/app/api/supabase/SupabaseClient"
import { cache } from "react"
const convertDataHelper = (data , locale) => {
    return data.map(item => (
        {
            ...item,
            name : item.name[locale],
            sub_categories : convertDataHelper(item.sub_categories , locale)
        }
    ))
}
// export const categoriesData = async (locale) => {
//     try {
//         const {data , error} = await supabase.from("categories").select("*");
//         console.log(data)
//         if(error) throw error
//         return {data : convertDataHelper(data , locale)}
//     }catch (error) {
//         console.log("error fetching data" , error)
//     }
// }
export const categoriesData = cache(async (locale) => {
    try {
        const {data , error} = await supabase.from("categories").select("*");
        if(error) throw error
        return {data : convertDataHelper(data , locale)}
    }catch (error) {
        console.log("error fetching data" , error)
    }
})