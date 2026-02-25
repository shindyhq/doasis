import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "FAQs | Counseling, Coaching & Booking Questions — D'Oasis",
  description: "Answers to common questions about D'Oasis Counseling & Coaching: difference between counseling & coaching, insurance, scheduling, cancellation & faith inclusivity.",
  keywords: [
    "counseling vs coaching difference",
    "faith-based coaching FAQ",
    "is D'Oasis insurance accepted",
    "online coaching questions",
    "how to book counseling session",
    "cancellation policy coaching",
    "Christian counseling for non-Christians",
    "virtual counseling questions",
    "life coach FAQ women",
    "D'Oasis frequently asked questions",
    "spiritual coaching for doubters",
    "women's therapy questions",
  ],
  alternates: { canonical: 'https://doasis.org/faqs' },
  openGraph: {
    title: "FAQs | D'Oasis Counseling & Coaching",
    description: "Clarity before commitment. Answers to your questions about coaching, counseling, insurance, scheduling & faith integration at D'Oasis.",
    url: 'https://doasis.org/faqs',
  },
};

export default function FAQsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
