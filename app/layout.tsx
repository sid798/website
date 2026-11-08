import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { VersionSwitch } from "@/components/version-switch";
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
  title: "Siddharth Thorat",
  description: "Designer working across brand, product, motion, print, space and code.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-svh bg-paper text-ink">
        {children}
        <VersionSwitch />
      </body>
    </html>
  );
}
