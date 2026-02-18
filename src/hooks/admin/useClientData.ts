
import { useState, useMemo } from 'react';
import { Profile } from '@/lib/types/admin';

interface UseClientDataOptions {
  clients: Profile[];
  initialSortBy?: keyof Profile;
}

export function useClientData({ clients, initialSortBy = 'full_name' }: UseClientDataOptions) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'client' | 'admin'>('all');
  const [sortBy, setSortBy] = useState<keyof Profile>(initialSortBy);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredClients = useMemo(() => {
    return clients
      .filter((client) => {
        const matchesSearch =
          client.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = filterRole === 'all' || client.role === filterRole;
        return matchesSearch && matchesRole;
      })
      .sort((a, b) => {
        const aVal = a[sortBy] || '';
        const bVal = b[sortBy] || '';
        
        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [clients, searchQuery, filterRole, sortBy, sortOrder]);

  return {
    clients: filteredClients,
    searchQuery,
    setSearchQuery,
    filterRole,
    setFilterRole,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    totalCount: clients.length,
    filteredCount: filteredClients.length,
  };
}
