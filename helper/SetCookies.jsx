"use client"
import axios from 'axios';
import { useLocale } from 'next-intl';
import { useEffect } from 'react'

function SetCookies() {
    const currentLocale = useLocale();
    useEffect(() => {
        // used this func to set cookies on the server with calling route handler
        const callSetRoute = async () => {
            // const settings = await axios.get(`${process.env.NEXT_PUBLIC_URL}/${currentLocale}/api/settings`);
            const settings = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/settings`);
        }
        callSetRoute()
    },[])
    return ;
}

export default SetCookies