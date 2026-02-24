-- D'Oasis Sanctuary System: CONSOLIDATED MIGRATION
-- This script rebuilds the entire database schema from scratch.
-- It combines core tables (Profiles, Appointments, Journal) with new features (Goals, Checking-ins, Community).

-- 0. CLEANUP & EXTENSIONS
create extension if not exists "uuid-ossp";

-- 1. UTILITY FUNCTIONS
-- Auto-update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language 'plpgsql';

-- 2. PROFILES (Core Identity)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  role text default 'client' check (role in ('client', 'admin')),
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

-- Trigger: Handle New User Creation
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, role)
  values (
    new.id, 
    new.email,
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    coalesce(new.raw_user_meta_data->>'role', 'client')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Re-create trigger safely
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Trigger: Update updated_at
create trigger update_profiles_updated_at
    before update on profiles
    for each row
    execute procedure update_updated_at_column();


-- 3. JOURNAL ENTRIES (Wellness)
create table if not exists public.journal_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  content text,
  mood text,
  tags text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.journal_entries enable row level security;

create trigger update_journal_entries_updated_at
    before update on journal_entries
    for each row
    execute procedure update_updated_at_column();


-- 4. CHECK-INS (Daily Mood)
create table if not exists public.check_ins (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  mood_score integer not null check (mood_score >= 1 and mood_score <= 5),
  note text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.check_ins enable row level security;


-- 5. APPOINTMENTS (Booking)
create table if not exists public.appointments (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references public.profiles(id) on delete cascade not null,
  -- Renapped 'user_id' -> 'client_id' in schema but TS interface calls it 'user_id'. 
  -- Checking usage... Schema.sql used client_id. 
  -- We will alias it to match TS if needed, or stick to schema.sql for compatibility with existing queries.
  -- Let's stick to 'user_id' to align with everything else in Doasis if possible, 
  -- BUT 'schema.sql' used 'client_id'. Let's check 'Appointment' interface in custom.ts.
  -- custom.ts says 'user_id'. So we MUST use 'user_id' to match the frontend code.
  user_id uuid references public.profiles(id) on delete cascade not null,
  scheduled_at timestamp with time zone not null, -- merged starts_at/ends_at concept or just one? TS says 'scheduled_at'
  status text check (status in ('scheduled', 'completed', 'cancelled', 'noshow')) default 'scheduled',
  type text not null, 
  notes text, 
  meeting_link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.appointments enable row level security;


-- 6. GOALS & MILESTONES (Growth)
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

alter table public.goals enable row level security;
alter table public.goal_milestones enable row level security;


-- 7. RESOURCES (Library)
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

alter table public.resources enable row level security;
alter table public.client_resources enable row level security;


-- 8. COMMUNICATIONS (Messages & Notifications)
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  receiver_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  read_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

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

alter table public.messages enable row level security;
alter table public.notifications enable row level security;


-- 9. ADMIN NOTES (CRM)
-- (Included from legacy schema as it is used in actions/admin-actions.ts)
create table if not exists public.admin_notes (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references public.profiles(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete set null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.admin_notes enable row level security;


-- 10. GAMIFICATION (Badges)
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

alter table public.badges enable row level security;
alter table public.user_badges enable row level security;


-- 11. FORMS & COMMUNITY
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

create table if not exists public.community_posts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  category text default 'General',
  likes_count int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.forms enable row level security;
alter table public.form_responses enable row level security;
alter table public.community_posts enable row level security;


-- 12. PAYMENTS
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

alter table public.payments enable row level security;


-- 13. RLS POLICIES (Consolidated)

-- Profiles
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Journal
create policy "Users manage own entries" on public.journal_entries for all using (auth.uid() = user_id);

-- Check-ins
create policy "Users manage own check-ins" on public.check_ins for all using (auth.uid() = user_id);

-- Appointments
create policy "Users view own appointments" on public.appointments for select using (auth.uid() = user_id);
create policy "Admins manage appointments" on public.appointments for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Goals
create policy "Users manage own goals" on public.goals for all using (auth.uid() = user_id);
create policy "Users manage own milestones" on public.goal_milestones for all using (
  exists (select 1 from public.goals where id = goal_id and user_id = auth.uid())
);

-- Resources
create policy "Published resources viewable" on public.resources for select using (is_published = true);
create policy "Admins manage resources" on public.resources for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Users manage own resource tracking" on public.client_resources for all using (auth.uid() = user_id);

-- Messages
create policy "Users access own messages" on public.messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy "Users send messages" on public.messages for insert with check (auth.uid() = sender_id);

-- Notifications
create policy "Users view own notifications" on public.notifications for select using (auth.uid() = user_id);

-- Admin Notes
create policy "Admins manage notes" on public.admin_notes for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Badges
create policy "Badges viewable" on public.badges for select using (true);
create policy "User badges viewable" on public.user_badges for select using (auth.uid() = user_id);

-- Forms & Responses
create policy "Published forms viewable" on public.forms for select using (is_published = true);
create policy "Users see own responses" on public.form_responses for select using (auth.uid() = user_id);
create policy "Admins see all responses" on public.form_responses for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Community
create policy "Members view community" on public.community_posts for select using (auth.role() = 'authenticated');
create policy "Members post to community" on public.community_posts for insert with check (auth.uid() = author_id);

-- Payments
create policy "Users view own payments" on public.payments for select using (auth.uid() = user_id);


-- 14. SEED DATA (Optional Starter Content)
insert into public.resources (title, description, type, url, category, is_published, duration) values 
('Morning Stillness', 'Guided session.', 'video', 'https://youtube.com', 'Meditation', true, '10 min');

insert into public.badges (name, icon, category) values 
('First Step', 'Footprints', 'streak'), ('Deep Diver', 'Anchor', 'journaling');
