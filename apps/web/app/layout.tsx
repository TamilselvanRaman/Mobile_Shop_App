import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Container } from "@mobile-shop/ui";
import { ClientShell } from "./components/layout/ClientShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "MobileShop — Future Tech In Your Hands",
    template: "%s | MobileShop",
  },
  description:
    "Buy the latest smartphones, premium accessories, and book expert repair services. MobileShop — your trusted local mobile store.",
  keywords: [
    "mobile shop",
    "smartphones",
    "phone repair",
    "accessories",
    "iPhone",
    "Samsung",
    "mobile services",
  ],
  authors: [{ name: "MobileShop" }],
  creator: "MobileShop",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    { media: "(prefers-color-scheme: light)", color: "#6366f1" },
  ],
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mobiles-shop-services.netlify.app",
    siteName: "MobileShop",
    title: "MobileShop — Future Tech In Your Hands",
    description:
      "Buy the latest smartphones, accessories, and book expert repair services.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "MobileShop Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "MobileShop — Future Tech In Your Hands",
    description: "Buy smartphones, accessories, and book expert repairs.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 antialiased`}>
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  );
}
