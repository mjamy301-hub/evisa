import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/MainNav";
import SecondaryNav from "@/components/SecondaryNav";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/currentUser";
import { SWRProvider } from "@/providers/SWRProvider";
import GlobalLoader from "./_components/GlobalLoader";

const getMontserrat = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "evisa.welcometoserbiagovrs",
  description: "Welcome to serbia",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const me = await getCurrentUser();
  const fallback = {
    "/api/auth/me": me ? { success: true, data: me } : { success: false },
  };

  return (
    <html lang="en">
      <body
        className={`${getMontserrat.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalLoader />
        <MainNav />
        <SecondaryNav />
        <SWRProvider fallback={fallback}>{children}</SWRProvider>
        <Footer />
      </body>
    </html>
  );
}
