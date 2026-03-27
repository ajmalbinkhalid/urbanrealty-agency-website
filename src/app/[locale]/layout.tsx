import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./../globals.css";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { AuthProvider } from "@/provider/auth-provider";
import GoogleMapsProvider from "@/provider/google-map-provider";
import QueryProvider from "@/provider/query-client-provider";
import RouteProgressProvider from "@/provider/route-progress-provider";
import Footer from "./_layout/Footer";
import Header from "./_layout/Header";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Urban Realty Agency",
  description: "Urban Realty Website For Agency",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html dir={direction} lang={locale} suppressHydrationWarning>
      <body
        className={`${jost.variable} bg-white antialiased`}
        style={{ fontFamily: "var(--font-jost)" }}
      >
        <NextIntlClientProvider>
          <RouteProgressProvider>
            <GoogleMapsProvider>
              <QueryProvider>
                <AuthProvider>
                  <Header />
                  <main>{children}</main>
                  <Footer />
                  <Toaster />
                </AuthProvider>
              </QueryProvider>
            </GoogleMapsProvider>
          </RouteProgressProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
