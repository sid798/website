import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import { VersionSwitch } from "@/components/version-switch";
import { defaultFont } from "@/lib/draft-ui";
import { fontKey } from "@/lib/fonts";
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

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Siddharth Thorat",
    template: "%s — Siddharth Thorat",
  },
  description: siteDescription,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
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

const defaultFontLiteral = JSON.stringify(defaultFont);
const restoreFont = `try{var k=${JSON.stringify(fontKey)},d=${defaultFontLiteral},f=localStorage.getItem(k);if(f==="f1"&&d==="f2")f=d;if(f)document.documentElement.dataset.font=f;else document.documentElement.dataset.font=d}catch(e){document.documentElement.dataset.font=${defaultFontLiteral}}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-font={defaultFont}
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
