"use client"
import axios from 'axios';
import { useEffect } from 'react'

function SetCookies() {
    useEffect(() => {
        // used this func to set cookies on the server with calling route handler
        const callSetRoute = async () => {
            const settings = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/settings`);
        }
        callSetRoute()
    },[])
    return ;
}

export default SetCookies