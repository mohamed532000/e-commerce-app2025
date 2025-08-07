import "../globals.css";
import { Geist, Geist_Mono} from "next/font/google";
import Navbar from "@/components/Navbar";
import AppThemeProvider from "@/components/theme/ThemeProvider";
import { NextIntlClientProvider , hasLocale } from "next-intl";
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { getTranslations } from "next-intl/server";
import Footer from "@/components/ui/Footer";
import Head from "next/head";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <Head>
        {/* Preload critical CSS (non-blocking) */}
        <link
          rel="preload"
          href="/styles/above-the-fold.css"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet';"
        />
        <noscript>
          <link rel="stylesheet" href="/styles/above-the-fold.css" />
        </noscript>
      </Head>
      <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <NextIntlClientProvider>
           <AppThemeProvider>
             <Navbar/>
             {children}
             <Footer/>
           </AppThemeProvider>
         </NextIntlClientProvider>
      </body>
    </html>
  );
}
