import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteSEO } from "@/data/content";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteSEO.baseUrl),
  title: {
    default: siteSEO.homeSEO.title,
    template: "%s | Kami Aesthetics",
  },
  description: siteSEO.homeSEO.description,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    siteName: siteSEO.siteName,
    type: "website",
    images: [{ url: siteSEO.defaultOgImage, width: 1200, height: 630, alt: "Kami Aesthetics — Laser Hair Removal & Med Spa Aventura" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
