import MotionItem from "@/components/MotionItem";
export default function H2Item ({id , name }) {
    return <MotionItem>
        <h2  key={id} className={`transition-all duration-500 text-stone-50`}>{id} - {name}</h2>
    </MotionItem>
}