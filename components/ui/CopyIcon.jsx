import React, { useState } from 'react'
import { IoCopyOutline } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { toast } from 'sonner';
import HandleTranslate from '@/helper/HandleTranslate';

function CopyIcon({className , text , successText}) {
    const [isCopied , setIsCopied] = useState(false)
    const handleCopy = async () => {
        if(!isCopied) {
            try {
                await navigator.clipboard.writeText(text);
                setIsCopied(true)
                setTimeout(() => setIsCopied(false) , 10000);
                toast.success(successText ? successText : <HandleTranslate word={"Text copied successfully"} page={"glopal"} />)
            }catch (error) {
                console.log("faild copy" , error)
            }
        }
    }

    return (
        isCopied
        ?
        <IoMdCheckmark className={`${className}`}/>
        :
        <IoCopyOutline className={`${className}`} onClick={handleCopy}/>
    )
}

export default CopyIcon