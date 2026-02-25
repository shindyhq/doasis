import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Book a Session | D'Oasis Counseling & Coaching",
  description: "Book your D'Oasis session online: Clarity Session ($120), free 15-min consultation, Restoration Circles ($45) or apply for 1:1 coaching. Secure, confidential booking.",
  keywords: [
    "book online counseling session",
    "schedule life coaching appointment",
    "book clarity session women",
    "free consultation life coach",
    "online coaching booking",
    "book faith-based therapy",
    "women's coaching appointment",
    "D'Oasis booking calendar",
    "Restoration Circles signup",
    "book virtual counseling",
    "schedule coaching session women",
  ],
  alternates: { canonical: 'https://www.doasiswellness.com/booking' },
  openGraph: {
    title: "Book a Session | D'Oasis Counseling & Coaching",
    description: "Your next chapter starts here. Book a Clarity Session, free consultation, or group Restoration Circle — secure, confidential, and designed for your pace.",
    url: 'https://www.doasiswellness.com/booking',
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
