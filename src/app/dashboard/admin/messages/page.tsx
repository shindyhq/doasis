import { createClient } from '@/lib/supabase/server';
import { MessageService } from '@/services/MessageService';
import { Search, PenSquare, Send, Paperclip, Phone, Video } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const dynamic = 'force-dynamic';

const MOCK_CONVERSATIONS = [
  { id: '1', name: 'Sarah M.',  lastMessage: "Thank you so much for today's session!", time: '10m ago',  unread: 2, online: true  },
  { id: '2', name: 'James R.',  lastMessage: 'Could we reschedule to Friday?',          time: '1h ago',   unread: 1, online: false },
  { id: '3', name: 'Amara K.',  lastMessage: 'I completed the weekly check-in form.',   time: '3h ago',   unread: 0, online: true  },
  { id: '4', name: 'David L.',  lastMessage: 'Looking forward to our next session.',    time: '1d ago',   unread: 0, online: false },
  { id: '5', name: 'Nina P.',   lastMessage: 'The breathing exercises have been helping!', time: '2d ago', unread: 0, online: false },
];

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: { user: authUser } } = await supabase.auth.getUser();
  const user = authUser || {
    id: 'mock-admin-id',
    email: 'admin@doasis.org',
    user_metadata: { full_name: 'Admin User' },
  };

  let conversations: { id: string; [key: string]: unknown }[] = [];
  try {
    if (user) {
      const fetched = await MessageService.getConversations(user.id);
      conversations = (fetched ?? []) as unknown as { id: string; [key: string]: unknown }[];
    }
  } catch (e) {
    console.error('Failed to fetch messages:', e);
  }

  const displayConversations = conversations.length > 0 ? conversations : MOCK_CONVERSATIONS;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 font-display">Client Messages</h1>
        <p className="text-slate-500 mt-1">Stay connected with your clients through private, secure messaging.</p>
      </div>

      {/* Main Layout */}
      <div className="h-[calc(100vh-14rem)] flex gap-5">

        {/* Sidebar */}
        <div className="w-72 shrink-0 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">

          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-slate-900">Inbox</h2>
              <button
                title="Compose new message"
                className="w-8 h-8 rounded-lg bg-primary hover:bg-primary/90 text-white flex items-center justify-center transition-all shadow-sm active:scale-95"
              >
                <PenSquare className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                title="Search conversations"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-100">
            {['All', 'Unread', 'Flagged'].map((tab, i) => (
              <button
                key={tab}
                title={tab}
                className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
                  i === 0
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {displayConversations.map((conv: { id: string; [key: string]: unknown }, idx) => {
              const name = (conv.name as string) ||
                ((conv.sender_id === user?.id
                  ? (conv as { receiver?: { full_name?: string } }).receiver?.full_name
                  : (conv as { sender?: { full_name?: string } }).sender?.full_name) ?? 'Client');
              const lastMsg = (conv.lastMessage as string) || (conv.content as string) || '';
              const time = (conv.time as string) || formatDistanceToNow(new Date((conv.created_at as string) ?? Date.now()), { addSuffix: true });
              const unread = (conv.unread as number) ?? 0;
              const online = (conv.online as boolean) ?? false;

              return (
                <div
                  key={conv.id}
                  className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors ${idx === 0 ? 'bg-secondary/10' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center font-semibold text-secondary text-sm">
                        {name.charAt(0)}
                      </div>
                      {online && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className={`text-sm font-semibold ${unread > 0 ? 'text-slate-900' : 'text-slate-700'}`}>
                          {name}
                        </span>
                        <span className="text-[11px] text-slate-400 shrink-0 ml-2">{time}</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{lastMsg}</p>
                    </div>
                    {unread > 0 && (
                      <span className="shrink-0 w-5 h-5 bg-primary text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
                        {unread}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl flex flex-col overflow-hidden shadow-sm">

          {/* Thread Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center font-semibold text-secondary text-sm">
                  S
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Sarah M.</p>
                <p className="text-xs text-emerald-600 font-semibold">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button title="Voice call" className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
                <Phone className="w-4 h-4" />
              </button>
              <button title="Video call" className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
                <Video className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50/40">
            {/* Received */}
            <div className="flex gap-3 max-w-lg">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center font-semibold text-secondary text-xs shrink-0">S</div>
              <div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <p className="text-sm text-slate-800">Thank you so much for today&apos;s session! I really felt heard. 💛</p>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 ml-1">10:32 AM</p>
              </div>
            </div>

            {/* Sent */}
            <div className="flex gap-3 max-w-lg ml-auto flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-semibold text-white text-xs shrink-0">A</div>
              <div className="flex flex-col items-end">
                <div className="bg-primary text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
                  <p className="text-sm">It was a pleasure working with you today, Sarah. You showed real courage. 🌱</p>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 mr-1">10:35 AM</p>
              </div>
            </div>

            {/* Received */}
            <div className="flex gap-3 max-w-lg">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center font-semibold text-secondary text-xs shrink-0">S</div>
              <div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <p className="text-sm text-slate-800">I&apos;ll try the breathing exercises you shared before our next session. See you Thursday!</p>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 ml-1">10:38 AM</p>
              </div>
            </div>
          </div>

          {/* Composer */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex items-end gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
              <button title="Attach file" className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors">
                <Paperclip className="w-4 h-4" />
              </button>
              <textarea
                rows={1}
                placeholder="Write a message..."
                className="flex-1 bg-transparent resize-none text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none leading-relaxed"
              />
              <button
                title="Send message"
                className="p-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
