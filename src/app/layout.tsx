import type { Metadata } from 'next';
import { Outfit, Cormorant_Garamond, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';


const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  style: ['normal', 'italic']
});
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair' 
});

export const metadata: Metadata = {
  title: {
    default: "D'Oasis Counseling & Coaching",
    template: "%s | D'Oasis",
  },
  description: "Faith-integrated counseling & coaching for women navigating grief, identity shifts & spiritual growth. Trauma-informed, culturally sensitive, virtual sessions.",
  keywords: [
    "faith-based counseling for women",
    "Christian life coach",
    "trauma-informed coaching",
    "grief counseling online",
    "identity transformation coaching",
    "spiritual direction for women",
    "D'Oasis counseling",
    "Oluyemisi coach",
    "faith and wellness coaching",
    "virtual counseling for women",
    "women's healing sanctuary",
    "spiritual resilience coaching",
    "life transitions counselor",
  ],
  authors: [{ name: "Oluyemisi | D'Oasis" }],
  creator: "D'Oasis Counseling & Coaching",
  publisher: "D'Oasis Counseling & Coaching",
  metadataBase: new URL('https://doasis.org'),
  alternates: { canonical: 'https://doasis.org' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://doasis.org',
    siteName: "D'Oasis Counseling & Coaching",
    title: "D'Oasis | Faith-Rooted Healing for Women",
    description: "Faith-integrated counseling & coaching for women navigating grief, identity shifts & spiritual growth. Trauma-informed, culturally sensitive, virtual sessions.",
  },
  twitter: {
    card: 'summary_large_image',
    title: "D'Oasis Counseling & Coaching",
    description: "Faith-integrated counseling & coaching for women navigating grief, identity shifts & spiritual growth. Trauma-informed, culturally sensitive, virtual sessions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

import { MotionProvider } from '@/components/ui/MotionProvider';
import { ToastProvider } from '@/components/ui/Toast';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground selection:bg-accent/20 selection:text-primary">
        <MotionProvider>
          <ToastProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Analytics />
            <SpeedInsights />
          </ToastProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
