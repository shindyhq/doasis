import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';

export const metadata: Metadata = {
  title: "D'Oasis Counseling & Coaching | Faith-Rooted Healing for Women",
  description: "D'Oasis is a sanctuary for women navigating grief, identity shifts & faith questions. Book a Clarity Session or 1:1 coaching with certified counselor Oluyemisi.",
  keywords: [
    "faith-based counseling for women",
    "online life coach for women",
    "grief counseling virtual",
    "identity transformation coaching",
    "Christian counselor online",
    "spiritual coaching for women",
    "trauma-informed coaching",
    "women's wellness sanctuary",
    "Oluyemisi counselor",
    "faith and healing coaching",
    "restoration circles group coaching",
    "women navigating transitions",
  ],
  alternates: { canonical: 'https://www.doasiswellness.com' },
  openGraph: {
    title: "D'Oasis | A Sanctuary for Women's Healing & Transformation",
    description: "Faith-rooted, trauma-informed counseling & coaching for women navigating grief, identity, and spiritual growth. Begin your gentle journey today.",
    url: 'https://www.doasiswellness.com',
  },
};
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BadgeCheck, Heart, Shield, Sprout, Globe, Compass } from 'lucide-react';
import { BLOG_POSTS } from '@/data/posts';
import { HomeHeroCarousel } from '@/components/home/HomeHeroCarousel';

export default function Home() {
  return (
    <div className="flex flex-col bg-background selection:bg-accent/20">

      {/* Permanent Hero Carousel */}
      <HomeHeroCarousel />

      {/* About Section - Asymmetrical */}
      <Section className="bg-background relative overflow-visible !py-20 md:!py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="md:col-span-5 relative">
            <Reveal>
              <div className="aspect-[3/4] bg-primary/5 rounded-[40px] overflow-hidden shadow-2xl relative group">
                <Image
                  src="/images/main-home.avif"
                  fill
                  className="object-cover grayscale opacity-80 mix-blend-multiply group-hover:grayscale-0 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-1000"
                  alt="Oluyemisi - D'Oasis Sanctuary"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-1000" />
              </div>
            </Reveal>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent/30 rounded-full blur-[60px]" />
          </div>

          <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center">
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif-italic italic text-primary mb-8 leading-[0.9] tracking-tighter">
                This is your <br />
                <span className="text-secondary">permission to pause.</span>
              </h2>
            </Reveal>
            <div className="space-y-6">
              <p className="text-xl font-display text-primary/90">In a world that glorifies the grind, D&apos;Oasis is where you come to breathe.</p>
              <p className="text-lg font-display text-primary/80">I&apos;m Oluyemisi - a certified counselor and coach who believes transformation happens not in the loud moments, but in the sacred, witnessed ones.</p>
              
              <div className="py-2">
                <p className="mb-4 font-display font-bold uppercase tracking-[0.2em] text-[10px] text-muted">If you&apos;re navigating:</p>
                <ul className="list-none space-y-3 font-display text-primary/70 text-sm md:text-base tracking-wide">
                  <li className="flex items-start gap-3">
                    <span className="text-accent shrink-0">-</span>
                    <span>Grief that won&apos;t follow a timeline</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent shrink-0">-</span>
                    <span>An identity shift that&apos;s left you unmoored</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent shrink-0">-</span>
                    <span>Questions your faith community can&apos;t quite hold</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent shrink-0">-</span>
                    <span>The exhausting work of &apos;unbecoming&apos; who you thought you had to be</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-xl font-display text-primary/90">...then you&apos;re in the right place.</p>
              <p className="text-2xl text-primary font-display italic pt-4">&quot;Here, we don&apos;t rush your healing. We honor it.&quot;</p>
            </div>

            <Link
              href="/about"
              className="mt-12 text-[10px] uppercase tracking-[0.4em] font-display font-bold text-muted hover:text-primary transition-colors flex items-center gap-4 group"
            >
              Explore my story
              <div className="h-[1px] w-12 bg-accent group-hover:w-24 transition-all duration-500" />
            </Link>
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section className="bg-primary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-accent/30" />

        <div className="max-w-4xl mx-auto text-center mb-32 relative z-10">
          <h2 className="text-xs font-display uppercase tracking-[0.4em] font-bold text-accent mb-8 block">The Offerings</h2>
          <h3 className="text-4xl md:text-6xl text-white font-display mb-8 font-medium">Three ways to begin.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 rounded-[60px] overflow-hidden relative z-10 bg-primary">
          {[
            {
              title: "The Clarity Session",
              tag: "For the Fog",
              desc: "For when you need to see the path through the fog. One powerful 90-minute session to untangle overwhelm and chart your next step.",
              detail: "Perfect for first-timers | $120 investment",
              className: "border-b md:border-b-0 md:border-r"
            },
            {
              title: "Becoming: 1:1 Coaching",
              tag: "For the Depth",
              desc: "For when you're ready to go deeper. 6 or 12 weeks of intimate, personalized support as you grow into who you're meant to be.",
              detail: "Weekly sessions + between-session care",
              className: "border-b md:border-b-0 md:border-r"
            },
            {
              title: "Restoration Circles",
              tag: "For Community",
              desc: "For when you need community. Monthly group sessions where women gather to heal, reflect, and rise together.",
              detail: "Virtual gatherings + resources included",
              className: ""
            }
          ].map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.2}
              className={`p-12 md:p-16 flex flex-col items-center text-center group hover:bg-white/5 transition-all duration-500 border-white/10 ${item.className}`}
            >
              <span className="text-[10px] font-display uppercase tracking-[0.4em] text-accent mb-12 block font-bold">{item.tag}</span>
              <h4 className="text-3xl font-display font-medium text-white mb-6 leading-tight">{item.title}</h4>
              <p className="text-white/75 text-lg leading-relaxed mb-12 font-light italic"><em>{item.desc}</em></p>
              <div className="mt-auto pt-8 border-t border-white/10 w-full text-[10px] font-display uppercase tracking-[0.3em] text-white/60 group-hover:text-accent transition-colors font-bold">
                {item.detail}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="flex justify-center mt-24 relative z-10">
          <Link href="/work-with-me" className="group flex items-center gap-6 text-xl font-display text-white/70 hover:text-white transition-all">
            Explore all paths
            <div className="h-[1px] w-8 bg-accent/50 group-hover:w-16 transition-all duration-500" />
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </Section>

      {/* Trust Quote Section */}
      <section className="bg-background py-32 md:py-48 relative px-6">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <span className="text-xs font-display uppercase tracking-[0.4em] font-bold text-muted mb-12 block">A Sacred Witness</span>
          <h2 className="text-3xl md:text-5xl font-display text-primary leading-tight mb-16 px-4">
            &quot;Working with Oluyemisi felt like coming <span className="font-serif-italic text-secondary">home to myself.</span>&quot;
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-left max-w-5xl mx-auto w-full mb-16 px-8">
            {[
              { text: "Certified counselor & mentor", icon: BadgeCheck },
              { text: "Faith-integrated, trauma-informed", icon: Heart },
              { text: "Confidential sanctuary space", icon: Shield },
              { text: "Gently grounded practices", icon: Sprout },
              { text: "Inclusive, culturally-sensitive care", icon: Compass },
              { text: "Flexible virtual availability", icon: Globe }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-start gap-4 group">
                  <div className="p-3 rounded-full bg-accent/20 group-hover:bg-accent/40 transition-colors flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="text-[13px] font-display uppercase tracking-widest text-primary/80 font-semibold leading-relaxed pt-3">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog/Resource Teasers Section */}
      <Section className="bg-background py-32 md:py-40 relative">
        <div className="text-center mb-24">
          <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-muted mb-6 block">From the Journal</h2>
          <h3 className="text-4xl md:text-5xl font-serif-italic text-primary font-light">Reflections for your journey</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
          {BLOG_POSTS.slice(0, 3).map((post, i) => (
            <Reveal
              key={post.title}
              delay={i * 0.15}
            >
              <article className="group relative flex flex-col h-full">
                <Link href={`/blog/${post.slug}`} className="aspect-[4/3] bg-primary/5 rounded-3xl mb-8 overflow-hidden relative block group-teaser">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 mix-blend-multiply group-hover:grayscale-0 group-hover:opacity-100 group-hover:mix-blend-normal group-hover:scale-110 transition-all duration-1000 ease-in-out"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  )}
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-1000" />
                </Link>

                {/* Post Meta */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs uppercase tracking-[0.4em] font-display font-bold text-muted">{post.category}</span>
                  <div className="h-[1px] w-8 bg-primary/10" />
                  <span className="text-xs uppercase tracking-[0.4em] font-display font-bold text-primary/20">{post.readTime}</span>
                </div>

                <h4 className="text-xl md:text-2xl font-display font-medium text-primary mb-4 leading-tight group-hover:text-secondary transition-colors">
                  {post.title}
                </h4>
                <p className="text-primary/80 leading-relaxed mb-6 font-light font-serif italic flex-grow">
                  <em>{post.excerpt}</em>
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-display font-bold text-muted hover:gap-4 transition-all group"
                >
                  Read Reflection
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col items-center gap-8 mt-24">
          <div className="w-16 h-px bg-accent/30" />
          <Link
            href="/blog"
            className="text-xs uppercase tracking-[0.4em] font-display font-bold text-primary/70 hover:text-primary transition-colors"
          >
            Explore the Sanctuary Journal
          </Link>
          <div className="w-16 h-px bg-accent/30" />
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="pb-48">
        <div className="bg-primary rounded-[80px] p-20 md:p-32 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('/images/external/cta-path-fog.avif')] bg-cover opacity-10 grayscale transition-transform duration-[10s] group-hover:scale-110" />

          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-display text-white mb-12 tracking-tighter">Ready to take the <br /><span className="font-serif-italic text-accent">gentle step?</span></h2>
            <p className="text-xl text-white/75 mb-16 max-w-xl mx-auto font-light font-serif italic leading-relaxed">
              <em>You don&apos;t need to have it all figured out to begin.</em>
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Button href="/booking" variant="secondary">
                Begin a Clarity Session
              </Button>
              <Link href="/contact" className="text-white/70 hover:text-white text-[10px] uppercase tracking-[0.4em] font-bold transition-all border-b border-white/20 hover:border-white pb-2">
                Send a Quiet Inquiry
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
