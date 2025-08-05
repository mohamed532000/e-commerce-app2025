import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
// export default createMiddleware(routing);
export default createMiddleware({
  ...routing,
  localeDetection: false  // ✅ disables browser language detection
});
 
export const config = {
  // matcher: [
  //   '/((?!api|_next|_vercel|.*\\..*).*)' // Catch everything except API, _next, etc.
  // ]

  matcher: ['/', '/(en|ar)/:path*']
  // matcher: [
  //   '/',              // Root
  //   '/(en|ar)',       // Locale root
  //   '/(en|ar)/:path*' // Locale + any path
  // ]
};