import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing'; // your next-intl routing config
import { NextResponse } from "next/server";
// import { createSupabaseServerClient } from "@/app/api/supabase/server";
import {createMiddlewareClient} from "@supabase/auth-helpers-nextjs";
// export const middleware = createMiddleware({
//   ...routing,
//   localeDetection: false
// });

// export default async function middleware(request) {
//   const intlResponse = intlMiddleware(request);
//   if (intlResponse) {
//     const {pathname} = new URL(request.url);
//     const decodePathname = decodeURIComponent(pathname)
//     const pathesNames = request.nextUrl.pathname.split("/").filter(item => item !== "");
//     const currentLocale = pathesNames[0];
//     const protectRoutes = [
//       `/${currentLocale}${routing.pathnames['/profile'][currentLocale]}`
//     ];
//     const isLogedIn = await getToken({req : request});
//     const isProtectRoute = protectRoutes.some(route => decodePathname.startsWith(route));
//     const isAuthRoute = pathname.startsWith(`/${currentLocale}/auth`);

//     if(!isLogedIn && isProtectRoute) {
//       return NextResponse.redirect(new URL(`/${currentLocale}/auth/login` , request.url))
//     }
//     if(isLogedIn && isAuthRoute) {
//       return NextResponse.redirect(new URL(`/${currentLocale}/home` , request.url))
//     }
//     return intlResponse;
//   }
//   return NextResponse.next();
// }

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false
});


export async function middleware(req) { 
  const pathesNames = req.nextUrl.pathname.split("/").filter(item => item !== "");
  const currentLocale = pathesNames[0];

  const intlResponse = intlMiddleware(req);
  const supabase = createMiddlewareClient({ req , res:intlResponse}); 

  const { data: { user } } = await supabase.auth.getUser(); 

  if (!user && req.nextUrl.pathname.startsWith(`/${currentLocale}/user`)) { 
    return NextResponse.redirect(new URL(`/${currentLocale}/auth/login`, req.url));
  }
  if(user && req.nextUrl.pathname.startsWith(`/${currentLocale}/auth`)) {
    return NextResponse.redirect(new URL(`/${currentLocale}/user/profile` , req.url))
  }
  return intlResponse; 
}


export const config = {
  matcher: [
    '/',              // Root
    '/(en|ar)',       // Locale root
    '/(en|ar)/:path*' // Locale + any path
  ]
};