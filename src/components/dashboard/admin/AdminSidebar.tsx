'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  Settings,
  LogOut,
  MessageSquare,
  ClipboardList,
  Megaphone,
  Library,
  CalendarDays,
} from 'lucide-react';

interface NavLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

interface NavGroup {
  label: string;
  links: NavLink[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Overview',
    links: [
      { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: 'Clients',
    links: [
      { name: 'My Clients', href: '/dashboard/admin/clients', icon: Users },
      { name: 'Calendar', href: '/dashboard/admin/calendar', icon: CalendarDays },
      { name: 'Messages', href: '/dashboard/admin/messages', icon: MessageSquare },
    ],
  },
  {
    label: 'Business',
    links: [
      { name: 'Financials', href: '/dashboard/admin/financials', icon: FileText },
      { name: 'Analytics', href: '/dashboard/admin/analytics', icon: BarChart2 },
    ],
  },
  {
    label: 'Content',
    links: [
      { name: 'Forms', href: '/dashboard/admin/forms', icon: ClipboardList },
      { name: 'Library', href: '/dashboard/admin/library', icon: Library },
      { name: 'Marketing', href: '/dashboard/admin/marketing', icon: Megaphone },
    ],
  },
  {
    label: 'System',
    links: [
      { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');

  return (
    <div className="w-64 bg-slate-900 h-screen fixed left-0 top-0 text-white flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800 shrink-0">
        <h1 className="text-xl font-display font-bold tracking-tight">
          Sanctuary<span className="text-secondary">.</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Control Center</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-4 mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.links.map((link) => {
                const active = isActive(link.href, link.exact);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group text-sm font-medium ${
                      active
                        ? 'bg-accent/30 scale-110 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <link.icon
                      className={`w-4 h-4 transition-colors ${
                        active ? 'text-accent' : 'group-hover:text-accent'
                      }`}
                    />
                    <span>{link.name}</span>
                    {active && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary rounded-full blur-[60px] -mr-16 -mt-16 opacity-30"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-slate-800 shrink-0">
        <button
          title="Sign out"
          className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors w-full text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
