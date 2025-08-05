import axios from "axios"
export const getProducts = async () => {
    let loading = true
    const res = await axios.get("http://localhost:3000/api/products");
    loading = false
    return {data : res.data , loading}
}