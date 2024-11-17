import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/constants";
import ThemeRegistry from "@/providers/ThemeRegistry";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/logo.webp", type: "image/webp", sizes: "32x32" },
    ],
    apple: [{ url: "/images/logo.webp", sizes: "180x180" }],
  },
};

const shabnamFont = localFont({
  src: [
    {
      path: "fonts/Shabnam.woff",
      weight: "normal",
    },
    {
      path: "fonts/Shabnam-Bold.woff",
      weight: "bold",
    },
  ],
  variable: "--font-shabnam",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/webp" href="/images/logo.webp" />
        <link rel="apple-touch-icon" href="/images/logo.webp" />
      </head>
      <body className={shabnamFont.className}>
        <ThemeRegistry locale="fa">
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
