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
  title: "D'Oasis | Faith-Rooted Counseling & Coaching",
  description: "Gentle, grounded support for women navigating grief, identity shifts, and spiritual growth.",
};

import { MotionProvider } from '@/components/ui/MotionProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground selection:bg-accent/20 selection:text-primary">
        <MotionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
