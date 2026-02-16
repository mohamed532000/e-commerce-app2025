import "../globals.css";
import { Geist, Geist_Mono} from "next/font/google";
import Navbar from "@/components/Navbar";
import AppThemeProvider from "@/components/theme/ThemeProvider";
import { NextIntlClientProvider , hasLocale } from "next-intl";
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { getTranslations } from "next-intl/server";
import Footer from "@/components/ui/Footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthProvider";
import ReactQueryContext from "@/context/ReactQueryContext";
import SmootherProvider from "@/context/SmootherProvider";
import axios from "axios";
import GenerateUUID from "@/helper/GenerateUUID";

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
  // const settings = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/settings` , {withCredentials : true});

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning
    >
      <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <ReactQueryContext>
          <NextIntlClientProvider>
            <AuthProvider>
              <AppThemeProvider>
                  <Navbar/>
                  {/* <SmootherProvider> */}
                    {children}
                    {/* <Footer locale={locale}/> */}
                  {/* </SmootherProvider> */}
                  {/* <GenerateUUID/> */}
                  <Toaster position={"top-center"}/>
              </AppThemeProvider>
            </AuthProvider>
          </NextIntlClientProvider>
        </ReactQueryContext>
      </body>
    </html>
  );
}
