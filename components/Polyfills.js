// components/Polyfills.js
import { useEffect } from 'react'

export default function Polyfills() {
  useEffect(() => {
    if (needsPolyfills()) {
      import('dynamic-polyfill').then(polyfill => {
        polyfill.default()
      })
    }
  }, [])
  return null
}