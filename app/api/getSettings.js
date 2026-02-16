import axios from "axios"

export const getSettings = async () => {
    const res = await axios.get("http://localhost:3000/api/settings")
    console.log(res)
}