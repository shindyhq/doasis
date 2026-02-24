'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark' | 'sage' | 'lime' | 'forest';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  includeMark?: boolean;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  href?: string;
}

export const Logo = ({
  variant = 'light',
  size = 'md',
  showTagline = true,
  includeMark = true,
  orientation = 'horizontal',
  className,
  href = '/'
}: LogoProps) => {
  // Asset Mapping based on Brand Kit
  const logoAssets = {
    light: '/images/external/logo-2a6f3c.avif',   // Oasis Base Green
    dark: '/images/external/logo-ffffff.avif',    // Pure White
    sage: '/images/external/logo-a3b9a4.avif',    // Sage Leaf
    lime: '/images/external/logo-c5ca9b.avif',    // Lime Sage
    forest: '/images/external/logo-173919.avif',  // Forest Green
  };

  // Color Mapping for text
  const colors = {
    light: 'text-[#2a6f3c]', // Oasis Base Green
    dark: 'text-background', // Pure White (#FFFFFF)
    sage: 'text-[#A3B9A4]', // Sage Leaf (#A3B9A4)
    lime: 'text-[#C5CA9B]', // Lime Sage (#C5CA9B)
    forest: 'text-[#173919]', // Forest Green (#173919)
  };

  const sizes = {
    sm: { mark: 32, markClass: 'w-8 h-8', name: 'text-[16px]', tagline: 'text-[6.5px]' },
    md: { mark: 44, markClass: 'w-11 h-11', name: 'text-[22px]', tagline: 'text-[8.8px]' },
    lg: { mark: 80, markClass: 'w-[80px] h-[80px]', name: 'text-[34px]', tagline: 'text-[13.5px]' },
    xl: { mark: 128, markClass: 'w-[128px] h-[128px]', name: 'text-[56px]', tagline: 'text-[22px]' },
  };

  const selectedSize = sizes[size];
  const colorClass = colors[variant];
  const logoSrc = logoAssets[variant];

  const content = (
    <div className={cn(
      'flex group cursor-pointer transition-opacity hover:opacity-90',
      orientation === 'vertical' ? 'flex-col items-center text-center' : 'flex-row items-center gap-4',
      className
    )}>
      {includeMark && (
        <div className={cn(
          'relative transition-transform duration-500 group-hover:scale-105 flex items-center justify-center shrink-0',
          selectedSize.markClass,
          orientation === 'vertical' ? 'mb-1' : ''
        )}>
          <Image
            src={logoSrc}
            alt="D'Oasis Logo Mark"
            width={selectedSize.mark}
            height={selectedSize.mark}
            className="object-contain"
            priority={size === 'md' || size === 'lg'} // Priority for Navbar/Hero logos
          />
        </div>
      )}
      
      <div className={cn('flex flex-col justify-center', orientation === 'vertical' ? 'items-center mt-3' : 'items-start -space-y-2.5')}>
        <span className={cn(
          'font-display font-bold tracking-[0.45em] uppercase leading-none transition-all duration-300 whitespace-nowrap',
          selectedSize.name,
          colorClass,
          orientation === 'horizontal' && 'group-hover:tracking-[0.48em]'
        )}>
          D'OASIS
        </span>
        {showTagline && (
          <span className={cn(
            'font-display uppercase tracking-[0.225em] opacity-85 leading-tight transition-all duration-300 whitespace-nowrap',
            selectedSize.tagline,
            colorClass,
            orientation === 'horizontal' && 'group-hover:tracking-[0.255em]'
          )}>
            Counseling & Coaching
          </span>
        )}
      </div>
    </div>
  );

  return href ? (
    <Link href={href}>
      {content}
    </Link>
  ) : content;
};
