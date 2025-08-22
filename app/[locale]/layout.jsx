import "../globals.css";
import { Geist, Geist_Mono} from "next/font/google";
import Navbar from "@/components/Navbar";
import AppThemeProvider from "@/components/theme/ThemeProvider";
import { NextIntlClientProvider , hasLocale } from "next-intl";
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { getTranslations } from "next-intl/server";
import Footer from "@/components/ui/Footer";
// import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display : "swap"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display : "swap"
});
export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return {
    title : t("title"),
    description : t("description"),
    icons: { icon: "/favicon.ico" },
  }
}
export default async function LocaleLayout({ children , params}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning
    >
      <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <AuthProvider> */}
          <NextIntlClientProvider>
           <AppThemeProvider>
             <Navbar/>
             {children}
             <Footer/>
             <Toaster/>
           </AppThemeProvider>
         </NextIntlClientProvider>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
