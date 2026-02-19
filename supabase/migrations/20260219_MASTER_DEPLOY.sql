-- MASTER MIGRATION: D'Oasis Sanctuary System
-- This script consolidates all feature tables into one execution flow.

-- 0. CORE: PROFILES (Dependencies)
-- Ensures the base table exists if it wasn't created by Auth triggers
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  role text default 'client' check (role in ('client', 'admin')),
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 1. WELLNESS: CHECK-INS
create table if not exists public.check_ins (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  mood_score integer not null check (mood_score >= 1 and mood_score <= 5),
  note text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. GROWTH: GOALS & MILESTONES
create table if not exists public.goals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  status text check (status in ('active', 'completed', 'paused')) default 'active',
  progress integer default 0 check (progress >= 0 and progress <= 100),
  target_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.goal_milestones (
  id uuid default gen_random_uuid() primary key,
  goal_id uuid references public.goals(id) on delete cascade not null,
  title text not null,
  is_completed boolean default false,
  due_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. KNOWLEDGE: RESOURCES
create table if not exists public.resources (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  type text check (type in ('video', 'audio', 'pdf', 'link')) not null,
  url text not null,
  thumbnail_url text,
  category text not null,
  is_published boolean default false,
  duration text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.client_resources (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  resource_id uuid references public.resources(id) on delete cascade not null,
  status text check (status in ('in_progress', 'completed')) default 'in_progress',
  last_accessed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, resource_id)
);

-- 4. COMMUNICATION: MESSAGES
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  receiver_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  read_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. NOTIFICATIONS
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null,
  title text not null,
  message text,
  link text,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. GAMIFICATION: BADGES
create table if not exists public.badges (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  icon text not null,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.user_badges (
  user_id uuid references public.profiles(id) on delete cascade not null,
  badge_id uuid references public.badges(id) on delete cascade not null,
  awarded_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, badge_id)
);

-- 7. FORMS
create table if not exists public.forms (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  schema jsonb not null,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.form_responses (
  id uuid default gen_random_uuid() primary key,
  form_id uuid references public.forms(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  data jsonb not null,
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. COMMUNITY
create table if not exists public.community_posts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  category text default 'General',
  likes_count int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. FINANCIALS
create table if not exists public.payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  amount decimal(10,2) not null,
  currency text default 'USD',
  status text not null,
  description text,
  invoice_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. ENABLE RLS (Security)
alter table public.profiles enable row level security;
alter table public.check_ins enable row level security;
alter table public.goals enable row level security;
alter table public.goal_milestones enable row level security;
alter table public.resources enable row level security;
alter table public.client_resources enable row level security;
alter table public.messages enable row level security;
alter table public.notifications enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;
alter table public.forms enable row level security;
alter table public.form_responses enable row level security;
alter table public.community_posts enable row level security;
alter table public.payments enable row level security;

-- 11. POLICIES (Simplified for Production)

-- Profiles
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Check-ins
create policy "Users manage own check-ins" on public.check_ins for all using (auth.uid() = user_id);

-- Goals
create policy "Users manage own goals" on public.goals for all using (auth.uid() = user_id);
create policy "Users manage own milestones" on public.goal_milestones for all using (
  exists (select 1 from public.goals where id = goal_id and user_id = auth.uid())
);

-- Resources
create policy "Published resources viewable" on public.resources for select using (is_published = true);
create policy "Users manage own resource tracking" on public.client_resources for all using (auth.uid() = user_id);

-- Messages
create policy "Users access own messages" on public.messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy "Users send messages" on public.messages for insert with check (auth.uid() = sender_id);

-- Notifications
create policy "Users view own notifications" on public.notifications for select using (auth.uid() = user_id);

-- Community
create policy "Members view community" on public.community_posts for select using (auth.role() = 'authenticated');
create policy "Members post to community" on public.community_posts for insert with check (auth.uid() = author_id);

-- Badges
create policy "Badges viewable" on public.badges for select using (true);
create policy "User badges viewable" on public.user_badges for select using (auth.uid() = user_id);

-- 12. SEED DATA
insert into public.resources (title, description, type, url, category, is_published, duration) values 
('Morning Stillness', 'Guided session.', 'video', 'https://youtube.com', 'Meditation', true, '10 min');

insert into public.badges (name, icon, category) values 
('First Step', 'Footprints', 'streak'), ('Deep Diver', 'Anchor', 'journaling');
