import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
// export default createMiddleware(routing);
export default createMiddleware({
  ...routing,
  localeDetection: false  // ✅ disables browser language detection
});
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // matcher: '/((?!|trpc|_next|_vercel|.*\\..*).*)'
  matcher: ['/', '/(en|ar)/:path*']
};