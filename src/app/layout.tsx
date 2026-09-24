import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";

import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

// Heading font (applied to h1–h6 in globals.css)
const estiana = localFont({
  src: "./fonts/AVEstiana-Regular.otf",
  variable: "--font-estiana",
  weight: "400",
  display: "swap",
});

// Display serif for highlighted words in headings (see components/landing/accent.tsx)
const jaguar = localFont({
  src: "./fonts/Jaguar.otf",
  variable: "--font-jaguar",
  weight: "400",
  display: "swap",
});

const siteUrl = "https://motifly.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Motifly | Free Online Image Compressor & Media Tools",
    template: "%s | Motifly",
  },
  description:
    "Compress PNG, JPEG, and WebP images instantly in your browser without sacrificing quality. Fast, secure, and privacy-focused online image optimization tool.",
  icons: ["/favicon.svg"],
  keywords: [
    "image compressor",
    "compress image online",
    "png optimizer",
    "webp converter",
    "reduce image size",
    "free media tools",
  ],
  authors: [{ name: "Motifly Team", url: siteUrl }],
  creator: "Motifly",
  publisher: "Motifly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Motifly | Free Online Image Compressor & Media Tools",
    description: "Compress PNG, JPEG, and WebP images instantly in your browser without sacrificing quality.",
    siteName: "Motifly",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Motifly - Browser-based Image Compression",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Motifly | Free Online Image Compressor",
    description: "Compress images locally in your browser with zero upload wait times.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interTight.variable} ${estiana.variable} ${jaguar.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
