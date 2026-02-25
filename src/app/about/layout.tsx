import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Oluyemisi",
  description: "Meet Oluyemisi—certified counselor, faith-integrated coach & sacred witness to women's healing. Discover her story, approach & credentials at D'Oasis.",
  keywords: [
    "Oluyemisi counselor",
    "about D'Oasis",
    "faith-integrated counselor for women",
    "trauma-informed care background",
    "Christian counselor biography",
    "spiritual direction women",
    "certified life coach women",
    "cultural sensitivity counseling",
    "women's healing coach",
    "holistic wellness counselor",
    "identity reclamation coach",
    "grief support specialist",
  ],
  alternates: { canonical: 'https://doasis.org/about' },
  openGraph: {
    title: "About Oluyemisi | The Heart Behind D'Oasis",
    description: "Certified counselor & coach Oluyemisi created D'Oasis as a premium sanctuary for women navigating faith, grief, and the reclamation of self.",
    url: 'https://doasis.org/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
