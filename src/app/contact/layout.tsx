import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact D'Oasis | Book a Session or Send an Inquiry",
  description: "Reach out to D'Oasis Counseling & Coaching. Send an inquiry, book a session, or ask about speaking engagements. Confidential & compassionate response within 24–48 hrs.",
  keywords: [
    "contact D'Oasis",
    "book counseling session online",
    "schedule coaching appointment",
    "speaking inquiry wellness",
    "faith-based counselor contact",
    "online coaching inquiry women",
    "D'Oasis wellness contact form",
    "book clarity session",
    "speaking engagements faith communities",
    "connect with life coach",
    "women's therapy inquiry",
  ],
  alternates: { canonical: 'https://doasis.org/contact' },
  openGraph: {
    title: "Contact D'Oasis | Let's Connect",
    description: "Questions, session bookings, or speaking inquiries — reach out to D'Oasis Counseling & Coaching. We respond personally within 24–48 business hours.",
    url: 'https://doasis.org/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
