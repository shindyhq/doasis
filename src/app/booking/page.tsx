'use client';

import { useState, useEffect } from 'react';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ShieldCheck, CheckCircle2, Calendar, ChevronLeft, AlertCircle, Wallet } from 'lucide-react';
import Link from 'next/link';
import { BookingCalendar } from '@/components/booking/BookingCalendar';
import { BookingService, UserDetails } from '@/services/bookingService';
import { SERVICES } from '@/data/services';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from '@/components/booking/PaymentForm';
import { format, parseISO } from 'date-fns';

// Initialize Stripe outside of render to avoid recreating the object
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const BOOKING_OPTIONS = [
  {
    id: 'clarity-session',
    title: 'The Clarity Session',
    desc: 'For focused breakthrough and immediate support. A single, powerful session to untangle overwhelm and create a path forward.',
    bestFor: 'Specific challenges or decision-making',
    duration: 90,
    durationLabel: '90 Minutes',
    price: 120,
    priceLabel: '$120 USD',
    cta: 'Book Session',
    format: 'Zoom',
    primary: true
  },
  {
    id: 'becoming-coaching',
    title: 'Becoming: 1:1 Coaching',
    desc: 'Deep, ongoing work to navigate transitions, heal wounds, and align with your truth over multiple weeks.',
    bestFor: 'Identity work or sustained growth',
    duration: 60,
    durationLabel: '6 or 12 Weeks',
    price: 720,
    priceLabel: 'From $720 USD',
    cta: 'Apply Now',
    format: 'Weekly Zoom',
    external: true,
    primary: false
  },
  {
    id: 'restoration-circles',
    title: 'Restoration Circles',
    desc: 'Monthly virtual gatherings where we practice being human together—witnessing and being witnessed.',
    bestFor: 'Community connection',
    duration: 90,
    durationLabel: '90 Minutes',
    price: 45,
    priceLabel: '$45 USD',
    cta: 'Join Circle',
    format: 'Virtual Group',
    primary: false
  },
  {
    id: 'consultation',
    title: 'Free 15-Minute Consultation',
    desc: 'A low-pressure conversation to discuss where you are and how I might support you. No obligation—just clarity.',
    bestFor: 'Exploring the fit',
    duration: 15,
    durationLabel: '15 Minutes',
    price: 0,
    priceLabel: 'Complimentary',
    cta: 'Book Talk',
    format: 'Phone or Zoom',
    primary: false
  }
];

type BookingStep = 'select-service' | 'select-time' | 'enter-details' | 'payment' | 'confirmation';

export default function Booking() {
  const [step, setStep] = useState<BookingStep>('select-service');
  const [selectedService, setSelectedService] = useState<typeof BOOKING_OPTIONS[0] | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ start: string } | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails>({ firstName: '', lastName: '', email: '', notes: '' });
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleServiceSelect = (service: typeof BOOKING_OPTIONS[0]) => {
    if (service.external) {
      window.location.href = '/contact?subject=Coaching Application';
      return;
    }
    setSelectedService(service);
    setStep('select-time');
  };

  const handleSlotSelect = (slot: { start: string }) => {
    setSelectedSlot(slot);
    setStep('enter-details');
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    if (selectedService.price === 0) {
      try {
        const calendlyUri = SERVICES[selectedService.id]?.calendlyEventUri;
        if (calendlyUri) {
          await BookingService.completeCalendlyBooking(calendlyUri, selectedSlot!.start, userDetails);
        } else {
          await BookingService.createBooking(
              userDetails, 
              { 
                  serviceType: selectedService.title, 
                  durationMinutes: selectedService.duration, 
                  price: 0, 
                  start: selectedSlot!.start 
              }, 
              'free-booking'
          );
        }
        setStep('confirmation');
      } catch (err) {
        console.error(err);
        setBookingError('Failed to book session. Please try again.');
      }
    } else {
      try {
        const { clientSecret } = await BookingService.createPaymentIntent(selectedService.price, selectedService.id);
        setClientSecret(clientSecret);
        setStep('payment');
      } catch (err) {
        console.error(err);
        setBookingError('Failed to initialize payment. Please try again.');
      }
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
     try {
        const calendlyUri = SERVICES[selectedService!.id]?.calendlyEventUri;
        if (calendlyUri) {
          await BookingService.completeCalendlyBooking(calendlyUri, selectedSlot!.start, userDetails);
        }

        await BookingService.createBooking(
            userDetails, 
            { 
                serviceType: selectedService!.title, 
                durationMinutes: selectedService!.duration, 
                price: selectedService!.price, 
                start: selectedSlot!.start 
            }, 
            paymentIntentId
        );
        setStep('confirmation');
     } catch (err) {
         console.error(err);
         setBookingError('Payment successful, but booking creation failed. Please contact support.');
     }
  };

  return (
    <main className="bg-background pt-32 pb-48">
      <div className="bg-grain fixed inset-0 opacity-[0.03] z-[100] pointer-events-none" />

      <Section className="max-w-6xl mx-auto px-4">
        {/* Step Navigation */}
        <div className="mb-16 flex items-center justify-center gap-6 text-[9px] uppercase tracking-[0.3em] font-bold text-primary/30">
           {step !== 'select-service' && step !== 'confirmation' && (
             <button onClick={() => setStep(step === 'payment' ? 'enter-details' : step === 'enter-details' ? 'select-time' : 'select-service')} className="hover:text-accent flex items-center gap-2 transition-colors mr-4">
               <ChevronLeft size={12} className="text-accent" /> Back
             </button>
           )}
           <span className={step === 'select-service' ? 'text-accent' : ''}>1. Service</span>
           <div className="w-1 h-1 rounded-full bg-primary/10" />
           <span className={step === 'select-time' ? 'text-accent' : ''}>2. Time</span>
           <div className="w-1 h-1 rounded-full bg-primary/10" />
           <span className={step === 'enter-details' ? 'text-accent' : ''}>3. Details</span>
           <div className="w-1 h-1 rounded-full bg-primary/10" />
           <span className={step === 'payment' ? 'text-accent' : ''}>4. Payment</span>
        </div>

        <AnimatePresence mode="wait">
          
          {/* STEP 1: SELECT SERVICE */}
          {step === 'select-service' && (
             <motion.div
               key="step1"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
             >
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-8 block">The Gateway</span>
                    <h1 className="text-6xl md:text-8xl font-display font-medium text-primary mb-12 tracking-tighter leading-none">Your next chapter <br /><span className="font-serif-italic text-secondary italic">starts here.</span></h1>
                    <p className="text-xl text-primary/60 font-serif-italic italic max-w-xl mx-auto leading-relaxed">Choose the container that feels right for where you are. Every option is designed to honor your pace and your story.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {BOOKING_OPTIONS.map((option) => (
                        <div 
                            key={option.id}
                            onClick={() => handleServiceSelect(option)}
                            className={`editorial-shadow group p-12 rounded-[60px] flex flex-col cursor-pointer transition-all duration-700 hover:-translate-y-2 relative overflow-hidden ${option.primary ? 'bg-primary text-white' : 'bg-white text-primary border border-black/[0.03] hover:border-accent/20'}`}
                        >
                            {option.primary && (
                              <div className="absolute top-0 right-0 p-8">
                                <span className="text-[9px] uppercase tracking-widest font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">Recommended</span>
                              </div>
                            )}
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-8 block">{option.durationLabel}</span>
                            <h3 className="text-3xl font-display font-medium mb-4 tracking-tight">{option.title}</h3>
                            <p className={`text-lg font-serif italic mb-8 flex-grow ${option.primary ? 'text-white/60' : 'text-primary/60'}`}>{option.desc}</p>
                            
                            <div className="space-y-4 mb-12">
                              <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                                <span className={`text-xs font-serif italic ${option.primary ? 'text-white/40' : 'text-primary/40'}`}>Best for {option.bestFor}</span>
                              </div>
                            </div>

                            <div className="flex justify-between items-center border-t pt-8 border-current/5">
                                <span className="text-xl font-display tracking-tight">{option.priceLabel}</span>
                                <div className="flex items-center gap-3 group-hover:gap-5 transition-all">
                                  <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-accent opacity-0 group-hover:opacity-100 transition-all">{option.cta}</span>
                                  <ArrowRight size={20} className="text-accent transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Policies & Info */}
                <div className="mt-48 grid grid-cols-1 lg:grid-cols-12 gap-24">
                  <div className="lg:col-span-12 xl:col-span-5 space-y-16">
                     <div>
                        <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-12 block">Before You Book</h2>
                        <div className="space-y-12">
                           {[
                             { icon: Calendar, title: "Availability", desc: "Tuesday–Friday, 9am–6pm EST. Limited Saturday slots available." },
                             { icon: CheckCircle2, title: "Confirmation", desc: "Expect an email within 24 hours with your Zoom link and session prep." },
                             { icon: ShieldCheck, title: "Confidentiality", desc: "Every session is held in sacred confidence, honoring your privacy." }
                           ].map(item => (
                             <div key={item.title} className="flex gap-6 items-start">
                               <item.icon className="w-6 h-6 text-accent/30 mt-1" />
                               <div>
                                 <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-primary mb-2">{item.title}</h4>
                                 <p className="text-sm font-serif italic text-primary/60 leading-relaxed">{item.desc}</p>
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="lg:col-span-12 xl:col-span-6 xl:col-start-7 bg-primary/5 rounded-[60px] p-12 md:p-16 border border-black/[0.02]">
                    <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-12 block">Logistics & Care</h2>
                    <div className="space-y-10">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Payments</h4>
                            <p className="text-xs font-serif italic text-primary/50 leading-relaxed">Major cards, HSA/FSA, and secure payment plans are always supported.</p>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Sliding Scale</h4>
                            <p className="text-xs font-serif italic text-primary/50 leading-relaxed">Reduced rates available for those in specific seasons of hardship. Please reach out.</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
             </motion.div>
          )}

          {/* STEP 2: SELECT TIME */}
          {step === 'select-time' && selectedService && (
             <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto"
             >
                 <div className="mb-16 text-center">
                     <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-6 block font-display">Step Two</span>
                     <h2 className="text-5xl font-display text-primary mb-6 tracking-tighter">When shall we <span className="font-serif-italic text-secondary italic">meet?</span></h2>
                     <p className="text-xl font-serif-italic italic text-primary/60">Select a time for your <strong>{selectedService.title}</strong>.</p>
                 </div>
                 <div className="bg-white p-8 md:p-16 rounded-[60px] editorial-shadow border border-black/[0.02]">
                    <BookingCalendar 
                        onSelectSlot={handleSlotSelect} 
                        serviceDuration={selectedService.duration} 
                        calendlyEventUri={SERVICES[selectedService.id]?.calendlyEventUri}
                    />
                 </div>
             </motion.div>
          )}

          {/* STEP 3: ENTER DETAILS */}
          {step === 'enter-details' && selectedService && selectedSlot && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto"
              >
                  <div className="mb-16 text-center">
                      <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-6 block">Step Three</span>
                      <h2 className="text-5xl font-display text-primary mb-8 tracking-tighter">A few <span className="font-serif-italic text-secondary italic">details.</span></h2>
                      <div className="inline-flex items-center gap-4 bg-primary/5 px-8 py-4 rounded-full text-base font-serif italic text-primary/70">
                          <Clock className="w-4 h-4 text-accent" />
                          {selectedService.title} • {format(parseISO(selectedSlot.start), 'PPP p')}
                      </div>
                  </div>
                  
                  <form onSubmit={handleDetailsSubmit} className="space-y-10">
                      <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-3">
                              <label htmlFor="firstName" className="text-[10px] uppercase tracking-widest font-bold text-primary/30 ml-4">First Name</label>
                              <input 
                                id="firstName"
                                name="first-name"
                                required 
                                type="text" 
                                placeholder="Your name"
                                className="w-full bg-white border border-black/[0.03] rounded-2xl h-16 px-6 focus:ring-4 focus:ring-accent/5 outline-none font-serif-italic italic text-lg transition-all"
                                value={userDetails.firstName}
                                onChange={e => setUserDetails({...userDetails, firstName: e.target.value})}
                              />
                          </div>
                          <div className="space-y-3">
                              <label htmlFor="lastName" className="text-[10px] uppercase tracking-widest font-bold text-primary/30 ml-4">Last Name</label>
                              <input 
                                id="lastName"
                                name="last-name"
                                required 
                                type="text" 
                                placeholder="Your surname"
                                className="w-full bg-white border border-black/[0.03] rounded-2xl h-16 px-6 focus:ring-4 focus:ring-accent/5 outline-none font-serif-italic italic text-lg transition-all"
                                value={userDetails.lastName}
                                onChange={e => setUserDetails({...userDetails, lastName: e.target.value})}
                              />
                          </div>
                      </div>
                      
                      <div className="space-y-3">
                          <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-primary/30 ml-4">Email Address</label>
                          <input 
                            id="email"
                            name="email"
                            required 
                            type="email" 
                            placeholder="email@example.com"
                            className="w-full bg-white border border-black/[0.03] rounded-2xl h-16 px-6 focus:ring-4 focus:ring-accent/5 outline-none font-serif-italic italic text-lg transition-all"
                            value={userDetails.email}
                            onChange={e => setUserDetails({...userDetails, email: e.target.value})}
                          />
                      </div>

                      <div className="space-y-3">
                          <label htmlFor="notes" className="text-[10px] uppercase tracking-widest font-bold text-primary/30 ml-4">Anything for me to know?</label>
                          <textarea 
                            id="notes"
                            name="notes"
                            rows={4}
                            placeholder="Share what&apos;s on your mind... (optional)"
                            className="w-full bg-white border border-black/[0.03] rounded-[32px] p-8 focus:ring-4 focus:ring-accent/5 outline-none font-serif-italic italic text-lg transition-all resize-none h-40"
                            value={userDetails.notes}
                            onChange={e => setUserDetails({...userDetails, notes: e.target.value})}
                          />
                      </div>

                      {bookingError && (
                          <div className="p-6 bg-red-50 text-red-600 rounded-2xl text-sm flex items-center gap-3 font-serif italic">
                              <AlertCircle size={18} />
                              {bookingError}
                          </div>
                      )}

                      <div className="pt-8">
                        <Button 
                          type="submit" 
                          variant="primary"
                          className="w-full h-18 text-[11px]"
                        >
                            {selectedService.price === 0 ? 'Confirm My Booking' : 'Continue to Payment'}
                        </Button>
                      </div>
                  </form>
              </motion.div>
          )}

          {/* STEP 4: PAYMENT */}
          {step === 'payment' && clientSecret && selectedService && (
             <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-xl mx-auto"
             >
                 <div className="mb-16 text-center">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-6 block">Step Four</span>
                    <h2 className="text-5xl font-display text-primary mb-8 tracking-tighter">Secure <span className="font-serif-italic text-secondary italic">Checkout.</span></h2>
                  </div>

                  <div className="glass p-12 md:p-16 rounded-[60px] border border-black/[0.02] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[80px] rounded-full" />
                    {stripePromise && (
                        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe', variables: { colorPrimary: '#C6A992', fontFamily: '"Cormorant Garamond", serif' } } }}>
                            <PaymentForm 
                              amount={selectedService.price} 
                              onSuccess={handlePaymentSuccess}
                               onCancel={() => setStep('enter-details')}
                            />
                        </Elements>
                    )}
                  </div>
             </motion.div>
          )}

          {/* CONFIRMATION */}
          {step === 'confirmation' && selectedService && selectedSlot && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl mx-auto text-center py-24"
              >
                  <div className="w-32 h-32 bg-accent/5 text-accent rounded-full flex items-center justify-center mx-auto mb-12 shadow-xl border border-accent/10">
                      <CheckCircle2 size={56} className="text-secondary" />
                  </div>
                  <h2 className="text-6xl md:text-8xl font-display text-primary mb-8 tracking-tighter leading-none">Booking <br /><span className="font-serif-italic text-secondary italic">Confirmed.</span></h2>
                  <p className="text-2xl font-serif-italic italic text-primary/60 mb-12 max-w-xl mx-auto leading-relaxed">
                    Thank you, {userDetails.firstName}. Your <strong>{selectedService.title}</strong> is scheduled for <strong>{format(parseISO(selectedSlot.start), 'PPP p')}</strong>.
                  </p>
                  <Button href="/" variant="outline" className="h-14 px-12">
                     Return to the Oasis
                  </Button>
              </motion.div>
          )}

        </AnimatePresence>
      </Section>
    </main>
  );
}

// Helper components like ArrowRight and Clock should be imported or defined
const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
