'use client'
 
import { useTranslations } from 'next-intl';
 
export default function Error({ error, reset }) {
  const globalT = useTranslations("global")
  return (
    <div>
      <h2>{globalT("Something went wrong")}</h2>
      <button
        onClick={() => reset()}
      >
        {globalT("Try again")}
      </button>
    </div>
  )
}