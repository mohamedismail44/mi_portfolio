import "../../styles/globals.css";
import AppHeader from "./components/shared/AppHeader";
import AppFooter from "./components/shared/AppFooter";
import UseScrollToTop from "./hooks/useScrollToTop";
import { ToastContainer } from "react-toastify";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
export const metadata = {
  title: "Mohamed Ismail Portfolio",
  description: "Fullstack Development",
};
export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body style={{ direction: locale === "ar" ? "rtl" : "ltr" }}>
        <NextIntlClientProvider>
          <div className="bg-secondary-light dark:bg-primary-dark transition duration-300">
            <ToastContainer theme="colored" position="top-center" />
            <AppHeader />
            {children}
            <AppFooter />
            <UseScrollToTop />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
