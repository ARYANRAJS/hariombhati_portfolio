import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Hariom Bhati — Performance Marketing & Growth Specialist",
  description:
    "Bridging creative storytelling and data-backed performance marketing. Scaling Meta Ads up to 7.25x ROAS, GA4/GTM server-side tracking, and automated lead funnels.",
  keywords: [
    "Performance Marketing",
    "Meta Ads",
    "Google Ads",
    "GA4",
    "GTM",
    "ROAS",
    "D2C Marketing",
    "Growth Specialist",
    "Hariom Bhati",
  ],
  authors: [{ name: "Hariom Bhati" }],
  openGraph: {
    title: "Hariom Bhati — Performance Marketing & Growth Specialist",
    description:
      "Scaling Meta Ads up to 7.25x ROAS. GA4/GTM tracking. Automated lead funnels.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-[#0B0F17] text-[#F9FAFB] font-sans min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
