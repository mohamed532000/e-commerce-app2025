import { supabase } from "@/app/api/supabase/SupabaseClient";
import { cookies } from "next/headers";

export async function GET() {
  const cookiesStore = await cookies()
  const { data , error } = await supabase
  .from("user_panel_settings")
  .select("*")
  .single();
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  cookiesStore.set("avilable_guests_orders" , data.avilable_guests_orders)

  return Response.json({ settings: data });
}
