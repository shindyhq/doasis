'use client';

import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface BlogCTAProps {
  content: string;
}

export function BlogCTA({ content }: BlogCTAProps) {
  if (!content) return null;

  return (
    <div className="mt-16 mb-16 relative overflow-hidden rounded-2xl bg-secondary/30 border border-primary/10 p-8 md:p-12">
      {/* Decorative grain/texture if needed using CSS class globally available or just standard bg */}
      
      <div className="relative z-10">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-6 block">
          The Sanctuary Step
        </span>
        
        <div className="prose prose-lg prose-p:font-serif prose-p:text-primary/80 prose-p:italic prose-a:not-italic prose-a:inline-block prose-a:mt-4 prose-a:px-6 prose-a:py-3 prose-a:bg-primary prose-a:text-background prose-a:no-underline prose-a:rounded-full prose-a:text-xs prose-a:uppercase prose-a:tracking-widest prose-a:font-bold hover:prose-a:bg-primary/90 hover:prose-a:scale-105 prose-a:transition-all prose-strong:text-primary prose-strong:font-normal">
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => {
                // Check if it's an internal link (starts with /)
                const isInternal = props.href?.startsWith('/');
                if (isInternal) {
                  return <Link href={props.href as string} {...props} />;
                }
                return <a {...props} target="_blank" rel="noopener noreferrer" />;
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
