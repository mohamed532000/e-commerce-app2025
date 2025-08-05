// "use client"
// import { useEffect, useState } from "react"

// export default function H2Item ({id , name , index}) {
//     const [mounted , setMounted] = useState(false)
//     // useEffect(() => setMounted(true) , [])
//     useEffect(() => {
//         const timeout = setTimeout(() => {
//           setMounted(true);
//         }, index * 100); // stagger by 100ms per index
    
//         return () => clearTimeout(timeout);
//       }, []);
//       console.log("mounted")
//     return <h2  key={id} className={`transition-all duration-500 text-stone-50 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-1.5"}`}>{id} - {name}</h2>
// }
import MotionItem from "@/components/MotionItem";

export default function H2Item ({id , name , index}) {
    return <MotionItem>
        <h2  key={id} className={`transition-all duration-500 text-stone-50`}>{id} - {name}</h2>
    </MotionItem>
}