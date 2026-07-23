import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/footer";
import { BackgroundBlur } from "@/components/ui/background-blur";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <BackgroundBlur className="-top-40 md:top-0" />

        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
