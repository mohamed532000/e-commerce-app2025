import { NextResponse } from "next/server";
const products = [
    {id: 1 , name : "Dog"}, 
    {id: 2 , name : "Cat"},
    {id: 3 , name : "Black Dog"},
]
export async function GET() {
    return NextResponse.json({
        products,
    })
}