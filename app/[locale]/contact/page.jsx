import { useTranslations } from 'next-intl'
import React from 'react'

function Contact() {
    const t = useTranslations("contactPage")
    return (
        <div>{t("contact us")}</div>
    )
}

export default Contact