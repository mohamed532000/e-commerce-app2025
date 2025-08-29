import {defineRouting} from 'next-intl/routing';
export const locales = [
  {locale : "ar" , flag : `/flags/egy.webp`},
  {locale : "en" , flag : `/flags/usa.png`}
]
export const navList = [
  {label : "home" , href : "/"},
  {label : "about" , href : "/about"},
  {label : "contact" , href : "/contact"},
]
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ar'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  pathnames : {
    "/" : {
      en : "/home",
      ar : "/الرئيسية"
    },
    "/contact" : {
      en : "/contact",
      ar : "/اتصال"
    },
    "/about" : {
      en : "/about",
      ar : "/عنا"
    },
    "/auth/login" : {
      en : "/auth/login",
      ar : "/مصادقة/تسجيل دخول"
    },
    "/auth/register" : {
      en : "/auth/register",
      ar : "/مصادقة/انشاء حساب"
    },
    "/products" : {
      en : "/products",
      ar : "/منتجات"
    },
    "/profile" : {
      en : "/profile",
      ar : "/الملف الشخصي"
    },
  },
  localePrefix : "always"
});