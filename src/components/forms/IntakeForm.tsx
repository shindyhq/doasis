'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Send, CheckCircle2, AlertTriangle } from 'lucide-react';

interface Step {
  title: string;
  fields: Field[];
}

interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'email' | 'tel' | 'select' | 'radio' | 'checkbox' | 'range' | 'date';
  placeholder?: string;
  required?: boolean;
  options?: string[];
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  warningIfValue?: {
      value: string | string[]; // Value(s) that trigger the warning
      message: string;          // The warning message markup/text
  };
}

interface IntakeFormProps {
  steps: Step[];
  onComplete: (data: any) => void;
  title: string;
}

export const IntakeForm = ({ steps, onComplete, title }: IntakeFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const currentValues = formData[name] || [];
      if (checkbox.checked) {
        setFormData({ ...formData, [name]: [...currentValues, value] });
      } else {
        setFormData({ ...formData, [name]: currentValues.filter((v: string) => v !== value) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    onComplete(formData);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderField = (field: Field) => {
      // Check for warning condition
      const currentValue = formData[field.name];
      const showWarning = field.warningIfValue && (
          Array.isArray(field.warningIfValue.value) 
              ? field.warningIfValue.value.includes(currentValue)
              : currentValue === field.warningIfValue.value
      );

      return (
        <div key={field.name} className="form-control w-full space-y-2">
            <label className="label pb-0">
                <span className="label-text font-display font-medium text-primary text-lg">
                {field.label} {field.required && <span className="text-accent">*</span>}
                </span>
            </label>
            {field.description && <p className="text-sm text-secondary/60 italic leading-relaxed">{field.description}</p>}
            
            {showWarning && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg my-4 text-sm text-red-800 space-y-2"
                >
                    <div className="flex items-center gap-2 font-bold text-red-600">
                        <AlertTriangle size={18} />
                        <span>Important Message</span>
                    </div>
                    <div className="prose prose-sm prose-red max-w-none" dangerouslySetInnerHTML={{ __html: field.warningIfValue!.message }} />
                </motion.div>
            )}

            {field.type === 'textarea' ? (
                <textarea
                name={field.name}
                placeholder={field.placeholder}
                className="w-full bg-white border border-secondary/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl p-4 min-h-[150px] text-secondary transition-all outline-none"
                required={field.required}
                onChange={handleInputChange}
                value={formData[field.name] || ''}
                />
            ) : field.type === 'select' ? (
                <div className="relative">
                    <select
                        name={field.name}
                        title={field.label}
                        className="w-full bg-white border border-secondary/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl p-4 text-secondary transition-all outline-none appearance-none"
                        required={field.required}
                        onChange={handleInputChange}
                        value={formData[field.name] || ''}
                    >
                        <option disabled value="">{field.placeholder || "Select an option..."}</option>
                        {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary/40">
                        <ChevronRight className="rotate-90" size={18}/>
                    </div>
                </div>
            ) : field.type === 'radio' ? (
                <div className="space-y-3 pt-2">
                {field.options?.map(opt => (
                    <label key={opt} className={`flex items-start gap-3 cursor-pointer group p-4 rounded-xl border transition-all ${formData[field.name] === opt ? 'bg-accent/5 border-accent' : 'bg-white border-secondary/5 hover:border-secondary/20'}`}>
                    <input
                        type="radio"
                        name={field.name}
                        value={opt}
                        className="mt-1 radio radio-sm border-secondary/30 checked:border-accent checked:bg-accent text-accent"
                        required={field.required}
                        onChange={handleInputChange}
                        checked={formData[field.name] === opt}
                    />
                    <span className="text-secondary/80 group-hover:text-primary transition-colors leading-relaxed">{opt}</span>
                    </label>
                ))}
                </div>
            ) : field.type === 'checkbox' ? (
                <div className="space-y-3 pt-2">
                {field.options?.map(opt => {
                    const isChecked = (formData[field.name] || []).includes(opt);
                    return (
                        <label key={opt} className={`flex items-start gap-3 cursor-pointer group p-4 rounded-xl border transition-all ${isChecked ? 'bg-accent/5 border-accent' : 'bg-white border-secondary/5 hover:border-secondary/20'}`}>
                            <input
                                type="checkbox"
                                name={field.name}
                                value={opt}
                                className="checkbox checkbox-sm border-secondary/30 checked:border-accent checked:bg-accent rounded-md"
                                onChange={handleInputChange}
                                checked={isChecked}
                            />
                            <span className="text-secondary/80 group-hover:text-primary transition-colors leading-relaxed">{opt}</span>
                        </label>
                    );
                })}
                </div>
            ) : field.type === 'range' ? (
                <div className="pt-4 pb-2 px-2">
                    <input 
                        type="range" 
                        name={field.name}
                        min={field.min || 1} 
                        max={field.max || 10} 
                        step={field.step || 1} 
                        value={formData[field.name] || (field.min || 1)} 
                        onChange={handleInputChange}
                        className="w-full accent-accent cursor-pointer"
                        aria-label={field.label}
                    />
                    <div className="flex justify-between text-xs text-secondary/40 mt-2 font-bold uppercase tracking-widest">
                        <span>{field.min || 1}</span>
                        <span>{formData[field.name] || (field.min || 1)} / {field.max || 10}</span>
                        <span>{field.max || 10}</span>
                    </div>
                </div>
            ) : (
                <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="w-full bg-white border border-secondary/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-xl p-4 text-secondary transition-all outline-none"
                required={field.required}
                onChange={handleInputChange}
                value={formData[field.name] || ''}
                />
            )}
        </div>
      );
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 bg-white rounded-[40px] shadow-xl shadow-secondary/5 border border-secondary/5"
      >
        <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto mb-8">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-4xl font-display font-medium text-primary mb-6 italic">Thank you, truly.</h2>
        <p className="text-xl text-secondary/70 max-w-lg mx-auto leading-relaxed font-serif font-light">
          Your responses have been received with care. I'll review them and get back to you within 24-48 hours.
        </p>
      </motion.div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Step {currentStep + 1} of {steps.length}</span>
            <h2 className="text-3xl font-display font-medium text-primary italic mt-2">{step.title}</h2>
          </div>
          <div className="hidden sm:flex gap-2">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`w-12 h-1.5 rounded-full transition-all duration-500 ${i <= currentStep ? 'bg-accent' : 'bg-secondary/10'}`} 
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
           key={currentStep}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           transition={{ duration: 0.4, ease: "easeOut" }}
           className="bg-white p-8 md:p-14 rounded-[40px] border border-secondary/5 shadow-2xl shadow-secondary/5"
        >
          <div className="space-y-8">
            {step.fields.map(renderField)}
          </div>

          <div className="mt-16 flex justify-between items-center pt-8 border-t border-secondary/5">
            <button
              type="button"
              onClick={prevStep}
              className={`font-display flex items-center text-secondary/60 hover:text-primary transition-colors font-medium px-4 py-2 rounded-full hover:bg-secondary/5 ${currentStep === 0 ? 'invisible' : ''}`}
            >
              <ChevronLeft size={18} className="mr-2" />
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="font-display bg-primary text-background px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-accent transition-all flex items-center group"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  Submit Form
                  <Send size={16} className="ml-3 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
