'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  MessageSquare,
  FileText,
  BarChart2,
  ClipboardList,
  Library,
  Megaphone,
  Settings,
  Bell,
  ChevronDown,
  LogOut,
} from 'lucide-react';

type NavItem = { name: string; href: string; icon: React.ElementType };

type NavGroup = {
  label: string;
  href?: string;          // set for single-link groups (no dropdown)
  icon?: React.ElementType;
  items?: NavItem[];      // set for multi-link groups
  exact?: boolean;
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Dashboard',
    href: '/dashboard/admin',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: 'Clients',
    items: [
      { name: 'My Clients', href: '/dashboard/admin/clients',  icon: Users },
      { name: 'Calendar',   href: '/dashboard/admin/calendar', icon: CalendarDays },
      { name: 'Messages',   href: '/dashboard/admin/messages', icon: MessageSquare },
    ],
  },
  {
    label: 'Business',
    items: [
      { name: 'Financials',   href: '/dashboard/admin/financials',   icon: FileText },
      { name: 'Analytics',  href: '/dashboard/admin/analytics',  icon: BarChart2 },
    ],
  },
  {
    label: 'Content',
    items: [
      { name: 'Forms',      href: '/dashboard/admin/forms',      icon: ClipboardList },
      { name: 'Library',    href: '/dashboard/admin/library',    icon: Library },
      { name: 'Marketing',  href: '/dashboard/admin/marketing',  icon: Megaphone },
    ],
  },
  {
    label: 'Settings',
    href: '/dashboard/admin/settings',
    icon: Settings,
  },
];

export function AdminNavbar() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const closeAll = useCallback(() => {
    setOpenGroup(null);
    setProfileOpen(false);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');

  const groupIsActive = (group: NavGroup) => {
    if (group.href) return isActive(group.href, group.exact);
    return group.items?.some((item) => isActive(item.href)) ?? false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-screen-xl mx-auto h-full flex items-center px-6 gap-6">

        {/* ── Logo ───────────────────────────────────── */}
        <Link href="/dashboard/admin" className="flex items-center gap-2.5 shrink-0 mr-6" onClick={closeAll}>
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-display font-black text-sm select-none">
            S
          </div>
          <span className="font-display font-bold text-slate-900 tracking-tight text-lg">
            Sanctuary<span className="text-primary">.</span>
          </span>
        </Link>

        {/* ── Nav Groups ─────────────────────────────── */}
        <nav ref={navRef} className="flex items-center gap-1 flex-1">
          {NAV_GROUPS.map((group) => {
            const active = groupIsActive(group);

            // ── Single link (no dropdown) ──
            if (group.href) {
              const Icon = group.icon!;
              return (
                <Link
                  key={group.label}
                  href={group.href}
                  onClick={closeAll}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    active
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={14} />
                  {group.label}
                </Link>
              );
            }

            // ── Dropdown group ──
            const isOpen = openGroup === group.label;
            return (
              <div key={group.label} className="relative">
                <button
                  title={group.label}
                  onClick={() => setOpenGroup(isOpen ? null : group.label)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    active
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {group.label}
                  <ChevronDown
                    size={13}
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/60 py-2 z-50 overflow-hidden">
                    {/* Group Label */}
                    <p className="px-4 pt-1 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      {group.label}
                    </p>
                    {group.items!.map((item) => {
                      const itemActive = isActive(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeAll}
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                              itemActive
                              ? 'text-secondary bg-secondary/10'
                              : 'text-slate-600 hover:bg-secondary/10 hover:text-secondary'
                          }`}
                        >
                          <item.icon
                            size={15}
                            className={itemActive ? 'text-secondary' : 'text-slate-400 group-hover:text-secondary'}
                          />
                          {item.name}
                          {itemActive && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ── Right Controls ─────────────────────────── */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Notification Bell */}
          <button
            title="Notifications"
            className="relative p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Bell size={19} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white" />
          </button>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              title="Account menu"
              onClick={() => setProfileOpen((o) => !o)}
              className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
                A
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 leading-none">Admin</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Practitioner</p>
              </div>
              <ChevronDown
                size={13}
                className={`text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {profileOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/60 py-2 z-50">
                <Link
                  href="/dashboard/admin/settings"
                  onClick={closeAll}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                >
                  <Settings size={14} className="text-slate-400" />
                  Settings
                </Link>
                <Link
                  href="/dashboard"
                  onClick={closeAll}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                >
                  <LayoutDashboard size={14} className="text-slate-400" />
                  Client View
                </Link>
                <div className="my-1.5 border-t border-slate-100" />
                <button
                  title="Sign out"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-rose-500 hover:bg-rose-50 w-full text-left"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
