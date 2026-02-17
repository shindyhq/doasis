import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight, Clock, Calendar, MessageCircle, Sparkles, Video, Compass, Mail } from 'lucide-react';
import Link from 'next/link';

export default function WorkWithMe() {
  return (
    <div className="bg-background pt-32 pb-16">
      <div className="bg-grain fixed inset-0 opacity-[0.03] z-[100] pointer-events-none" />

      {/* Editorial Header */}
      <Section className="">
        <div className="max-w-5xl">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-8 block">
              The Portfolio of Presence
            </span>
            <h1 className="text-6xl md:text-[clamp(65px,8.5vw,120px)] font-display font-medium text-primary leading-[0.95] tracking-tighter">
              Healing happens <br />
              <span className="font-serif-italic text-secondary">in relationship.</span>
            </h1>
          </Reveal>
           <p className="mt-12 text-2xl font-serif font-light text-primary/85 leading-relaxed max-w-2xl italic">
            Choose the container that feels right for where you are. Every option is designed to honor your pace, your story, and your wholeness.
          </p>
        </div>
      </Section>

      {/* How to Choose Section */}
      <Section className="">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-primary mb-16 text-center">
              Not sure where to start? <span className="font-serif-italic text-secondary">A gentle guide:</span>
            </h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Reveal delay={0.1}>
              <div className="border-l border-accent/30 pl-8 pt-2">
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-accent mb-4">Focus</h3>
                <h4 className="text-xl font-display font-medium text-primary mb-4">The Clarity Session</h4>
                <p className="text-primary/85 leading-relaxed font-light font-serif italic">
                  Choose this if you&apos;re feeling stuck and need immediate perspective, or if you want to test the waters before committing to a deeper path.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="border-l border-accent/30 pl-8 pt-2">
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-accent mb-4">Depth</h3>
                <h4 className="text-xl font-display font-medium text-primary mb-4">Becoming: 1:1</h4>
                <p className="text-primary/85 leading-relaxed font-light font-serif italic">
                  Choose this if you&apos;re ready for sustained transformation, want personalized support over months, or are navigating a major life transition.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="border-l border-accent/30 pl-8 pt-2">
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-accent mb-4">Community</h3>
                <h4 className="text-xl font-display font-medium text-primary mb-4">Restoration Circles</h4>
                <p className="text-primary/85 leading-relaxed font-light font-serif italic">
                  Choose this if you thrive in collective spaces, want accessible support, or are looking for monthly nourishment and shared wisdom.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Consultation Prompt */}
          <div className="mt-24 text-center">
            <p className="text-2xl font-serif italic text-primary/80 leading-relaxed max-w-2xl mx-auto">
              Still unsure? <Link href="/booking" className="text-accent hover:text-secondary underline underline-offset-8 decoration-accent/40 hover:decoration-secondary transition-all font-bold tracking-tight">Book a free 15-minute talk</Link>—and we&apos;ll explore the next step together.
            </p>
          </div>
        </div>
      </Section>




      {/* Offerings - Detailed Sections */}
      <div className="space-y-48">
        {/* OFFERING 1: The Clarity Session */}
        <Section>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Reveal>
                <span className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-6 block">One-Time Session</span>
                <h2 className="text-5xl md:text-6xl font-display font-medium text-primary mb-6">The Clarity Session</h2>
                <p className="text-3xl font-serif-italic text-secondary">One session. A real shift.</p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-center">
              {/* Left Column - Image */}
              <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-1000 cursor-pointer order-2 md:order-1">
                <img 
                  src="/images/services-clarity.svg"
                  className="w-full h-full object-cover"
                  alt="The Clarity Session - 90-minute breakthrough coaching"
                />
              </div>

              {/* Right Column - Content */}
              <div className="space-y-12 order-1 md:order-2">
                <div>
                  <h3 className="text-2xl font-display font-medium text-primary mb-6">The Approach</h3>
                  <p className="text-xl text-black leading-relaxed font-light font-serif italic">
                    A focused, 90-minute breakthrough coaching session designed for women who need clarity <span className="italic font-bold">now</span>. Whether you&apos;re at a crossroads, carrying overwhelm, or craving fresh perspective, this session creates space to untangle what&apos;s heavy and illuminate what&apos;s next.
                  </p>
                  <p className="text-lg text-primary/80 leading-relaxed font-light mt-6">
                    This isn&apos;t surface advice. It&apos;s soulful work compressed into one powerful, witnesses container.
                  </p>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-accent mb-6">This is for you if:</h3>
                  <ul className="space-y-4">
                    {[
                      "You're standing at a decision point and can't see the path forward",
                      "You feel scattered, stuck, or spiritually disconnected",
                      "You want expert support without committing to a long-term package",
                      "You need someone to witness your truth with clarity",
                    ].map((item) => (
                      <li key={item} className="flex gap-4 text-black italic font-serif">
                        <span className="text-accent mt-1">/</span>
                        <span className="font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-primary/5 rounded-[40px] p-12 md:p-20 mb-24">
              <h3 className="text-2xl font-display font-medium text-primary mb-12 text-center underline underline-offset-8 decoration-accent/10">What&apos;s Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                  { icon: Sparkles, title: "Pre-Session Reflection Prompt", desc: "Sent 48 hours before we meet, this helps you arrive ready to go deep" },
                  { icon: Video, title: "90-Minute Live Zoom Session", desc: "We'll explore your challenge, reframe stuck points, and co-create a path forward" },
                  { icon: Compass, title: "Personalized Follow-Up Roadmap", desc: "A custom PDF with insights, action steps, and reflections tailored to your session" },
                  { icon: Mail, title: "One Week of Email Support", desc: "Integration matters. Share wins or process what's emerging over the following week" }
                ].map((item) => (
                  <div key={item.title} className="flex gap-6">
                    <item.icon className="w-6 h-6 text-accent/60 mt-1 shrink-0" />
                    <div>
                      <h4 className="font-display font-medium text-primary mb-2 text-lg">{item.title}</h4>
                      <p className="text-sm text-primary/80 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment & Testimonial */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="border-l border-accent/30 pl-10">
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-4">The Investment</p>
                <p className="text-5xl font-display text-primary mb-6 tracking-tighter">$120 <span className="text-xl font-serif-italic text-primary/60 ml-2">USD</span></p>
                <p className="text-black font-light font-serif italic text-lg mb-8 leading-relaxed">90 minutes • Interactive Zoom • Strictly Confidential</p>
                <Button href="/booking" variant="primary">
                  Begin Your Session
                </Button>
              </div>

              <div className="bg-secondary/5 rounded-[30px] p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />
                <p className="font-serif-italic text-xl text-black leading-relaxed mb-6 italic">
                  &quot;I came in foggy and left with a map. Oluyemisi didn&apos;t just listen; she helped me see what I couldn&apos;t see on my own. One session literally changed my next six months.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-8 bg-accent/20" />
                  <p className="text-[10px] uppercase tracking-widest text-primary/70 font-bold">J.K. • Client</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* OFFERING 2: Becoming - 1:1 Coaching */}
        <Section className="bg-primary/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <Reveal>
                <span className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-6 block">Deep Mentorship</span>
                <h2 className="text-5xl md:text-6xl font-display font-medium text-primary mb-6">Becoming: 1:1 Coaching</h2>
                <p className="text-3xl font-serif-italic text-black">Sacred space for steady transformation.</p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-24 items-center">
              {/* Left Column - Content */}
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-display font-medium text-primary mb-6">The Journey</h3>
                  <p className="text-xl text-black leading-relaxed font-light font-serif italic">
                    A personalized coaching journey designed for women ready to go beneath the surface. Over 6 or 12 weeks, we&apos;ll navigate transitions, align with your truth, and build the life that&apos;s been waiting for you.
                  </p>
                  <p className="text-lg text-primary/85 leading-relaxed font-light mt-6">
                    This isn&apos;t a program you follow; it&apos;s a co-created container shaped around <span className="italic font-bold text-accent">your</span> story and <span className="italic font-bold text-accent">your</span> becoming.
                  </p>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-accent mb-6">This is for you if:</h3>
                  <ul className="space-y-4">
                    {[
                      "You're in the middle of a major identity evolution",
                      "You're ready to unlearn old patterns and step into new truth",
                      "You want consistent mentorship from someone who truly sees you",
                      "You're navigating deep questions about faith and purpose",
                    ].map((item) => (
                      <li key={item} className="flex gap-4 text-primary/85 font-serif italic">
                        <span className="text-accent mt-1">/</span>
                        <span className="font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-1000 cursor-pointer">
                <img 
                  src="/images/services-becoming.svg"
                  className="w-full h-full object-cover"
                  alt="Becoming 1:1 Coaching - Deep mentorship"
                />
              </div>
            </div>

            {/* Containers - Two Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
              {/* 6-Week Container */}
              <div className="bg-white rounded-[40px] p-12 shadow-sm border border-black/5 hover:border-accent/10 transition-colors">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-8">The Season</h3>
                <h4 className="text-2xl font-display font-medium text-primary mb-8">6-Week Container</h4>
                <div className="space-y-5 mb-12">
                  {[
                    "Weekly 60-minute sessions via Zoom",
                    "Voice/text support via Marco Polo",
                    "Custom journal prompts & reflection exercises",
                    "Vision-mapping & values clarification",
                    "Integration check-in after completion"
                  ].map((item) => (
                    <div key={item} className="flex gap-4 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                      <span className="text-sm text-primary/85 font-light font-serif italic">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-8 border-t border-primary/5">
                  <p className="text-4xl font-display text-primary tracking-tighter mb-2">$720 <span className="text-sm font-serif-italic text-primary/60 ml-2">USD</span></p>
                  <p className="text-[10px] uppercase tracking-widest text-primary/70 font-bold">Flexible payment plans available</p>
                </div>
              </div>

              {/* 12-Week Container */}
              <div className="bg-primary text-white rounded-[40px] p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8">
                   <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent">Deep Commitment</span>
                </div>
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent/60 mb-8">The Alchemy</h3>
                <h4 className="text-2xl font-display font-medium text-white mb-8">12-Week Container</h4>
                <div className="space-y-5 mb-12">
                  {[
                    "12 weekly sessions for sustained shift",
                    "Deep-dive intensive (90-minute session)",
                    "Personalized vision ritual design",
                    "Resource library access included",
                    "Extended support month after final session"
                  ].map((item) => (
                    <div key={item} className="flex gap-4 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-sm text-white/85 font-light font-serif italic">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-8 border-t border-white/5">
                  <p className="text-4xl font-display text-accent tracking-tighter mb-2">$1,320 <span className="text-sm font-serif-italic text-white/60 ml-2">USD</span></p>
                  <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold">3 payments of $460 optional</p>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl font-serif-italic text-primary/70 italic leading-relaxed mb-12">
                &quot;Twelve weeks with Oluyemisi didn&apos;t just change my circumstances; it changed how I see myself. I finally feel like I&apos;m living my life, not performing someone else&apos;s version of it.&quot;
              </p>
              <Button href="/booking" variant="primary">
                Apply for Mentorship
              </Button>
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary/60 mt-8 font-bold">Limited to 6 women per quarter to honor the depth.</p>
            </div>
          </div>
        </Section>

        {/* OFFERING 3: Restoration Circles */}
        <Section className="py-48">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <Reveal>
                <span className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-6 block">Communal Growth</span>
                <h2 className="text-5xl md:text-6xl font-display font-medium text-primary mb-6">Restoration Circles</h2>
                <p className="text-3xl font-serif-italic text-black">A sanctuary for shared healing.</p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-24 items-center">
               {/* Left Column - Image */}
               <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-1000 cursor-pointer order-2 md:order-1">
                <img 
                  src="/images/services-circles.svg"
                  className="w-full h-full object-cover"
                  alt="Restoration Circles - Monthly group coaching"
                />
              </div>

              {/* Right Column - Content */}
              <div className="space-y-12 order-1 md:order-2">
                <div>
                  <h3 className="text-2xl font-display font-medium text-primary mb-6">The Collective</h3>
                  <p className="text-xl text-black leading-relaxed font-light font-serif italic">
                    An intimate, monthly gathering for women seeking shared transformation. Blending guided reflection, group coaching, and somatic grounding rituals.
                  </p>
                  <p className="text-lg text-primary/80 leading-relaxed font-light mt-6">
                    Because sometimes, the most profound healing happens when we realize our private struggle is part of a collective story.
                  </p>
                </div>

                <div>
                   <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-accent mb-6">This is for you if:</h3>
                   <ul className="space-y-4">
                    {[
                      "You thrive when surrounded by women who 'get it'",
                      "You're craving nourish without a major time commitment",
                      "You value both expert guidance and peer wisdom",
                    ].map((item) => (
                      <li key={item} className="flex gap-4 text-primary/80 font-serif italic">
                        <span className="text-accent mt-1">/</span>
                        <span className="font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Pricing Tiers Refined */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {[
                { label: "Drop-In", price: "$45", sub: "per circle", desc: "For seasonal nourishment" },
                { label: "Quarterly", price: "$120", sub: "$40/session", desc: "For steady presence", best: true },
                { label: "Annual", price: "$420", sub: "$35/session", desc: "For lasting restoration" }
              ].map((tier) => (
                <div key={tier.label} className={`rounded-[40px] p-12 text-center transition-all ${tier.best ? 'bg-secondary/5 border border-secondary/10 shadow-lg' : 'bg-background border border-primary/5 hover:border-accent/10'}`}>
                  <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-6">{tier.label}</p>
                  <p className="text-5xl font-display text-primary mb-2 tracking-tighter">{tier.price}</p>
                  <p className="text-[10px] uppercase tracking-widest text-primary/60 font-bold mb-6">{tier.sub}</p>
                  <p className="text-sm text-black font-serif italic">{tier.desc}</p>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto text-center">
               <p className="text-xl font-serif-italic text-black italic leading-relaxed mb-12">
                &quot;Real women doing real work together. Oluyemisi holds the space like magic.&quot;
              </p>
              <Button href="/booking" variant="secondary">
                Join the Circle
              </Button>
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary/60 mt-8 font-bold">Use code <span className="text-accent">RESTORE15</span> for $15 off your first visit.</p>
            </div>
          </div>
        </Section>
      </div>

       {/* The Pathway Section */}
      <Section className="my-32">
        <div className="bg-primary/5 rounded-[80px] p-12 md:p-32 border border-black/[0.02]">
           <div className="text-center mb-24">
             <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-8 block">The Flow</h2>
             <h3 className="text-4xl md:text-6xl font-display font-medium text-primary mb-4 italic leading-tight">Sacred Steps Together</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-20 text-center relative max-w-5xl mx-auto">
             <div className="hidden md:block absolute top-[44px] left-[20%] right-[20%] h-[1px] bg-accent/20 -z-10" />
             
             {[
               { icon: MessageCircle, label: "1. The Inquiry", desc: "You share your story. No performance needed—just tell me what's heavy." },
               { icon: Calendar, label: "2. The Discovery", desc: "We meet for 15 minutes to ensure our energies align for this season." },
               { icon: Clock, label: "3. The Work", desc: "We begin the steady, witnessed work of transformation and reclamation." }
             ].map((step) => (
               <div key={step.label} className="relative group">
                 <div className="w-24 h-24 rounded-full bg-white border border-accent/10 flex items-center justify-center mx-auto mb-10 shadow-xl group-hover:scale-110 transition-transform duration-700">
                   <step.icon className="w-8 h-8 text-accent/60" />
                 </div>
                 <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-primary mb-4">{step.label}</h4>
                 <p className="text-primary/80 font-serif italic text-lg leading-relaxed px-4">
                   {step.desc}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </Section>

      {/* Replaced Duplicated/Redundant Hero with refined Final CTA */}
      <Section className="pb-48">
        <div className="bg-primary rounded-[80px] p-20 md:p-32 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('/images/services-hero.svg')] bg-cover opacity-10 grayscale transition-transform duration-[10s] group-hover:scale-110" />
          
          <div className="relative z-10">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-display text-white mb-12 tracking-tighter">Still not sure? <br /><span className="font-serif-italic text-accent">Let&apos;s talk.</span></h2>
              <p className="text-xl text-white/85 mb-16 max-w-xl mx-auto font-light font-serif italic leading-relaxed">
                Book a free 15-minute consultation and we&apos;ll explore the next step, together.
              </p>
            </Reveal>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Button href="/booking" variant="secondary">
                Secure a Gentle Consult
              </Button>
              <Link href="/faqs" className="text-white/70 hover:text-white text-[10px] uppercase tracking-[0.4em] font-bold transition-all border-b border-white/20 hover:border-white pb-2">
                Browse the FAQs
              </Link>
            </div>
          </div>
        </div>
      </Section>


      {/* FAQs Teaser */}
      <Section className="my-32">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl text-primary/85 leading-relaxed font-light mb-8">
            Have questions about sessions, scheduling, or what to expect?
          </p>
          <Link 
            href="/faqs" 
            className="inline-flex items-center gap-3 text-xl font-serif italic text-black hover:text-primary transition-all group"
          >
            Visit the FAQs
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </Section>
    </div>
  );
}
