import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
}

export const Section = ({ children, className = '', id, containerClassName = '' }: SectionProps) => {
  return (
    <section id={id} className={`py-32 md:py-48 px-4 md:px-8 ${className}`}>
      <div className={`max-w-7xl mx-auto ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};
