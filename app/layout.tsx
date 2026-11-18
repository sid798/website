import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteDescription, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Siddharth Thorat — Brand and Product Designer",
    template: "%s — Siddharth Thorat",
  },
  description: siteDescription,
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Siddharth Thorat",
    title: "Siddharth Thorat",
    description: siteDescription,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Siddharth Thorat — Designer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddharth Thorat",
    description: siteDescription,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-svh bg-paper text-ink">
        {children}
        <Analytics />
      </body>
    </html>
  );
}