import {getCookie} from "cookies-next/client"
export const readingVisitorId = async () => {
    const visitor_id = getCookie("visitor_id")
    return visitor_id
}