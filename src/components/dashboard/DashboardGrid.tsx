import { BookOpen, Users, PenTool } from 'lucide-react';
import Link from 'next/link';

export function DashboardGrid() {
  const cards = [
    {
      title: 'Daily Intentions',
      desc: 'Set your focus for the day.',
      icon: PenTool,
      href: '/dashboard/journal',
      color: 'bg-secondary/10 text-secondary',
    },
    {
      title: 'My Journal',
      desc: 'Express your thoughts and track moods.',
      icon: BookOpen,
      href: '/dashboard/journal',
      color: 'bg-rose-50 text-rose-600',
    },
    {
      title: 'Assigned Resources',
      desc: 'Curated readings and guides.',
      icon: BookOpen,
      href: '/dashboard/library',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Restoration Circles',
      desc: 'Connect with community support.',
      icon: Users,
      href: '/dashboard/community',
      color: 'bg-emerald-50 text-emerald-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <Link 
          key={idx} 
          href={card.href}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.color}`}>
            <card.icon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 group-hover:text-teal-600 transition-colors mb-1">
            {card.title}
          </h3>
          <p className="text-sm text-slate-500">
            {card.desc}
          </p>
        </Link>
      ))}
    </div>
  );
}
