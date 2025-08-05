import { useTranslations } from "next-intl"

export default function HandleTranslate({page , word}) {
    const t = useTranslations(page);
    try {
        return <>{t(word , {default : ""})}</>
    }catch(e) {
        if(process.env.NODE_ENV === "development") {
            console.warn(`[Missing translation] ${page}.${word}`);
            return <></>
        }
    }
}