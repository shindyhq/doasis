'use client';

import { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Instagram, Globe, MessageCircle, AlertCircle, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import Image from 'next/image';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="bg-background pt-32 pb-32 md:pb-48 selection:bg-accent/20">
      <div className="bg-grain fixed inset-0 opacity-[0.03] z-[100] pointer-events-none" />

      {/* Hero Section - Sanctuary Style */}
      <Section className="mb-20 md:mb-24">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.5em] font-display font-medium text-accent mb-8 block">
              The Conversation
            </span>
            <h1 className="text-6xl md:text-[clamp(65px,9vw,130px)] font-display font-medium text-primary leading-[0.9] tracking-tighter mb-10">
              Let&apos;s <br />
              <span className="font-playfair italic text-secondary font-light">connect.</span>
            </h1>
            <p className="text-xl md:text-2xl font-serif font-light text-primary/60 leading-relaxed max-w-2xl mx-auto italic text-balance">
              Whether you have questions, want to book a session, or just need to reach out—I&apos;m here to listen.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Main Content Grid */}
      <Section className="mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 xl:gap-24 items-start">
          
          {/* Left Column: Direct Inquiries */}
          <div className="lg:col-span-5 space-y-16">
            <Reveal delay={0.2}>
              <div className="space-y-12">
                <section>
                  <h2 className="text-[10px] uppercase tracking-[0.4em] font-display font-bold text-accent mb-10 border-l-2 border-accent/30 pl-6">
                    Where to Find Me
                  </h2>
                  <div className="space-y-10 pl-6">
                    <div className="group">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-2 block font-display font-bold">Email Inquiries</span>
                      <a href="mailto:hello@doasiswellness.com" className="text-2xl md:text-3xl font-display text-primary hover:text-accent transition-all duration-300 block italic leading-tight decoration-accent/20 underline decoration-1 underline-offset-8">
                        hello@<br className="sm:hidden" />doasiswellness.com
                      </a>
                    </div>

                    <div className="group">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-2 block font-display font-bold">Community</span>
                       <a href="https://instagram.com/doasis.wellness" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-2xl font-playfair italic text-primary/70 hover:text-accent transition-all duration-300">
                        <Instagram className="w-5 h-5 text-accent/60" />
                        @doasis.wellness
                      </a>
                    </div>

                    <div className="group pt-4 border-t border-primary/10">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-3 block font-display font-bold">Office Hours (EST)</span>
                      <div className="text-[17px] font-serif font-light text-primary/70 space-y-2 italic leading-relaxed">
                        <p>Tuesday – Friday: 9am – 6pm</p>
                        <p>Saturday: By specialized appointment</p>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="bg-accent/[0.03] rounded-[40px] p-8 md:p-10 border border-accent/5 shadow-inner-white">
                  <div className="flex gap-5 items-start">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xs font-display font-bold text-primary/80 mb-2 uppercase tracking-widest">Supportive Presence</h3>
                      <p className="text-base text-primary/60 font-serif italic leading-relaxed">
                        I personally read and respond to every message within 24-48 business hours. If you&apos;re in crisis, please see the safety resources below.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Connection Form */}
          <div className="lg:col-span-7 xl:col-span-7">
            <Reveal delay={0.4}>
              <div className="glass p-10 md:p-14 lg:p-16 rounded-[48px] xl:rounded-[64px] border border-white/50 shadow-editorial relative overflow-hidden group">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-all duration-1000" />
                
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-display font-bold text-primary/50 mb-10 relative z-10">Send an inquiry</h2>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2.5">
                      <label htmlFor="first-name" className="text-[10px] uppercase tracking-[0.3em] text-primary/60 pl-2 font-display font-bold">First Name</label>
                      <input id="first-name" name="first-name" type="text" placeholder="Your name" className="w-full bg-white/60 border border-black/[0.08] rounded-2xl h-14 px-6 focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-playfair italic text-lg outline-none placeholder:text-primary/20 shadow-sm" required />
                    </div>
                    <div className="space-y-2.5">
                      <label htmlFor="last-name" className="text-[10px] uppercase tracking-[0.3em] text-primary/60 pl-2 font-display font-bold">Last Name</label>
                      <input id="last-name" name="last-name" type="text" placeholder="Your surname" className="w-full bg-white/60 border border-black/[0.08] rounded-2xl h-14 px-6 focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-playfair italic text-lg outline-none placeholder:text-primary/20 shadow-sm" required />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] text-primary/60 pl-2 font-display font-bold">Email Address</label>
                    <input id="email" name="email" type="email" placeholder="email@example.com" className="w-full bg-white/60 border border-black/[0.08] rounded-2xl h-14 px-6 focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-playfair italic text-lg outline-none placeholder:text-primary/20 shadow-sm" required />
                  </div>

                  <fieldset className="space-y-4">
                    <legend className="text-[10px] uppercase tracking-[0.3em] text-primary/60 pl-2 font-display font-bold mb-4 block">What are you reaching out about?</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {[
                        'Book a Clarity Session', 
                        'Apply for 1:1 Coaching', 
                        'Speaking Inquiry', 
                        'Just Saying Hi'
                      ].map(option => (
                        <label key={option} className="flex items-center gap-4 cursor-pointer group py-3 px-5 rounded-xl bg-white/40 hover:bg-white/70 transition-all border border-black/[0.03] hover:border-accent/30 shadow-sm">
                          <input type="checkbox" name="inquiry-type" value={option} className="w-4 h-4 rounded-sm border-primary/20 text-accent focus:ring-accent/30" />
                          <span className="text-sm font-light text-primary/80 font-playfair italic leading-none">{option}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="space-y-2.5">
                    <label htmlFor="message" className="text-[10px] uppercase tracking-[0.3em] text-primary/60 pl-2 font-display font-bold">Your Message</label>
                    <textarea id="message" name="message" className="w-full bg-white/60 border border-black/[0.08] rounded-[32px] p-8 focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-playfair italic text-lg h-44 outline-none resize-none placeholder:text-primary/20 shadow-sm" placeholder="Share what&apos;s on your mind..." required></textarea>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" variant="primary" className="w-full h-16 group relative overflow-hidden shadow-xl" disabled={isSubmitting}>
                      <span className={isSubmitting ? 'opacity-0' : 'opacity-100 flex items-center justify-center gap-3 transition-opacity'}>
                        Send Your Inquiry
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      {isSubmitting && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span className="ml-3 font-display text-[10px] uppercase tracking-widest font-bold">Sending...</span>
                        </div>
                      )}
                    </Button>
                    <p className="text-[10px] uppercase tracking-widest text-primary/30 mt-8 text-center font-display font-bold">
                      * All communication is securely encrypted and confidential. *
                    </p>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Collaboration Section */}
      <Section className="my-32 px-4 md:px-0">
        <div className="max-w-6xl mx-auto bg-primary/[0.02] border border-primary/10 rounded-[60px] overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
            <div className="aspect-[4/3] md:aspect-square bg-primary/5 relative group order-2 md:order-1 overflow-hidden">
              <Image 
                src="/_doc/images/contact-collab.jpg" 
                alt="Collaboration and Speaking" 
                fill 
                className="object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-30 group-hover:opacity-10 transition-opacity" />
              <div className="absolute inset-0 bg-grain opacity-[0.05]" />
              <div className="absolute bottom-8 left-8">
                <div className="w-16 h-16 rounded-full glass flex items-center justify-center">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
              </div>
            </div>
            
            <div className="p-12 md:p-20 space-y-8 order-1 md:order-2">
              <Reveal>
                <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-4">
                  <span className="w-1 h-1 rounded-full bg-accent" />
                  <span className="text-[9px] uppercase tracking-[0.4em] font-display font-bold text-accent">Expand the Light</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display text-primary leading-[1.1] mb-6">Speaking & <br /><span className="font-playfair italic text-secondary font-light">Collaborations</span></h2>
                <p className="text-xl font-serif text-primary/60 italic leading-relaxed mb-10">
                  I offer talks and workshops for faith communities and wellness organizations on grief, transitions, and spiritual resilience.
                </p>
                <Link href="/speaking" className="group flex items-center gap-5 text-[10px] uppercase tracking-[0.4em] font-display font-bold text-primary hover:text-accent transition-all duration-300">
                  Learn more about speaking
                  <div className="w-10 h-px bg-primary/10 group-hover:w-16 group-hover:bg-accent transition-all duration-500" />
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ & Support Sanctuary */}
      <Section className="my-24">
        <div className="max-w-5xl mx-auto space-y-24">
          <div className="text-center relative">
            <div className="absolute inset-x-0 top-1/2 h-px bg-primary/5 -z-10" />
            <h2 className="text-[10px] uppercase tracking-[0.5em] font-display font-bold text-accent bg-background px-8 inline-block mb-12">Frequent Questions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                "Coaching & Counseling",
                "Insurance & Payments",
                "Cancellation Policy",
                "Scheduling Fit"
              ].map((q) => (
                <Link key={q} href="/faq" className="group p-6 md:p-8 rounded-3xl hover:bg-accent/[0.03] transition-all border border-transparent hover:border-accent/10 shadow-sm hover:shadow-md">
                  <p className="text-sm font-playfair italic text-primary/60 group-hover:text-accent transition-colors">
                    {q}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-12">
              <Button href="/faq" variant="outline" className="h-11 px-10 text-[9px] rounded-full border-primary/20 hover:border-accent hover:bg-accent/5">
                View All FAQs
              </Button>
            </div>
          </div>

          <Reveal>
            <div className="bg-[#14231b] rounded-[60px] p-12 md:p-20 border border-white/5 relative overflow-hidden shadow-editorial-dark">
              <div className="absolute top-0 right-0 p-12 opacity-[0.07]">
                <AlertCircle className="w-32 h-32 text-white" />
              </div>
              <div className="max-w-2xl relative z-10">
                <span className="text-[9px] uppercase tracking-[0.5em] font-display font-bold text-accent mb-8 block">Safety First</span>
                <h3 className="text-3xl md:text-5xl font-display text-white mb-8 leading-tight">If you are <br />in crisis</h3>
                <p className="text-xl font-serif italic text-white/70 leading-relaxed mb-12">
                  If you are experiencing a mental health emergency, please reach out to the <strong className="text-accent underline decoration-accent/40 underline-offset-8">988 Suicide & Crisis Lifeline</strong> (call or text 988) or visit your nearest emergency room. I am not able to provide immediate crisis intervention via this form.
                </p>
                <div className="flex flex-wrap gap-10 items-center">
                  <a href="tel:988" className="group flex items-center gap-4 text-xs md:text-sm uppercase tracking-[0.3em] font-display font-bold text-white hover:text-accent transition-colors">
                    <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:scale-110 transition-all">
                      988
                    </span>
                    Call or Text 988
                  </a>
                  <a href="https://988lifeline.org" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.4em] font-display font-bold text-white/40 hover:text-white border-b border-white/10 hover:border-white transition-all pb-1">
                    Visit Website
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Bottom Booking CTA - Sanctuary Path */}
      <Section className="mt-32 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-px h-20 bg-gradient-to-b from-primary/5 to-accent/40 mx-auto mb-14" />
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-display text-primary mb-8 tracking-tighter">Skip the <span className="font-playfair italic text-secondary font-light">form?</span></h2>
            <p className="text-xl md:text-2xl font-serif text-primary/60 mb-14 italic font-light">Direct booking for consultations is always available.</p>
            <Button href="/booking" variant="secondary" className="px-16 h-18 text-xs shadow-xl">
              Open Booking Calendar
            </Button>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
