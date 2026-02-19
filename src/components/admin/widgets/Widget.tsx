
import { ReactNode, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface WidgetContextValue {
  isLoading?: boolean;
}

const WidgetContext = createContext<WidgetContextValue>({});

interface WidgetProps {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
}

export function Widget({ children, className, isLoading }: WidgetProps) {
  return (
    <WidgetContext.Provider value={{ isLoading }}>
      <div className={cn("glass rounded-[40px] border border-primary/5 bg-white/40 shadow-xl overflow-hidden flex flex-col transition-all hover:shadow-2xl hover:border-primary/10", className)}>
        {children}
      </div>
    </WidgetContext.Provider>
  );
}

interface WidgetHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

Widget.Header = function WidgetHeader({ title, subtitle, action, icon, className }: WidgetHeaderProps) {
  return (
    <div className={cn("p-8 border-b border-primary/5 flex items-center justify-between bg-white/40 backdrop-blur-sm", className)}>
      <div className="flex items-center gap-4">
        {icon && (
          <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary/40">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-xl font-display font-medium text-primary">{title}</h3>
          {subtitle && <p className="text-xs font-display text-primary/40 mt-1">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

interface WidgetContentProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

Widget.Content = function WidgetContent({ children, className, noPadding }: WidgetContentProps) {
  const { isLoading } = useContext(WidgetContext);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 gap-3 text-primary/30 min-h-[300px]">
        <Loader2 className="animate-spin" size={32} />
        <p className="font-display text-xs uppercase tracking-widest font-bold">Loading Data...</p>
      </div>
    );
  }

  return (
    <div className={cn("flex-1 overflow-y-auto custom-scrollbar", !noPadding && "p-8", className)}>
      {children}
    </div>
  );
};

interface WidgetFooterProps {
  children: ReactNode;
  className?: string;
}

Widget.Footer = function WidgetFooter({ children, className }: WidgetFooterProps) {
  return (
    <div className={cn("p-6 border-t border-primary/5 bg-white/20 backdrop-blur-sm", className)}>
      {children}
    </div>
  );
};
