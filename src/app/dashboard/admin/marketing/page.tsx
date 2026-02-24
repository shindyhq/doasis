import {
  TrendingUp,
  Mail,
  Plus,
  Users,
  MousePointerClick,
  BarChart2,
  Send,
  Eye,
  ChevronRight,
  Sparkles,
  TrendingDown,
} from 'lucide-react';
import { ComingSoonButton } from '@/components/ui/ComingSoonButton';

export const dynamic = 'force-dynamic';

const QUICK_ACTIONS = [
  { label: 'Broadcast Email', sub: 'Send to all clients now', Icon: Send, cta: 'Compose' },
  { label: 'Automations', sub: 'Set up triggered sequences', Icon: Sparkles, cta: 'Configure' },
  { label: 'Subscriber List', sub: 'Manage your audience', Icon: Users, cta: 'View List' },
];

import { MarketingService } from '@/services/MarketingService';

import { MarketingClient } from './MarketingClient';

export default async function MarketingPage() {
  const [campaigns, stats] = await Promise.all([
    MarketingService.getCampaigns(),
    MarketingService.getMarketingStats()
  ]);

  return <MarketingClient initialCampaigns={campaigns} stats={stats} />;
}
