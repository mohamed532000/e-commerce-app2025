"use server"
import { cookies } from "next/headers";
export const checkUserPermission = async () => {
    const cookiesStore = await cookies();
    const avilable_guests_orders = cookiesStore.get("avilable_guests_orders")?.value == "true"; // true
    const authToken = cookiesStore.get("sb-iosmuuvlhcijqehsluji-auth-token")?.value; // user token

    if(!avilable_guests_orders && !authToken) {
        return { allowed : false }
    }else {
        return { allowed : true }
    }
}