// Reusable typography components for legal pages

export const LegalH2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mt-12 mb-6 tracking-tight leading-tight">
    {children}
  </h2>
);

export const LegalH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl font-display font-semibold text-primary mt-10 mb-4 tracking-tight">
    {children}
  </h3>
);

export const LegalH4 = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-sm font-display font-bold uppercase tracking-[0.2em] text-primary mt-8 mb-3">
    {children}
  </h4>
);

export const LegalP = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg font-serif text-primary/80 leading-relaxed mb-6">
    {children}
  </p>
);

export const LegalUL = ({ children }: { children: React.ReactNode }) => (
  <ul className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-disc">
    {children}
  </ul>
);

export const LegalOL = ({ children }: { children: React.ReactNode }) => (
  <ol className="text-lg font-serif text-primary/80 leading-relaxed mb-6 pl-6 space-y-2 list-decimal">
    {children}
  </ol>
);

export const LegalHR = () => (
  <hr className="border-0 border-t border-primary/10 my-12" />
);

export const LegalStrong = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-bold text-primary">
    {children}
  </strong>
);
