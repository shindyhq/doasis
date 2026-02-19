import { createClient } from '@/lib/supabase/server';
import { MessageService } from '@/services/MessageService';
import { Search, PenSquare, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let conversations: any[] = [];
  try {
     // Fetch real messages if user exists
     if (user) {
        conversations = await MessageService.getConversations(user.id);
     }
  } catch (e) {
     console.error('Failed to fetch messages:', e);
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Sidebar List */}
      <div className="w-80 bg-white/50 border border-white/60 rounded-[32px] overflow-hidden flex flex-col">
         <div className="p-6 border-b border-primary/5">
            <div className="flex items-center justify-between mb-4">
               <h2 className="font-display font-medium text-xl text-primary">Inbox</h2>
               <button className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                  <PenSquare size={14} />
               </button>
            </div>
            <div className="relative">
               <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" />
               <input 
                 type="text" 
                 placeholder="Search messages..." 
                 className="w-full pl-9 pr-4 py-2 bg-white rounded-xl text-xs font-bold border border-primary/5 focus:outline-none focus:border-accent/50 transition-colors"
               />
            </div>
         </div>
         <div className="flex-1 overflow-y-auto">
            {conversations.length > 0 ? conversations.map(msg => (
              <div key={msg.id} className={`p-4 hover:bg-white/60 cursor-pointer transition-colors border-b border-primary/5`}>
                 <div className="flex justify-between items-start mb-1">
                    <span className={`font-bold text-sm text-primary`}>
                      {msg.sender_id === user?.id ? msg.receiver?.full_name : msg.sender?.full_name}
                    </span>
                    <span className="text-[10px] text-primary/40 font-bold uppercase tracking-widest">
                      {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                    </span>
                 </div>
                 <p className="text-xs truncate text-primary/60">
                   {msg.content}
                 </p>
              </div>
            )) : (
              <div className="p-8 text-center text-primary/40 text-xs uppercase tracking-widest">
                No messages found
              </div>
            )}
         </div>
      </div>

      {/* Message Thread (Empty State) */}
      <div className="flex-1 bg-white/50 border border-white/60 rounded-[32px] flex flex-col items-center justify-center text-center p-12">
         <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center text-primary/20 mb-6">
            <MessageSquare size={40} />
         </div>
         <h3 className="font-display text-2xl font-medium text-primary mb-2">Select a Conversation</h3>
         <p className="text-primary/40 font-serif italic max-w-md">
            Choose a client from the list to view your secure message history or start a new conversation.
         </p>
      </div>
    </div>
  );
}
