import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://motifly.vercel.app"), // Replace with your domain

  title: {
    default: "motifly AI — AI Image Editing & Optimization Tools",
    template: "%s | motifly AI",
  },

  description:
    "Edit, enhance, compress, resize, convert, and optimize images with powerful AI tools. Fast, secure, and free online image editing for creators, businesses, and developers.",

  keywords: [
    "AI image editor",
    "image compressor",
    "image enhancer",
    "background remover",
    "resize images",
    "convert images",
    "image optimizer",
    "online image editor",
    "AI photo editor",
    "compress JPG",
    "compress PNG",
    "WebP converter",
    "AVIF converter",
    "image converter",
    "free image tools",
    "photo editing",
    "image upscaler",
    "Next.js image editor",
    "motifly AI",
  ],

  authors: [
    {
      name: "motifly AI",
    },
  ],

  creator: "motifly AI",
  publisher: "motifly AI",

  applicationName: "motifly AI",

  category: "Technology",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://motifly.vercel.app",
    siteName: "motifly AI",
    title: "motifly AI — AI Image Editing & Optimization Tools",
    description:
      "Professional AI-powered image editing tools to compress, enhance, resize, convert, and optimize your images online.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "motifly AI",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "motifly AI — AI Image Editing & Optimization Tools",
    description:
      "Powerful AI tools for image editing, compression, enhancement, resizing, and conversion.",
    images: ["/og-image.png"],
    creator: "@motiflyai",
  },

  icons: {
    icon: "/motifly_favicon.svg",
    shortcut: "/motifly_favicon.svg",
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}