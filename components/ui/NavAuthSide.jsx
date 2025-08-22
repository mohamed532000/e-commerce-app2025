// import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
// import SpinLoading from './SpinLoading';
// import RegisterBtn from './RegisterBtn';
import UserDropdown from './UserDropdown';
// import { toast } from 'sonner';
// import { useTranslations } from 'next-intl';
// import { Link } from '@/i18n/navigation';

function NavAuthSide() {
    // const {data , status} = useSession();
    // const t = useTranslations("global")
    // useEffect(() => {
    //     if(status === "unauthenticated") {
    //         toast(<span>{t("You are not login")} <Link href={'/auth/login'} className=' underline'>{t("login")}</Link></span>);
    //     }else {
    //         toast(t("Logged in successfully"));
    //     }
    // },[status])
    // if(status === "loading") return <SpinLoading/>
    // if(status === "unauthenticated") return <RegisterBtn/>
    // return <UserDropdown data={data}/>
    return <UserDropdown/>
}

export default NavAuthSide

