import { cookies } from "next/headers";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";

export const createSupabaseServerClient = () => createServerComponentClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {cookies}
)