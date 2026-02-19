import { createClient } from '@/lib/supabase/server';
import { CommunityService } from '@/services/CommunityService';
import { Users, MessageCircle, Heart } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function CommunityPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Fetch real posts
  let posts: any[] = [];
  try {
    posts = await CommunityService.getPosts();
  } catch (e) {
    console.error('Failed to fetch community posts:', e);
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent mb-4">
          Community
        </p>
        <h1 className="text-5xl font-display font-medium text-primary tracking-tight">
          Restoration Circles
        </h1>
        <p className="mt-6 text-lg font-serif italic text-primary/60 max-w-2xl leading-relaxed">
          "For where two or three are gathered in my name, there am I among them."
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white/50 border border-white/60 p-6 rounded-[32px] flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/5 flex-shrink-0" />
              <div className="flex-1">
                 <form action={async (formData) => {
                    'use server';
                    const content = formData.get('content') as string;
                    if (!content || !user) return;
                    await CommunityService.createPost(user.id, content);
                 }}>
                   <textarea 
                     name="content"
                     placeholder="Share a thought, prayer request, or encouragement..." 
                     className="w-full bg-transparent border-none focus:ring-0 text-primary placeholder:text-primary/40 resize-none h-24"
                   />
                   <div className="flex justify-end pt-2 border-t border-primary/5">
                      <button type="submit" className="bg-primary text-white px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors">
                         Post
                      </button>
                   </div>
                 </form>
              </div>
           </div>

           {/* Post List */}
           {posts.length > 0 ? posts.map(post => (
             <div key={post.id} className="bg-white/50 border border-white/60 p-8 rounded-[32px]">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                      {post.author?.full_name?.[0] || 'A'}
                   </div>
                   <div>
                      <div className="font-bold text-primary text-sm">{post.author?.full_name || 'Anonymous'}</div>
                      <div className="text-[10px] text-primary/40 uppercase tracking-widest">{formatDistanceToNow(new Date(post.created_at))} ago</div>
                   </div>
                </div>
                <p className="text-primary/80 font-serif leading-relaxed mb-6">
                   {post.content}
                </p>
                <div className="flex items-center gap-6 text-primary/40">
                   <button className="flex items-center gap-2 hover:text-accent transition-colors">
                      <Heart size={16} /> <span className="text-xs font-bold">{post.likes_count}</span>
                   </button>
                   <button className="flex items-center gap-2 hover:text-primary transition-colors">
                      <MessageCircle size={16} /> <span className="text-xs font-bold">0</span>
                   </button>
                </div>
             </div>
           )) : (
             <div className="text-center p-12 text-primary/40 italic font-serif">
               No posts yet. Be the first to share.
             </div>
           )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           <div className="bg-primary text-white p-8 rounded-[32px]">
              <h3 className="font-display font-medium text-xl mb-4">Upcoming Circles</h3>
              <div className="space-y-4">
                 <div className="bg-white/10 p-4 rounded-xl">
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Tomorrow, 7PM</div>
                    <div className="font-bold">Grief & Healing Support</div>
                    <button className="mt-3 w-full bg-white text-primary py-2 rounded-lg text-xs font-bold uppercase tracking-widest">
                       RSVP
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
