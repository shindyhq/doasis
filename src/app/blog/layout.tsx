import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "The Sanctuary Journal | Reflections on Faith, Grief & Becoming — D'Oasis",
  description: "Curated reflections on faith deconstruction, embodied rest & the sacred beauty of the messy middle. Soul-nourishing reads from D'Oasis Counseling & Coaching.",
  keywords: [
    "faith deconstruction blog",
    "Christian wellness journal",
    "grief healing articles",
    "spiritual growth blog for women",
    "identity transformation reflections",
    "D'Oasis sanctuary journal",
    "faith and mental health blog",
    "embodied rest spirituality",
    "women's devotional blog",
    "soul care articles",
    "healing journey writing",
    "spiritual formation women",
  ],
  alternates: { canonical: 'https://www.doasiswellness.com/blog' },
  openGraph: {
    title: "The Sanctuary Journal | D'Oasis Counseling & Coaching",
    description: "Words for the becoming. Curated reflections on faith, grief, identity & the sacred beauty of the messy middle.",
    url: 'https://www.doasiswellness.com/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
