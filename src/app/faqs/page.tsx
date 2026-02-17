'use client';

import { Section } from '@/components/layout/Section';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const FAQS = [
  {
    category: 'The Work',
    questions: [
      {
        q: "What's the difference between counseling and coaching?",
        a: "Counseling typically focuses on healing from the past, addressing mental health diagnoses, and processing trauma. Coaching is often more future-oriented, focusing on specific goals and transitions. However, because I am trained in both, I bring a therapeutic lens to our coaching work—ensuring we don't just bypass the heavy stuff on the way to the new."
      },
      {
        q: "Is this only for Christians?",
        a: "Not at all. While my practice is rooted in Christian faith, D'Oasis is a sanctuary for women of all backgrounds. I am trained to integrate spirituality only as much as you desire. If you are deconstructing, questioning, or simply want a space that respects your soul without imposing an agenda, you are safe here."
      },
      {
        q: "What if I'm not in crisis, just stuck?",
        a: "You don't have to be falling apart to deserve support. In fact, the 'stuck' place is often the most powerful place to begin. The Clarity Session was designed specifically for this—to help you find movement when you feel anchored in the fog."
      },
       {
        q: "How do I know which offering is right for me?",
        a: "If you have one specific decision or knot untangle, start with a Clarity Session. If you are navigating a prolonged season of change (divorce, new career, loss of identity), the 1:1 Coaching Series provides the sustained container you need."
      }
    ]
  },
  {
    category: 'Logistics',
    questions: [
      {
        q: "Do you take insurance?",
        a: "I am an out-of-network provider. This allows us to work together without the constraints of insurance mandates (like diagnosis requirements or session limits). I can provide a Superbill for you to submit to your insurance for potential reimbursement."
      },
      {
        q: "Can I work with you if I'm not in your state?",
        a: "For traditional Counseling, I can only see clients residing in states where I am licensed [Insert States]. However, for Coaching and Spiritual Direction, I work with women globally via our virtual sanctuary."
      },
      {
        q: "What if I need to cancel?",
        a: "Life happens. I ask for 24 hours notice so I can offer the sanctuary space to another woman. Cancellations within the 24-hour window are subject to the full session fee."
      }
    ]
  }
];

const AccordionItem = ({ q, a }: { q: string, a: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-primary/5 last:border-none py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex justify-between items-center text-left hover:text-accent transition-all group"
      >
        <span className={`text-2xl md:text-3xl font-display font-medium tracking-tight transition-all duration-500 ${isOpen ? 'text-accent pl-4' : 'text-primary'}`}>
          <span className="font-serif italic opacity-40 mr-4">Q.</span>
          {q}
        </span>
        <div className={`w-10 h-10 rounded-full border border-primary/5 flex items-center justify-center text-primary/40 group-hover:border-accent group-hover:text-accent transition-all duration-500 shrink-0 ${isOpen ? 'rotate-180 bg-accent border-accent text-white' : ''}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="pb-12 pl-12 pr-8 text-xl font-serif font-light text-primary/50 leading-relaxed max-w-4xl space-y-4">
          <p>{a}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default function FAQs() {
  return (
    <div className="bg-background pt-32 pb-48">
      <div className="bg-grain fixed inset-0 opacity-[0.03] z-[100] pointer-events-none" />

      {/* Editorial Header */}
      <Section className="mb-24">
        <div className="max-w-4xl">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-8 block"
          >
            Curiosities & Clarity
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-6xl md:text-[clamp(60px,10vw,140px)] font-display font-medium text-primary leading-[0.9] tracking-tighter"
          >
            Clarity before <br />
            <span className="font-serif italic text-secondary">commitment.</span>
          </motion.h1>
          <p className="mt-12 text-xl font-serif font-light text-primary/60 leading-relaxed max-w-xl">
             Answers to the questions your spirit might be asking.
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-6xl mx-auto space-y-32">
          {FAQS.map((group, i) => (
            <motion.div 
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-8 mb-16">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent whitespace-nowrap">{group.category}</span>
                <div className="h-[1px] w-full bg-primary/5" />
              </div>
              
              <div className="flex flex-col">
                {group.questions.map((item) => (
                  <AccordionItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="pt-48 pb-24">
        <div className="text-center group">
          <h2 className="text-4xl md:text-7xl font-display text-primary mb-12 tracking-tighter leading-none">
            Still have <br /> <span className="font-serif italic text-secondary">questions?</span>
          </h2>
          <p className="text-xl font-serif font-light text-primary/40 mb-16 max-w-xl mx-auto leading-relaxed">
            I’m just an email away. Reach out personally and let’s talk.
          </p>
          <Link 
            href="/contact" 
            className="bg-primary text-background px-16 py-6 rounded-full text-xs uppercase tracking-[0.3em] font-bold hover:bg-accent hover:text-white transition-all shadow-2xl inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </Section>
    </div>
  );
}
