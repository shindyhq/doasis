-- GAP FILL MIGRATION: Completing the schema for Admin-Client.md feature set

-- 1. MESSAGES (Secure Communication)
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  receiver_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  read_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. NOTIFICATIONS (System Alerts)
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null, -- 'info', 'success', 'warning', 'error'
  title text not null,
  message text,
  link text,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. BADGES & MILESTONES (Gamification)
create table if not exists public.badges (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  icon text not null, -- Lucide icon name or URL
  category text, -- 'streak', 'journaling', 'attendance'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.user_badges (
  user_id uuid references public.profiles(id) on delete cascade not null,
  badge_id uuid references public.badges(id) on delete cascade not null,
  awarded_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, badge_id)
);

-- 4. FORMS & ASSESSMENTS
create table if not exists public.forms (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  schema jsonb not null, -- The form builder schema
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.form_responses (
  id uuid default gen_random_uuid() primary key,
  form_id uuid references public.forms(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  data jsonb not null, -- The answers
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. COMMUNITY (Restoration Circles)
create table if not exists public.community_posts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  category text default 'General',
  likes_count int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. PAYMENTS (Transaction History for Billing)
create table if not exists public.payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  amount decimal(10,2) not null,
  currency text default 'USD',
  status text not null, -- 'succeeded', 'pending', 'failed'
  description text,
  invoice_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- POLICIES (RLS)

-- Messages: Users can see messages they sent or received
alter table public.messages enable row level security;
create policy "Users can view their own messages"
  on public.messages for select
  using (auth.uid() = sender_id or auth.uid() = receiver_id);

-- Notifications: Users see their own
alter table public.notifications enable row level security;
create policy "Users can view their own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

-- Badges: Publicly viewable definitions, specific user badges viewable by owner
alter table public.badges enable row level security;
create policy "Badges are viewable by everyone" on public.badges for select using (true);
alter table public.user_badges enable row level security;
create policy "Users view their own badges" on public.user_badges for select using (auth.uid() = user_id);

-- Forms: Publicly viewable if published (for assignment)
alter table public.forms enable row level security;
create policy "Published forms are viewable" on public.forms for select using (is_published = true);

-- Form Responses: Users see their own, Admins see all
alter table public.form_responses enable row level security;
create policy "Users see own responses" on public.form_responses for select using (auth.uid() = user_id);
create policy "Admins see all responses" on public.form_responses for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Community: Viewable by authenticated users
alter table public.community_posts enable row level security;
create policy "Community viewable by members" on public.community_posts for select using (auth.role() = 'authenticated');
create policy "Members can post" on public.community_posts for insert with check (auth.uid() = author_id);

-- SEED DATA (Mock)
insert into public.badges (name, icon, category) values 
('First Step', 'Footprints', 'streak'),
('Deep Diver', 'Anchor', 'journaling'),
('Faithful', 'Sun', 'attendance');

insert into public.notifications (user_id, type, title, message) 
select id, 'info', 'Welcome to Sanctuary', 'We are honored to walk this journey with you.' from public.profiles limit 1;
