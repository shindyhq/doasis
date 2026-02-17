'use client';

import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ShieldCheck, ArrowRight, Heart, Sparkles, Coffee, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="bg-background pt-32 pb-16">
      <div className="bg-grain fixed inset-0 opacity-[0.03] z-[100] pointer-events-none" />

      {/* Editorial Hero / Brand Story Section */}
      <section className="relative min-h-[90vh] flex items-center px-4 md:px-12 bg-[#FDFBF7] py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-accent" />
                <span className="text-xs uppercase tracking-[0.4em] font-display font-bold text-accent">
                  The Heart Behind D'Oasis
                </span>
              </div>
              <h1 className="text-5xl md:text-[clamp(65px,8vw,110px)] leading-[0.9] font-serif italic text-primary tracking-tighter mb-12">
                Before I held space for others, I needed someone to <br />
                <span className="text-secondary opacity-80">hold space for me.</span>
              </h1>
              <p className="text-2xl font-serif font-light text-primary/60 leading-relaxed max-w-xl border-l-[3px] border-accent/20 pl-12 py-4 mb-16">
                And that's exactly why D'Oasis exists. A premium sanctuary for women navigating the deep waters of faith, grief, and the reclamation of self.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-12 items-center">
                <Link 
                  href="/booking" 
                  className="group flex items-center gap-8 text-[12px] uppercase tracking-[0.5em] font-display font-bold text-primary hover:text-accent transition-all"
                >
                  Start your journey
                  <div className="relative w-24 h-px bg-primary/10 group-hover:w-36 group-hover:bg-accent transition-all duration-700" />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 relative">
            <Reveal delay={0.3}>
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative group">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5 }}
                  src="/images/external/hero-unbecoming-window.jpg" 
                  className="w-full h-full object-cover grayscale opacity-90 sepia-[0.2]" 
                  alt="Sophisticated sanctuary"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                <div className="absolute inset-8 border border-white/20 rounded-[20px] pointer-events-none" />
              </div>
            </Reveal>
            <div className="absolute -top-12 -left-12 text-[180px] font-serif italic text-primary/5 select-none pointer-events-none">O</div>
          </div>
        </div>
      </section>

      {/* Section 1: The Story with Portrait */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-start">
          <div className="md:col-span-5 relative">
            <Reveal x={-20} y={0}>
              <div className="aspect-[3/4] bg-primary/5 rounded-[100px] rounded-tl-none overflow-hidden relative shadow-2xl">
                 <img 
                   src="/images/portrait-of-oluyemisi.jpg" 
                   className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                   alt="Portrait of Oluyemisi"
                 />
                 <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />
              </div>
            </Reveal>
             <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -z-10" />
            
            {/* Sidebar Testimonial */}
            <div className="mt-12 p-8 bg-white border border-secondary/10 rounded-3xl shadow-sm relative z-10 hidden md:block">
               <p className="font-serif italic text-primary/80 mb-6 leading-relaxed">
                 "Oluyemisi sees you—not the version you think you should be, but the person you actually are. And somehow, in that seeing, you start to see yourself differently too."
               </p>
               <cite className="text-xs uppercase tracking-widest font-bold text-accent not-italic block">— M.T., Clarity Session Client</cite>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7 pt-0">
            <div className="space-y-8 text-lg text-primary/80 leading-relaxed font-serif font-light">
              <h2 className="text-3xl font-display text-primary mb-6">Hi, I'm Oluyemisi.</h2>
              <p>
                I'm the woman people instinctively confided in long before I had the certifications to match the calling.
              </p>
              <p>
                Over shared meals, late-night phone calls, and quiet moments after church, I became the safe space where others could unravel without judgment. Where questions about faith, identity, and belonging could breathe. Where tears were welcomed, not rushed.
              </p>
              <p>
                But here's what I learned through my own seasons of uncertainty:
              </p>
              <p className="text-xl font-medium text-primary italic border-l-2 border-accent/20 pl-6 py-2">
                Holding space isn't just about listening—it's about creating room for transformation.
              </p>
              <p>
                I've walked through my own wilderness—loss that reshaped me, transitions that terrified me, and the slow, sacred work of becoming someone I didn't know I was allowed to be. Those seasons taught me that healing doesn't follow a linear path. That strength can be soft. That sometimes the bravest thing you can do is ask for help.
              </p>
              <p>
                So I became certified. I studied trauma-informed care, coaching methodologies, and culturally sensitive practices. I built the frameworks to match the intuition. And I created D'Oasis—a place where women don't have to shrink, perform, or pretend.
              </p>
              <p className="font-bold text-primary">
                Because you deserve more than surface-level support. <br/>
                <span className="font-normal">You deserve to be witnessed in your wholeness.</span>
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* The Approach Section */}
      <Section className="bg-primary py-32 md:py-48 my-32 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/external/about-approach-stars.jpg')] bg-cover bg-fixed grayscale" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-8 block">My Approach</h2>
            <h3 className="text-4xl md:text-5xl text-white font-serif italic">How I work is as important as what I do.</h3>
          </div>
          
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
             {[
               {
                 title: "🌿 Faith Integration",
                 desc: "Your spirituality isn't separate from your healing; it's central to it. I honor your beliefs while creating space for honest questions."
               },
               {
                 title: "🌿 Cultural Sensitivity",
                 desc: "Your identity, background, and lived experience matter. I see you in context, not in isolation."
               },
               {
                 title: "🌿 Gentle Accountability",
                 desc: "Growth requires both compassion and clarity. I'll never push, but I will lovingly challenge you toward your truth."
               },
               {
                 title: "🌿 Trauma-Informed Care",
                 desc: "Safety first, always. Your nervous system, your pace, and your boundaries guide our work together."
               },
               {
                 title: "🌿 Holistic Perspective",
                 desc: "You're not a problem to fix. You're a whole person navigating a complex season, and every part of you is welcome here."
               },
               {
                 title: "🌿 Sacred Witnessing",
                 desc: "I show up fully to witness you, not to fix you. Healing happens in the sacred space where you feel truly seen and held."
               }
             ].map((item) => (
                <div key={item.title} className="group p-8 rounded-[40px] hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                  <h4 className="text-2xl font-display font-medium text-accent mb-6">{item.title}</h4>
                  <p className="text-white/80 leading-relaxed font-light">{item.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </Section>

      {/* Credentials */}
      <Section className="mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-24 items-start">
          <div className="md:col-span-4 sticky top-32">
            <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-8 block">Credentials</h2>
            <h3 className="text-4xl font-display font-medium text-primary mb-8 leading-tight">
              What qualifies me to <br /> <span className="font-serif italic text-secondary">walk beside you.</span>
            </h3>
            <p className="text-primary/80 font-serif italic text-lg leading-relaxed">
              "But more than credentials, I bring a lived understanding of what it means to rebuild yourself. A deep respect for your timeline. And an unshakable belief that your healing is not only possible—it's already beginning."
            </p>
          </div>
          
          <div className="md:col-span-7 md:col-start-6">
            <ul className="divide-y divide-primary/5">
              {[
                "Certified Professional Life Coach",
                "Licensed Counselor [*insert state/credentials*]",
                "Trauma-Informed Care Training",
                "Spiritual Formation Practitioner",
                "500+ hours supporting women through transitions, grief, and identity transformation"
              ].map((cert) => (
                <li key={cert} className="py-8 flex justify-between items-center group cursor-default">
                  <span className="text-xl md:text-2xl font-serif text-primary/85 group-hover:text-primary transition-colors">{cert}</span>
                  <ShieldCheck className="w-6 h-6 text-accent/20 group-hover:text-accent transition-all transform group-hover:rotate-12" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Beyond The Sessions - New Section */}
      <Section className="mb-32">
        <div className="bg-[#f8f6f2] rounded-[60px] p-12 md:p-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display text-primary mb-12 text-center">When I'm not in session...</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 font-serif font-light text-primary/85 text-lg">
                <p className="flex gap-4">
                  <Coffee className="shrink-0 text-accent" size={20} />
                  You'll find me journaling with my morning coffee, usually asking God big questions.
                </p>
                <p className="flex gap-4">
                  <Sparkles className="shrink-0 text-accent" size={20} />
                  Creating resources for women who need gentle reminders they're not alone.
                </p>
                <p className="flex gap-4">
                  <BookOpen className="shrink-0 text-accent" size={20} />
                  Reading everything from theology to poetry to psychology (and finding the threads between them).
                </p>
                <p className="flex gap-4">
                  <Heart className="shrink-0 text-accent" size={20} />
                  Advocating for mental health awareness in faith communities.
                </p>
                <p className="flex gap-4">
                  <ShieldCheck className="shrink-0 text-accent" size={20} />
                  Protecting my own peace as fiercely as I protect my clients' space.
                </p>
              </div>
              <div className="relative">
                 <div className="aspect-square bg-white rounded-full overflow-hidden border border-secondary/5 rotate-3 hover:rotate-0 transition-all duration-700 shadow-xl group">
                    <img 
                      src="/images/journal.jpg" 
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                      alt="Journaling coffee moments"
                    />
                 </div>
              </div>
            </div>
            <p className="text-center mt-16 text-primary font-medium italic">
              "You can't pour from an empty cup, and healing work requires healers who are also committed to their own restoration."
            </p>
          </div>
        </div>
      </Section>

      {/* Who This Is For - New Section */}
      <Section className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <div>
            <h2 className="text-2xl font-display font-medium text-primary mb-8">D&apos;Oasis is for you if:</h2>
            <ul className="space-y-6">
              {[
                "You're navigating a transition that's left you unmoored (divorce, relocation, career shift, empty nest)",
                "You're grieving something or someone, and the world's timelines don't match yours",
                "You're questioning beliefs you once held tightly, and you need a safe place to explore",
                "You're exhausted from performing, and you're ready to discover who you are underneath",
                "You're a woman of faith who needs support that honors both your spirituality and your humanity",
                "You've tried therapy before, but you're looking for something more holistic and heart-centered"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 text-primary/85 leading-relaxed group">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0 group-hover:scale-150 transition-transform" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-accent/10 rounded-[40px] p-12 border border-accent/20 shadow-sm group hover:bg-accent/20 transition-colors duration-700">
            <h2 className="text-2xl font-display font-medium text-primary mb-8 opacity-60">This space might not be for you if:</h2>
            <p className="text-primary/80 leading-relaxed font-serif text-lg">
              You&apos;re seeking quick fixes, cookie-cutter advice, or someone to tell you what to do. My work is collaborative, reflective, and requires your active participation. We&apos;ll go at your pace—but we will go deep.
            </p>
          </div>
        </div>
      </Section>

      {/* Final CTA Area */}
      <Section className="pt-24">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-display font-medium text-primary mb-12 tracking-tighter">
            Still wondering if this is <br/> <span className="font-serif italic text-secondary">the right fit?</span>
          </h2>
          <p className="text-xl text-primary/80 mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Let's talk. No pressure, no sales pitch—just a genuine conversation about where you are and where you want to go.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
             <Link 
              href="/booking" 
              className="bg-primary text-background px-12 py-5 rounded-full text-xs uppercase tracking-[0.3em] font-bold hover:bg-accent hover:text-white transition-all shadow-xl"
            >
              Schedule Free Consultation
            </Link>
            <Link 
              href="/contact" 
              className="text-primary/80 hover:text-primary text-xs uppercase tracking-[0.3em] font-bold transition-all border-b border-primary/20 hover:border-primary pb-2"
            >
              Send Me a Message
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
