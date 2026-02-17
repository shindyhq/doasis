'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  external?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}

export const Button = ({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  external = false,
  disabled = false,
  ariaLabel,
}: ButtonProps) => {
  const baseStyles = 'btn-invitational inline-flex items-center justify-center transition-all duration-500 rounded-2xl';
  
  const variants = {
    primary: 'bg-primary text-background hover:bg-accent hover:text-primary border border-transparent shadow-lg shadow-primary/20 hover:shadow-accent/30',
    secondary: 'bg-accent text-primary hover:bg-primary hover:text-background border border-transparent shadow-lg shadow-accent/20 hover:shadow-primary/30',
    outline: 'border border-primary/20 text-primary hover:bg-primary hover:text-background hover:border-transparent',
    ghost: 'text-primary hover:bg-primary/5',
    glass: 'glass-dark text-white hover:bg-white/20 border-white/10 hover:border-white/30 shadow-xl',
  };

  const buttonContent = (
    <motion.span
      initial={false}
      whileHover={disabled ? {} : { y: -1, transition: { duration: 0.2 } }}
      whileTap={disabled ? {} : { scale: 0.96 }}
      className="flex items-center justify-center"
    >
      {children}
    </motion.span>
  );

  if (href && !disabled) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={`${baseStyles} ${variants[variant]} ${className}`}
        >
          {buttonContent}
        </a>
      );
    }
    return (
      <Link href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''} ${className}`}
    >
      {buttonContent}
    </button>
  );
};
