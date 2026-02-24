import { FormService } from '@/services/FormService';
import {
  Plus,
  ClipboardList,
  ChevronRight,
  MoreHorizontal,
  Users,
  Clock,
} from 'lucide-react';
import { ComingSoonButton } from '@/components/ui/ComingSoonButton';

export const dynamic = 'force-dynamic';

import { FormsClient } from './FormsClient';

export default async function FormsPage() {
  const [forms, responses] = await Promise.all([
    FormService.getForms(),
    FormService.getRecentResponses(5)
  ]);

  return <FormsClient initialForms={forms} initialResponses={responses} />;
}
