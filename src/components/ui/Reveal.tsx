'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  className?: string;
}

export const Reveal = ({ 
  children, 
  width = '100%', 
  delay = 0, 
  duration = 0.8,
  y = 30,
  x = 0,
  className = ''
}: RevealProps) => {
  return (
    <div className={className} style={{ position: 'relative', width, overflow: 'visible' }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y, x },
          visible: { opacity: 1, y: 0, x: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};
