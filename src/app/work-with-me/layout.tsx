import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Work With Me | Counseling & Coaching Services — D'Oasis",
  description: "Explore D'Oasis services: The Clarity Session ($120), Becoming 1:1 Coaching (6 or 12 wks) & Restoration Circles. Faith-rooted support for women's healing.",
  keywords: [
    "D'Oasis counseling services",
    "clarity session coaching",
    "1:1 coaching for women",
    "Becoming coaching program",
    "Restoration Circles group coaching",
    "online coaching women faith",
    "life coaching package prices",
    "faith-based life coach virtual",
    "spiritual coaching sessions",
    "women's group coaching online",
    "identity coaching program",
    "grief coaching women",
    "soul-centered coaching",
  ],
  alternates: { canonical: 'https://doasis.org/work-with-me' },
  openGraph: {
    title: "Counseling & Coaching Services | D'Oasis",
    description: "Three sacred containers for healing: The Clarity Session, Becoming 1:1 Coaching & Restoration Circles. Faith-integrated, trauma-informed, virtual.",
    url: 'https://doasis.org/work-with-me',
  },
};

export default function WorkWithMeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
