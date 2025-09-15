// import { createClient } from '@supabase/supabase-js'
// import {createPagesBrowserClient} from "@supabase/auth-helpers-nextjs"
// export const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL, 
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// )
import { createClient } from '@supabase/supabase-js'
import {createPagesBrowserClient} from "@supabase/auth-helpers-nextjs"
export const supabase = createPagesBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL, 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)