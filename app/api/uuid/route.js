import { cookies } from "next/headers"

export async function GET() {
    const cookieStore = await cookies();
    const uuid = cookieStore.get("uuid");
    if(!uuid) {
        const uuid = crypto.randomUUID();
        cookieStore.set("uuid" , uuid)
    }
    return Response.json({uuid})
}