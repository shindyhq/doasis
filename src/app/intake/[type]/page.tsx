'use client';

import { useParams } from 'next/navigation';
import { IntakeForm } from '@/components/forms/IntakeForm';
import { INTAKE_CONFIGS } from '@/data/intake-configs';
import { Section } from '@/components/layout/Section';
import { motion } from 'framer-motion';

export default function IntakePage() {
  const params = useParams();
  const type = params.type as keyof typeof INTAKE_CONFIGS;
  const config = INTAKE_CONFIGS[type];

  if (!config) {
    return (
      <Section className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display text-primary">Intake type not found.</h1>
          <p className="text-secondary/50 mt-2">Please check the link provided.</p>
        </div>
      </Section>
    );
  }

  const handleComplete = (data: any) => {
    console.log(`Intake data for ${type}:`, data);
    // In a real app, this would be sent to an API (e.g., Supabase, Resend, or a CRM)
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <Section containerClassName="max-w-4xl">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-12 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-display font-medium text-primary italic mb-4">{config.title}</h1>
          <p className="text-secondary/60 max-w-2xl mx-auto italic">
            "Your honest answers help me arrive prepared to hold space for exactly what you need."
          </p>
        </motion.div>
        
        <IntakeForm 
          title={config.title}
          steps={config.steps}
          onComplete={handleComplete}
        />
      </Section>
    </div>
  );
}
