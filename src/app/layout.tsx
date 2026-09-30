import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import JsonLd from '@/components/seo/JsonLd';
import CustomCursor from '@/components/ui/CustomCursor';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hariombhati.com'),
  title: {
    default: 'Hariom Bhati — Performance Marketing & Growth Specialist',
    template: '%s | Hariom Bhati',
  },
  description:
    'Official portfolio of Hariom Bhati, Performance Marketing & Growth Specialist based in Indore, India. Scaling Meta Ads up to 7.25x ROAS, GA4/GTM server-side telemetry, Google Ads, and e-commerce growth funnels.',
  keywords: [
    'Hariom Bhati',
    'Hariom Bhati Performance Marketer',
    'Hariom Bhati Portfolio',
    'Performance Marketing Specialist Indore',
    'Digital Marketing Specialist Indore',
    'Meta Ads Specialist India',
    'Google Ads Specialist Indore',
    'ROAS Optimization Specialist',
    'Server-Side GTM Specialist',
    'GA4 Tracking Expert',
    'D2C Growth Marketer India',
    'Meta Advantage+ Shopping Campaigns',
    'Conversion Rate Optimization',
    'E-Commerce Growth Consultant',
  ],
  authors: [{ name: 'Hariom Bhati', url: 'https://hariombhati.com' }],
  creator: 'Hariom Bhati',
  publisher: 'Hariom Bhati',
  alternates: {
    canonical: 'https://hariombhati.com',
  },
  openGraph: {
    title: 'Hariom Bhati — Performance Marketing & Growth Specialist',
    description:
      'Scaling Meta Ads up to 7.25x ROAS. GA4/GTM server-side tracking, e-commerce D2C growth, and automated lead funnels.',
    url: 'https://hariombhati.com',
    siteName: 'Hariom Bhati — Portfolio',
    images: [
      {
        url: '/hariom-bhati.jpg',
        width: 1200,
        height: 630,
        alt: 'Hariom Bhati - Performance Marketing Specialist',
      },
    ],
    locale: 'en_IN',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hariom Bhati — Performance Marketing & Growth Specialist',
    description:
      'Scaling Meta Ads up to 7.25x ROAS. GA4 & CAPI telemetry, D2C e-commerce growth.',
    images: ['/hariom-bhati.jpg'],
    creator: '@hariombhati',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: (process.env.NEXT_PUBLIC_BASE_PATH || '') + '/favicon.ico',
    apple: (process.env.NEXT_PUBLIC_BASE_PATH || '') + '/hariom-bhati.jpg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-white selection:text-black`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="bg-[#080808] text-[#F9FAFB] font-sans min-h-screen overflow-x-hidden">
        {/* GSAP Custom Cursor */}
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
