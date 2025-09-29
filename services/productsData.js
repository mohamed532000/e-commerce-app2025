import { supabase } from "@/app/api/supabase/SupabaseClient"
import { convertDataHelper } from "@/helper/fucntions/convertDataHelper";
import { cache } from "react";

export const productsCount = cache(async() => {
    try {
        const {error , count} = await supabase.from("products").select("*" , {count : "exact" , head : true})
        if(error) throw error;
        return {count}
    }catch(error) {
        console.log("error fetching data" , error)
    }
})

// export const productsData = cache(async (locale , filterData) => {
//     console.log(filterData)
//     let query = supabase.from("products").select("*")
//     if(filterData.search !== "") {
//         query = query.or(`title->>en.ilike.%${filterData.search}%,title->>ar.ilike.%${filterData.search}%,description->>en.ilike.%${filterData.search}%,description->>ar.ilike.%${filterData.search}%`)
//     }
//     if(filterData.have_discount === true) {
//         query.gt("discount_amount" , 0);
//     }else if(filterData.have_discount === false) {
//         query.eq("discount_amount" , 0);
//     }
//     if(filterData.category_id !== "") {
//         console.log("no empty category id ");
//         query = query.eq("category_id" , filterData.category_id.toString())
//     }
//     if(filterData.price !== "all") {
//         query = query.order("price_after_discount" , {ascending : filterData.price === "low-to-high"})
//     }
//     try {
//         const {data , error} = await query.range(filterData.range.from , filterData.range.to)
//         if(error) throw error;
//         return {data : convertDataHelper(data , locale)}
//     }catch(error) {
//         console.log("error fetching data" , error)
//     }
// })
export const productsData = cache(async (locale , filterData) => {
    console.log(filterData)
    let query = supabase.from("products").select("*")
    if(filterData.search !== "" && filterData.search !== undefined) {
        query = query.or(`title->>en.ilike.%${filterData.search}%,title->>ar.ilike.%${filterData.search}%,description->>en.ilike.%${filterData.search}%,description->>ar.ilike.%${filterData.search}%`)
    }else {
        query = query
    }
    if(filterData.have_discount === true) {
        query.gt("discount_amount" , 0);
    }else if(filterData.have_discount === false) {
        query.eq("discount_amount" , 0);
    }else if(!filterData.have_discount) {
        query = query
    }
    if(filterData.category_id !== "") {
        console.log("no empty category id ");
        query = query.eq("category_id" , filterData.category_id.toString())
    }
    if(filterData.price !== "all" || !filterData.price) {
        query = query.order("price_after_discount" , {ascending : filterData.price === "low-to-high"})
    }else {
        query = query
    }
    try {
        const {data , error} = await query.range(filterData.range.from , filterData.range.to)
        if(error) throw error;
        return {data : convertDataHelper(data , locale)}
    }catch(error) {
        console.log("error fetching data" , error)
    }
})