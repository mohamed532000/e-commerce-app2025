"use client"
import axios from 'axios'
import { useEffect } from 'react'

function GenerateUUID() {
    useEffect(() => {
        // this func from route and used it to can set the uuid to cookies with route handler.
        const generateUUIDFunc = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/uuid`)
        } 
        generateUUIDFunc()
    },[])
    return ;
}

export default GenerateUUID