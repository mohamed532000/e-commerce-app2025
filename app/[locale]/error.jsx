'use client' // Error boundaries must be Client Components
 
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  const globalT = useTranslations("global")
  useEffect(() => {
    // Log the error to an error reporting service
    console.log("error is: " , error)
  }, [error])
 
  return (
    <div>
      <h2>{globalT("Something went wrong!")}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        {globalT("Try again")}
      </button>
    </div>
  )
}