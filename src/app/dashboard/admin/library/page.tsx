import { ResourceService } from '@/services/ResourceService';
import { UploadCloud, FileText, Music, Video, Link as LinkIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

import { LibraryClient } from './LibraryClient';

export default async function AdminLibraryPage() {
  const resources = await ResourceService.getResources();

  return <LibraryClient initialResources={resources} />;
}
