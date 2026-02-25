import { createClient } from '@/lib/supabase/server';
import { ResourceService } from '@/services/ResourceService';
import ResourceGrid from '@/components/dashboard/library/ResourceGrid';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function LibraryPage() {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();
  // Mock user for dev
  const user = authUser || {
      id: 'mock-user-id',
      email: 'guest@doasis.org',
      user_metadata: { full_name: 'Guest User' }
  };

  // Fetch resources server-side
  const [allResources, clientResources] = await Promise.all([
    ResourceService.getResources(),
    ResourceService.getClientResources(user.id)
  ]);

  // Merge status into resources
  const resourcesWithStatus = allResources.map(resource => {
    const status = clientResources.find(cr => cr.resource_id === resource.id);
    return {
      ...resource,
      clientStatus: status || null
    };
  });

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
          Wisdom & Growth
        </p>
        <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
          Resource Library
        </h1>
        <p className="mt-6 text-lg font-serif italic text-primary/60 max-w-2xl leading-relaxed">
          "Let the wise hear and increase in learning, and the one who understands obtain guidance."
        </p>
      </header>
      
      <ResourceGrid initialResources={resourcesWithStatus} />
    </div>
  );
}
