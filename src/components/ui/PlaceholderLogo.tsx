interface PlaceholderLogoProps {
  variant?: 'light' | 'dark';
}

export const PlaceholderLogo = ({ variant = 'light' }: PlaceholderLogoProps) => {
  const textColor = variant === 'dark' ? 'text-background' : 'text-primary';
  
  return (
    <div className="flex flex-col group cursor-pointer">
      <span className={`font-display text-2xl font-bold tracking-[0.25em] uppercase ${textColor} leading-none transition-opacity group-hover:opacity-80`}>
        D'OASIS
      </span>
      <span className={`font-display text-[7px] uppercase tracking-[0.35em] ${textColor} opacity-80 leading-tight mt-0.5`}>
        Counseling & Coaching
      </span>
    </div>
  );
};
