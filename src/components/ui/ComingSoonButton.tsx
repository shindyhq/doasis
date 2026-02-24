'use client';

import { useToast } from './Toast';

interface ComingSoonButtonProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function ComingSoonButton({ children, className, title }: ComingSoonButtonProps) {
  const { showToast } = useToast();

  return (
    <button
      title={title}
      onClick={() => showToast(`${title || 'This feature'} is being polished.`, 'coming-soon')}
      className={className}
    >
      {children}
    </button>
  );
}
