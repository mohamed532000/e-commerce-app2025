'use server'
 
import { cookies } from 'next/headers'
 
export async function settingCookies({key , value}) {
  const cookieStore = await cookies()
  cookieStore.set(key , value)
}