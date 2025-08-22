import createMiddleware from 'next-intl/middleware';
// import { NextResponse } from 'next/server';
import { routing } from './i18n/routing'; // your next-intl routing config
// import { getToken } from 'next-auth/jwt'; // if using NextAuth

export const middleware = createMiddleware({
  ...routing,
  localeDetection: false
});

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

export const config = {
  matcher: [
    '/',              // Root
    '/(en|ar)',       // Locale root
    '/(en|ar)/:path*' // Locale + any path
  ]
};