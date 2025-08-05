import {defineRouting} from 'next-intl/routing';
import usaFlag from "../app/media/images/flags/usa.png";
import egyFlag from "../app/media/images/flags/egy.webp";
export const locales = [
  {locale : "ar" , flag : egyFlag},
  {locale : "en" , flag : usaFlag}
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
    "/login" : {
      en : "/login",
      ar : "/تسجيل دخول"
    },
    "/register" : {
      en : "/register",
      ar : "/انشاء حساب"
    },
  },
});