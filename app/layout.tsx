import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import { VersionSwitch } from "@/components/version-switch";
import { fontKey } from "@/lib/fonts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Siddharth Thorat",
  description: "Designer working across brand, product, motion, print, space and code.",
};

const restoreFont = `try{var f=localStorage.getItem(${JSON.stringify(fontKey)});if(f)document.documentElement.dataset.font=f}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-svh bg-paper text-ink">
        <script dangerouslySetInnerHTML={{ __html: restoreFont }} />
        {children}
        <VersionSwitch />
      </body>
    </html>
  );
}
